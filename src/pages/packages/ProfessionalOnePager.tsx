import PackagePageLayout from "../../components/PackagePageLayout";
import { getPackageBySlug } from "../../data/packages";

const pkg = getPackageBySlug("professional-one-pager")!;

export default function ProfessionalOnePager() {
  return <PackagePageLayout pkg={pkg} />;
}