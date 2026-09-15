import PackagePageLayout from "../../components/PackagePageLayout";
import { getPackageBySlug } from "../../data/packages";

const pkg = getPackageBySlug("restaurant-cafe-landing-page")!;

export default function RestaurantCafeLandingPage() {
  return <PackagePageLayout pkg={pkg} />;
}