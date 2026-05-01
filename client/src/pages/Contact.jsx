import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import GridPattern from '../components/ui/GridPattern';

const Contact = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api.get('/info').then((res) => setInfo(res.data)).catch(() => {});
  }, []);

  return (
    <section className="relative pt-24 pb-16 min-h-screen">
      <GridPattern />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-12 mb-12">
          <p className="text-maroon text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Get In Touch</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Let's <span className="text-gradient-maroon">Connect</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-maroon to-red mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl">Have a project in mind or just want to say hello? I'd love to hear from you.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <div className="p-6 rounded-lg border border-gray-800 bg-gray-950/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-maroon/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Email</p>
              </div>
              <a href={`mailto:${info?.email || 'hello@rubaiat.dev'}`} className="text-white hover:text-red transition-colors">{info?.email || 'hello@rubaiat.dev'}</a>
            </div>
            {info?.phone && (
              <div className="p-6 rounded-lg border border-gray-800 bg-gray-950/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-maroon/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Phone</p>
                </div>
                <p className="text-white">{info.phone}</p>
              </div>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div className="p-6 rounded-lg border border-gray-800 bg-gray-950/50">
              <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Social Links</h3>
              <div className="grid grid-cols-2 gap-3">
                {info?.socialLinks && Object.entries(info.socialLinks).filter(([, v]) => v).map(([platform, url]) => (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded border border-gray-800 text-gray-400 hover:text-red hover:border-maroon/40 transition-all text-sm capitalize">
                    <span className="w-1.5 h-1.5 rounded-full bg-maroon" />{platform}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
