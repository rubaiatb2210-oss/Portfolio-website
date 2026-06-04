import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import PosterFrame from '../components/ui/PosterFrame';

const About = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api.get('/info').then((res) => setInfo(res.data)).catch(() => {});
  }, []);

  return (
    <PosterFrame variant="about">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        {/* About Me Title */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.2 }} 
          className="mb-8"
        >
          <p 
            className="text-red text-xs font-bold tracking-[0.2em] uppercase mb-2" 
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            About Me
          </p>
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4" 
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The <span className="text-red font-serif">Creator</span>
          </h1>
          <div className="w-28 h-0.5 bg-red/80 mb-6" />
        </motion.div>

        {/* Content Body */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.6 }} 
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
        >
          {/* Main text & details (left column) */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            <p 
              className="text-neutral-300 text-base md:text-lg leading-relaxed font-light" 
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {info?.aboutText || 'I am a multidisciplinary creator who bridges the gap between design and engineering. With a passion for building digital products that are both beautiful and functional, I craft experiences that leave a lasting impression. My work spans from pixel-perfect interfaces to scalable backend architectures.'}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-800/40">
              <div className="border-l-2 border-red/60 pl-4">
                <h3 className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Location:</h3>
                <p className="text-white text-base md:text-lg font-medium">Earth</p>
              </div>
              <div className="border-l-2 border-red/60 pl-4">
                <h3 className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-1">Email:</h3>
                <a 
                  href={`mailto:${info?.email || 'hello@rubaiat.dev'}`} 
                  className="text-white hover:text-red transition-colors text-base md:text-lg font-medium break-all"
                >
                  {info?.email || 'hello@rubaiat.dev'}
                </a>
              </div>
            </div>

            {/* Resume Button */}
            <div className="pt-4">
              <a 
                href={info?.resumeUrl || '#'}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-neutral-900/90 border border-neutral-800 rounded hover:border-red hover:bg-neutral-800 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Social connect box (right column) */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="bg-[#181818]/60 border border-neutral-800/80 rounded-md p-6 shadow-lg backdrop-blur-sm">
              <h3 className="text-white text-sm font-extrabold mb-4 uppercase tracking-widest text-center border-b border-neutral-800/60 pb-2">
                CONNECT
              </h3>
              <div className="flex flex-col gap-4">
                {info?.socialLinks && Object.entries(info.socialLinks).filter(([, v]) => v).map(([platform, url]) => (
                  <a 
                    key={platform} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-neutral-400 hover:text-white text-sm capitalize transition-colors flex items-center gap-3 font-medium py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />
                    {platform}
                  </a>
                ))}
                {/* Fallback social links if database is empty */}
                {(!info?.socialLinks || Object.keys(info.socialLinks).length === 0) && (
                  <>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-3 font-medium py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />Github
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-3 font-medium py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />LinkedIn
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-3 font-medium py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />Facebook
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-3 font-medium py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />Instagram
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PosterFrame>
  );
};

export default About;
