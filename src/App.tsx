import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LiveChat from "./components/LiveChat";
import usePageTracking from "./hooks/usePageTracking";

const Home = lazy(() => import("./pages/Home"));
const FieldingRye = lazy(() => import("./pages/templates/FieldingRye"));
const NovaCloud = lazy(() => import("./pages/templates/NovaCloud"));
const BloomMarket = lazy(() => import("./pages/templates/BloomMarket"));
const BloomMarketCaseStudy = lazy(() => import("./pages/case-studies/BloomMarketCaseStudy"));
const ServeSyncCaseStudy = lazy(() => import("./pages/case-studies/ServeSyncCaseStudy"));
const AppointmentWorkflowConcept = lazy(() => import("./pages/case-studies/AppointmentWorkflowConcept"));
const CaseStudiesIndex = lazy(() => import("./pages/case-studies/index"));
const TypographyPreview = lazy(() => import("./pages/TypographyPreview"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const History = lazy(() => import("./pages/History"));
const Changelog = lazy(() => import("./pages/Changelog"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Regulatory = lazy(() => import("./pages/legal/Regulatory"));
const Revamp = lazy(() => import("./pages/Revamp"));

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

          <Route path="/work" element={<Navigate to="/projects" replace />} />

          <Route path="/work/bloom-market/case-study" element={<BloomMarketCaseStudy />} />
          <Route path="/work/servesync/case-study" element={<ServeSyncCaseStudy />} />
          <Route path="/work/appointment-workflows/concept" element={<AppointmentWorkflowConcept />} />
          <Route path="/case-studies" element={<CaseStudiesIndex />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/history" element={<History />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/roadmap" element={<Roadmap />} />

          <Route path="/typography-preview" element={<TypographyPreview />} />
          <Route path="/revamp" element={<Revamp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/regulatory" element={<Regulatory />} />
        </Routes>
      </Suspense>
    </>
  );
}