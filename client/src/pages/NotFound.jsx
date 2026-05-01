import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background grid */}
      <div className="bg-grid-pattern absolute inset-0" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-maroon/5 blur-3xl" />

      <div className="relative z-10 text-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
          <h1 className="text-[10rem] md:text-[14rem] font-bold leading-none text-gradient-maroon" style={{ fontFamily: "'Playfair Display', serif" }}>
            404
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-gray-400 text-lg mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Page not found</p>
          <p className="text-gray-600 text-sm mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved to another dimension.</p>

          {/* Terminal decoration */}
          <div className="inline-block px-4 py-2 rounded border border-gray-800 bg-gray-950 mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span className="text-gray-500 text-xs">$</span>
            <span className="text-red text-xs ml-2">Error:</span>
            <span className="text-gray-400 text-xs ml-2">route_not_found</span>
            <span className="animate-blink text-red text-xs ml-1">▋</span>
          </div>

          <div>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-maroon hover:bg-red text-white text-sm rounded-full transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Go Home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
