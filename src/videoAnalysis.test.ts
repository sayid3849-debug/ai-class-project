import { describe, it, expect } from 'vitest';
import {
  buildVideoReport,
  usablePose,
  kneeAngle,
  validateVideoFile,
  type PoseFrame,
} from './videoAnalysis';
function pose(time = 0): PoseFrame {
  const points = Array.from({ length: 33 }, () => ({ x: 0.5, y: 0.5, z: 0, visibility: 0.95 }));
  for (const [i, x, y] of [
    [11, 0.4, 0.2],
    [12, 0.6, 0.2],
    [23, 0.4, 0.45],
    [24, 0.6, 0.45],
    [25, 0.4, 0.65],
    [26, 0.8, 0.45],
    [27, 0.4, 0.85],
    [28, 0.8, 0.65],
  ])
    points[i] = { x, y, z: 0, visibility: 0.95 };
  return { time, points, width: 640, height: 640 };
}
describe('local video analysis', () => {
  it('rejects unsupported, empty, and oversize files', () => {
    expect(() => validateVideoFile({ type: 'image/jpeg', size: 10 })).toThrow(/choose an MP4/);
    expect(() => validateVideoFile({ type: 'video/mp4', size: 0 })).toThrow(/not empty/);
    expect(() => validateVideoFile({ type: 'video/mp4', size: 26 * 1024 * 1024 })).toThrow(/25 MB/);
    expect(() => validateVideoFile({ type: 'video/webm', size: 1000 })).not.toThrow();
  });
  it('does not generate coaching claims without sufficient visible landmarks', () => {
    const missing = { ...pose(), points: [] };
    expect(usablePose(missing)).toBe(false);
    expect(() => buildVideoReport([missing, missing, missing], 'Dribbling')).toThrow(
      /No technique report/,
    );
    const partial = pose();
    partial.points[28].visibility = 0.1;
    expect(usablePose(partial)).toBe(false);
    expect(() => buildVideoReport([pose(), partial, partial], 'Shooting')).toThrow(
      /No technique report/,
    );
  });
  it('calculates camera-dependent angles and the true even-count median', () => {
    const frame = pose();
    expect(kneeAngle(frame.points, 'left', 1)).toBeCloseTo(180);
    expect(kneeAngle(frame.points, 'right', 1)).toBeCloseTo(90);
    const report = buildVideoReport([pose(0), pose(1), pose(2)], 'Passing');
    expect(report.observations.join(' ')).toContain('135°');
    expect(report.nextSteps[0]).not.toContain('mostly straight');
    expect(report.challenge).toBe(1);
    expect(report).not.toHaveProperty('score');
  });
  it('derives recommendations from observed posture and the selected skill', () => {
    const frames = [pose(0), pose(1), pose(2)];
    for (const f of frames) {
      f.points[26] = { x: 0.6, y: 0.65, z: 0, visibility: 0.95 };
      f.points[28] = { x: 0.6, y: 0.85, z: 0, visibility: 0.95 };
    }
    const report = buildVideoReport(frames, 'Shooting');
    expect(report.usable).toBe(3);
    expect(report.nextSteps[0]).toContain('mostly straight');
    expect(report.nextSteps.join(' ')).toContain('five controlled shots');
    expect(report.challenge).toBe(2);
  });
});
