import PackagePageLayout from "../../components/PackagePageLayout";
import { getPackageBySlug } from "../../data/packages";

const pkg = getPackageBySlug("local-service-landing-page")!;

export default function LocalServiceLandingPage() {
  return <PackagePageLayout pkg={pkg} />;
}