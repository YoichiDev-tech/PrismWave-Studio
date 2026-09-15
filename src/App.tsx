import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FieldingRye from "./pages/templates/FieldingRye";
import NovaCloud from "./pages/templates/NovaCloud";
import BloomMarket from "./pages/templates/BloomMarket";
import ScrollToTop from "./components/ScrollToTop";
// import Testimonials from "./pages/Testimonials"; // re-enable once there are real testimonials to show
import LiveChat from "./components/LiveChat";
import BloomMarketCaseStudy from "./pages/case-studies/BloomMarketCaseStudy";
import ServeSyncCaseStudy from "./pages/case-studies/ServeSyncCaseStudy";
import AppointmentWorkflowConcept from "./pages/case-studies/AppointmentWorkflowConcept";
import CaseStudiesIndex from "./pages/case-studies/index";
import TypographyPreview from "./pages/TypographyPreview";
import Work from "./pages/Work";
import Lab from "./pages/Lab";
import usePageTracking from "./hooks/usePageTracking";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Regulatory from "./pages/legal/Regulatory";
import Revamp from "./pages/Revamp";
import Packages from "./pages/Packages";
import LocalServiceLandingPage from "./pages/packages/LocalServiceLandingPage";
import RestaurantCafeLandingPage from "./pages/packages/RestaurantCafeLandingPage";
import ProfessionalOnePager from "./pages/packages/ProfessionalOnePager";
import SeoAdjustment from "./pages/packages/SeoAdjustment";
import InsightsDashboardShowcase from "./pages/packages/InsightsDashboardShowcase";

export default function App() {
  usePageTracking();

  return (
    <>
      <ScrollToTop />
      <LiveChat />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/fielding-and-rye" element={<FieldingRye />} />
        <Route path="/work/nova-cloud" element={<NovaCloud />} />
        <Route path="/work/bloom-market" element={<BloomMarket />} />

        <Route path="/work" element={<Work />} />

        <Route path="/work/bloom-market/case-study" element={<BloomMarketCaseStudy />} />
        <Route path="/work/servesync/case-study" element={<ServeSyncCaseStudy />} />
        <Route path="/work/appointment-workflows/concept" element={<AppointmentWorkflowConcept />} />
        <Route path="/case-studies" element={<CaseStudiesIndex />} />
        {/* <Route path="/testimonials" element={<Testimonials />} /> */}
        <Route path="/typography-preview" element={<TypographyPreview />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/revamp" element={<Revamp />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/regulatory" element={<Regulatory />} />

        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/local-service-landing-page" element={<LocalServiceLandingPage />} />
        <Route path="/packages/restaurant-cafe-landing-page" element={<RestaurantCafeLandingPage />} />
        <Route path="/packages/professional-one-pager" element={<ProfessionalOnePager />} />
        <Route path="/packages/seo-adjustment" element={<SeoAdjustment />} />
        <Route path="/packages/insights-dashboard-showcase" element={<InsightsDashboardShowcase />} />
      </Routes>
    </>
  );
}