import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../ui/LoginModal';

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const timerRef = useRef(null);

  const handleCopyrightClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (newCount >= 3) {
      setShowLogin(true);
      setClickCount(0);
    } else {
      timerRef.current = setTimeout(() => setClickCount(0), 2000);
    }
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowLogin(true);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <>
      <footer className="relative border-t border-gray-800/50 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-white">Ru</span><span className="text-gradient-maroon">baiat</span>
              </h3>
              <p className="text-gray-500 text-sm max-w-xs">Full-Stack Developer & Product Designer crafting digital experiences.</p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Navigation</h4>
              <div className="flex flex-col gap-2">
                {['About', 'Portfolio', 'Learn', 'Contact'].map((item) => (
                  <Link key={item} to={`/${item.toLowerCase()}`} className="text-gray-500 hover:text-red text-sm transition-colors">{item}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Connect</h4>
              <div className="flex gap-4">
                {['GitHub', 'LinkedIn', 'Facebook', 'Instagram'].map((platform) => (
                  <a key={platform} href="#" className="text-gray-500 hover:text-red text-sm transition-colors">{platform}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800/50 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-xs cursor-default select-none" onClick={handleCopyrightClick}>
              © {new Date().getFullYear()} Rubaiat. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default Footer;
