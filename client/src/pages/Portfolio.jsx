import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import ProjectCard from '../components/ui/ProjectCard';
import GridPattern from '../components/ui/GridPattern';

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
    <section className="relative pt-24 pb-16 min-h-screen">
      <GridPattern />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-12 mb-12">
          <p className="text-maroon text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Portfolio</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The <span className="text-gradient-maroon">Portfolio</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-maroon to-red mb-8" />
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button key={tag} onClick={() => setFilter(tag)} className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 border ${filter === tag ? 'bg-maroon text-white border-maroon' : 'border-gray-700 text-gray-400 hover:border-maroon/50 hover:text-white'}`}>
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => <ProjectCard key={project._id} project={project} index={i} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No projects found with tag "{filter}"</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
