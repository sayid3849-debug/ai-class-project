import { test, expect, type Page } from '@playwright/test';
import { levels } from '../src/data';
async function playQuiz(page: Page, id: number, correctCount: number) {
  const level = levels[id - 1];
  await page.goto(`/quiz/${id}`);
  for (let i = 0; i < level.quiz.length; i++) {
    const heading = page.locator('.quiz-stage h2');
    await expect(heading).toBeVisible();
    const prompt = await heading.textContent();
    const q = level.quiz.find((q) => q.prompt === prompt)!;
    const answer = i < correctCount ? q.answer : (q.answer + 1) % q.options.length;
    const choice = page.locator('.quiz-answers .answer-option').nth(answer);
    await expect(choice).toContainText(q.options[answer]);
    await choice.click();
    await expect(page.getByRole('status').filter({ hasText: q.explanation })).toBeVisible();
    await page
      .getByRole('button', {
        name: i === level.quiz.length - 1 ? 'See my results' : 'Next question',
      })
      .click();
    if (i < level.quiz.length - 1) await expect(heading).not.toHaveText(prompt!);
  }
  await expect(page.locator('.quiz-result')).toBeVisible();
}
test('complete the academy through real interactions; persist and reset', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'WELCOME TO SKILL & LEARN!' })).toBeVisible();
  await expect(page.locator('.xp-pill')).toHaveText('0 XP');
  await page.goto('/academy/2');
  await expect(page.getByRole('heading', { name: 'Your next adventure awaits.' })).toBeVisible();
  await playQuiz(page, 1, 2);
  await expect(page.locator('.quiz-result h1')).toContainText('40%');
  await expect(page.locator('.quiz-result h1')).toContainText('Keep going');
  for (const l of levels) {
    for (const lesson of l.lessons) {
      await page.goto(`/academy/${l.id}/lesson/${lesson.id}`);
      if (lesson.matching) {
        for (const [role, zone] of [
          ['Goalkeeper', 4],
          ['Defender', 3],
          ['Midfielder', 2],
          ['Forward', 1],
        ] as const) {
          await page.getByRole('button', { name: role, exact: true }).click();
          await page
            .getByRole('button', { name: `Place role in zone ${zone}`, exact: true })
            .click();
        }
        await expect(page.getByRole('status').filter({ hasText: 'Perfect lineup' })).toBeVisible();
      }
      await page.locator('.knowledge-check .answer-option').nth(lesson.question.answer).click();
      await page.getByRole('button', { name: 'Complete lesson' }).click();
      await expect(page.getByRole('button', { name: 'Lesson complete' })).toBeVisible();
    }
    await playQuiz(page, l.id, l.quiz.length);
    await expect(page.locator('.quiz-result h1')).toContainText('100%');
    await page.goto(`/training/${l.challenge}`);
    await page.getByLabel(/completed$/).fill(String([3, 10, 5, 10, 4][l.challenge]));
    await page.getByLabel('A grown-up helped me complete this.').check();
    await page.getByLabel('I practiced in a safe space with an adult nearby.').check();
    if (l.id === 3) await page.getByLabel('How many shots reached your target?').selectOption('3');
    await page.getByRole('button', { name: 'Complete mission' }).click();
    await expect(page.getByText('Great effort! Mission complete.')).toBeVisible();
    if (l.id < 5) {
      await page.goto(`/academy/${l.id + 1}`);
      await expect(page.locator('.level-hero h1')).toContainText(levels[l.id].name);
    }
  }
  await page.goto('/progress');
  await expect(page.locator('.player-banner h2')).toBeVisible();
  await expect(page.locator('.xp-total')).toContainText('1000');
  await expect(
    page.getByRole('heading', { name: 'Future Soccer Star', exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator('.xp-total')).toContainText('1000');
  await page.goto('/achievements');
  await expect(page.locator('.achievement-card.earned')).toHaveCount(6);
  await page.goto('/parents');
  await page.getByRole('button', { name: 'Reset progress', exact: true }).click();
  await page.getByRole('button', { name: 'Keep my progress' }).click();
  await page.goto('/progress');
  await expect(page.locator('.xp-total')).toContainText('1000');
  await page.goto('/parents');
  await page.getByRole('button', { name: 'Reset progress', exact: true }).click();
  await page.getByRole('button', { name: 'Yes, erase saved progress' }).click();
  await page.goto('/progress');
  await expect(page.locator('.xp-total')).toContainText('0');
  await page.reload();
  await expect(page.locator('.xp-total')).toContainText('0');
});
test('quiz retry, feedback, and truthful coach demonstration', async ({ page }) => {
  await playQuiz(page, 1, 4);
  await expect(page.locator('.quiz-result h1')).toContainText('80%');
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(page.locator('.quiz-live-score')).toContainText('0');
  await expect(page.locator('.progress-label')).toContainText('Question 1 of 5');
  await page.goto('/coach');
  await expect(page.locator('.demo-label')).toContainText('DEMO MODE');
  await expect(page.getByText('No AI video analysis is running.', { exact: false })).toBeVisible();
  await expect(page.locator('input[type=file]')).toHaveCount(0);
  for (const skill of ['Dribbling', 'Passing', 'Shooting', 'Ball Control']) {
    await page.getByRole('button', { name: skill, exact: false }).first().click();
    await page.getByRole('button', { name: 'Explore example report' }).click();
    await expect(page.locator('.report-title h2')).toContainText(skill);
    await expect(
      page.getByText('Prewritten sample ratings · not computer-vision results'),
    ).toBeVisible();
  }
  await page.getByRole('button', { name: 'Pause illustration' }).click();
  await expect(page.getByText('Movement guide paused')).toBeVisible();
});
test('navigation and responsive pages have no overflow or runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/',
      '/academy',
      '/quizzes',
      '/training',
      '/coach',
      '/progress',
      '/achievements',
      '/parents',
      '/academy/1',
      '/academy/1/lesson/1-1',
      '/quiz/1',
      '/training/0',
    ]) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${route} at ${width}px`,
      ).toBe(true);
    }
    if (width === 390 || width === 1440) {
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await page
        .getByRole('navigation', { name: 'All pages' })
        .getByRole('link', { name: 'Achievements' })
        .click();
      await expect(page).toHaveURL(/achievements/);
    }
  }
  expect(errors).toEqual([]);
  await page.goto('/');
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true });
});

test('position drag-and-drop, read-aloud fallback, and unavailable storage', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() =>
    localStorage.setItem(
      'skill-learn-progress-v1',
      JSON.stringify({
        lessons: ['1-1', '1-2', '1-3', '1-4'],
        quizzes: { 1: 50 },
        challenges: [0],
        training: {},
      }),
    ),
  );
  await page.goto('/academy/2/lesson/2-4');
  await page
    .getByRole('button', { name: 'Goalkeeper', exact: true })
    .dragTo(page.getByRole('button', { name: 'Place role in zone 4', exact: true }));
  await expect(page.locator('.match-zone.matched')).toHaveText('Goalkeeper');
  await page.goto('/academy/1/lesson/1-1');
  await page.evaluate(() =>
    Object.defineProperty(window, 'speechSynthesis', { value: undefined, configurable: true }),
  );
  await page.getByRole('button', { name: 'Read it to me' }).click();
  await expect(
    page.getByRole('status').filter({ hasText: 'Read-aloud is not supported' }),
  ).toBeVisible();
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException('Storage blocked', 'SecurityError');
    };
    Storage.prototype.setItem = () => {
      throw new DOMException('Storage blocked', 'SecurityError');
    };
  });
  await page.goto('/academy/1/lesson/1-1');
  await expect(
    page.getByRole('status').filter({ hasText: 'Browser storage is unavailable' }),
  ).toBeVisible();
  await page.locator('.knowledge-check .answer-option').nth(1).click();
  await page.getByRole('button', { name: 'Complete lesson' }).click();
  await expect(page.getByRole('button', { name: 'Lesson complete' })).toBeVisible();
  await expect(page.locator('.xp-pill')).toContainText('20');
});
