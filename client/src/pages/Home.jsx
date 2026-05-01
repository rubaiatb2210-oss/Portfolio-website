import { motion } from 'framer-motion';
import SplitHero from '../components/hero/SplitHero';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import ProjectCard from '../components/ui/ProjectCard';
import GridPattern from '../components/ui/GridPattern';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((res) => setProjects(res.data.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <>
      <SplitHero />
      {/* Featured Projects */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <GridPattern />
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-maroon text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Selected Work</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Featured Projects</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-maroon to-red mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => <ProjectCard key={project._id} project={project} index={i} />)}
          </div>
          {projects.length > 0 && (
            <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link to="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-full text-gray-400 hover:text-white hover:border-maroon transition-all duration-300 text-sm tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                View All Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
