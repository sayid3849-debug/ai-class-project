import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { levels } from './data';
import { practiceQuizzes } from './quizQuestions';
export const STORAGE_KEY = 'skill-learn-progress-v1';
export type Progress = {
  lessons: string[];
  quizzes: Record<string, number>;
  practiceQuizzes?: Record<string, number>;
  challenges: number[];
  training: Record<string, { count: number; assisted: boolean; hits?: number }>;
};
export const emptyProgress = (): Progress => ({
  lessons: [],
  quizzes: {},
  practiceQuizzes: {},
  challenges: [],
  training: {},
});
export function loadProgress(raw: string | null): Progress {
  if (!raw) return emptyProgress();
  try {
    const p = JSON.parse(raw);
    const result = emptyProgress();
    if (p && typeof p === 'object') {
      result.lessons = [
        ...new Set<string>(
          (Array.isArray(p.lessons) ? p.lessons : []).filter(
            (id: unknown) =>
              typeof id === 'string' && levels.some((l) => l.lessons.some((x) => x.id === id)),
          ),
        ),
      ];
      result.challenges = [
        ...new Set<number>(
          (Array.isArray(p.challenges) ? p.challenges : []).filter(
            (id: unknown) => Number.isInteger(id) && Number(id) >= 0 && Number(id) < 5,
          ),
        ),
      ];
      for (const l of levels) {
        const score = p.quizzes?.[l.id];
        if (
          typeof score === 'number' &&
          Number.isInteger(score) &&
          score >= 0 &&
          score <= l.quiz.length * 10 &&
          score % 10 === 0
        )
          result.quizzes[l.id] = score;
      }
      for (const l of levels) {
        const score = p.practiceQuizzes?.[l.id];
        if (
          typeof score === 'number' &&
          Number.isInteger(score) &&
          score >= 0 &&
          score <= practiceQuizzes[l.id].length * 10 &&
          score % 10 === 0
        )
          result.practiceQuizzes![l.id] = score;
      }
      if (p.training && typeof p.training === 'object')
        for (const id of result.challenges) {
          const t = p.training[id];
          if (t && typeof t.count === 'number' && Number.isFinite(t.count))
            result.training[id] = {
              count: Math.max(0, Math.floor(t.count)),
              assisted: t.assisted === true,
              ...(typeof t.hits === 'number' && Number.isFinite(t.hits)
                ? { hits: Math.min(5, Math.max(0, Math.floor(t.hits))) }
                : {}),
            };
        }
    }
    return result;
  } catch {
    return emptyProgress();
  }
}
export function levelComplete(p: Progress, id: number) {
  const l = levels[id - 1];
  return (
    !!l &&
    l.lessons.every((x) => p.lessons.includes(x.id)) &&
    (p.quizzes[id] ?? 0) >= l.quiz.length * 8 &&
    p.challenges.includes(l.challenge)
  );
}
export function levelUnlocked(p: Progress, id: number): boolean {
  return id === 1 || (id > 1 && id <= 5 && levelComplete(p, id - 1) && levelUnlocked(p, id - 1));
}
export function xpTotal(p: Progress) {
  return (
    p.lessons.length * 20 +
    p.challenges.length * 50 +
    Object.values(p.quizzes).reduce((s, n) => s + n, 0)
  );
}
export function earnedBadges(p: Progress): string[] {
  return [
    p.lessons.length > 0 ? 'first' : '',
    levels.some((l) => p.quizzes[l.id] === l.quiz.length * 10) ? 'brain' : '',
    p.challenges.includes(0) ? 'dribble' : '',
    p.lessons.includes('4-4') ? 'team' : '',
    p.challenges.length === 5 ? 'practice' : '',
    levels.every((l) => levelComplete(p, l.id)) ? 'champion' : '',
  ].filter(Boolean);
}
export function levelPercent(p: Progress, id: number) {
  const l = levels[id - 1];
  return Math.round(
    ((l.lessons.filter((x) => p.lessons.includes(x.id)).length +
      ((p.quizzes[id] ?? 0) >= l.quiz.length * 8 ? 1 : 0) +
      (p.challenges.includes(l.challenge) ? 1 : 0)) /
      6) *
      100,
  );
}
export type Action =
  | { type: 'lesson'; id: string }
  | { type: 'quiz'; id: number; score: number }
  | { type: 'practiceQuiz'; id: number; score: number }
  | { type: 'challenge'; id: number; count: number; assisted: boolean; hits?: number }
  | { type: 'reset' };
export function reduceProgress(p: Progress, a: Action): Progress {
  if (a.type === 'reset') return emptyProgress();
  if (a.type === 'lesson') {
    const l = levels.find((l) => l.lessons.some((x) => x.id === a.id));
    return !l || !levelUnlocked(p, l.id) || p.lessons.includes(a.id)
      ? p
      : { ...p, lessons: [...p.lessons, a.id] };
  }
  if (a.type === 'practiceQuiz') {
    const bank = practiceQuizzes[a.id];
    if (
      !bank ||
      !levelUnlocked(p, a.id) ||
      !Number.isInteger(a.score) ||
      a.score < 0 ||
      a.score > bank.length * 10 ||
      a.score % 10 !== 0
    )
      return p;
    return {
      ...p,
      practiceQuizzes: {
        ...p.practiceQuizzes,
        [a.id]: Math.max(p.practiceQuizzes?.[a.id] ?? 0, a.score),
      },
    };
  }
  if (a.type === 'quiz') {
    const l = levels[a.id - 1];
    return !l ||
      !levelUnlocked(p, a.id) ||
      !Number.isInteger(a.score) ||
      a.score < 0 ||
      a.score > l.quiz.length * 10 ||
      a.score % 10 !== 0
      ? p
      : { ...p, quizzes: { ...p.quizzes, [a.id]: Math.max(p.quizzes[a.id] ?? 0, a.score) } };
  }
  if (a.type === 'challenge')
    return a.id < 0 || a.id > 4
      ? p
      : {
          ...p,
          challenges: [...new Set([...p.challenges, a.id])],
          training: {
            ...p.training,
            [a.id]: {
              count: a.count,
              assisted: a.assisted,
              ...(a.hits === undefined ? {} : { hits: a.hits }),
            },
          },
        };
  return p;
}
const Context = createContext<{
  progress: Progress;
  act: (a: Action) => void;
  notice: string;
  storageError: boolean;
}>({ progress: emptyProgress(), act: () => {}, notice: '', storageError: false });
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [storageError, setStorageError] = useState(false);
  const [progress, setProgress] = useState(() => {
    try {
      return loadProgress(localStorage.getItem(STORAGE_KEY));
    } catch {
      return emptyProgress();
    }
  });
  const [notice, setNotice] = useState('');
  const previousBadges = useRef(earnedBadges(progress));
  useEffect(() => {
    const earned = earnedBadges(progress);
    const newBadges = earned.filter((id) => !previousBadges.current.includes(id));
    previousBadges.current = earned;
    if (!newBadges.length) return;
    const names: Record<string, string> = {
      first: 'First Goal',
      brain: 'Soccer Brain',
      dribble: 'Dribbling Star',
      team: 'Team Player',
      practice: 'Practice Pro',
      champion: 'Soccer Champion',
    };
    setNotice(`Achievement unlocked: ${newBadges.map((id) => names[id]).join(', ')}!`);
  }, [progress]);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [progress]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 5000);
    return () => clearTimeout(timer);
  }, [notice]);
  function act(a: Action) {
    if (a.type === 'reset') setNotice('');
    setProgress((p) => reduceProgress(p, a));
  }
  return (
    <Context.Provider value={{ progress, act, notice, storageError }}>{children}</Context.Provider>
  );
}
export const useProgress = () => useContext(Context);
