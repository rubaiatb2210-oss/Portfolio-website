import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import ProjectCard from '../components/ui/ProjectCard';
import PosterFrame from '../components/ui/PosterFrame';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [tags, setTags] = useState(['All']);

  useEffect(() => {
    api.get('/projects').then((res) => {
      setProjects(res.data);
      const allTags = new Set();
      res.data.forEach((p) => p.tags?.forEach((t) => allTags.add(t)));
      setTags(['All', ...Array.from(allTags)]);
    }).catch(() => {});
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.tags?.includes(filter));

  return (
    <PosterFrame variant="portfolio">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            <div>
              <p className="text-red text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Portfolio
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                The <span className="text-red font-serif">Portfolio</span>
              </h1>
              <div className="w-28 h-0.5 bg-red/80 mt-4" />
            </div>

            {/* Scale & Detail block reminiscent of blueprint labels */}
            <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-sm text-left font-mono text-[9px] text-slate-500 uppercase tracking-wider self-start md:self-auto">
              <div>PROJECTS INDEX</div>
              <div>DWG NO: P-01 // SCALE: 1:1</div>
              <div>REV: 2.4 // STATUS: SHARP</div>
            </div>
          </div>

          {/* Blueprint styled Filters */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-900">
            {tags.map((tag) => (
              <button 
                key={tag} 
                onClick={() => setFilter(tag)} 
                className={`px-4 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                  filter === tag 
                    ? 'bg-red text-white border-red shadow-[0_0_10px_rgba(185,28,28,0.3)]' 
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <ProjectCard 
              key={project._id} 
              project={project} 
              index={i} 
              variant="poster" 
            />
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-24 border border-dashed border-slate-850 rounded-sm bg-slate-950/20">
            <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">
              No architectural assets catalogued under "{filter}"
            </p>
          </div>
        )}
      </div>
    </PosterFrame>
  );
};

export default Portfolio;
