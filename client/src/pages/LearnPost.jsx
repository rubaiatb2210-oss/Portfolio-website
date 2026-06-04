import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import api from '../lib/api';
import PosterFrame from '../components/ui/PosterFrame';

const LearnPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/posts/${slug}`).then((res) => { setPost(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 border-2 border-[#991b1b] border-t-transparent rounded-full animate-spin" /></div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center bg-black"><p className="text-gray-500 font-mono">Post not found</p></div>;

  return (
    <PosterFrame variant="learnPost">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
          {/* Back Button */}
          <Link 
            to="/learn" 
            className="inline-flex items-center gap-2 text-[#a3978c] hover:text-[#991b1b] transition-colors text-xs font-mono uppercase tracking-wider mb-8 border border-[#2a2624]/60 bg-[#1e1a17]/50 px-3 py-1.5 rounded-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            [ ESC ] BACK TO ARTICLES
          </Link>

          {/* Book Header / Monograph Detail block */}
          <div className="mb-8 border-b border-[#2a2624]/50 pb-6">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags?.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2.5 py-0.5 text-[10px] rounded-sm border border-[#991b1b]/35 bg-[#991b1b]/5 text-[#fca5a5] font-mono uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 
              className="text-3xl md:text-5xl font-extrabold text-[#f5f1ed] mb-4 leading-tight font-serif"
            >
              {post.title}
            </h1>
            
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#a3978c] uppercase tracking-widest mt-4">
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
        </motion.div>

        {/* Monograph Article Text Content */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }} 
          className="markdown-content text-[#dcd6d0] font-serif leading-relaxed text-base md:text-lg space-y-6"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter 
                    style={vscDarkPlus} 
                    language={match[1]} 
                    PreTag="div" 
                    customStyle={{ 
                      borderRadius: '4px', 
                      border: '1px solid #2a2624', 
                      background: '#0d0c0c',
                      margin: '1.5rem 0'
                    }} 
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={`${className} bg-[#1e1a17] border border-[#2a2624]/60 text-[#f87171] px-1.5 py-0.5 rounded-sm text-xs font-mono`} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {post.content || ''}
          </ReactMarkdown>
        </motion.div>
      </div>
    </PosterFrame>
  );
};

export default LearnPost;
