import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import PosterFrame from '../components/ui/PosterFrame';

const Contact = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api.get('/info').then((res) => setInfo(res.data)).catch(() => {});
  }, []);

  return (
    <PosterFrame variant="contact">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        {/* Radar Terminal Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-10 text-left"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-emerald-950/50">
            <div>
              <p className="text-red text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Get In Touch
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Let's <span className="text-red font-serif">Connect</span>
              </h1>
              <div className="w-28 h-0.5 bg-red/80 mt-4" />
            </div>

            {/* Coordinates and Grid Reference block */}
            <div className="border border-emerald-950/60 bg-black/40 p-3 rounded-sm text-left font-mono text-[9px] text-emerald-500 uppercase tracking-widest self-start md:self-auto">
              <div>COMMUNICATION NODE // RX-90</div>
              <div>LOC: 23.8103° N, 90.4125° E</div>
              <div>STATUS: STANDBY // SCANNING...</div>
            </div>
          </div>
          <p className="text-emerald-300/70 text-base md:text-lg max-w-2xl font-light mt-6 leading-relaxed">
            Have a project in mind or just want to say hello? Establish a connection using the channels below.
          </p>
        </motion.div>

        {/* Transmission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Channels (left column) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }} 
            className="md:col-span-7 space-y-6"
          >
            {/* Email Card */}
            <div className="p-6 rounded-sm border border-emerald-950/50 bg-[#0a0f0a]/60 shadow-md relative overflow-hidden group">
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-red font-mono text-xs uppercase tracking-wider">CHANNEL 01 // EMAIL</p>
              </div>
              <a 
                href={`mailto:${info?.email || 'hello@rubaiat.dev'}`} 
                className="text-white hover:text-emerald-400 text-lg md:text-xl font-medium transition-colors break-all"
              >
                {info?.email || 'hello@rubaiat.dev'}
              </a>
            </div>

            {/* Phone Card (if available) */}
            {info?.phone && (
              <div className="p-6 rounded-sm border border-emerald-950/50 bg-[#0a0f0a]/60 shadow-md relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-sm bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="text-red font-mono text-xs uppercase tracking-wider">CHANNEL 02 // PHONE</p>
                </div>
                <p className="text-white text-lg md:text-xl font-medium">{info.phone}</p>
              </div>
            )}
          </motion.div>

          {/* Social Matrix (right column) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            className="md:col-span-5"
          >
            <div className="p-6 rounded-sm border border-emerald-950/50 bg-[#0a0f0a]/60 shadow-md">
              <h3 className="text-white text-xs font-bold font-mono mb-4 uppercase tracking-widest text-center border-b border-emerald-950/30 pb-2">
                ROUTING CHANNELS
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {info?.socialLinks && Object.entries(info.socialLinks).filter(([, v]) => v).map(([platform, url]) => (
                  <a 
                    key={platform} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between p-3 rounded-sm border border-emerald-950/30 text-emerald-300 hover:text-white hover:border-red/40 bg-black/40 transition-all font-mono text-xs uppercase"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />
                      {platform}
                    </span>
                    <span className="text-[10px] text-emerald-600">CONNECT &gt;</span>
                  </a>
                ))}
                {/* Fallback routing channels */}
                {(!info?.socialLinks || Object.keys(info.socialLinks).length === 0) && (
                  <>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-sm border border-emerald-950/30 text-emerald-300 hover:text-white hover:border-red/40 bg-black/40 transition-all font-mono text-xs uppercase">
                      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />Github</span>
                      <span className="text-[10px] text-emerald-600">CONNECT &gt;</span>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-sm border border-emerald-950/30 text-emerald-300 hover:text-white hover:border-red/40 bg-black/40 transition-all font-mono text-xs uppercase">
                      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />LinkedIn</span>
                      <span className="text-[10px] text-emerald-600">CONNECT &gt;</span>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-sm border border-emerald-950/30 text-emerald-300 hover:text-white hover:border-red/40 bg-black/40 transition-all font-mono text-xs uppercase">
                      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />Facebook</span>
                      <span className="text-[10px] text-emerald-600">CONNECT &gt;</span>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-sm border border-emerald-950/30 text-emerald-300 hover:text-white hover:border-red/40 bg-black/40 transition-all font-mono text-xs uppercase">
                      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />Instagram</span>
                      <span className="text-[10px] text-emerald-600">CONNECT &gt;</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PosterFrame>
  );
};

export default Contact;
