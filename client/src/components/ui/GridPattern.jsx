const GridPattern = ({ variant = 'dark' }) => {
  const isDark = variant === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`grid-${variant}`}
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke={isDark ? 'rgba(128, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.05)'}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${variant})`} />
      </svg>

      {/* Accent glow */}
      <div
        className="absolute rounded-full blur-3xl opacity-10"
        style={{
          width: '400px',
          height: '400px',
          background: isDark
            ? 'radial-gradient(circle, #800000, transparent)'
            : 'radial-gradient(circle, #FF0000, transparent)',
          top: '10%',
          right: '-10%',
        }}
      />
    </div>
  );
};

export default GridPattern;
