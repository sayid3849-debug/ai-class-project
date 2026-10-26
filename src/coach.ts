import { coachReports } from './data';
export type CoachSkill = keyof typeof coachReports;
// Explicit adapter for example mode only. Real, local pose analysis lives in
// videoAnalysis.ts and never falls back to this sample report.
export interface CoachingDemoProvider {
  getExample: (skill: CoachSkill) => (typeof coachReports)[CoachSkill];
}
export const coachingDemo: CoachingDemoProvider = { getExample: (skill) => coachReports[skill] };
