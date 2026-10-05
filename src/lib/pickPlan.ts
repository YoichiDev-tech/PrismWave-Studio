import { PLANS } from "../data/offers";
import type { Plan } from "../data/offers";

// Audit scores at or above this get no package suggestion at all
export const SUGGEST_BELOW_SCORE = 70;
// Scores below this suggest a rebuild instead of targeted fixes
export const REBUILD_BELOW_SCORE = 40;

const FIX_PLAN_ID = "site-rescue";
const REBUILD_PLAN_ID = "business";

/**
 * Maps an overall audit score (0-100) to the single most relevant package
 * Returns null when the site is healthy enough that an offer would feel pushy
 */
export function pickPlan(overallScore: number): Plan | null {
  if (overallScore >= SUGGEST_BELOW_SCORE) return null;
  const id = overallScore < REBUILD_BELOW_SCORE ? REBUILD_PLAN_ID : FIX_PLAN_ID;
  return PLANS.find((plan) => plan.id === id) ?? null;
}