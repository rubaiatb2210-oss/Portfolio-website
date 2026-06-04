import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { useCursor } from '../../context/CursorContext';

const ProjectCard = ({ project, index, variant = 'default' }) => {
  const { setVariant } = useCursor();
  const cardRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const isPoster = variant === 'poster';

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setVariant('default');
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setVariant('project', 'VIEW')}
    >
      <Link to={`/portfolio/${project.slug}`} className="group block">
        {isPoster ? (
          // Poster/Technical Card design
          <div className="relative overflow-hidden rounded-sm border border-slate-800 bg-[#12151a] p-1 transition-all duration-500 group-hover:border-red group-hover:shadow-[0_0_20px_rgba(185,28,28,0.15)]">
            {/* Fine drafting-lines in the card corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative overflow-hidden aspect-video bg-slate-950">
              {project.thumbnailUrl && !imageError ? (
                <img src={project.thumbnailUrl} alt={project.title} onError={() => setImageError(true)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 p-4 text-center">
                  <span className="text-slate-400 text-xl font-bold font-serif">{project.title}</span>
                </div>
              )}
              {/* Overlay with technical drawing details */}
              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-slate-900/90 border border-slate-800 text-[8px] font-mono text-slate-500">
                DWG.{index + 1}
              </div>
            </div>

            <div className="p-4 bg-slate-950/40 mt-1 border-t border-slate-900">
              <h3 className="text-white text-base font-bold mb-1.5 group-hover:text-red transition-colors font-serif">{project.title}</h3>
              <p className="text-slate-400 text-xs font-light line-clamp-2 mb-3 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags?.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] rounded-sm border border-slate-800 bg-slate-900/60 text-slate-400 group-hover:border-red/30 group-hover:text-red transition-colors font-mono uppercase">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Default styling
          <div className="relative overflow-hidden rounded-lg border border-gray-800 bg-gray-950 transition-all duration-500 group-hover:border-maroon/50 group-hover:shadow-lg group-hover:shadow-maroon/10">
            <div className="aspect-video bg-gray-900 overflow-hidden">
              {project.thumbnailUrl && !imageError ? (
                <img src={project.thumbnailUrl} alt={project.title} onError={() => setImageError(true)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-center">
                  <span className="text-gray-400 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="p-5">
              <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-red transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>{project.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs rounded-full border border-gray-700 text-gray-400 group-hover:border-maroon/40 group-hover:text-maroon transition-colors">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
