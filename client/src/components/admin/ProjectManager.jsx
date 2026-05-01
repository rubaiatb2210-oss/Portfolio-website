import { useState, useEffect } from 'react';
import api from '../../lib/api';

const emptyProject = { title: '', description: '', tags: '', thumbnailUrl: '', caseStudy: '', architectureDiagram: '', featured: false };

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => api.get('/projects').then((res) => setProjects(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleEdit = (p) => {
    setEditing(p._id);
    setForm({ ...p, tags: p.tags?.join(', ') || '' });
  };

  const handleNew = () => {
    setEditing('new');
    setForm(emptyProject);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSaving(true);
    setMsg('Uploading image...');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setForm({ ...form, thumbnailUrl: res.data.url });
      setMsg('Image uploaded!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Error uploading image: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    const data = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) };
    try {
      if (editing === 'new') {
        await api.post('/projects', data);
      } else {
        await api.put(`/projects/${editing}`, data);
      }
      setEditing(null);
      load();
      setMsg('Saved!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try { await api.delete(`/projects/${id}`); load(); } catch {}
  };

  const inputClass = "w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-red transition-colors";
  const labelClass = "text-gray-400 text-xs uppercase tracking-wider mb-1 block";

  if (editing !== null) {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-1">← Back</button>
        <h2 className="text-white text-lg mb-4">{editing === 'new' ? 'New Project' : 'Edit Project'}</h2>
        <div className="space-y-4">
          <div><label className={labelClass}>Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} /></div>
          <div><label className={labelClass}>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputClass} /></div>
          <div><label className={labelClass}>Tags (comma-separated)</label><input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={inputClass} placeholder="Full-Stack, React, UI/UX" /></div>
          <div>
            <label className={labelClass}>Thumbnail Image</label>
            <div className="flex flex-col gap-2">
              {form.thumbnailUrl && (
                <div className="relative w-32 h-32 rounded overflow-hidden border border-gray-700">
                  <img src={form.thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  <button onClick={() => setForm({ ...form, thumbnailUrl: '' })} className="absolute top-1 right-1 bg-red text-white p-1 rounded-full hover:bg-maroon transition-colors" title="Remove Image">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={saving} className="text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 transition-colors" />
            </div>
          </div>
          <div><label className={labelClass}>Architecture Diagram URL</label><input value={form.architectureDiagram} onChange={(e) => setForm({ ...form, architectureDiagram: e.target.value })} className={inputClass} /></div>
          <div>
            <label className={labelClass}>Case Study (Markdown)</label>
            <textarea value={form.caseStudy} onChange={(e) => setForm({ ...form, caseStudy: e.target.value })} rows={12} className={inputClass + " font-mono text-xs"} placeholder="## The Challenge&#10;&#10;Write your case study in Markdown..." />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} id="featured" className="accent-red" />
            <label htmlFor="featured" className="text-gray-400 text-sm">Featured Project</label>
          </div>
          {msg && <p className={`text-sm ${msg.includes('Error') ? 'text-red' : 'text-green-500'}`}>{msg}</p>}
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-maroon hover:bg-red text-white text-sm rounded transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save Project'}</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg">Projects ({projects.length})</h2>
        <button onClick={handleNew} className="px-4 py-2 bg-maroon hover:bg-red text-white text-sm rounded transition-colors">+ New Project</button>
      </div>
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p._id} className="flex items-center justify-between p-4 border border-gray-800 rounded bg-gray-950">
            <div>
              <h3 className="text-white text-sm font-medium">{p.title}</h3>
              <p className="text-gray-500 text-xs">{p.tags?.join(', ')}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="px-3 py-1 border border-gray-700 text-gray-400 hover:text-white text-xs rounded transition-colors">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="px-3 py-1 border border-gray-700 text-gray-400 hover:text-red text-xs rounded transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
