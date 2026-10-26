import { useEffect, useRef, useState } from 'react';
import { FileVideo, ShieldCheck, ScanLine, Trash2, X, Check, Target } from 'lucide-react';
import {
  analyzeVideo,
  validateVideoFile,
  MAX_VIDEO_SECONDS,
  type PoseFrame,
  type VideoReport,
} from '../videoAnalysis';
import type { CoachSkill } from '../coach';
import { ButtonLink, Eyebrow, ProgressBar } from './UI';
const connections = [
  [11, 12],
  [11, 23],
  [12, 24],
  [23, 24],
  [23, 25],
  [25, 27],
  [24, 26],
  [26, 28],
];
const stamp = (time: number) =>
  `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`;
export default function VideoCoach({ skill }: { skill: CoachSkill }) {
  const [approved, setApproved] = useState(false),
    [clip, setClip] = useState<{ url: string; name: string } | null>(null),
    [ready, setReady] = useState(false),
    [aspect, setAspect] = useState(16 / 9),
    [busy, setBusy] = useState(false),
    [percent, setPercent] = useState(0),
    [error, setError] = useState(''),
    [report, setReport] = useState<VideoReport | null>(null),
    [frame, setFrame] = useState<PoseFrame | null>(null);
  const video = useRef<HTMLVideoElement>(null),
    input = useRef<HTMLInputElement>(null),
    job = useRef<AbortController | null>(null),
    active = useRef(false);
  useEffect(
    () => () => {
      job.current?.abort();
    },
    [],
  );
  useEffect(
    () => () => {
      if (clip) URL.revokeObjectURL(clip.url);
    },
    [clip],
  );
  function clear() {
    job.current?.abort();
    job.current = null;
    active.current = false;
    setBusy(false);
    setClip(null);
    setReady(false);
    setReport(null);
    setFrame(null);
    setError('');
    setPercent(0);
    if (input.current) input.current.value = '';
  }
  function select(file: File | undefined) {
    if (!file || !approved) return;
    clear();
    try {
      validateVideoFile(file);
      setClip({ url: URL.createObjectURL(file), name: file.name });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Choose a valid video.');
    }
  }
  async function run() {
    if (!video.current || !ready || !approved || active.current) return;
    const controller = new AbortController();
    active.current = true;
    job.current = controller;
    setBusy(true);
    setError('');
    setReport(null);
    setFrame(null);
    setPercent(0);
    video.current.pause();
    try {
      const result = await analyzeVideo(
        video.current,
        skill,
        controller.signal,
        setPercent,
        setFrame,
      );
      if (!controller.signal.aborted) setReport(result);
    } catch (e) {
      if (!controller.signal.aborted)
        setError(
          e instanceof Error ? e.message : 'The video could not be analyzed. Try another clip.',
        );
    } finally {
      if (job.current === controller) {
        active.current = false;
        setBusy(false);
        setFrame(null);
        job.current = null;
      }
    }
  }
  return (
    <section className="local-coach" aria-label="Private video coaching">
      <div className="video-coach-intro">
        <div>
          <Eyebrow light>YOUR VIDEO / PRIVATE ON-DEVICE AI</Eyebrow>
          <h2>
            See your moves.
            <br />
            <span className="serif">Find your next step.</span>
          </h2>
          <p>
            Choose a short practice clip with a parent or guardian. AI detects visible body
            positions on this device, then suggests a practice plan for {skill.toLowerCase()}.
          </p>
        </div>
        <div className="video-privacy-pill">
          <ShieldCheck size={22} />
          <span>
            Stays on this device<strong>No upload. No account. No saved video.</strong>
          </span>
        </div>
      </div>
      <div className="video-consent">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={approved}
            onChange={(e) => {
              if (!e.target.checked) clear();
              setApproved(e.target.checked);
            }}
            disabled={busy}
          />
          <span>
            <strong>Parent or guardian:</strong> I’m helping choose the clip, I have permission from
            everyone shown, and I understand that it is processed only in this browser.
          </span>
        </label>
        <p>
          Use a clip of one player in a safe space. Keep their whole body in view, including both
          feet. Choose MP4 or WebM when possible; 3–30 seconds, up to 25 MB.
        </p>
      </div>
      <div className="video-coach-grid">
        <div className="video-coach-player">
          {clip ? (
            <>
              <div
                className="local-video-stage"
                style={{ aspectRatio: aspect, maxWidth: `${560 * aspect}px`, marginInline: 'auto' }}
              >
                <video
                  ref={video}
                  src={clip.url}
                  controls={!busy}
                  playsInline
                  preload="auto"
                  aria-label="Your selected practice video"
                  onLoadedMetadata={() => {
                    const v = video.current;
                    if (!v) return;
                    if (!v.videoWidth || !v.videoHeight) {
                      setError('Choose a video with a visible image, not an audio-only file.');
                      setReady(false);
                      return;
                    }
                    setAspect(v.videoWidth / v.videoHeight);
                    if (
                      !Number.isFinite(v.duration) ||
                      v.duration < 3 ||
                      v.duration > MAX_VIDEO_SECONDS
                    ) {
                      setError('Choose a clip lasting 3–30 seconds.');
                      setReady(false);
                    } else {
                      setReady(true);
                      setError('');
                    }
                  }}
                  onError={() => {
                    setReady(false);
                    setError('This browser cannot play that video. Try an MP4 or WebM clip.');
                  }}
                  onPlay={() => setFrame(null)}
                  onTimeUpdate={() => {
                    if (
                      !busy &&
                      frame &&
                      Math.abs((video.current?.currentTime ?? 0) - frame.time) > 0.2
                    )
                      setFrame(null);
                  }}
                />
                {frame && (
                  <svg
                    className="pose-overlay"
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    {connections.map(([a, b]) => {
                      const p = frame.points[a],
                        q = frame.points[b];
                      return p && q && (p.visibility ?? 0) > 0.65 && (q.visibility ?? 0) > 0.65 ? (
                        <line
                          key={`${a}-${b}`}
                          x1={p.x * 1000}
                          y1={p.y * 1000}
                          x2={q.x * 1000}
                          y2={q.y * 1000}
                          vectorEffect="non-scaling-stroke"
                        />
                      ) : null;
                    })}
                  </svg>
                )}
              </div>
              <div className="selected-clip">
                <FileVideo size={18} />
                <span>{clip.name}</span>
                <button className="text-link" onClick={clear}>
                  <Trash2 size={16} />
                  Remove video
                </button>
              </div>
            </>
          ) : (
            <div className="video-empty">
              <FileVideo size={48} />
              <h3>Your practice, up close.</h3>
              <p>A short, steady clip. One player. Feet in frame.</p>
              <span>Videos are never sent to our server.</span>
            </div>
          )}
          <div className="video-file-picker">
            <label htmlFor="coach-video">Choose practice video</label>
            <input
              ref={input}
              id="coach-video"
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/ogg"
              disabled={!approved || busy}
              onChange={(e) => select(e.target.files?.[0])}
            />
            {!approved && <small>A parent or guardian must confirm above first.</small>}
          </div>
        </div>
        <div className="video-analysis-panel">
          <Eyebrow light>HOW YOUR COACH WORKS</Eyebrow>
          <h3>
            Real pose detection.
            <br />
            Honest, helpful feedback.
          </h3>
          <ol>
            <li>
              <span>01</span>AI looks for shoulders, hips, knees, and ankles in 16 sampled frames.
            </li>
            <li>
              <span>02</span>Clear body positions are used to describe the clip. Unclear footage
              gets a request to record again.
            </li>
            <li>
              <span>03</span>You receive simple practice suggestions for your chosen skill.
            </li>
          </ol>
          <p className="video-limits">
            This coach cannot track the ball, measure shot accuracy, diagnose injuries, or judge
            your whole technique. Camera angle affects pose estimates. Tips use simple coaching
            rules; this is not a human coach or a chat assistant.
          </p>
          <button className="button" disabled={!ready || !approved || busy} onClick={run}>
            <ScanLine size={18} />
            {busy ? 'Analyzing on this device…' : `Analyze my ${skill.toLowerCase()} clip`}
          </button>
          {busy && (
            <div className="video-analysis-status" role="status">
              <ProgressBar value={percent} label="Sampled frames processed" />
              <p>
                {percent === 0
                  ? 'Loading the local AI model. This can take a moment on your device.'
                  : `Checked ${percent}% of sampled frames.`}
              </p>
              <button
                className="text-link"
                onClick={() => {
                  clear();
                  setError('Analysis cancelled. The selected video has been removed.');
                }}
              >
                <X size={15} />
                Cancel & remove video
              </button>
            </div>
          )}
          {error && (
            <p className="video-error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
      {report && (
        <section className="video-report" aria-live="polite">
          <div>
            <Eyebrow light>YOUR CLIP / OBSERVATIONS & NEXT STEPS</Eyebrow>
            <h2>Your {report.skill.toLowerCase()} practice plan.</h2>
            <p>
              Based on visible body landmarks in your clip. There is no made-up technique score.
            </p>
          </div>
          <div className="video-report-columns">
            <section>
              <h3>
                <Check size={20} />
                What I could see
              </h3>
              {report.observations.map((o) => (
                <p key={o}>{o}</p>
              ))}
              <div className="evidence-frames">
                <span>Explore detected frames:</span>
                {report.frames
                  .filter((_, i) => i % Math.max(1, Math.floor(report.frames.length / 4)) === 0)
                  .slice(0, 4)
                  .map((f) => (
                    <button
                      key={f.time}
                      onClick={() => {
                        if (video.current) {
                          video.current.pause();
                          video.current.currentTime = f.time;
                          setFrame(f);
                        }
                      }}
                    >
                      View {stamp(f.time)}
                    </button>
                  ))}
              </div>
            </section>
            <section>
              <h3>
                <Target size={20} />
                What to practice next
              </h3>
              <ol>
                {report.nextSteps.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
              <ButtonLink to={`/training/${report.challenge}`}>
                Start my practice mission
              </ButtonLink>
            </section>
          </div>
          <p className="video-report-note">
            AI can miss or misplace body points, especially with more than one player, fast
            movement, or hidden legs. These are practice suggestions, not a professional assessment.
            Ask your coach or an adult to help.
          </p>
        </section>
      )}
    </section>
  );
}
