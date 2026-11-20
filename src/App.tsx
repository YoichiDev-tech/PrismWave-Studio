import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const ItalianHome = lazy(() => import("./pages/ItalianHome"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Regulatory = lazy(() => import("./pages/legal/Regulatory"));

function RouteFallback() {
  return <div className="min-h-screen bg-[#0a0e1a]" aria-hidden="true" />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<ItalianHome />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/regulatory" element={<Regulatory />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
