import { useState, useEffect } from 'react';
import api from '../../lib/api';
import WaxSeal from '../ui/WaxSeal';

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
      setTimeout(() => setMsg(''), 3050);
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

  const inputClass = "w-full bg-[#fbf6eb] border border-[#5e4530]/40 rounded-sm px-3.5 py-2.5 text-[#2c1e16] text-sm focus:outline-none focus:border-[#800000] focus:ring-1 focus:ring-[#800000] transition-colors font-serif shadow-inner";
  const labelClass = "text-[#4a2c11] text-xs font-bold uppercase tracking-wider mb-1.5 block font-serif";

  if (editing !== null) {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setEditing(null)} className="text-[#6a5342] hover:text-[#2c1e16] text-xs font-mono mb-4 flex items-center gap-1 cursor-pointer">← Back to Ledger</button>
        <h2 className="text-[#4a2c11] text-xl font-bold font-serif uppercase mb-6 pb-2 border-b border-[#5e4530]/20">{editing === 'new' ? 'Engrave New Project' : 'Revise Project Manuscript'}</h2>
        <div className="space-y-6">
          <div><label className={labelClass}>Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} /></div>
          <div><label className={labelClass}>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputClass} /></div>
          <div><label className={labelClass}>Tags (comma-separated)</label><input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={inputClass} placeholder="Full-Stack, React, UI/UX" /></div>
          <div>
            <label className={labelClass}>Thumbnail Image</label>
            <div className="flex flex-col gap-3">
              {form.thumbnailUrl && (
                <div className="relative w-36 h-24 rounded-sm overflow-hidden border border-[#5e4530]/40 p-1 bg-[#fbf6eb] shadow-md">
                  <img src={form.thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  <button onClick={() => setForm({ ...form, thumbnailUrl: '' })} className="absolute top-2 right-2 bg-red-800 text-white p-1 rounded-full hover:bg-[#800000] transition-colors" title="Remove Image">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={saving} className="text-[#6a5342] text-xs font-mono file:mr-4 file:py-1.5 file:px-3 file:rounded-sm file:border file:border-[#5e4530]/40 file:text-xs file:font-bold file:bg-[#f7f1e3]/80 file:text-[#4a2c11] hover:file:bg-[#eddcb9] transition-colors cursor-pointer" />
            </div>
          </div>
          <div><label className={labelClass}>Architecture Diagram URL</label><input value={form.architectureDiagram} onChange={(e) => setForm({ ...form, architectureDiagram: e.target.value })} className={inputClass} /></div>
          <div>
            <label className={labelClass}>Case Study (Markdown)</label>
            <textarea value={form.caseStudy} onChange={(e) => setForm({ ...form, caseStudy: e.target.value })} rows={12} className={inputClass + " font-mono text-xs leading-relaxed"} placeholder="## The Challenge&#10;&#10;Write your case study in Markdown..." />
          </div>
          <div className="flex items-center gap-3 py-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} id="featured" className="accent-red-850 w-4 h-4" />
            <label htmlFor="featured" className="text-[#4a2c11] text-sm font-serif font-bold">Feature this project on the home banner</label>
          </div>
          {msg && <p className={`text-sm font-serif italic ${msg.includes('Error') ? 'text-red-750' : 'text-[#800000]'}`}>{msg}</p>}
          <div className="relative inline-flex items-center gap-4 pt-4 group">
            <button onClick={handleSave} disabled={saving} className="relative z-10 px-8 py-3.5 bg-[#800000] hover:bg-[#991b1b] text-white text-xs font-bold font-mono uppercase tracking-widest rounded-sm transition-all duration-300 shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border border-[#6b1111]">{saving ? 'Transcribing...' : 'Record Project'}</button>
            <WaxSeal text="P" size="md" className="transition-transform duration-300 group-hover:scale-110 shadow-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#5e4530]/20">
        <h2 className="text-[#4a2c11] text-lg font-bold font-serif uppercase tracking-wider">Catalogued Projects ({projects.length})</h2>
        <button onClick={handleNew} className="px-4 py-2 bg-[#800000] hover:bg-[#991b1b] text-white text-xs font-mono uppercase tracking-wider rounded-sm transition-colors border border-[#6b1111] shadow-sm cursor-pointer">+ Add New Project</button>
      </div>
      <div className="divide-y divide-[#5e4530]/15">
        {projects.map((p) => (
          <div key={p._id} className="flex items-center justify-between py-4 hover:bg-[#eddcb8]/20 transition-all px-2">
            <div>
              <h3 className="text-[#2c1e16] text-base font-bold font-serif">{p.title}</h3>
              <p className="text-[#6a5342] text-xs font-mono tracking-wide mt-0.5">{p.tags?.join(' // ')}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(p)} className="px-3 py-1 border border-[#5e4530]/40 text-[#5c3a21] hover:text-white hover:bg-[#5c3a21] text-xs font-mono rounded-sm transition-colors cursor-pointer">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="px-3 py-1 border border-[#5e4530]/40 text-[#6a5342] hover:text-white hover:bg-red-800 text-xs font-mono rounded-sm transition-colors cursor-pointer">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
