import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/ui/CustomCursor';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';
import Learn from './pages/Learn';
import LearnPost from './pages/LearnPost';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Play from './pages/Play';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeInOut' },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<motion.div {...pageTransition}><Home /></motion.div>} />
          <Route path="about" element={<motion.div {...pageTransition}><About /></motion.div>} />
          <Route path="portfolio" element={<motion.div {...pageTransition}><Portfolio /></motion.div>} />
          <Route path="portfolio/:slug" element={<motion.div {...pageTransition}><CaseStudy /></motion.div>} />
          <Route path="learn" element={<motion.div {...pageTransition}><Learn /></motion.div>} />
          <Route path="learn/:slug" element={<motion.div {...pageTransition}><LearnPost /></motion.div>} />
          <Route path="contact" element={<motion.div {...pageTransition}><Contact /></motion.div>} />
          <Route path="play" element={<motion.div {...pageTransition}><Play /></motion.div>} />
          <Route path="admin" element={<motion.div {...pageTransition}><Admin /></motion.div>} />
          <Route path="*" element={<motion.div {...pageTransition}><NotFound /></motion.div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <AuthProvider>
    <CursorProvider>
      <BrowserRouter>
        <CustomCursor />
        <AnimatedRoutes />
      </BrowserRouter>
    </CursorProvider>
  </AuthProvider>
);

export default App;
