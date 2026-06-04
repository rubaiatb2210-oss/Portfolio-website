import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import PosterFrame from '../components/ui/PosterFrame';

const Learn = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts').then((res) => setPosts(res.data)).catch(() => {});
  }, []);

  return (
    <PosterFrame variant="learn">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        {/* Newspaper Masthead Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-10 text-left"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b-2 border-neutral-800">
            <div>
              <p className="text-red text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Learn
              </p>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Thoughts & <span className="text-red font-serif">Articles</span>
              </h1>
            </div>

            {/* Editorial Label Box */}
            <div className="border border-neutral-800 bg-neutral-900/50 p-3 rounded-sm text-left font-mono text-[9px] text-neutral-500 uppercase tracking-widest self-start md:self-auto">
              <div>SECTION: CODER & ARTIST</div>
              <div>ISSUE NO. 12 // MONTHLY PRINT</div>
              <div>VER: PUBLIC // DIST: DIGITAL</div>
            </div>
          </div>
        </motion.div>

        {/* Article Clippings List */}
        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.div 
              key={post._id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={`/learn/${post.slug}`} 
                className="group block p-6 rounded-sm border border-neutral-800/80 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-red/40 transition-all duration-300 shadow-md relative overflow-hidden"
              >
                {/* Vintage column layout grid line */}
                <div className="absolute top-0 left-0 w-[2px] h-full bg-red/40 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags?.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-mono text-red uppercase tracking-wider border border-red/20 bg-red/5 px-2 py-0.5 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 
                      className="text-xl md:text-2xl text-white font-bold mb-2 group-hover:text-red transition-colors font-serif"
                    >
                      {post.title}
                    </h2>
                    
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2 font-light">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-4 text-[10px] font-mono text-neutral-500">
                      <span>BY RUBAIAT</span>
                      <span>•</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>

                  <svg 
                    className="w-5 h-5 text-neutral-600 group-hover:text-red transition-colors mt-1 shrink-0 transform group-hover:translate-x-1 duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-24 border border-dashed border-neutral-800/80 rounded-sm bg-neutral-900/10">
            <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">
              No editorial pieces compiled for this issue.
            </p>
          </div>
        )}
      </div>
    </PosterFrame>
  );
};

export default Learn;
