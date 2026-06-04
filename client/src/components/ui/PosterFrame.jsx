import { motion } from 'framer-motion';

// Metallic Screw / Rivet component
const ScrewRivet = ({ className }) => (
  <div className={`absolute w-3.5 h-3.5 rounded-full bg-gradient-to-br from-neutral-300 via-neutral-500 to-neutral-700 border border-neutral-950 shadow-[inset_1.5px_1.5px_2px_rgba(255,255,255,0.45),1px_2px_4px_rgba(0,0,0,0.8)] z-30 flex items-center justify-center pointer-events-none ${className}`}>
    {/* Flathead screw slot rotated for realism */}
    <div className="w-2 h-[1.5px] bg-neutral-900/90 rotate-[35deg]" />
  </div>
);

// Blueprint Illustrations for each page
const BlueprintBackground = ({ variant }) => {
  if (variant === 'about') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-[0.06] dark:opacity-[0.09] transition-opacity duration-500">
        {/* Drafting Compass (Top Right) */}
        <svg className="absolute top-10 right-10 w-44 h-44 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M50 12 L32 75 M50 12 L68 75 M40 45 L60 45 M35 55 A20 20 0 0 0 65 55" />
          <circle cx="50" cy="12" r="3" fill="currentColor" />
          <path d="M32 75 L30 80 M68 75 L70 80" />
        </svg>

        {/* Wireframe Layout (Middle Left) */}
        <svg className="absolute top-[35%] left-10 w-48 h-36 text-white" viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="5" y="5" width="110" height="80" rx="3" />
          <path d="M5 25 L115 25 M5 70 L115 70 M30 25 L30 70 M85 25 L85 70" />
          <line x1="5" y1="5" x2="115" y2="85" strokeDasharray="2,2" />
          <line x1="115" y1="5" x2="5" y2="85" strokeDasharray="2,2" />
          <circle cx="17" cy="15" r="4" />
          <rect x="40" y="35" width="40" height="20" />
        </svg>

        {/* Drafting Grid (Middle Center) */}
        <svg className="absolute top-[40%] left-[45%] -translate-x-1/2 w-88 h-88 text-white" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="20" />
          <path d="M20 100 L180 100 M100 20 L100 180 M43.4 43.4 L156.6 156.6 M43.4 156.6 L156.6 43.4" />
          <path d="M40 40 H160 V160 H40 Z" strokeDasharray="2,2" />
        </svg>

        {/* Pencil Outline (Middle Right) */}
        <svg className="absolute top-[30%] right-12 w-20 h-44 text-white rotate-[15deg]" viewBox="0 0 40 120" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M15 10 H25 V100 L20 115 L15 100 Z M15 30 H25 M15 90 H25" />
          <path d="M18 110 L22 110" />
        </svg>

        {/* Circuit Traces (Bottom Left) */}
        <svg className="absolute bottom-10 left-10 w-64 h-64 text-white" viewBox="0 0 150 150" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M20 130 H60 L80 110 V70 L100 50 H130" />
          <path d="M20 90 H45 L65 70 V30 H110" strokeDasharray="2,2" />
          <path d="M60 130 L70 140 H110" />
          <circle cx="20" cy="130" r="3" fill="currentColor" />
          <circle cx="20" cy="90" r="3" fill="currentColor" />
          <circle cx="130" cy="50" r="3" fill="currentColor" />
          <circle cx="110" cy="30" r="3" fill="currentColor" />
          <circle cx="110" cy="140" r="3" fill="currentColor" />
        </svg>

        {/* Monitor Screen Wireframe (Bottom Right) */}
        <svg className="absolute bottom-10 right-10 w-44 h-36 text-white" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="10" y="10" width="80" height="50" rx="4" />
          <rect x="15" y="15" width="70" height="40" rx="1" />
          <path d="M40 60 L30 75 H70 L60 60 Z" />
          <circle cx="50" cy="67" r="2" />
        </svg>
      </div>
    );
  }

  if (variant === 'portfolio') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-[0.05] dark:opacity-[0.08] transition-opacity duration-500">
        {/* Isometric Grids (Top Left & Bottom Right) */}
        <svg className="absolute top-12 left-12 w-64 h-64 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M0 20 L50 45 L100 20 M50 45 V100 M0 50 L50 75 L100 50 M0 80 L50 100 L100 80" />
          <path d="M0 20 V80 M100 20 V80" strokeDasharray="2,2" />
        </svg>
        <svg className="absolute bottom-12 right-12 w-80 h-80 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M50 0 L100 25 V75 L50 100 L0 75 V25 Z M50 0 V100 M0 25 L50 50 L100 25 M0 75 L50 50 L100 75" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>

        {/* Set-square & Protractor drafting marks */}
        <svg className="absolute top-16 right-16 w-52 h-52 text-white" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M10 110 L110 110 L10 10 Z" />
          <path d="M25 100 L90 100 L25 35 Z" strokeDasharray="1,1" />
          <circle cx="10" cy="110" r="5" />
          <path d="M40 110 A30 30 0 0 0 10 80" strokeDasharray="3,3" />
        </svg>

        {/* Coordinate grids & dimension markings */}
        <svg className="absolute bottom-20 left-16 w-44 h-44 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M10 10 V90 H90" />
          <path d="M10 10 H8 M10 30 H8 M10 50 H8 M10 70 H8 M10 90 H8" />
          <path d="M30 90 V92 M50 90 V92 M70 90 V92 M90 90 V92" />
          <path d="M10 90 L80 20" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="80" cy="20" r="3.5" fill="currentColor" />
          <text x="15" y="25" fill="currentColor" className="text-[6px] font-mono">SCALE 1:1</text>
        </svg>
      </div>
    );
  }

  if (variant === 'caseStudy') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-[0.05] dark:opacity-[0.08] transition-opacity duration-500">
        {/* Technical Callout and Spec Grid */}
        <svg className="absolute top-16 right-16 w-72 h-56 text-white" viewBox="0 0 150 120" fill="none" stroke="currentColor" strokeWidth="0.7">
          <rect x="10" y="10" width="130" height="100" />
          <line x1="10" y1="35" x2="140" y2="35" />
          <line x1="10" y1="85" x2="140" y2="85" />
          <line x1="75" y1="10" x2="75" y2="110" strokeDasharray="2,2" />
          <circle cx="35" cy="60" r="15" />
          <circle cx="115" cy="60" r="15" />
          <line x1="35" y1="60" x2="115" y2="60" />
          <path d="M35 60 L20 20 H5" />
          <text x="8" y="17" fill="currentColor" className="text-[6px] font-mono">SPEC.01</text>
          <text x="90" y="117" fill="currentColor" className="text-[6px] font-mono">SYS.REV.02A</text>
        </svg>

        {/* Database schematic / System graph blueprint */}
        <svg className="absolute bottom-20 left-12 w-64 h-64 text-white" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.8">
          {/* Box 1 */}
          <rect x="5" y="15" width="30" height="25" rx="1" />
          <path d="M5 23 H35 M5 31 H35" />
          {/* Box 2 */}
          <rect x="85" y="15" width="30" height="25" rx="1" />
          <path d="M85 23 H115" />
          {/* Box 3 */}
          <rect x="45" y="70" width="30" height="30" rx="1" />
          <path d="M45 78 H75 M45 86 H75 M45 94 H75" />
          {/* Connectors */}
          <path d="M35 27 H85" />
          <path d="M20 40 V55 H45" strokeDasharray="2,2" />
          <path d="M100 40 V55 H75" />
          <circle cx="20" cy="27" r="1.5" fill="currentColor" />
          <circle cx="100" cy="27" r="1.5" fill="currentColor" />
          <circle cx="60" cy="70" r="1.5" fill="currentColor" />
        </svg>
      </div>
    );
  }

  if (variant === 'learn') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-[0.05] dark:opacity-[0.08] transition-opacity duration-500">
        {/* Typewriter Outline (Top Right) */}
        <svg className="absolute top-16 right-16 w-52 h-44 text-white" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M20 50 H80 L85 70 H15 Z M30 30 H70 V50 H30 Z M25 35 H75 M25 42 H75" />
          <circle cx="50" cy="15" r="8" strokeDasharray="2,2" />
          <path d="M32 58 H68 M28 64 H72" />
          {/* Keys */}
          <circle cx="25" cy="74" r="2" /><circle cx="35" cy="74" r="2" /><circle cx="45" cy="74" r="2" />
          <circle cx="55" cy="74" r="2" /><circle cx="65" cy="74" r="2" /><circle cx="75" cy="74" r="2" />
        </svg>

        {/* Editorial Grids & Newspaper layout template */}
        <svg className="absolute bottom-20 left-12 w-60 h-80 text-white" viewBox="0 0 100 130" fill="none" stroke="currentColor" strokeWidth="0.6">
          <rect x="5" y="5" width="90" height="120" />
          <line x1="5" y1="20" x2="95" y2="20" strokeWidth="1.2" />
          <line x1="5" y1="25" x2="95" y2="25" />
          {/* Columns */}
          <line x1="33" y1="25" x2="33" y2="115" />
          <line x1="66" y1="25" x2="66" y2="115" />
          <rect x="10" y="35" width="18" height="15" />
          <path d="M10 60 H28 M10 65 H28 M10 70 H28 M10 75 H28" strokeDasharray="1,1" />
          <path d="M38 35 H60 M38 40 H60 M38 45 H60 M38 50 H60 M38 55 H60" strokeDasharray="1,1" />
          <path d="M71 35 H90 M71 40 H90 M71 45 H90 M71 50 H90" strokeDasharray="1,1" />
        </svg>
      </div>
    );
  }

  if (variant === 'learnPost') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-[0.05] dark:opacity-[0.08] transition-opacity duration-500">
        {/* Monograph layout markings & book details */}
        <svg className="absolute top-16 right-16 w-48 h-48 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M10 10 H90 V90 H10 Z" />
          <path d="M15 15 H85 V85 H15 Z" strokeDasharray="1,1" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <circle cx="50" cy="50" r="10" />
          <path d="M45 50 L55 50 M50 45 L50 55" />
          <text x="18" y="24" fill="currentColor" className="text-[5px] font-mono">LIB.PLATE</text>
        </svg>

        {/* Vintage Desk Lamp Outline */}
        <svg className="absolute bottom-20 left-12 w-40 h-56 text-white" viewBox="0 0 60 90" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M15 80 H45 V85 H15 Z" />
          <path d="M30 80 V50 C30 40 45 40 45 25" />
          <path d="M35 25 C35 15 25 15 25 25 Z" />
          <path d="M20 25 L40 25 L45 35 L15 35 Z" fill="currentColor" fillOpacity="0.05" />
          <circle cx="30" cy="50" r="2.5" fill="currentColor" />
        </svg>
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-[0.05] dark:opacity-[0.08] transition-opacity duration-500">
        {/* Radar Circular Sweeps */}
        <svg className="absolute top-12 right-12 w-64 h-64 text-white" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.7">
          <circle cx="60" cy="60" r="50" />
          <circle cx="60" cy="60" r="35" />
          <circle cx="60" cy="60" r="20" />
          <line x1="10" y1="60" x2="110" y2="60" />
          <line x1="60" y1="10" x2="60" y2="110" />
          <line x1="60" y1="60" x2="95" y2="25" strokeWidth="1.2" />
          {/* Radar blips */}
          <circle cx="85" cy="40" r="2.5" fill="currentColor" className="animate-pulse" />
          <circle cx="40" cy="80" r="1.5" fill="currentColor" />
        </svg>

        {/* Postal Stamp & Map Coordinates */}
        <svg className="absolute bottom-20 left-12 w-52 h-44 text-white" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="5" y="5" width="40" height="30" strokeDasharray="3,2" />
          <circle cx="25" cy="20" r="8" strokeDasharray="1,1" />
          <line x1="15" y1="20" x2="35" y2="20" />
          <line x1="25" y1="10" x2="25" y2="30" />
          <text x="8" y="47" fill="currentColor" className="text-[5px] font-mono">LAT: 23° 48' N</text>
          <text x="8" y="55" fill="currentColor" className="text-[5px] font-mono">LNG: 90° 24' E</text>
        </svg>
      </div>
    );
  }

  if (variant === 'play') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-[0.05] dark:opacity-[0.09] transition-opacity duration-500">
        {/* Retro Joystick Controller Sketch */}
        <svg className="absolute top-16 right-16 w-44 h-48 text-white" viewBox="0 0 80 90" fill="none" stroke="currentColor" strokeWidth="0.8">
          {/* Base */}
          <rect x="15" y="50" width="50" height="30" rx="3" />
          {/* Buttons */}
          <circle cx="28" cy="65" r="4.5" />
          <circle cx="52" cy="60" r="4" />
          <circle cx="52" cy="72" r="4" />
          {/* Stick */}
          <path d="M40 50 V20" strokeWidth="2.5" />
          <circle cx="40" cy="15" r="9" fill="currentColor" fillOpacity="0.1" strokeWidth="1.2" />
        </svg>

        {/* Digital Vector Coordinate Grid */}
        <svg className="absolute bottom-16 left-12 w-64 h-64 text-white" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.5">
          <line x1="0" y1="20" x2="120" y2="20" />
          <line x1="0" y1="40" x2="120" y2="40" />
          <line x1="0" y1="60" x2="120" y2="60" />
          <line x1="0" y1="80" x2="120" y2="80" />
          <line x1="0" y1="100" x2="120" y2="100" />
          <line x1="20" y1="0" x2="20" y2="120" />
          <line x1="40" y1="0" x2="40" y2="120" />
          <line x1="60" y1="0" x2="60" y2="120" />
          <line x1="80" y1="0" x2="80" y2="120" />
          <line x1="100" y1="0" x2="100" y2="120" />
          <path d="M40 40 L60 80 L80 40 Z" strokeWidth="1.5" />
          <circle cx="60" cy="80" r="3" fill="currentColor" />
        </svg>
      </div>
    );
  }

  return null;
};

// Poster colors, borders, and accents configuration
const posterThemes = {
  about: {
    bgClass: 'bg-[#121212] text-neutral-200',
    borderClass: 'border-neutral-800/80',
    accentGlow: 'rgba(128, 0, 0, 0.08)',
  },
  portfolio: {
    bgClass: 'bg-[#0c0f12] text-slate-200',
    borderClass: 'border-slate-800/80',
    accentGlow: 'rgba(185, 28, 28, 0.08)',
  },
  caseStudy: {
    bgClass: 'bg-[#0d0d0d] text-zinc-200',
    borderClass: 'border-zinc-800/80',
    accentGlow: 'rgba(255, 0, 0, 0.06)',
  },
  learn: {
    bgClass: 'bg-[#151515] text-neutral-300',
    borderClass: 'border-neutral-800/70',
    accentGlow: 'rgba(128, 0, 0, 0.06)',
  },
  learnPost: {
    bgClass: 'bg-[#131110] text-[#dcd6d0]',
    borderClass: 'border-[#2a2624]/60',
    accentGlow: 'rgba(153, 27, 27, 0.05)',
  },
  contact: {
    bgClass: 'bg-[#0e110e] text-emerald-100',
    borderClass: 'border-emerald-950/60',
    accentGlow: 'rgba(16, 185, 129, 0.05)',
  },
  play: {
    bgClass: 'bg-[#050505] text-[#eab308]',
    borderClass: 'border-yellow-950/60',
    accentGlow: 'rgba(234, 179, 8, 0.04)',
  },
};

const PosterFrame = ({ children, variant = 'about', className = '' }) => {
  const theme = posterThemes[variant] || posterThemes.about;

  return (
    <section className={`relative pt-24 pb-16 min-h-screen w-full flex flex-col justify-between overflow-hidden transition-colors duration-500 ${theme.bgClass} ${className}`}>
      {/* Blueprint Drawing Overlay */}
      <BlueprintBackground variant={variant} />

      {/* Background Accent Glow */}
      <div
        className="absolute rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${theme.accentGlow.replace('0.08', '0.4').replace('0.06', '0.3').replace('0.05', '0.25').replace('0.04', '0.2')}, transparent)`,
          top: '20%',
          left: '10%',
        }}
      />

      {/* Main Poster Container Card */}
      <div className={`relative z-10 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl mx-auto flex-1 flex flex-col rounded-sm border-2 p-6 md:p-12 shadow-2xl ${theme.borderClass}`}>
        {/* Double Border Frame effect */}
        <div className="absolute inset-1.5 border border-neutral-700/20 rounded-[1px] pointer-events-none" />

        {/* 4 Screws in the Corners */}
        <ScrewRivet className="top-3.5 left-3.5" />
        <ScrewRivet className="top-3.5 right-3.5" />
        <ScrewRivet className="bottom-3.5 left-3.5" />
        <ScrewRivet className="bottom-3.5 right-3.5" />

        {/* Center Masthead (Title) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center pt-2 pb-6 flex flex-col items-center select-none"
        >
          <span
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-red font-serif"
            style={{ color: '#800000' }}
          >
            Rubaiat
          </span>
          {/* Subtle line under masthead */}
          <div className="w-12 h-[1px] bg-red/30 mt-1" />
        </motion.div>

        {/* Content area */}
        <div className="flex-1 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default PosterFrame;
