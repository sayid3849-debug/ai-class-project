import { describe, it, expect } from 'vitest';
import { levels } from './data';
import { academyQuizzes, practiceQuizzes } from './quizQuestions';
import { emptyProgress, reduceProgress, levelUnlocked, xpTotal, loadProgress } from './progress';
describe('separate quiz experiences', () => {
  it('never repeats a lesson prompt in an academy or practice quiz, or between quiz banks', () => {
    const lessons = new Set(levels.flatMap((l) => l.lessons.map((x) => x.question.prompt)));
    const all = [...Object.values(academyQuizzes).flat(), ...Object.values(practiceQuizzes).flat()];
    expect(new Set(all.map((q) => q.prompt)).size).toBe(70);
    for (const q of all) {
      expect(lessons.has(q.prompt)).toBe(false);
      expect(q.options[q.answer]).toBeTruthy();
      expect(q.explanation.length).toBeGreaterThan(30);
    }
  });
  it('keeps practice scores separate from academy XP, level unlocking, and exam results', () => {
    let p = emptyProgress();
    p = reduceProgress(p, { type: 'practiceQuiz', id: 1, score: 50 });
    expect(p.practiceQuizzes?.[1]).toBe(50);
    expect(p.quizzes[1]).toBeUndefined();
    expect(xpTotal(p)).toBe(0);
    expect(levelUnlocked(p, 2)).toBe(false);
    p = reduceProgress(p, { type: 'practiceQuiz', id: 1, score: 20 });
    expect(p.practiceQuizzes?.[1]).toBe(50);
    expect(loadProgress(JSON.stringify(p))).toEqual(p);
  });
  it('preserves older saved progress and filters invalid practice scores', () => {
    const p = loadProgress(
      JSON.stringify({
        lessons: ['1-1'],
        quizzes: { 1: 40 },
        challenges: [0],
        training: {},
        practiceQuizzes: { 1: 90, 2: '50' },
      }),
    );
    expect(p.lessons).toEqual(['1-1']);
    expect(p.quizzes[1]).toBe(40);
    expect(p.practiceQuizzes).toEqual({});
  });
});
