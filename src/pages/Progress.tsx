import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Trophy,
  Zap,
  Target,
  Printer,
  Check,
  Medal,
  ShieldCheck,
} from 'lucide-react';
import { useProgress, earnedBadges, levelComplete, levelPercent, xpTotal } from '../progress';
import { badges, levels } from '../data';
import { Badge, ButtonLink, Eyebrow, PageIntro, CountUp } from '../components/UI';
export function Progress() {
  const { progress } = useProgress();
  const earned = earnedBadges(progress);
  const current = levels.find((l) => !levelComplete(progress, l.id)) ?? levels[4];
  const completed = levels.filter((l) => levelComplete(progress, l.id)).length;
  const scores = levels
    .filter((l) => progress.quizzes[l.id] !== undefined)
    .map((l) => Math.round((progress.quizzes[l.id] / (l.quiz.length * 10)) * 100));
  const average = scores.length
    ? Math.round(scores.reduce((s, n) => s + n, 0) / scores.length)
    : null;
  const overall = Math.round(levels.reduce((s, l) => s + levelPercent(progress, l.id), 0) / 5);
  return (
    <div className="shell page">
      <PageIntro
        eyebrow="MY PROGRESS / EVERY STEP COUNTS"
        title={
          <>
            My soccer
            <br />
            <span className="serif">journey.</span>
          </>
        }
      >
        Your effort. Your achievements. Your own kind of awesome.
      </PageIntro>
      <div className="player-banner">
        <div className="player-avatar">
          <span>S</span>
          <StarIcon />
        </div>
        <div>
          <Eyebrow>YOUR PLAYER PROFILE · STORED ON THIS DEVICE</Eyebrow>
          <h2>{earned.includes('champion') ? 'Soccer Champion' : 'Future soccer star'}</h2>
          <p>
            Level {current.id} · {current.name}
          </p>
        </div>
        <div className="xp-total">
          <Zap size={25} fill="currentColor" />
          <strong>
            <CountUp value={xpTotal(progress)} />
          </strong>
          <span>TOTAL XP</span>
        </div>
      </div>
      <div className="stats-grid">
        {[
          [BookOpen, `${progress.lessons.length}/20`, 'Lessons learned'],
          [Target, `${progress.challenges.length}/5`, 'Missions complete'],
          [Trophy, `${earned.length}/6`, 'Badges earned'],
          [Medal, average === null ? '—' : `${average}%`, 'Average best quiz score'],
        ].map(([Icon, value, label]) => {
          const I = Icon as typeof BookOpen;
          return (
            <div className="stat-card" key={String(label)}>
              <I size={23} />
              <strong>{String(value)}</strong>
              <span>{String(label)}</span>
            </div>
          );
        })}
      </div>
      <div className="dashboard-grid">
        <section className="journey-dashboard">
          <div className="section-heading compact">
            <div>
              <Eyebrow>YOUR LEARNING LINEUP</Eyebrow>
              <h2>Look at you grow.</h2>
            </div>
            <span>{completed}/5 LEVELS COMPLETE</span>
          </div>
          <div className="progress-chart" aria-label="Progress by academy level">
            {levels.map((l) => (
              <div key={l.id}>
                <div className="chart-bar-area">
                  <span className="chart-value">{levelPercent(progress, l.id)}%</span>
                  <div
                    className="chart-bar"
                    style={{
                      height: `${Math.max(3, levelPercent(progress, l.id))}%`,
                      background: l.color,
                    }}
                  />
                </div>
                <span>0{l.id}</span>
                <small>{l.name}</small>
              </div>
            ))}
          </div>
          <div className="quiz-records">
            <h3>Your personal bests</h3>
            {levels.map((l) => (
              <div key={l.id}>
                <span>{l.name}</span>
                <strong>
                  {progress.quizzes[l.id] === undefined
                    ? 'Not played yet'
                    : `${Math.round((progress.quizzes[l.id] / (l.quiz.length * 10)) * 100)}%`}
                </strong>
              </div>
            ))}
          </div>
        </section>
        <aside className="milestone-card">
          <div
            className="progress-ring"
            role="img"
            aria-label={`${overall}% academy completion`}
            style={{ background: `conic-gradient(#c5eb83 ${overall * 3.6}deg, #345044 0)` }}
          >
            <div>
              <strong>
                {overall}
                <small>%</small>
              </strong>
              <span>ACADEMY COMPLETE</span>
            </div>
          </div>
          <h2>{overall === 100 ? 'You did it, champion!' : 'Your next great moment.'}</h2>
          <p>
            {overall === 100
              ? 'You’ve completed every chapter. Keep practicing and playing with heart.'
              : `${current.name} is your next chapter. Complete its lessons, pass the quiz, and finish the practice mission.`}
          </p>
          <ButtonLink to={`/academy/${current.id}`}>
            {overall === 100 ? 'Revisit the academy' : 'Keep your story going'}
          </ButtonLink>
          <Link className="text-link" to="/training">
            Or head to the training ground <ArrowRight size={15} />
          </Link>
        </aside>
      </div>
      <section className="dashboard-achievements">
        <div className="section-heading compact">
          <div>
            <Eyebrow>YOUR TROPHY CABINET</Eyebrow>
            <h2>Effort looks good on you.</h2>
          </div>
          <Link className="text-link" to="/achievements">
            View all badges <ArrowRight size={16} />
          </Link>
        </div>
        <div className="badge-row">
          {badges.map((b) => (
            <div key={b.id}>
              <Badge icon={b.icon} locked={!earned.includes(b.id)} />
              <h3>{b.name}</h3>
              <small>
                {earned.includes(b.id) ? 'EARNED WITH EFFORT' : 'YOUR NEXT POSSIBILITY'}
              </small>
            </div>
          ))}
        </div>
      </section>
      {earned.includes('champion') && <Certificate />}
      <p className="local-note">
        <ShieldCheck size={16} />
        Your journey is saved in this browser. No account. No public leaderboard. Just your
        progress.
      </p>
    </div>
  );
}
function StarIcon() {
  return <Medal size={25} />;
}
export function Certificate() {
  return (
    <section className="certificate-area">
      <div className="certificate" id="champion-certificate">
        <span className="number-label">SKILL & LEARN / THE NEXT GENERATION ACADEMY</span>
        <Badge icon="trophy" />
        <Eyebrow>CERTIFICATE OF ACHIEVEMENT</Eyebrow>
        <h2>Soccer Champion</h2>
        <p>This certifies that our</p>
        <h3>Future Soccer Star</h3>
        <p>
          has completed all five academy levels, passed every knowledge quiz,
          <br />
          and practiced every skill mission.
        </p>
        <strong>SKILL & LEARN SOCCER CHAMPION</strong>
        <span>LEARN THE GAME. MASTER YOUR SKILLS. BECOME A CHAMPION.</span>
      </div>
      <button className="button secondary" onClick={() => window.print()}>
        <Printer size={17} />
        Print champion certificate
      </button>
    </section>
  );
}
export function Achievements() {
  const { progress } = useProgress();
  const earned = earnedBadges(progress);
  return (
    <div className="shell page">
      <PageIntro
        eyebrow="THE TROPHY CABINET"
        title={
          <>
            Collect moments.
            <br />
            <span className="serif">Earn your stripes.</span>
          </>
        }
        action={
          <span className="achievement-counter">
            <Trophy size={25} />
            <strong>
              {earned.length}
              <span>/6</span>
            </strong>
            BADGES EARNED
          </span>
        }
      >
        Every badge tells a story of effort. Here’s to your next great moment.
      </PageIntro>
      <div className="achievement-grid">
        {badges.map((b) => {
          const unlocked = earned.includes(b.id);
          return (
            <div className={`achievement-card ${unlocked ? 'earned' : ''}`} key={b.id}>
              <span className="number-label">
                {unlocked ? 'EARNED WITH EFFORT' : 'WAITING FOR YOUR MOMENT'}
              </span>
              <Badge icon={b.icon} locked={!unlocked} />
              <h2>{b.name}</h2>
              <p>{b.description}</p>
              {unlocked ? (
                <span className="badge-status">
                  <Check size={15} />
                  In your collection
                </span>
              ) : (
                <Link
                  to={
                    b.id === 'dribble' || b.id === 'practice'
                      ? '/training'
                      : b.id === 'brain'
                        ? '/quizzes'
                        : '/academy'
                  }
                  className="text-link"
                >
                  Start your next step <ArrowRight size={16} />
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <div className="achievements-note">
        <Medal size={29} />
        <p>
          There’s no race to the finish. These rewards celebrate{' '}
          <strong>your learning and your effort.</strong> Every player’s journey is different.
        </p>
      </div>
    </div>
  );
}
export function Parents() {
  const { act } = useProgress();
  const [confirm, setConfirm] = useState(false);
  const [reset, setReset] = useState(false);
  return (
    <div className="shell page parent-page">
      <PageIntro
        eyebrow="A NOTE FROM THE SIDELINES"
        title={
          <>
            For the grown-ups
            <br />
            <span className="serif">behind the dream.</span>
          </>
        }
      >
        A little guidance to help your young player learn, practice,
        <br />
        and enjoy the beautiful game safely.
      </PageIntro>
      <div className="parent-layout">
        <aside className="parent-summary">
          <ShieldCheck size={39} />
          <h2>
            Made for learning.
            <br />
            Built with care.
          </h2>
          <p>
            A school prototype for children ages 6–10. No sign-up, no real names, and no public
            profiles.
          </p>
          <div>
            20 short lessons<span>5 learning levels</span>
            <span>Real-world practice</span>
          </div>
        </aside>
        <div className="parent-content">
          <section>
            <Eyebrow>01 / LEARNING THROUGH PLAY</Eyebrow>
            <h2>A whole game of possibilities.</h2>
            <p>
              The academy teaches soccer basics, positions, dribbling, passing, shooting, ball
              control, rules, and sportsmanship. Standard 11-a-side rules are explained alongside
              reminders that youth match formats and local rules vary.
            </p>
            <p>
              Each level has four lessons, a quiz with an 80% passing score, and a practice mission.
              Completing all three unlocks the next level. Quizzes can be retried as often as
              needed. XP counts completed activities and the best quiz result, so repeating an
              activity doesn’t inflate the score.
            </p>
          </section>
          <section>
            <Eyebrow>02 / TAKING IT TO THE PITCH</Eyebrow>
            <h2>Small practice. Safe spaces.</h2>
            <p>
              Help your player find a clear space away from roads, windows, and other people. Use
              soft markers, suitable shoes, and an age-appropriate ball. Supervise activities, make
              time for water breaks, and stop if anything hurts.
            </p>
            <p>
              Practice completion is self-reported. A grown-up can help record counts; the
              parent-assisted option is a practice note, not an identity check. There is no
              automated verification or camera.
            </p>
          </section>
          <section>
            <Eyebrow>03 / PRIVACY & LOCAL PROGRESS</Eyebrow>
            <h2>Their journey stays here.</h2>
            <p>
              Progress is stored in localStorage in this browser on this device. It is not an online
              account or authenticated parental control. Anyone using the same browser can see or
              reset it. Clearing browser data removes it, and progress does not sync between
              devices.
            </p>
            <p>
              We do not ask for names or contact details. Videos chosen for coaching stay in browser
              memory and are never uploaded or stored. No child profiles or public leaderboards are
              created. There are no analytics trackers in this app. Browser read-aloud uses your
              browser’s speech service, whose voice availability and processing depend on your
              device and browser settings.
            </p>
          </section>
          <section>
            <Eyebrow>04 / HONEST ABOUT AI</Eyebrow>
            <h2>Private video coaching, honest limits.</h2>
            <p>
              The coach can read a short video file on this device. A local MediaPipe AI model
              detects visible body landmarks in sampled frames. Simple coaching rules turn those
              observations and the selected skill into practice suggestions. Video, pose frames, and
              reports are not uploaded, stored in localStorage, or shared. Remove the video or leave
              the coach page to clear it.
            </p>
            <p>
              A parent or guardian should help select a clip and confirm permission from everyone
              shown. This confirmation is not verified parental identity. Choose one player in a
              safe space, with their whole body and feet visible. Clips must last 3–30 seconds and
              be under 25 MB.
            </p>
            <p>
              Pose estimates depend on camera angle and may be wrong. The model does not track the
              ball, score overall technique, diagnose injuries, or measure shooting accuracy. Poor
              footage gets a request to record again rather than invented feedback. The separate
              example mode still shows prewritten sample ratings, clearly labeled as a demo. No real
              videos are used in that example.
            </p>
            <p>
              There is no camera capture or cloud upload endpoint. Any future external video service
              would require a separate consent and privacy system with verified parental consent,
              controlled access, and deletion safeguards.
            </p>
            <ButtonLink to="/coach" secondary>
              Open the video coach
            </ButtonLink>
          </section>
          <section className="reset-panel">
            <Eyebrow>05 / A FRESH START</Eyebrow>
            <h2>Reset this device’s progress.</h2>
            <p>
              This removes all saved lessons, quiz results, practice logs, XP, and badges from this
              browser. It affects the player using this device.
            </p>
            {!confirm ? (
              <button
                className="button danger"
                onClick={() => {
                  setConfirm(true);
                  setReset(false);
                }}
              >
                Reset progress
              </button>
            ) : (
              <div className="reset-confirm">
                <strong>Start over from Level 1? This cannot be undone.</strong>
                <div>
                  <button
                    className="button danger"
                    onClick={() => {
                      act({ type: 'reset' });
                      setConfirm(false);
                      setReset(true);
                    }}
                  >
                    Yes, erase saved progress
                  </button>
                  <button className="button secondary" onClick={() => setConfirm(false)}>
                    Keep my progress
                  </button>
                </div>
              </div>
            )}
            {reset && <p role="status">Progress reset. A fresh adventure starts at Level 1.</p>}
          </section>
        </div>
      </div>
    </div>
  );
}
