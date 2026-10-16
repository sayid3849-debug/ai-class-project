import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  Lock,
  RotateCcw,
  Trophy,
  Zap,
  CircleHelp,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { levels } from '../data';
import { useProgress, levelUnlocked } from '../progress';
import { Badge, ButtonLink, Celebration, Eyebrow, PageIntro, ProgressBar } from '../components/UI';
import { Field } from '../components/Art';
import { Locked, NotFound } from './Academy';
export function Quizzes() {
  const { progress } = useProgress();
  return (
    <div className="shell page">
      <PageIntro
        eyebrow="THE KNOWLEDGE CLUB"
        title={
          <>
            Think fast.
            <br />
            <span className="serif">Play smart.</span>
          </>
        }
      >
        Big soccer brains are built one question at a time.
        <br />
        Try a quiz, learn from every answer, and keep growing.
      </PageIntro>
      <div className="quiz-overview">
        <div className="quiz-rules">
          <span>
            <Zap size={19} />
            10 points per correct answer
          </span>
          <span>
            <Trophy size={19} />
            80% to pass
          </span>
          <span>
            <RotateCcw size={19} />
            Unlimited fresh starts
          </span>
        </div>
        <div className="quiz-list">
          {levels.map((l) => {
            const unlocked = levelUnlocked(progress, l.id);
            const score = progress.quizzes[l.id];
            return (
              <div key={l.id} className={`quiz-select ${!unlocked ? 'muted' : ''}`}>
                <span className="quiz-index">0{l.id}</span>
                <div>
                  <Eyebrow>
                    {l.id === 5 ? 'THE CHAMPION FINAL' : `LEVEL ${l.id} KNOWLEDGE CHECK`}
                  </Eyebrow>
                  <h2>{l.name}</h2>
                  <p>
                    {l.quiz.length} questions ·{' '}
                    {l.id === 5
                      ? 'Everything you’ve learned'
                      : 'A little challenge. A lot of learning.'}
                  </p>
                </div>
                <div className="quiz-select-end">
                  {score !== undefined && (
                    <span>
                      Personal best{' '}
                      <strong>{Math.round((score / (l.quiz.length * 10)) * 100)}%</strong>
                    </span>
                  )}
                  {unlocked ? (
                    <ButtonLink to={`/quiz/${l.id}`} secondary>
                      Let’s play
                    </ButtonLink>
                  ) : (
                    <span className="locked-text">
                      <Lock size={15} />
                      Unlock Level {l.id}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function QuizGame({ levelId }: { levelId: number }) {
  const level = levels[levelId - 1];
  const { progress, act } = useProgress();
  const reduced = useReducedMotion();
  const [questions, setQuestions] = useState(() => shuffle(level.quiz));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [hint, setHint] = useState(false);
  const question = questions[index];
  const correct = selected === question.answer;
  const percent = Math.round((score / (questions.length * 10)) * 100);
  function answer(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === question.answer) setScore((s) => s + 10);
  }
  function next() {
    if (selected === null) return;
    if (index === questions.length - 1) {
      act({ type: 'quiz', id: levelId, score });
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setHint(false);
    }
  }
  function retry() {
    setQuestions(shuffle(level.quiz));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setHint(false);
  }
  return (
    <div className="shell page quiz-page">
      <Link to="/quizzes" className="back-link">
        <ArrowLeft size={16} />
        All quizzes
      </Link>
      {finished ? (
        <div className="quiz-result">
          {percent >= 80 && <Celebration />}
          <Badge icon={percent >= 80 ? 'trophy' : 'brain'} />
          <Eyebrow>
            {percent >= 80 ? 'LOOK AT YOU, SUPERSTAR!' : 'EVERY TRY MAKES YOU STRONGER'}
          </Eyebrow>
          <h1>
            {percent >= 80 ? (
              <>
                Amazing job!
                <br />
                <span className="serif">You scored {percent}%.</span>
              </>
            ) : (
              <>
                Keep going!
                <br />
                <span className="serif">You scored {percent}%.</span>
              </>
            )}
          </h1>
          <p>
            {percent >= 80
              ? 'You passed! Take that confidence back to the pitch.'
              : 'You’re learning with every answer. Review the lessons and give it another go.'}
          </p>
          <div className="result-stats">
            <span>
              <strong>
                {score / 10}
                <small>/{questions.length}</small>
              </strong>
              Correct answers
            </span>
            <span>
              <strong>{score}</strong>Points this round
            </span>
            <span>
              <strong>
                {Math.round(((progress.quizzes[levelId] ?? 0) / (questions.length * 10)) * 100)}%
              </strong>
              Personal best
            </span>
          </div>
          <p className="small-note">
            Your best quiz score counts toward total XP. Repeats don’t add duplicate points.
          </p>
          <div className="result-actions">
            <button className="button secondary" onClick={retry}>
              <RotateCcw size={16} />
              Try again
            </button>
            <ButtonLink to={`/academy/${levelId}`}>
              {percent >= 80 ? 'Continue your journey' : 'Review lessons'}
            </ButtonLink>
          </div>
        </div>
      ) : (
        <>
          <div className="quiz-heading">
            <div>
              <Eyebrow>
                LEVEL 0{levelId} / {level.name.toUpperCase()}
              </Eyebrow>
              <h1>{levelId === 5 ? 'The champion final.' : 'Your next little challenge.'}</h1>
            </div>
            <div className="quiz-live-score">
              <Zap size={19} fill="currentColor" />
              <strong>{score}</strong>
              <span>POINTS</span>
            </div>
          </div>
          <ProgressBar
            value={Math.round((index / questions.length) * 100)}
            label={`Question ${index + 1} of ${questions.length}`}
          />
          <div className="quiz-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduced ? false : { opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? {} : { opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
              >
                <div className="question-meta">
                  <span>QUESTION {String(index + 1).padStart(2, '0')}</span>
                  <button
                    className="hint-button"
                    onClick={() => setHint(!hint)}
                    aria-expanded={hint}
                  >
                    <Lightbulb size={16} />
                    Need a hint?
                  </button>
                </div>
                {hint && (
                  <p className="hint-box" role="status">
                    Think back to your {level.name} lessons.{' '}
                    {question.hint ??
                      (levelId === 1
                        ? 'Picture a full-size soccer match. Youth games can have different rules.'
                        : levelId === 2
                          ? 'Think about how each role helps the team.'
                          : levelId === 3
                            ? 'Choose control and balance before speed or power.'
                            : 'Think about the boundary lines, fair play, and how a team works together.')}
                  </p>
                )}
                <h2>{question.prompt}</h2>
                {question.visual && (
                  <div className="quiz-visual">
                    <Field positions={levelId !== 1} />
                  </div>
                )}
                <div className="quiz-answers">
                  {question.options.map((o, i) => (
                    <button
                      key={o}
                      disabled={selected !== null}
                      onClick={() => answer(i)}
                      className={`answer-option ${selected !== null ? (i === question.answer ? 'correct' : i === selected ? 'incorrect' : 'dim') : ''}`}
                    >
                      <span>{String.fromCharCode(65 + i)}</span>
                      {o}
                      {selected !== null && i === question.answer && <Check size={21} />}
                    </button>
                  ))}
                </div>
                {selected !== null && (
                  <div className={`answer-feedback ${correct ? 'success' : ''}`} role="status">
                    <strong>
                      {correct
                        ? 'Great thinking! +10 points'
                        : 'Nice try. Here’s something to remember.'}
                    </strong>
                    <p>{question.explanation}</p>
                  </div>
                )}
                <div className="question-bottom">
                  <span>
                    <CircleHelp size={14} />
                    Mistakes help your brain grow.
                  </span>
                  <button className="button" disabled={selected === null} onClick={next}>
                    {index === questions.length - 1 ? 'See my results' : 'Next question'}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
export function QuizPage() {
  const { levelId } = useParams();
  const l = levels.find((l) => l.id === Number(levelId));
  const { progress } = useProgress();
  if (!l) return <NotFound />;
  if (!levelUnlocked(progress, l.id)) return <Locked id={l.id} />;
  return <QuizGame key={l.id} levelId={l.id} />;
}
