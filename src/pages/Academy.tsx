import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  BookOpen,
  CircleHelp,
  Footprints,
  Volume2,
  CheckCircle2,
  Grip,
  Flag,
} from 'lucide-react';
import { levels, type Lesson } from '../data';
import { useProgress, levelUnlocked, levelComplete, levelPercent } from '../progress';
import {
  Badge,
  ButtonLink,
  CheckRow,
  Eyebrow,
  PageIntro,
  ProgressBar,
  Reveal,
  Celebration,
} from '../components/UI';
import { Field, SkillArt } from '../components/Art';
export function Academy() {
  const { progress } = useProgress();
  return (
    <div className="shell page">
      <PageIntro
        eyebrow="THE ACADEMY / YOUR ROAD TO GREATNESS"
        title={
          <>
            Little steps.
            <br />
            <span className="serif">Legendary potential.</span>
          </>
        }
      >
        Your soccer adventure, one level at a time. Learn, put it into practice,
        <br className="desktop-break" /> and unlock your next chapter. You set the pace.
      </PageIntro>
      <div className="academy-layout">
        <div className="journey-map">
          {levels.map((l, i) => {
            const unlocked = levelUnlocked(progress, l.id),
              complete = levelComplete(progress, l.id);
            return (
              <Reveal key={l.id} className={`journey-node ${unlocked ? 'unlocked' : ''}`}>
                <div className="journey-marker">
                  <Badge
                    icon={['star', 'zap', 'target', 'brain', 'trophy'][i]}
                    locked={!unlocked}
                  />
                  <span>0{l.id}</span>
                </div>
                <div className="journey-details">
                  <span className="number-label">
                    LEVEL 0{l.id} / {l.theme}
                  </span>
                  <h2>{l.name}</h2>
                  <p>{l.description}</p>
                  <div className="node-meta">
                    <span>
                      <BookOpen size={14} />4 lessons
                    </span>
                    <span>
                      <CircleHelp size={14} />
                      {l.quiz.length} questions
                    </span>
                    <span>
                      <Footprints size={14} />1 mission
                    </span>
                  </div>
                  {unlocked ? (
                    <>
                      <ProgressBar value={levelPercent(progress, l.id)} />
                      <ButtonLink to={`/academy/${l.id}`} secondary>
                        {complete
                          ? 'Revisit level'
                          : levelPercent(progress, l.id) > 0
                            ? 'Continue learning'
                            : 'Let’s begin'}
                      </ButtonLink>
                    </>
                  ) : (
                    <span className="locked-text">
                      <Lock size={14} />
                      Complete Level {l.id - 1} to unlock
                    </span>
                  )}
                </div>
                {complete && (
                  <span className="completed-ribbon">
                    <Check size={14} /> COMPLETE
                  </span>
                )}
              </Reveal>
            );
          })}
        </div>
        <aside className="academy-aside">
          <div className="aside-card">
            <Flag size={30} />
            <Eyebrow>YOUR GAME PLAN</Eyebrow>
            <h3>
              Small steps.
              <br />
              Big wins.
            </h3>
            <ol>
              <li>
                <span>1</span>Explore all four lessons.
              </li>
              <li>
                <span>2</span>Score 80% on the level quiz.
              </li>
              <li>
                <span>3</span>Complete your practice mission.
              </li>
              <li>
                <span>4</span>Unlock your next adventure!
              </li>
            </ol>
            <Link to="/parents">
              A note for grown-ups <ArrowRight size={15} />
            </Link>
          </div>
          <div className="quote-card">
            <span>“</span>
            <p>You don’t have to be great to start. You have to start to get better.</p>
            <small>YOUR DAILY DOSE OF BELIEF</small>
          </div>
        </aside>
      </div>
    </div>
  );
}
export function Locked({ id = 1 }: { id?: number }) {
  return (
    <div className="shell page center-state">
      <Badge locked />
      <Eyebrow>ONE STEP AT A TIME</Eyebrow>
      <h1>Your next adventure awaits.</h1>
      <p>Complete Level {Math.max(1, id - 1)} to unlock this chapter. You’ve got this!</p>
      <ButtonLink to="/academy">Back to the academy</ButtonLink>
    </div>
  );
}
export function LevelPage() {
  const { levelId } = useParams();
  const level = levels.find((l) => l.id === Number(levelId));
  const { progress } = useProgress();
  if (!level) return <NotFound />;
  if (!levelUnlocked(progress, level.id)) return <Locked id={level.id} />;
  const done = levelComplete(progress, level.id);
  return (
    <div className="shell page">
      <Link className="back-link" to="/academy">
        <ArrowLeft size={16} />
        The academy
      </Link>
      <div className="level-hero" style={{ '--level-color': level.color } as React.CSSProperties}>
        <div>
          <Eyebrow>
            LEVEL 0{level.id} / {level.theme}
          </Eyebrow>
          <h1>
            {level.name}
            <span className="serif">
              {
                [
                  'Your first chapter.',
                  'Find your place.',
                  'Make your move.',
                  'Think like a player.',
                  'This is your moment.',
                ][level.id - 1]
              }
            </span>
          </h1>
          <p>{level.description}</p>
          <ProgressBar value={levelPercent(progress, level.id)} label="Your progress" />
        </div>
        <Badge icon={level.id === 5 ? 'trophy' : 'star'} />
      </div>
      <div className="level-content">
        <section>
          <div className="section-heading compact">
            <h2>Your learning lineup</h2>
            <span>4 SHORT LESSONS</span>
          </div>
          <div className="lesson-list">
            {level.lessons.map((l, i) => (
              <Link to={`/academy/${level.id}/lesson/${l.id}`} key={l.id} className="lesson-item">
                <span className={`lesson-number ${progress.lessons.includes(l.id) ? 'done' : ''}`}>
                  {progress.lessons.includes(l.id) ? (
                    <Check size={20} />
                  ) : (
                    String(i + 1).padStart(2, '0')
                  )}
                </span>
                <div>
                  <small>{l.kicker}</small>
                  <h3>{l.title}</h3>
                  <p>{l.matching ? 'Interactive position lab' : 'Learn & explore'} · 3 min</p>
                </div>
                <ArrowUpRightIcon />
              </Link>
            ))}
          </div>
        </section>
        <aside>
          <div className="level-checklist">
            <Eyebrow>YOUR FINISH LINE</Eyebrow>
            <h3>Ready to level up?</h3>
            <CheckRow done={level.lessons.every((x) => progress.lessons.includes(x.id))}>
              Complete all 4 lessons
            </CheckRow>
            <CheckRow done={(progress.quizzes[level.id] ?? 0) >= level.quiz.length * 8}>
              Pass the quiz with 80%
            </CheckRow>
            <CheckRow done={progress.challenges.includes(level.challenge)}>
              Finish your practice mission
            </CheckRow>
            <ButtonLink to={`/quiz/${level.id}`}>Take the level quiz</ButtonLink>
            <Link to={`/training/${level.challenge}`} className="text-link">
              Go to your practice mission <ArrowRight size={15} />
            </Link>
          </div>
        </aside>
      </div>
      {done && (
        <div className="level-celebration">
          <Celebration />
          <Badge icon="trophy" />
          <div>
            <Eyebrow>CHAPTER COMPLETE</Eyebrow>
            <h2>{level.id === 5 ? 'You’re a Soccer Champion!' : 'Look at you go, superstar!'}</h2>
            <p>
              {level.id === 5
                ? 'You’ve completed the whole academy. Your champion certificate is waiting.'
                : `${levels[level.id].name} is now unlocked. Your journey is just getting started.`}
            </p>
          </div>
          <ButtonLink to={level.id === 5 ? '/progress' : `/academy/${level.id + 1}`}>
            {level.id === 5 ? 'See my certificate' : 'Next adventure'}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight className="lesson-arrow" size={21} />;
}
export function Matching({ onComplete }: { onComplete?: () => void }) {
  const roles = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
  const [selected, setSelected] = useState('Goalkeeper');
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [message, setMessage] = useState(
    'Choose a role, then tap its zone. You can also drag a role.',
  );
  function place(zone: string, role: string) {
    if (role === zone) {
      const next = { ...placed, [zone]: role };
      setPlaced(next);
      setMessage(`Nice! ${role} is in the right zone.`);
      if (Object.keys(next).length === 4) {
        setMessage('Perfect lineup! Everyone is ready to play.');
        onComplete?.();
      }
    } else setMessage(`Try again. Think about where a ${role.toLowerCase()} helps the team.`);
  }
  return (
    <div className="matching">
      <div className="matching-roles">
        {roles.map((r) => (
          <button
            key={r}
            draggable={!placed[r]}
            onDragStart={(e) => e.dataTransfer.setData('text/plain', r)}
            onClick={() => setSelected(r)}
            disabled={!!placed[r]}
            className={selected === r ? 'selected' : ''}
            aria-pressed={selected === r}
          >
            <Grip size={14} />
            {r}
            {placed[r] && <Check size={15} />}
          </button>
        ))}
      </div>
      <div className="matching-pitch">
        <span>OPPONENT’S GOAL · ATTACK ↑</span>
        {[...roles].reverse().map((r, i) => (
          <button
            className={`match-zone ${placed[r] ? 'matched' : ''}`}
            key={r}
            aria-label={`Place role in zone ${i + 1}`}
            onClick={() => place(r, selected)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const role = e.dataTransfer.getData('text/plain');
              if (roles.includes(role)) place(r, role);
            }}
          >
            {placed[r] ? (
              <>
                <Check size={16} />
                {r}
              </>
            ) : (
              <>
                Zone {i + 1}
                <small>
                  {
                    [
                      'Closest to their goal',
                      'Middle of the pitch',
                      'Protecting our half',
                      'Closest to our goal',
                    ][i]
                  }
                </small>
              </>
            )}
          </button>
        ))}
        <span>YOUR GOAL</span>
      </div>
      <p className="activity-feedback" role="status">
        {message}
      </p>
    </div>
  );
}
function LessonBody({ lesson, levelId }: { lesson: Lesson; levelId: number }) {
  const { progress, act } = useProgress();
  const [answer, setAnswer] = useState<number | null>(null);
  const [matched, setMatched] = useState(!lesson.matching);
  const [speechMessage, setSpeechMessage] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const correct = answer === lesson.question.answer;
  const complete = progress.lessons.includes(lesson.id);
  const level = levels[levelId - 1];
  const idx = level.lessons.findIndex((x) => x.id === lesson.id);
  useEffect(
    () => () => {
      window.speechSynthesis?.cancel();
    },
    [],
  );
  function speak() {
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
      setSpeechMessage(
        'Read-aloud is not supported by this browser. You can read the lesson below.',
      );
      return;
    }
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(
      `${lesson.title}. ${lesson.text} ${lesson.tips.join('. ')}`,
    );
    u.rate = 0.85;
    u.onend = () => setSpeaking(false);
    u.onerror = () => {
      setSpeaking(false);
      setSpeechMessage('Audio could not play. Please read the lesson below.');
    };
    setSpeaking(true);
    speechSynthesis.speak(u);
  }
  return (
    <div className="shell page">
      <Link to={`/academy/${levelId}`} className="back-link">
        <ArrowLeft size={16} />
        {level.name}
      </Link>
      <div className="lesson-layout">
        <article>
          <Eyebrow>
            LESSON {idx + 1} OF 4 / {lesson.kicker}
          </Eyebrow>
          <h1>{lesson.title}</h1>
          <button className="read-aloud" onClick={speak}>
            <Volume2 size={16} />
            {speaking ? 'Stop reading' : 'Read it to me'}
          </button>
          {speechMessage && <p role="status">{speechMessage}</p>}
          <p className="lesson-lead">{lesson.text}</p>
          <div className="lesson-tips">
            {lesson.tips.map((t, i) => (
              <div key={t}>
                <span>0{i + 1}</span>
                <p>{t}</p>
              </div>
            ))}
          </div>
          <div className="knowledge-check">
            <Eyebrow>YOUR TURN</Eyebrow>
            <h2>{lesson.question.prompt}</h2>
            {lesson.question.options.map((o, i) => (
              <button
                key={o}
                onClick={() => setAnswer(i)}
                className={`answer-option ${answer === i ? (correct ? 'correct' : 'incorrect') : ''}`}
                aria-pressed={answer === i}
              >
                <span>{String.fromCharCode(65 + i)}</span>
                {o}
                {answer === i && correct && <Check size={19} />}
              </button>
            ))}
            {answer !== null && (
              <div className={`answer-feedback ${correct ? 'success' : ''}`} role="status">
                <strong>{correct ? 'You’ve got it!' : 'A good try. Have another go!'}</strong>
                <p>{lesson.question.explanation}</p>
              </div>
            )}
            {lesson.matching && !matched && (
              <p className="small-note">
                Complete the position lab too, then you can finish this lesson.
              </p>
            )}
            <button
              className="button"
              disabled={!complete && (!correct || !matched)}
              onClick={() => act({ type: 'lesson', id: lesson.id })}
            >
              {complete ? (
                <>
                  <CheckCircle2 size={18} />
                  Lesson complete
                </>
              ) : (
                <>
                  Complete lesson <span>+20 XP</span>
                </>
              )}
            </button>
          </div>
          {complete && (
            <div className="lesson-next">
              <span>Another small step. Another big win.</span>
              <ButtonLink
                to={
                  idx < 3
                    ? `/academy/${levelId}/lesson/${level.lessons[idx + 1].id}`
                    : `/quiz/${levelId}`
                }
              >
                {idx < 3 ? 'Next lesson' : 'Take the level quiz'}
              </ButtonLink>
            </div>
          )}
        </article>
        <aside className="lesson-visual">
          {lesson.matching ? (
            <>
              <span className="number-label">POSITION LAB / BUILD YOUR TEAM</span>
              <Matching onComplete={() => setMatched(true)} />
            </>
          ) : lesson.diagram === 'field' || lesson.diagram === 'positions' ? (
            <>
              <span className="number-label">EXPLORE / TAP THE MARKERS</span>
              <Field positions={lesson.diagram === 'positions'} />
            </>
          ) : (
            <>
              <SkillArt kind={lesson.diagram} animated />
              <div className="visual-note">
                <strong>See it. Try it. Make it yours.</strong>
                <p>An illustrated movement guide. Practice gently with an adult in a safe space.</p>
              </div>
            </>
          )}
          <div className="lesson-sidebar-nav">
            {level.lessons.map((l, i) => (
              <Link
                key={l.id}
                to={`/academy/${levelId}/lesson/${l.id}`}
                className={l.id === lesson.id ? 'active' : ''}
              >
                <span>{progress.lessons.includes(l.id) ? <Check size={14} /> : i + 1}</span>
                {l.title}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
export function LessonPage() {
  const { levelId, lessonId } = useParams();
  const l = levels.find((l) => l.id === Number(levelId));
  const lesson = l?.lessons.find((x) => x.id === lessonId);
  const { progress } = useProgress();
  if (!l || !lesson) return <NotFound />;
  if (!levelUnlocked(progress, l.id)) return <Locked id={l.id} />;
  return <LessonBody key={lesson.id} lesson={lesson} levelId={l.id} />;
}
export function NotFound() {
  return (
    <div className="shell page center-state">
      <Flag size={50} />
      <Eyebrow>LET’S GET YOU BACK ON THE PITCH</Eyebrow>
      <h1>This page is out of bounds.</h1>
      <p>Your next adventure is still waiting in the academy.</p>
      <ButtonLink to="/">Return home</ButtonLink>
    </div>
  );
}
