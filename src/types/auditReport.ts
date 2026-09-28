// Shape of a saved, shareable audit report — mirrors what
// api/audit-save.ts stores and api/audit-report.ts returns.
// Deliberately separate from AuditResult/AuditCategory in
// src/lib/auditScoring.ts: the report page renders stored data, it
// doesn't re-run scoring
export interface AuditReportCategory {
  key: string;
  label: string;
  score: number;
  findings: string[];
}

export interface AuditReportData {
  id: string;
  finalUrl: string;
  overall: number;
  categories: AuditReportCategory[];
  createdAt: string;
}