import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Footprints,
  ShieldCheck,
  Target,
  Zap,
} from 'lucide-react';
import { challenges } from '../data';
import { useProgress } from '../progress';
import { Celebration, Eyebrow, PageIntro } from '../components/UI';
import { SkillArt } from '../components/Art';
import { NotFound } from './Academy';
export function Training() {
  const { progress } = useProgress();
  return (
    <div className="shell page">
      <PageIntro
        eyebrow="THE TRAINING GROUND"
        title={
          <>
            Less scrolling.
            <br />
            <span className="serif">More scoring.</span>
          </>
        }
      >
        Take your learning onto the pitch. Five real-world missions
        <br />
        to build your skills, your confidence, and your love of the game.
      </PageIntro>
      <div className="safety-banner">
        <ShieldCheck size={23} />
        <p>
          <strong>Great practice starts with staying safe.</strong> Find a clear space, wear
          suitable shoes, and ask a grown-up to help. Take water breaks.
        </p>
      </div>
      <div className="training-grid">
        {challenges.map((c, i) => (
          <Link className={`training-card training-${i}`} to={`/training/${i}`} key={c.title}>
            <div className="training-card-top">
              <span className="number-label">MISSION 0{i + 1}</span>
              {progress.challenges.includes(i) ? (
                <span className="completed-tag">
                  <Check size={13} />
                  COMPLETE
                </span>
              ) : (
                <span className="reward">
                  <Zap size={13} />
                  50 XP
                </span>
              )}
            </div>
            <SkillArt kind={c.diagram} />
            <div className="training-card-content">
              <span className="pill">{c.difficulty}</span>
              <h2>{c.title}</h2>
              <p>{c.skill}</p>
              <div>
                <span>
                  <Clock3 size={15} />
                  {c.time}
                </span>
                <span>
                  Start your mission <ArrowRight size={17} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
function Mission({ id }: { id: number }) {
  const c = challenges[id];
  const { progress, act } = useProgress();
  const [count, setCount] = useState(progress.training[id]?.count ?? 0);
  const [assisted, setAssisted] = useState(progress.training[id]?.assisted ?? false);
  const [hits, setHits] = useState(progress.training[id]?.hits ?? 0);
  const [safe, setSafe] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const done = progress.challenges.includes(id);
  return (
    <div className="shell page">
      <Link className="back-link" to="/training">
        <ArrowLeft size={16} />
        All training missions
      </Link>
      <div className="mission-layout">
        <div>
          <Eyebrow>MISSION 0{id + 1} / THE TRAINING GROUND</Eyebrow>
          <h1>{c.title}</h1>
          <p className="lesson-lead">
            {c.skill}. One small practice session, one step closer to your best.
          </p>
          <div className="mission-meta">
            <span>
              <Clock3 size={17} />
              {c.time}
            </span>
            <span>
              <Footprints size={17} />
              {c.difficulty}
            </span>
            <span>
              <Zap size={17} />
              50 XP reward
            </span>
          </div>
          <div className="mission-steps">
            {c.steps.map((s, i) => (
              <div key={s}>
                <span>0{i + 1}</span>
                <p>{s}</p>
              </div>
            ))}
          </div>
          <div className="coach-tip">
            <Target size={23} />
            <div>
              <strong>A little tip from the sideline</strong>
              <p>{c.tip}</p>
            </div>
          </div>
        </div>
        <aside>
          <div className="mission-illustration">
            <SkillArt kind={c.diagram} animated />
          </div>
          <div className="mission-recorder">
            <Eyebrow>YOUR PRACTICE LOG</Eyebrow>
            <h2>{done ? 'A mission well played.' : 'Ready, steady, practice.'}</h2>
            <label className="field-label" htmlFor="practice-count">
              {c.unit[0].toUpperCase() + c.unit.slice(1)} completed
            </label>
            <div className="stepper">
              <button
                aria-label="Decrease practice count"
                onClick={() => setCount((n) => Math.max(0, n - 1))}
              >
                −
              </button>
              <input
                id="practice-count"
                type="number"
                min={0}
                max={c.goal}
                value={count}
                onChange={(e) =>
                  setCount(Math.max(0, Math.min(c.goal, Number(e.target.value) || 0)))
                }
              />
              <span>/ {c.goal}</span>
              <button
                aria-label="Increase practice count"
                onClick={() => setCount((n) => Math.min(c.goal, n + 1))}
              >
                +
              </button>
            </div>
            {id === 2 && (
              <label className="hits-label">
                How many shots reached your target?
                <select value={hits} onChange={(e) => setHits(Number(e.target.value))}>
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
            )}
            <label className="checkbox">
              <input
                type="checkbox"
                checked={assisted}
                onChange={(e) => setAssisted(e.target.checked)}
              />
              <span>A grown-up helped me complete this.</span>
            </label>
            <label className="checkbox">
              <input type="checkbox" checked={safe} onChange={(e) => setSafe(e.target.checked)} />
              <span>I practiced in a safe space with an adult nearby.</span>
            </label>
            <button
              className="button"
              disabled={count < c.goal || !safe}
              onClick={() => {
                act({ type: 'challenge', id, count, assisted, hits: id === 2 ? hits : undefined });
                setCelebrate(true);
              }}
            >
              {done ? (
                <>
                  <Check size={18} />
                  Save practice log
                </>
              ) : (
                <>
                  Complete mission <span>+50 XP</span>
                </>
              )}
            </button>
            <small className="small-note">
              Self-reported practice. A grown-up can help record it. There’s no camera or automatic
              skill measurement.
            </small>
            {celebrate && (
              <div className="mission-success" role="status">
                <Celebration />
                <strong>Great effort! Mission complete.</strong>
                <p>Your practice has been saved. Every touch helps you grow.</p>
                <Link to="/academy" className="text-link">
                  Back to your journey <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
export function MissionPage() {
  const { missionId } = useParams();
  const id = Number(missionId);
  if (!Number.isInteger(id) || id < 0 || id >= challenges.length) return <NotFound />;
  return <Mission key={id} id={id} />;
}
