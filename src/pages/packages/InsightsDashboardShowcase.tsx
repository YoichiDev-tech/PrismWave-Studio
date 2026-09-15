import PackagePageLayout from "../../components/PackagePageLayout";
import { getPackageBySlug } from "../../data/packages";

const pkg = getPackageBySlug("insights-dashboard-showcase")!;

export default function InsightsDashboardShowcase() {
  return <PackagePageLayout pkg={pkg} />;
}