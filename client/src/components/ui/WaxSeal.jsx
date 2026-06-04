import { motion } from 'framer-motion';

const WaxSeal = ({ className = '', text = 'R', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-3xl'
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`relative rounded-full bg-gradient-to-br from-[#800000] via-[#7a1818] to-[#500c0c] border border-[#400505] shadow-[1px_2px_4px_rgba(0,0,0,0.6),inset_1px_1.5px_2px_rgba(255,255,255,0.35),inset_-1px_-1.5px_3px_rgba(0,0,0,0.8)] flex items-center justify-center select-none cursor-pointer shrink-0 ${currentSize} ${className}`}
      style={{
        // Slightly irregular organic circle shape
        borderRadius: '52% 48% 54% 46% / 48% 54% 46% 52%'
      }}
    >
      {/* Inner circular ridge */}
      <div 
        className="absolute inset-1.5 rounded-full border border-dashed border-[#400505] opacity-50"
        style={{
          borderRadius: '50% 48% 52% 48% / 48% 52% 48% 52%'
        }}
      />

      {/* Embossed Initial */}
      <span 
        className="font-extrabold text-[#fca5a5]/80 drop-shadow-[1px_2.5px_1px_rgba(0,0,0,0.95)] transform -translate-y-[0.5px]"
        style={{ 
          fontFamily: "'Pirata One', 'MedievalSharp', serif"
        }}
      >
        {text}
      </span>
    </motion.div>
  );
};

export default WaxSeal;
