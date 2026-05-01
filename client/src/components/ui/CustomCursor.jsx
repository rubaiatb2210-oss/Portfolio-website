import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

const CustomCursor = () => {
  const { cursorVariant, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Using direct motion values to prevent any lag between pointer and custom cursor
  const cursorX = mouseX;
  const cursorY = mouseY;

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);



  if (!isVisible) return null;

  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      border: '0px solid transparent',
      borderRadius: '50%',
      x: '-50%',
      y: '-50%',
      mixBlendMode: 'difference'
    },
    artist: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(128, 0, 0, 0.1)',
      border: '1px solid rgba(128, 0, 0, 0.5)',
      borderRadius: '50%',
      x: '-50%',
      y: '-50%',
      mixBlendMode: 'normal'
    },
    coder: {
      width: 40,
      height: 40,
      backgroundColor: 'transparent',
      border: '2px solid #FF0000',
      borderRadius: '4px',
      x: '-50%',
      y: '-50%',
      mixBlendMode: 'normal',
      rotate: 45
    },
    project: {
      width: 80,
      height: 80,
      backgroundColor: '#800000',
      border: '0px solid transparent',
      borderRadius: '50%',
      x: '-50%',
      y: '-50%',
      mixBlendMode: 'normal'
    }
  };

  return (
    <>
      <style>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>
      <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
    >
      {cursorVariant === 'project' && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-[10px] font-bold tracking-widest uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {cursorText || 'View'}
        </motion.span>
      )}
      {cursorVariant === 'coder' && (
        <motion.div
          animate={{ rotate: -45 }}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <div className="w-1 h-1 bg-red rounded-full" />
        </motion.div>
      )}
    </motion.div>
    </>
  );
};

export default CustomCursor;
