import { coachReports } from './data';
export type CoachSkill = keyof typeof coachReports;
// Demo-only adapter. A future consent-aware service must use its own API,
// access controls, deletion policy, and truthful measurements. No media is collected here.
export interface CoachingDemoProvider {
  getExample: (skill: CoachSkill) => (typeof coachReports)[CoachSkill];
}
export const coachingDemo: CoachingDemoProvider = { getExample: (skill) => coachReports[skill] };
