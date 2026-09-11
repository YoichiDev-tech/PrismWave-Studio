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
      </Routes>
    </>
  );
}