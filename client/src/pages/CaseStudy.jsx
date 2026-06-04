import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import api from '../lib/api';
import PosterFrame from '../components/ui/PosterFrame';

const CaseStudy = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/projects/${slug}`).then((res) => { setProject(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin" /></div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center bg-black"><p className="text-gray-500 font-mono">Project spec not found</p></div>;

  return (
    <PosterFrame variant="caseStudy">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
          {/* Back Button */}
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-red transition-colors text-xs font-mono uppercase tracking-wider mb-8 border border-zinc-800 bg-zinc-950/65 px-3 py-1.5 rounded-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            [ ESC ] BACK TO PORTFOLIO
          </Link>

          {/* Technical Title Block / Spec Header */}
          <div className="border border-zinc-850 bg-zinc-950/50 p-6 rounded-sm mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-zinc-900 border-l border-b border-zinc-800 text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
              DOC.REF // SPEC-{project.slug?.toUpperCase() || '00'}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags?.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2.5 py-0.5 text-[10px] rounded-sm border border-red/30 bg-red/5 text-red font-mono uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 
              className="text-4xl md:text-5xl font-extrabold text-white mb-4" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {project.title}
            </h1>
            <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="w-full h-px bg-zinc-800 mb-10" />
        </motion.div>

        {/* Project Screenshots in "Figure" Frame blocks */}
        {project.images?.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }} 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {project.images.map((img, i) => (
              <div 
                key={i} 
                className="rounded-sm border border-zinc-850 p-1.5 bg-zinc-950/40 flex flex-col gap-2 group"
              >
                <div className="overflow-hidden aspect-video bg-zinc-900 border border-zinc-900">
                  <img 
                    src={img} 
                    alt={`${project.title} screenshot ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101" 
                  />
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide px-1.5 flex justify-between">
                  <span>FIGURE 1.{i + 1} — SPECIMEN VIEW</span>
                  <span className="text-red/60">ACTIVE</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Markdown Content inside Tech-spec layout */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }} 
          className="markdown-content text-zinc-300 font-sans leading-relaxed border-t border-zinc-900 pt-8"
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
                      border: '1px solid #1a1a1a', 
                      margin: '1.5rem 0',
                      background: '#090909'
                    }} 
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={`${className} bg-zinc-900 border border-zinc-800 text-red px-1.5 py-0.5 rounded-sm text-xs font-mono`} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {project.caseStudy || ''}
          </ReactMarkdown>
        </motion.div>

        {/* System Architecture Section */}
        {project.architectureDiagram && (
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="mt-12 mb-10 border border-zinc-900 bg-zinc-950/30 p-6 rounded-sm"
          >
            <h3 
              className="text-white text-lg font-bold uppercase tracking-wider mb-4 border-b border-zinc-900 pb-2 flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 bg-red rounded-full" />
              SYSTEM ARCHITECTURE SPECIFICATION
            </h3>
            <div className="rounded-sm border border-zinc-850 overflow-hidden bg-black p-2 max-w-2xl mx-auto shadow-inner">
              <img 
                src={project.architectureDiagram} 
                alt="System Architecture" 
                className="w-full" 
              />
            </div>
            <div className="text-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-3">
              DIAGRAM 2.1 — DEPLOYMENT INFRASTRUCTURE & FLOWS
            </div>
          </motion.div>
        )}
      </div>
    </PosterFrame>
  );
};

export default CaseStudy;
