import { describe, expect, it } from 'vitest';
import { levels } from './data';
import {
  emptyProgress,
  earnedBadges,
  levelComplete,
  levelUnlocked,
  loadProgress,
  reduceProgress,
  xpTotal,
  levelPercent,
} from './progress';
describe('academy progression', () => {
  it('starts with real zero progress and only the rookie level open', () => {
    const p = emptyProgress();
    expect(xpTotal(p)).toBe(0);
    expect(earnedBadges(p)).toEqual([]);
    expect(levelUnlocked(p, 1)).toBe(true);
    expect(levelUnlocked(p, 2)).toBe(false);
    expect(levelPercent(p, 1)).toBe(0);
  });
  it('requires every lesson, a passing quiz, and a practice mission to unlock', () => {
    let p = emptyProgress();
    for (const l of levels[0].lessons) p = reduceProgress(p, { type: 'lesson', id: l.id });
    p = reduceProgress(p, { type: 'quiz', id: 1, score: 30 });
    p = reduceProgress(p, { type: 'challenge', id: 0, count: 3, assisted: true });
    expect(levelUnlocked(p, 2)).toBe(false);
    p = reduceProgress(p, { type: 'quiz', id: 1, score: 40 });
    expect(levelComplete(p, 1)).toBe(true);
    expect(levelUnlocked(p, 2)).toBe(true);
    expect(levelPercent(p, 1)).toBe(100);
    expect(levelUnlocked(p, 3)).toBe(false);
  });
  it('does not reward repeats or replace a better quiz score with a worse one', () => {
    let p = reduceProgress(emptyProgress(), { type: 'lesson', id: '1-1' });
    p = reduceProgress(p, { type: 'lesson', id: '1-1' });
    p = reduceProgress(p, { type: 'quiz', id: 1, score: 50 });
    p = reduceProgress(p, { type: 'quiz', id: 1, score: 20 });
    p = reduceProgress(p, { type: 'challenge', id: 0, count: 3, assisted: false });
    p = reduceProgress(p, { type: 'challenge', id: 0, count: 3, assisted: true });
    expect(xpTotal(p)).toBe(120);
    expect(p.lessons).toHaveLength(1);
    expect(p.quizzes[1]).toBe(50);
    expect(p.challenges).toEqual([0]);
    expect(p.training[0].assisted).toBe(true);
    expect(earnedBadges(p)).toEqual(['first', 'brain', 'dribble']);
  });
  it('rejects completion in a locked level and invalid quiz scores', () => {
    let p = emptyProgress();
    p = reduceProgress(p, { type: 'lesson', id: '2-1' });
    p = reduceProgress(p, { type: 'quiz', id: 2, score: 50 });
    p = reduceProgress(p, { type: 'quiz', id: 1, score: 999 });
    expect(p).toEqual(emptyProgress());
  });
  it('awards champion only after every level is complete and resets cleanly', () => {
    let p = emptyProgress();
    for (const l of levels) {
      for (const x of l.lessons) p = reduceProgress(p, { type: 'lesson', id: x.id });
      p = reduceProgress(p, { type: 'quiz', id: l.id, score: l.quiz.length * 10 });
      p = reduceProgress(p, { type: 'challenge', id: l.challenge, count: 10, assisted: true });
    }
    expect(earnedBadges(p)).toHaveLength(6);
    expect(earnedBadges(p)).toContain('champion');
    expect(xpTotal(p)).toBe(1000);
    expect(loadProgress(JSON.stringify(p))).toEqual(p);
    expect(reduceProgress(p, { type: 'reset' })).toEqual(emptyProgress());
  });
  it('recovers from corrupted storage and filters invalid records', () => {
    expect(loadProgress('{broken')).toEqual(emptyProgress());
    expect(loadProgress('null')).toEqual(emptyProgress());
    const p = loadProgress(
      JSON.stringify({
        lessons: ['1-1', '1-1', 'bogus'],
        challenges: [0, 0, 100],
        quizzes: { 1: 500, 2: '50', 3: 40 },
        training: { 0: { count: 3, assisted: true } },
      }),
    );
    expect(p.lessons).toEqual(['1-1']);
    expect(p.challenges).toEqual([0]);
    expect(p.quizzes).toEqual({ '3': 40 });
  });
});
describe('curriculum integrity', () => {
  it('contains 20 complete lessons and a 15-question final with valid answers', () => {
    expect(levels.flatMap((l) => l.lessons)).toHaveLength(20);
    expect(levels[4].quiz).toHaveLength(15);
    for (const l of levels)
      for (const q of [...l.quiz, ...l.lessons.map((x) => x.question)]) {
        expect(q.options[q.answer]).toBeTruthy();
        expect(q.explanation.length).toBeGreaterThan(30);
      }
  });
});
