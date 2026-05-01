import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import GridPattern from '../components/ui/GridPattern';

const About = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api.get('/info').then((res) => setInfo(res.data)).catch(() => {});
  }, []);

  return (
    <section className="relative pt-24 pb-16 min-h-screen">
      <GridPattern />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="pt-12">
          <p className="text-maroon text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>About Me</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            The <span className="text-gradient-maroon">Creator</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-maroon to-red mb-8" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              {info?.aboutText || 'I am a multidisciplinary creator who bridges the gap between design and engineering. With a passion for building digital products that are both beautiful and functional, I craft experiences that leave a lasting impression.'}
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="border-l-2 border-maroon/30 pl-4">
                <h3 className="text-white font-semibold mb-1">Location</h3>
                <p className="text-gray-400">Earth</p>
              </div>
              <div className="border-l-2 border-maroon/30 pl-4">
                <h3 className="text-white font-semibold mb-1">Email</h3>
                <a href={`mailto:${info?.email || 'hello@rubaiat.dev'}`} className="text-gray-400 hover:text-red transition-colors">{info?.email || 'hello@rubaiat.dev'}</a>
              </div>
            </div>
            <div className="mt-8">
              <a 
                href={info?.resumeUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded text-black dark:text-white hover:border-maroon transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
              <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Connect</h3>
              <div className="flex flex-col gap-3">
                {info?.socialLinks && Object.entries(info.socialLinks).filter(([, v]) => v).map(([platform, url]) => (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red text-sm capitalize transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-maroon" />{platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
