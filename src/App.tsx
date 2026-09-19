import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LiveChat from "./components/LiveChat";
import usePageTracking from "./hooks/usePageTracking";

// Every route below is code-split with React.lazy. Home is the only page
// most visitors ever load — there's no reason a first-time visitor's
// browser should also download the legal pages, the Lab, the typography
// preview, and every case study before the hero even paints
const Home = lazy(() => import("./pages/Home"));
const FieldingRye = lazy(() => import("./pages/templates/FieldingRye"));
const NovaCloud = lazy(() => import("./pages/templates/NovaCloud"));
const BloomMarket = lazy(() => import("./pages/templates/BloomMarket"));
// import Testimonials from "./pages/Testimonials"; // re-enable once there are real testimonials to show
const BloomMarketCaseStudy = lazy(() => import("./pages/case-studies/BloomMarketCaseStudy"));
const ServeSyncCaseStudy = lazy(() => import("./pages/case-studies/ServeSyncCaseStudy"));
const AppointmentWorkflowConcept = lazy(() => import("./pages/case-studies/AppointmentWorkflowConcept"));
const CaseStudiesIndex = lazy(() => import("./pages/case-studies/index"));
const TypographyPreview = lazy(() => import("./pages/TypographyPreview"));
const Work = lazy(() => import("./pages/Work"));
// const Lab = lazy(() => import("./pages/Lab"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Regulatory = lazy(() => import("./pages/legal/Regulatory"));
const Revamp = lazy(() => import("./pages/Revamp"));

// Matches the --color-ink background (see index.html's inline fallback
// style) so a lazy chunk that takes a beat to load never flashes white
function RouteFallback() {
  return <div className="min-h-screen bg-ink" aria-hidden="true" />;
}

export default function App() {
  usePageTracking();

  return (
    <>
      <ScrollToTop />
      <LiveChat />
      <Suspense fallback={<RouteFallback />}>
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
          {/* <Route path="/lab" element={<Lab />} />*/}
          <Route path="/revamp" element={<Revamp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/regulatory" element={<Regulatory />} />
        </Routes>
      </Suspense>
    </>
  );
}