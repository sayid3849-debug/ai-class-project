import type { Pose, NormalizedLandmark, Results } from '@mediapipe/pose';
import type { CoachSkill } from './coach';
export const MAX_VIDEO_BYTES = 25 * 1024 * 1024;
export const MAX_VIDEO_SECONDS = 30;
export type PoseFrame = {
  time: number;
  points: NormalizedLandmark[];
  width: number;
  height: number;
};
export type VideoReport = {
  skill: CoachSkill;
  sampled: number;
  usable: number;
  observations: string[];
  nextSteps: string[];
  challenge: number;
  frames: PoseFrame[];
};
export function validateVideoFile(file: Pick<File, 'type' | 'size'>) {
  if (!['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'].includes(file.type))
    throw new Error(
      'Please choose an MP4, WebM, MOV, or Ogg video. Your browser must be able to play it.',
    );
  if (file.size === 0 || file.size > MAX_VIDEO_BYTES)
    throw new Error('Choose a video smaller than 25 MB that is not empty.');
}
const required = [11, 12, 23, 24, 25, 26, 27, 28];
export function usablePose(frame: PoseFrame) {
  return required.every((i) => {
    const p = frame.points[i];
    return (
      p &&
      Number.isFinite(p.x) &&
      Number.isFinite(p.y) &&
      p.x >= 0 &&
      p.x <= 1 &&
      p.y >= 0 &&
      p.y <= 1 &&
      (p.visibility ?? 0) >= 0.65
    );
  });
}
export function kneeAngle(points: NormalizedLandmark[], side: 'left' | 'right', aspect: number) {
  const ids = side === 'left' ? [23, 25, 27] : [24, 26, 28];
  const [a, b, c] = ids.map((i) => points[i]);
  const u = [(a.x - b.x) * aspect, a.y - b.y],
    v = [(c.x - b.x) * aspect, c.y - b.y];
  const norm = Math.hypot(...u) * Math.hypot(...v);
  return norm < 1e-8
    ? null
    : (Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / norm))) * 180) / Math.PI;
}
const tips: Record<CoachSkill, { challenge: number; steps: string[] }> = {
  Dribbling: {
    challenge: 0,
    steps: [
      'Try three slow rounds through five cones, with an adult nearby.',
      'Use small touches with both feet and glance up between touches.',
    ],
  },
  Passing: {
    challenge: 1,
    steps: [
      'Practice 10 gentle inside-foot passes to a safe wall or partner.',
      'Point your support foot toward the target and follow through gently.',
    ],
  },
  Shooting: {
    challenge: 2,
    steps: [
      'Take five controlled shots at a safe target with an adult supervising.',
      'Place your support foot beside the ball. Focus on accuracy before power.',
    ],
  },
  'Ball Control': {
    challenge: 3,
    steps: [
      'Ask a partner to roll the ball to you 10 times.',
      'Relax your receiving foot and cushion the ball into a nearby space.',
    ],
  },
};
export function buildVideoReport(frames: PoseFrame[], skill: CoachSkill): VideoReport {
  const usable = frames.filter(usablePose);
  if (usable.length < 3 || usable.length / frames.length < 0.25)
    throw new Error(
      'I could not see one whole body clearly in enough frames. No technique report was made. Try a brighter, steady 3–30 second clip with one player’s shoulders, hips, knees, and feet visible.',
    );
  const angles = usable
    .flatMap((f) =>
      (['left', 'right'] as const).map((s) => kneeAngle(f.points, s, f.width / f.height)),
    )
    .filter((a): a is number => a !== null)
    .sort((a, b) => a - b);
  const median = angles.length
    ? (angles[Math.floor((angles.length - 1) / 2)] + angles[Math.floor(angles.length / 2)]) / 2
    : null;
  const observations = [
    `Shoulders, hips, knees, and ankles were visible with sufficient model confidence in ${usable.length} of ${frames.length} sampled frames.`,
  ];
  if (median !== null)
    observations.push(
      `The median projected knee angle was about ${Math.round(median)}°. This is a camera-dependent 2D estimate across both legs, not a technique grade.`,
    );
  const stance =
    median !== null && median > 165
      ? 'Your legs looked mostly straight in the sampled views. Ask your coach to practice a gentle knee bend for a comfortable ready position.'
      : 'Practice a comfortable ready position with softly bent knees. A single camera view cannot prove balance or correct technique.';
  return {
    skill,
    sampled: frames.length,
    usable: usable.length,
    observations,
    nextSteps: [stance, ...tips[skill].steps],
    challenge: tips[skill].challenge,
    frames: usable,
  };
}
let runtime: Promise<(typeof import('@mediapipe/pose'))['Pose']> | undefined;
function loadRuntime() {
  if (!runtime)
    runtime = new Promise<(typeof import('@mediapipe/pose'))['Pose']>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/pose/pose.js';
      script.async = true;
      script.onload = () => {
        const PoseClass = (window as Window & { Pose?: (typeof import('@mediapipe/pose'))['Pose'] })
          .Pose;
        if (PoseClass) resolve(PoseClass);
        else {
          script.remove();
          runtime = undefined;
          reject(new Error('The local pose model could not start. Try reloading this page.'));
        }
      };
      script.onerror = () => {
        script.remove();
        runtime = undefined;
        reject(
          new Error(
            'The local AI files are unavailable. Reload the page or ask an adult to check the installation.',
          ),
        );
      };
      document.head.appendChild(script);
    });
  return runtime;
}
function aborted(signal: AbortSignal) {
  if (signal.aborted) throw new DOMException('Analysis cancelled', 'AbortError');
}
async function limited<T>(promise: Promise<T>, signal: AbortSignal, ms = 30000): Promise<T> {
  aborted(signal);
  let timer: ReturnType<typeof setTimeout> | undefined;
  let abort: () => void = () => {};
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        abort = () => reject(new DOMException('Analysis cancelled', 'AbortError'));
        signal.addEventListener('abort', abort, { once: true });
        timer = setTimeout(
          () =>
            reject(
              new Error(
                'This device took too long to process the clip. Try a shorter video or another browser.',
              ),
            ),
          ms,
        );
      }),
    ]);
  } finally {
    clearTimeout(timer);
    signal.removeEventListener('abort', abort);
  }
}
function seek(video: HTMLVideoElement, time: number, signal: AbortSignal) {
  if (Math.abs(video.currentTime - time) < 0.001 && video.readyState >= 2) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const clean = () => {
      video.removeEventListener('seeked', done);
      video.removeEventListener('error', fail);
      signal.removeEventListener('abort', cancel);
      clearTimeout(timer);
    };
    const done = () => {
      clean();
      resolve();
    };
    const fail = () => {
      clean();
      reject(new Error('This video cannot be decoded. Try an MP4 or WebM clip.'));
    };
    const cancel = () => {
      clean();
      reject(new DOMException('Analysis cancelled', 'AbortError'));
    };
    const timer = setTimeout(() => {
      clean();
      reject(new Error('The video could not be read. Try another MP4 or WebM clip.'));
    }, 8000);
    video.addEventListener('seeked', done, { once: true });
    video.addEventListener('error', fail, { once: true });
    signal.addEventListener('abort', cancel, { once: true });
    video.currentTime = time;
  });
}
// Only same-origin model GETs are made. Video frames stay in browser memory;
// there is no upload endpoint, analytics, persistent frame storage, or cloud API.
export async function analyzeVideo(
  video: HTMLVideoElement,
  skill: CoachSkill,
  signal: AbortSignal,
  onProgress: (value: number) => void,
  onFrame: (frame: PoseFrame) => void,
): Promise<VideoReport> {
  if (!Number.isFinite(video.duration) || video.duration < 3 || video.duration > MAX_VIDEO_SECONDS)
    throw new Error('Choose a clip lasting 3–30 seconds.');
  const PoseClass = await limited(loadRuntime(), signal);
  aborted(signal);
  let detector: Pose | undefined;
  const originalTime = video.currentTime;
  const frames: PoseFrame[] = [];
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, 640 / video.videoWidth);
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  const context = canvas.getContext('2d');
  if (!context) throw new Error('This browser cannot read video frames.');
  try {
    detector = new PoseClass({ locateFile: (file) => `/pose/${file}` });
    detector.setOptions({
      modelComplexity: 0,
      smoothLandmarks: false,
      enableSegmentation: false,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });
    let result: Results | undefined;
    detector.onResults((r) => {
      result = r;
    });
    await limited(detector.initialize(), signal, 45000);
    aborted(signal);
    const count = 16;
    for (let i = 0; i < count; i++) {
      aborted(signal);
      const time = Math.min(
        video.duration - 0.05,
        0.05 + (i * (video.duration - 0.1)) / (count - 1),
      );
      await seek(video, time, signal);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      result = undefined;
      await limited(detector.send({ image: canvas }, i * 1000), signal, 15000);
      aborted(signal);
      const detected = result as Results | undefined;
      const frame: PoseFrame = {
        time,
        points: detected?.poseLandmarks?.map((p) => ({ ...p })) ?? [],
        width: canvas.width,
        height: canvas.height,
      };
      frames.push(frame);
      onFrame(frame);
      onProgress(Math.round(((i + 1) / count) * 100));
    }
    return buildVideoReport(frames, skill);
  } catch (error) {
    if (signal.aborted) throw new DOMException('Analysis cancelled', 'AbortError');
    if (error instanceof Error && /WebGL|GPU|WASM|Aborted|RuntimeError/i.test(error.message))
      throw new Error(
        'AI pose detection could not run on this device. Try a browser with WebGL enabled. No example report has been substituted.',
        { cause: error },
      );
    throw error;
  } finally {
    if (detector) await detector.close().catch(() => {});
    canvas.width = 0;
    canvas.height = 0;
    if (!signal.aborted && video.readyState >= 2) video.currentTime = originalTime;
  }
}
