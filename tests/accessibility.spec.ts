import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { levels } from '../src/data';

test('major pages and reward states pass automated accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const failures: { label: string; violations: unknown[] }[] = [];
  async function audit(label: string) {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    if (results.violations.length)
      failures.push({
        label,
        violations: results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
      });
  }
  for (const route of [
    '/',
    '/academy',
    '/quizzes',
    '/training',
    '/coach',
    '/progress',
    '/achievements',
    '/parents',
    '/academy/1/lesson/1-1',
    '/quiz/1',
    '/training/0',
  ]) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await audit(route);
  }
  await page.goto('/coach');
  await page.getByRole('button', { name: 'Explore example report' }).click();
  await audit('coach report');
  await page.evaluate(
    (levels) =>
      localStorage.setItem(
        'skill-learn-progress-v1',
        JSON.stringify({
          lessons: levels.flatMap((l) => l.lessons.map((x) => x.id)),
          quizzes: Object.fromEntries(levels.map((l) => [l.id, l.quiz.length * 10])),
          challenges: [0, 1, 2, 3, 4],
          training: {},
        }),
      ),
    levels,
  );
  for (const route of ['/progress', '/achievements', '/academy/1', '/academy/2/lesson/2-4']) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await audit(`completed ${route}`);
  }
  await page.goto('/quiz/1');
  for (let i = 0; i < 5; i++) {
    const question = page.locator('.quiz-stage h2');
    const text = await question.textContent();
    const data = levels[0].quiz.find((q) => q.prompt === text)!;
    await page
      .locator('.quiz-answers .answer-option')
      .nth(i === 0 ? (data.answer + 1) % data.options.length : data.answer)
      .click();
    if (i === 0) await audit('incorrect answer feedback');
    await page.getByRole('button', { name: i === 4 ? 'See my results' : 'Next question' }).click();
    if (i < 4) await expect(question).not.toHaveText(text!);
  }
  await expect(page.locator('.quiz-result')).toBeVisible();
  await audit('quiz results');
  expect(failures).toEqual([]);
});
