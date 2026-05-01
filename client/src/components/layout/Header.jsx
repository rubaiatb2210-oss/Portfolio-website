import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Learn', path: '/learn' },
  { name: 'Contact', path: '/contact' },
  { name: 'Play', path: '/play' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'}`}
      initial={{ y: -100 }} animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="relative group">
          <motion.span className="text-3xl md:text-4xl font-bold tracking-tight text-maroon" style={{ fontFamily: "'Playfair Display', serif" }} whileHover={{ scale: 1.05 }}>
            Rubaiat
          </motion.span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div key={link.path} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <Link to={link.path} className={`relative text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${location.pathname === link.path ? 'text-red' : link.name === 'Play' ? 'text-gray-400 hover:text-yellow-500' : 'text-gray-400 hover:text-white'}`} style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em' }}>
                {link.name}
                {location.pathname === link.path && <motion.div className={`absolute -bottom-1 left-0 right-0 h-0.5 ${link.name === 'Play' ? 'bg-yellow-500' : 'bg-red'}`} layoutId="nav-underline" />}
              </Link>
            </motion.div>
          ))}
        </div>
        <button className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <motion.span className="w-6 h-0.5 bg-white block" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }} />
          <motion.span className="w-6 h-0.5 bg-white block" animate={{ opacity: menuOpen ? 0 : 1 }} />
          <motion.span className="w-6 h-0.5 bg-white block" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }} />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: 'spring', stiffness: 200, damping: 30 }}>
              {navLinks.map((link, i) => (
                <motion.div key={link.path} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}>
                  <Link to={link.path} className={`text-3xl font-light tracking-widest uppercase ${location.pathname === link.path ? 'text-red' : 'text-white'}`} style={{ fontFamily: "'Playfair Display', serif" }}>{link.name}</Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
