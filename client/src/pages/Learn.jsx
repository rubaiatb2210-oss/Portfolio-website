import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import GridPattern from '../components/ui/GridPattern';

const Learn = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts').then((res) => setPosts(res.data)).catch(() => {});
  }, []);

  return (
    <section className="relative pt-24 pb-16 min-h-screen">
      <GridPattern />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-12 mb-12">
          <p className="text-maroon text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Learn</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Thoughts & <span className="text-gradient-maroon">Articles</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-maroon to-red" />
        </motion.div>
        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.div key={post._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={`/learn/${post.slug}`} className="group block p-6 rounded-lg border border-gray-800 bg-gray-950/50 hover:border-maroon/40 transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags?.map((tag) => <span key={tag} className="text-xs text-maroon">{tag}</span>)}
                    </div>
                    <h2 className="text-xl text-white font-semibold mb-2 group-hover:text-red transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>{post.title}</h2>
                    <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                    <p className="text-gray-600 text-xs mt-3">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-red transition-colors mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="text-center py-20"><p className="text-gray-500 text-lg">No articles published yet.</p></div>
        )}
      </div>
    </section>
  );
};

export default Learn;
