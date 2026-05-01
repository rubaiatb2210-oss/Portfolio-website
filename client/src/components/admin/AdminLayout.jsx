import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import InfoManager from './InfoManager';
import ProjectManager from './ProjectManager';
import PostManager from './PostManager';

const tabs = [
  { id: 'info', label: 'Site Info', icon: '📋' },
  { id: 'projects', label: 'Projects', icon: '📦' },
  { id: 'posts', label: 'Posts', icon: '📝' },
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
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage your portfolio content</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 border border-gray-700 rounded text-gray-400 hover:text-red hover:border-red/50 text-sm transition-colors">Logout</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-800 pb-4">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-t text-sm transition-colors ${activeTab === tab.id ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}>
              <span className="mr-2">{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'info' && <InfoManager />}
        {activeTab === 'projects' && <ProjectManager />}
        {activeTab === 'posts' && <PostManager />}
      </div>
    </div>
  );
};

export default AdminLayout;
