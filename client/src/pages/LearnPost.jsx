import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import api from '../lib/api';
import GridPattern from '../components/ui/GridPattern';

const LearnPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/posts/${slug}`).then((res) => { setPost(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 border-2 border-maroon border-t-transparent rounded-full animate-spin" /></div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center bg-black"><p className="text-gray-500">Post not found</p></div>;

  return (
    <section className="relative pt-24 pb-16 min-h-screen">
      <GridPattern />
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-12">
          <Link to="/learn" className="text-gray-500 hover:text-red text-sm flex items-center gap-2 mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Articles
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag) => <span key={tag} className="px-3 py-1 text-xs rounded-full border border-maroon/30 text-maroon">{tag}</span>)}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{post.title}</h1>
          <p className="text-gray-500 text-sm mb-8">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="w-full h-0.5 bg-gradient-to-r from-maroon via-red to-transparent mb-12" />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" customStyle={{ borderRadius: '8px', border: '1px solid #262626' }} {...props}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
              ) : <code className={className} {...props}>{children}</code>;
            }
          }}>{post.content || ''}</ReactMarkdown>
        </motion.div>
      </div>
    </section>
  );
};

export default LearnPost;
