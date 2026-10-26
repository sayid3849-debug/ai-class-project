import { test, expect } from '@playwright/test';
import { practiceQuizzes } from '../src/quizQuestions';

test('practice quiz has separate questions and scores and cannot unlock academy levels', async ({
  page,
}) => {
  await page.goto('/quizzes');
  await page.getByRole('link', { name: 'Let’s play' }).click();
  await expect(page).toHaveURL(/practice-quiz\/1/);
  for (let i = 0; i < 5; i++) {
    const heading = page.locator('.quiz-stage h2');
    const prompt = await heading.textContent();
    const q = practiceQuizzes[1].find((q) => q.prompt === prompt)!;
    expect(q).toBeTruthy();
    await page.locator('.answer-option').nth(q.answer).click();
    await page.getByRole('button', { name: i === 4 ? 'See my results' : 'Next question' }).click();
    if (i < 4) await expect(heading).not.toHaveText(prompt!);
  }
  await expect(page.locator('.quiz-result h1')).toContainText('100%');
  await expect(page.locator('.xp-pill')).toContainText('0');
  await page.reload();
  await page.goto('/quizzes');
  await expect(page.locator('.quiz-select').first()).toContainText('100%');
  await page.goto('/academy/2');
  await expect(page.getByRole('heading', { name: 'Your next adventure awaits.' })).toBeVisible();
});
test('local video consent, validation, real model no-person result, and deletion', async ({
  page,
}) => {
  const mediaPosts: string[] = [];
  const external: string[] = [];
  page.on('request', (r) => {
    if (r.method() !== 'GET') mediaPosts.push(r.url());
    if (/^https?:/.test(r.url()) && !r.url().startsWith('http://127.0.0.1:5173/'))
      external.push(r.url());
  });
  await page.goto('/coach');
  const picker = page.getByLabel('Choose practice video');
  await expect(picker).toBeDisabled();
  await page.getByRole('checkbox').check();
  await picker.setInputFiles({
    name: 'not-a-video.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('not a video'),
  });
  await expect(page.getByRole('alert')).toContainText('Please choose an MP4');
  await expect(page.locator('.video-report')).toHaveCount(0);
  await picker.setInputFiles('tests/fixtures/portrait-pitch.webm');
  await expect(page.getByRole('button', { name: 'Analyze my dribbling clip' })).toBeEnabled();
  const dimensions = await page
    .locator('.local-video-stage')
    .evaluate((el) => ({ width: el.clientWidth, height: el.clientHeight }));
  expect(dimensions.width / dimensions.height).toBeCloseTo(180 / 320, 1);
  await picker.setInputFiles('tests/fixtures/empty-pitch.webm');
  const analyze = page.getByRole('button', { name: 'Analyze my dribbling clip' });
  await expect(analyze).toBeEnabled();
  await analyze.click();
  await expect(page.getByRole('alert')).toContainText('could not see one whole body', {
    timeout: 90000,
  });
  await expect(page.locator('.video-report')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Remove video' })).toBeVisible();
  expect(mediaPosts).toEqual([]);
  expect(external).toEqual([]);
  expect(await page.evaluate(() => JSON.stringify(localStorage))).not.toContain('empty-pitch');
  await page.getByRole('button', { name: 'Remove video' }).click();
  await expect(page.locator('video')).toHaveCount(0);
  await expect(page.locator('.video-empty')).toBeVisible();
});
test('cancel removes the selected clip and changing skills clears the old clip', async ({
  page,
}) => {
  await page.goto('/coach');
  await page.getByRole('checkbox').check();
  await page.getByLabel('Choose practice video').setInputFiles('tests/fixtures/empty-pitch.webm');
  await page.getByRole('button', { name: 'Analyze my dribbling clip' }).click();
  await page.getByRole('button', { name: 'Cancel & remove video' }).click();
  await expect(page.locator('video')).toHaveCount(0);
  await expect(page.getByRole('alert')).toContainText('cancelled');
  await page.getByLabel('Choose practice video').setInputFiles('tests/fixtures/empty-pitch.webm');
  await page.getByRole('button', { name: 'Passing', exact: false }).click();
  await expect(page.getByLabel('Choose practice video')).toBeDisabled();
  await expect(page.locator('video')).toHaveCount(0);
});
