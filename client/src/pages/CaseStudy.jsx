import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import api from '../lib/api';
import GridPattern from '../components/ui/GridPattern';

const CaseStudy = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/projects/${slug}`).then((res) => { setProject(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 border-2 border-maroon border-t-transparent rounded-full animate-spin" /></div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center bg-black"><p className="text-gray-500">Project not found</p></div>;

  return (
    <section className="relative pt-24 pb-16 min-h-screen">
      <GridPattern />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-12">
          <Link to="/portfolio" className="text-gray-500 hover:text-red text-sm flex items-center gap-2 mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Portfolio
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tag) => <span key={tag} className="px-3 py-1 text-xs rounded-full border border-maroon/30 text-maroon">{tag}</span>)}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</h1>
          <p className="text-gray-400 text-lg mb-8">{project.description}</p>
          <div className="w-full h-0.5 bg-gradient-to-r from-maroon via-red to-transparent mb-12" />
        </motion.div>

        {/* Images */}
        {project.images?.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {project.images.map((img, i) => <img key={i} src={img} alt={`${project.title} screenshot ${i + 1}`} className="rounded-lg border border-gray-800 w-full" />)}
          </motion.div>
        )}

        {/* Case Study Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" customStyle={{ borderRadius: '8px', border: '1px solid #262626', margin: '1rem 0' }} {...props}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
              ) : <code className={className} {...props}>{children}</code>;
            }
          }}>{project.caseStudy || ''}</ReactMarkdown>
        </motion.div>

        {/* Architecture Diagram */}
        {project.architectureDiagram && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 mb-12">
            <h3 className="text-white text-xl font-semibold mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>System Architecture</h3>
            <div className="rounded-lg border border-gray-800 overflow-hidden bg-gray-950 p-4">
              <img src={project.architectureDiagram} alt="System Architecture" className="w-full" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CaseStudy;
