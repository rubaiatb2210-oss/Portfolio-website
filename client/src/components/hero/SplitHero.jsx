import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

const ArtistBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Soft glowing fluid orbs */}
    <motion.div
      className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-multiply filter blur-[90px] opacity-30"
      style={{ backgroundColor: '#800000' }}
      animate={{ x: [0, 200, -100, 0], y: [0, 150, -50, 0], scale: [1, 1.4, 0.8, 1], rotate: [0, 90, 180, 360] }}
      transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[120px] opacity-20"
      style={{ backgroundColor: '#FF0000' }}
      animate={{ x: [0, -250, 100, 0], y: [0, -150, 100, 0], scale: [1, 1.5, 0.9, 1], rotate: [360, 180, 90, 0] }}
      transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
    <motion.div
      className="absolute top-[30%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[80px] opacity-15"
      style={{ backgroundColor: '#FFB3B3' }}
      animate={{ x: [0, 150, -150, 0], y: [0, -150, 150, 0], scale: [1, 1.6, 1] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
    />
    
    {/* Delicate floating geometric outlines (Bauhaus inspired) */}
    <motion.div 
      className="absolute top-[15%] right-[15%] w-40 h-40 border-[1px] border-maroon/20 rounded-full"
      animate={{ rotate: 360, scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -20, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div 
      className="absolute top-[18%] right-[17%] w-24 h-24 border-[1px] border-red/15 rounded-full"
      animate={{ rotate: -360, scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 30, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div 
      className="absolute bottom-[20%] left-[10%] w-64 h-64 border-[1px] border-maroon/10 rounded-full"
      animate={{ rotate: 360, scale: [1, 1.05, 1], x: [0, 40, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    />
    
    {/* Abstract flowing SVG wave */}
    <motion.svg
      className="absolute top-[40%] left-[-20%] w-[140%] h-auto opacity-[0.07]"
      viewBox="0 0 1000 200"
      fill="none"
      stroke="#800000"
      strokeWidth="2"
      animate={{ x: [0, -150, 0], y: [0, 30, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M0 100 Q 250 0, 500 100 T 1000 100" />
      <path d="M0 150 Q 250 50, 500 150 T 1000 150" stroke="#FF0000" strokeWidth="1" />
    </motion.svg>
  </div>
);

const CoderBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-red opacity-30"
        style={{
          width: Math.random() * 4 + 1 + 'px',
          height: Math.random() * 4 + 1 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
        }}
        animate={{ y: [0, -150 - Math.random() * 100], opacity: [0, 0.8, 0] }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * 5,
        }}
      />
    ))}
    <motion.div
      className="absolute left-0 right-0 h-[1px] bg-red opacity-10"
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

const SplitHero = () => {
  const [activePanel, setActivePanel] = useState(null); // 'artist' | 'coder' | null
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIdentity, setMobileIdentity] = useState('artist');
  const { setVariant } = useCursor();

  // Mouse tracking for 3D Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 15, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);
  const translateX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const translateY = useTransform(smoothY, [-1, 1], [-20, 20]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: stacked vertical layout with toggle
  if (isMobile) {
    return (
      <section className="relative w-full min-h-screen" id="split-hero">
        {/* Identity Toggle */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1 p-1 rounded-full glass">
          <button
            onClick={() => setMobileIdentity('artist')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              mobileIdentity === 'artist'
                ? 'bg-maroon text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Artist
          </button>
          <button
            onClick={() => setMobileIdentity('coder')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              mobileIdentity === 'coder'
                ? 'bg-gray-800 text-white border border-red/30'
                : 'text-gray-400 hover:text-white'
            }`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            The Coder
          </button>
        </div>

        <AnimatePresence mode="wait">
          {mobileIdentity === 'artist' ? (
            <motion.div
              key="artist-mobile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex flex-col items-center justify-center px-8 bg-white relative overflow-hidden"
            >
              <div className="bg-grid-pattern-light absolute inset-0 opacity-50" />
              <ArtistBackground />
              <div className="relative z-10 text-center">
                <motion.div
                  className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-maroon/30 shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <img
                    src="/images/hero-artist-maroon.jpg"
                    alt="Rubaiat — The Artist"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
                <motion.p
                  className="text-maroon tracking-[0.3em] uppercase text-xs mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  The Artist
                </motion.p>
                <motion.h1
                  className="text-4xl font-bold text-black mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Rubaiat
                </motion.h1>
                <motion.div
                  className="w-12 h-0.5 bg-gradient-to-r from-maroon to-red mx-auto mb-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
                <motion.p
                  className="text-gray-600 text-base max-w-xs mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Crafting visual stories through design & aesthetics
                </motion.p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="coder-mobile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex flex-col items-center justify-center px-8 bg-black relative overflow-hidden"
            >
              <div className="bg-grid-pattern absolute inset-0" />
              <CoderBackground />
              <div className="relative z-10 text-center">
                <motion.div
                  className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-gray-800 shadow-lg shadow-red/10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <img
                    src="/images/hero-coder-ghibli-style.jpg"
                    alt="Rubaiat — The Coder"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
                <motion.p
                  className="text-red tracking-[0.3em] uppercase text-xs mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {'> the_coder'}
                </motion.p>
                <motion.h1
                  className="text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Rubaiat<span className="animate-blink text-red">_</span>
                </motion.h1>
                <motion.div
                  className="w-12 h-0.5 bg-gradient-to-r from-red to-maroon mx-auto mb-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
                <motion.p
                  className="text-gray-400 text-base max-w-xs mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Building systems that scale & solutions that matter
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  // Desktop: interactive split-screen
  return (
    <section className="relative w-full h-screen flex overflow-hidden" id="split-hero" onMouseMove={handleMouseMove}>
      {/* ---- LEFT PANEL: THE ARTIST ---- */}
      <motion.div
        className="relative flex items-center justify-center cursor-pointer overflow-hidden"
        initial={{ flex: 1 }}
        animate={{
          flex: activePanel === 'artist' ? 2 : activePanel === 'coder' ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        onMouseEnter={() => { setActivePanel('artist'); setVariant('artist'); }}
        onMouseLeave={() => { setActivePanel(null); setVariant('default'); }}
        style={{ background: '#FFFFFF' }}
      >
        {/* Grid Pattern */}
        <div className="bg-grid-pattern-light absolute inset-0 opacity-50" />
        <ArtistBackground />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-12">
          {/* Photo */}
          <motion.div
            className="w-56 h-56 rounded-full overflow-hidden mb-8 border-4 shadow-xl"
            style={{ 
              borderColor: 'rgba(128, 0, 0, 0.3)',
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              perspective: 1000
            }}
            animate={{
              scale: activePanel === 'artist' ? 1.05 : 1,
              borderColor: activePanel === 'artist' ? 'rgba(128, 0, 0, 0.6)' : 'rgba(128, 0, 0, 0.3)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <img
              src="/images/hero-artist-maroon.jpg"
              alt="Rubaiat — The Artist"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Label */}
          <motion.p
            className="tracking-[0.3em] uppercase text-xs mb-3"
            style={{ color: '#800000', fontFamily: "'Inter', sans-serif" }}
            animate={{ opacity: activePanel === 'coder' ? 0.4 : 1 }}
          >
            The Artist
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-6xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#000000' }}
            animate={{
              scale: activePanel === 'artist' ? 1.05 : 1,
              opacity: activePanel === 'coder' ? 0.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Rubaiat
          </motion.h1>

          {/* Accent Line */}
          <motion.div
            className="h-0.5 mb-5"
            style={{ background: 'linear-gradient(90deg, #800000, #FF0000)' }}
            animate={{
              width: activePanel === 'artist' ? 80 : 40,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Tagline */}
          <motion.p
            className="text-lg max-w-xs leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif", color: '#525252' }}
            animate={{ opacity: activePanel === 'coder' ? 0.3 : 1 }}
          >
            Crafting visual stories through design & aesthetics
          </motion.p>

          {/* Expand hint */}
          <AnimatePresence>
            {activePanel === 'artist' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 flex items-center gap-2"
                style={{ color: '#800000' }}
              >
                <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Explore my design world
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Edge Divider */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-maroon/30 to-transparent" />
      </motion.div>

      {/* ---- RIGHT PANEL: THE CODER ---- */}
      <motion.div
        className="relative flex items-center justify-center cursor-pointer overflow-hidden"
        initial={{ flex: 1 }}
        animate={{
          flex: activePanel === 'coder' ? 2 : activePanel === 'artist' ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        onMouseEnter={() => { setActivePanel('coder'); setVariant('coder'); }}
        onMouseLeave={() => { setActivePanel(null); setVariant('default'); }}
        style={{ background: '#000000' }}
      >
        {/* Grid Pattern */}
        <div className="bg-grid-pattern absolute inset-0" />

        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 2px, rgba(255,0,0,0.03) 4px)',
          }}
        />
        <CoderBackground />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-12">
          {/* Photo */}
          <motion.div
            className="w-56 h-56 rounded-full overflow-hidden mb-8 border-4 shadow-xl"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 30px rgba(255, 0, 0, 0.1)',
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              perspective: 1000
            }}
            animate={{
              scale: activePanel === 'coder' ? 1.05 : 1,
              borderColor: activePanel === 'coder' ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)',
              boxShadow: activePanel === 'coder'
                ? '0 0 40px rgba(255, 0, 0, 0.2)'
                : '0 0 30px rgba(255, 0, 0, 0.1)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <img
              src="/images/hero-coder-ghibli-style.jpg"
              alt="Rubaiat — The Coder"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Label */}
          <motion.p
            className="tracking-[0.3em] uppercase text-xs mb-3"
            style={{ color: '#FF0000', fontFamily: "'JetBrains Mono', monospace" }}
            animate={{ opacity: activePanel === 'artist' ? 0.4 : 1 }}
          >
            {'> the_coder'}
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            animate={{
              scale: activePanel === 'coder' ? 1.05 : 1,
              opacity: activePanel === 'artist' ? 0.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Rubaiat<span className="animate-blink text-red">_</span>
          </motion.h1>

          {/* Accent Line */}
          <motion.div
            className="h-0.5 mb-5"
            style={{ background: 'linear-gradient(90deg, #FF0000, #800000)' }}
            animate={{
              width: activePanel === 'coder' ? 80 : 40,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Tagline */}
          <motion.p
            className="text-lg max-w-xs leading-relaxed"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: '#808080' }}
            animate={{ opacity: activePanel === 'artist' ? 0.3 : 1 }}
          >
            Building systems that scale & solutions that matter
          </motion.p>

          {/* Terminal decoration */}
          <AnimatePresence>
            {activePanel === 'coder' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 px-4 py-2 rounded border border-gray-800 bg-gray-950"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="text-gray-500 text-xs">$</span>
                <span className="text-red text-xs ml-2">cd</span>
                <span className="text-gray-400 text-xs ml-2">~/portfolio</span>
                <span className="animate-blink text-red text-xs ml-1">▋</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Center scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
          Scroll
        </span>
        <svg className="w-5 h-5 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default SplitHero;
