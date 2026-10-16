import { useState } from 'react';
import {
  ScanLine,
  Play,
  Pause,
  ShieldCheck,
  ArrowRight,
  Check,
  Target,
  Footprints,
  MoveUpRight,
  RotateCcw,
  Info,
} from 'lucide-react';
import { coachReports } from '../data';
import { coachingDemo, type CoachSkill } from '../coach';
import { ButtonLink, Eyebrow, ProgressBar } from '../components/UI';
import { SkillArt } from '../components/Art';
export default function Coach() {
  const [skill, setSkill] = useState<CoachSkill>('Dribbling');
  const [playing, setPlaying] = useState(true);
  const [report, setReport] = useState(false);
  const example = coachingDemo.getExample(skill);
  const icons = [Footprints, MoveUpRight, Target, RotateCcw];
  return (
    <div className="coach-page">
      <div className="shell">
        <div className="coach-heading">
          <div>
            <Eyebrow light>THE FUTURE OF YOUR GAME</Eyebrow>
            <h1>
              Meet your
              <br />
              <span className="serif">AI Soccer Coach.</span>
            </h1>
            <p>
              A closer look at the little things that make a big difference.
              <br />
              Explore a vision of smart soccer coaching.
            </p>
          </div>
          <span className="demo-label">
            <span /> DEMO MODE<small>ILLUSTRATIONS & EXAMPLE FEEDBACK</small>
          </span>
        </div>
        <div className="demo-notice">
          <Info size={20} />
          <p>
            <strong>This is an interactive demonstration.</strong> The movement is illustrated and
            the report is prewritten. Scores are examples, not measurements of you or a real player.
            No AI video analysis is running.
          </p>
        </div>
        <div className="coach-skill-picker">
          {(Object.keys(coachReports) as CoachSkill[]).map((s, i) => {
            const Icon = icons[i];
            return (
              <button
                onClick={() => {
                  setSkill(s);
                  setReport(false);
                }}
                className={skill === s ? 'active' : ''}
                aria-pressed={skill === s}
                key={s}
              >
                <span>0{i + 1}</span>
                <Icon size={24} />
                <strong>{s}</strong>
                {skill === s && <Check size={16} />}
              </button>
            );
          })}
        </div>
        <div className="coach-workspace">
          <div className="coach-screen">
            <div className="coach-screen-header">
              <span>
                <ScanLine size={18} />
                SKILL VISION <small>01</small>
              </span>
              <span>ORIGINAL ILLUSTRATION</span>
            </div>
            <div className={`coach-movement ${playing ? 'playing' : ''}`}>
              <div className="crosshair horizontal" />
              <div className="crosshair vertical" />
              <SkillArt key={skill} kind={example.diagram} animated={playing} />
              <div className="movement-focus">
                <span />
                <strong>
                  {skill === 'Dribbling'
                    ? 'CLOSE CONTROL'
                    : skill === 'Passing'
                      ? 'INSIDE-FOOT CONTACT'
                      : skill === 'Shooting'
                        ? 'SUPPORT-FOOT PLACEMENT'
                        : 'SOFT FIRST TOUCH'}
                </strong>
                <small>ILLUSTRATED TECHNIQUE FOCUS</small>
              </div>
              <span className="screen-coordinate">SL / {skill.toUpperCase()} / EXAMPLE</span>
            </div>
            <div className="coach-screen-controls">
              <button
                className="icon-button"
                onClick={() => setPlaying(!playing)}
                aria-label={playing ? 'Pause illustration' : 'Play illustration'}
              >
                {playing ? <Pause size={19} /> : <Play size={19} />}
              </button>
              <div>
                <strong>{playing ? 'Movement guide playing' : 'Movement guide paused'}</strong>
                <small>Looping illustration · no video footage</small>
              </div>
              <span className="screen-demo">DEMO</span>
            </div>
          </div>
          <div className="coach-instructions">
            <Eyebrow light>01 / WATCH & LEARN</Eyebrow>
            <h2>
              Small details.
              <br />
              Big difference.
            </h2>
            <p>{example.good}</p>
            <div className="coach-focus-list">
              {example.scores.map(([label], i) => (
                <div key={label}>
                  <span>0{i + 1}</span>
                  <strong>{label}</strong>
                  <Check size={16} />
                </div>
              ))}
            </div>
            <button className="button" onClick={() => setReport(true)}>
              <ScanLine size={18} />
              {report ? 'Example report shown below' : 'Explore example report'}
              <ArrowRight size={17} />
            </button>
            <small>Loads a fixed sample report. No analysis is performed.</small>
          </div>
        </div>
        {report && (
          <section className="coach-report" aria-live="polite">
            <div className="report-title">
              <div>
                <Eyebrow light>02 / EXAMPLE COACHING REPORT</Eyebrow>
                <h2>
                  {skill} <span className="serif">— Demo</span>
                </h2>
                <p>These are illustrative ratings for this demonstration only.</p>
              </div>
              <div className="overall-rating">
                <strong>
                  7<span>/10</span>
                </strong>
                <span>EXAMPLE TECHNIQUE SCORE</span>
              </div>
            </div>
            <div className="report-columns">
              <div className="report-metrics">
                {example.scores.map(([label, n]) => (
                  <div key={label}>
                    <div>
                      <span>{label}</span>
                      <strong>
                        {n}
                        <small>/10</small>
                      </strong>
                    </div>
                    <ProgressBar value={n * 10} />
                  </div>
                ))}
                <small>Prewritten sample ratings · not computer-vision results</small>
              </div>
              <div className="report-advice">
                <div>
                  <Check size={21} />
                  <section>
                    <h3>What the example does well</h3>
                    <p>{example.good}</p>
                  </section>
                </div>
                <div>
                  <Target size={21} />
                  <section>
                    <h3>One thing to practice</h3>
                    <p>{example.improve}</p>
                  </section>
                </div>
                <div>
                  <Footprints size={21} />
                  <section>
                    <h3>Your next challenge</h3>
                    <p>{example.next}</p>
                    <ButtonLink to={`/training/${example.challenge}`}>
                      Take it to the pitch
                    </ButtonLink>
                  </section>
                </div>
              </div>
            </div>
          </section>
        )}
        <div className="coach-privacy">
          <ShieldCheck size={25} />
          <div>
            <h3>Big dreams. Privacy first.</h3>
            <p>
              No video uploads. No cameras. No personal profiles. This prototype does not collect or
              share children’s videos. A future real analysis service would need verified parental
              consent, private storage, controlled access, and deletion safeguards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
