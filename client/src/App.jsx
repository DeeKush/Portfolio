import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageTransition from './components/layout/PageTransition/PageTransition';
import SmoothScroll from './components/layout/SmoothScroll/SmoothScroll';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <PageTransition>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </SmoothScroll>
    </BrowserRouter>
  );
}
