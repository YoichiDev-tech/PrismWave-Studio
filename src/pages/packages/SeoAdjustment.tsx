import PackagePageLayout from "../../components/PackagePageLayout";
import { getPackageBySlug } from "../../data/packages";

const pkg = getPackageBySlug("seo-adjustment")!;

export default function SeoAdjustment() {
  return <PackagePageLayout pkg={pkg} />;
}