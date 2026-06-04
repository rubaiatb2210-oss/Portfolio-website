import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import InfoManager from './InfoManager';
import ProjectManager from './ProjectManager';
import PostManager from './PostManager';

const tabs = [
  { id: 'info', label: 'Site Info', icon: '📜' },
  { id: 'projects', label: 'Projects', icon: '⚔️' },
  { id: 'posts', label: 'Posts', icon: '✒️' },
];

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('info');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-16 px-4 md:px-8 relative flex flex-col justify-start items-center">
      {/* Main Parchment Paper Card Container */}
      <div 
        className="relative z-10 w-full max-w-7xl bg-parchment rounded-sm border-2 border-[#5e4530]/60 p-6 md:p-12 shadow-2xl flex-1 flex flex-col overflow-hidden"
      >
        {/* Double-line frame border effect */}
        <div className="absolute inset-1.5 border border-[#5e4530]/30 rounded-[1px] pointer-events-none" />

        {/* Vintage Background Drawings (faint opacity) */}
        {/* Vintage Pocket-watch / Astrolabe (Top Right) */}
        <div className="absolute top-10 right-10 w-48 h-48 opacity-[0.08] text-[#5e4530] pointer-events-none select-none z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
            <circle cx="50" cy="55" r="35" />
            <circle cx="50" cy="55" r="30" strokeDasharray="2,2" />
            <circle cx="50" cy="55" r="3" fill="currentColor" />
            {/* Compass rose markings */}
            <path d="M50 20 V90 M15 55 H85 M25 30 L75 80 M25 80 L75 30" />
            <path d="M50 10 V20 M50 5 H50 V10" strokeWidth="1.5" />
            <circle cx="50" cy="10" r="4" />
          </svg>
        </div>

        {/* Rolled Scroll / Parchment Outline (Bottom Right) */}
        <div className="absolute bottom-6 right-6 w-60 h-44 opacity-[0.08] text-[#5e4530] pointer-events-none select-none z-0">
          <svg className="w-full h-full" viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M10 20 C 10 10, 30 10, 30 20 V 70 C 30 80, 10 80, 10 70 Z M30 20 H 100 C 110 20, 110 30, 100 30 M30 70 H 100 C 110 70, 110 80, 100 80" />
            <path d="M100 30 V 80" />
            {/* Compass / Astrolabe inside scroll */}
            <circle cx="65" cy="55" r="18" />
            <path d="M65 37 V 73 M47 55 H 83" strokeDasharray="1,1" />
            <polygon points="65,42 68,55 65,68 62,55" fill="currentColor" fillOpacity="0.1" />
          </svg>
        </div>

        {/* Dashboard Title Block */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#5e4530]/40">
          <div>
            <h1 
              className="text-4xl md:text-5xl font-extrabold text-[#4a2c11] uppercase tracking-wider"
              style={{ fontFamily: "'Pirata One', serif" }}
            >
              Dashboard
            </h1>
            <p className="text-[#6a5342] text-xs font-serif italic mt-1">
              Admin ledger: manage site information, projects, and manuscripts
            </p>
          </div>
          
          {/* Faded Wax Stamped logout label */}
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 border border-[#5e4530]/50 bg-[#f7f1e3]/80 hover:bg-[#eddcb9] text-[#4a2c11] hover:text-[#991b1b] rounded-sm text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-sm self-start md:self-auto"
          >
            [ LOG OUT ]
          </button>
        </div>

        {/* Bookmarks / Navigation Tabs */}
        <div className="relative z-10 flex gap-2 mb-8 border-b-2 border-[#5e4530]/30 pb-0.5">
          {tabs.map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`px-5 py-2.5 rounded-t-sm text-xs md:text-sm font-bold transition-all border-t border-x tracking-wider uppercase ${
                activeTab === tab.id 
                  ? 'bg-[#eddcb8] border-[#5e4530]/50 text-[#800000] -translate-y-0.5 shadow-sm' 
                  : 'border-transparent bg-transparent text-[#6a5342] hover:text-[#2c1e16]'
              }`}
              style={{ fontFamily: "'MedievalSharp', serif" }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Sheet */}
        <div className="relative z-10 flex-1 flex flex-col">
          {activeTab === 'info' && <InfoManager />}
          {activeTab === 'projects' && <ProjectManager />}
          {activeTab === 'posts' && <PostManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
