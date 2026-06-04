import { useState, useEffect } from 'react';
import api from '../../lib/api';
import WaxSeal from '../ui/WaxSeal';

const emptyPost = { title: '', content: '', excerpt: '', coverImage: '', tags: '', published: false };

const PostManager = () => {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPost);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => api.get('/posts?all=true').then((res) => setPosts(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleEdit = (p) => {
    setEditing(p._id);
    setForm({ ...p, tags: p.tags?.join(', ') || '' });
  };

  const handleNew = () => { setEditing('new'); setForm(emptyPost); };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    const data = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) };
    try {
      if (editing === 'new') { await api.post('/posts', data); }
      else { await api.put(`/posts/${editing}`, data); }
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
    if (!confirm('Delete this post?')) return;
    try { await api.delete(`/posts/${id}`); load(); } catch {}
  };

  const inputClass = "w-full bg-[#fbf6eb] border border-[#5e4530]/40 rounded-sm px-3.5 py-2.5 text-[#2c1e16] text-sm focus:outline-none focus:border-[#800000] focus:ring-1 focus:ring-[#800000] transition-colors font-serif shadow-inner";
  const labelClass = "text-[#4a2c11] text-xs font-bold uppercase tracking-wider mb-1.5 block font-serif";

  if (editing !== null) {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setEditing(null)} className="text-[#6a5342] hover:text-[#2c1e16] text-xs font-mono mb-4 flex items-center gap-1 cursor-pointer">← Back to Ledger</button>
        <h2 className="text-[#4a2c11] text-xl font-bold font-serif uppercase mb-6 pb-2 border-b border-[#5e4530]/20">{editing === 'new' ? 'Engrave New Manuscript' : 'Revise Manuscript Text'}</h2>
        <div className="space-y-6">
          <div><label className={labelClass}>Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} /></div>
          <div><label className={labelClass}>Excerpt</label><textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className={inputClass} /></div>
          <div><label className={labelClass}>Tags (comma-separated)</label><input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={inputClass} placeholder="Node.js, API, Backend" /></div>
          <div><label className={labelClass}>Cover Image URL</label><input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className={inputClass} /></div>
          <div>
            <label className={labelClass}>Content (Markdown)</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={16} className={inputClass + " font-mono text-xs leading-relaxed"} placeholder="# Article Title&#10;&#10;Write your article in Markdown..." />
          </div>
          <div className="flex items-center gap-3 py-2">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} id="published" className="accent-red-800 w-4 h-4" />
            <label htmlFor="published" className="text-[#4a2c11] text-sm font-serif font-bold">Publish manuscript to archives</label>
          </div>
          {msg && <p className={`text-sm font-serif italic ${msg.includes('Error') ? 'text-red-750' : 'text-[#800000]'}`}>{msg}</p>}
          <div className="relative inline-flex items-center gap-4 pt-4 group">
            <button onClick={handleSave} disabled={saving} className="relative z-10 px-8 py-3.5 bg-[#800000] hover:bg-[#991b1b] text-white text-xs font-bold font-mono uppercase tracking-widest rounded-sm transition-all duration-300 shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border border-[#6b1111]">{saving ? 'Transcribing...' : 'Record Manuscript'}</button>
            <WaxSeal text="M" size="md" className="transition-transform duration-300 group-hover:scale-110 shadow-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#5e4530]/20">
        <h2 className="text-[#4a2c11] text-lg font-bold font-serif uppercase tracking-wider">Manuscript Ledger ({posts.length})</h2>
        <button onClick={handleNew} className="px-4 py-2 bg-[#800000] hover:bg-[#991b1b] text-white text-xs font-mono uppercase tracking-wider rounded-sm transition-colors border border-[#6b1111] shadow-sm cursor-pointer">+ Add New Manuscript</button>
      </div>
      <div className="divide-y divide-[#5e4530]/15">
        {posts.map((p) => (
          <div key={p._id} className="flex items-center justify-between py-4 hover:bg-[#eddcb8]/20 transition-all px-2">
            <div>
              <h3 className="text-[#2c1e16] text-base font-bold font-serif">
                {p.title} 
                {!p.published && <span className="text-red-800 text-[10px] font-mono border border-red-800/40 bg-red-800/5 px-1.5 py-0.5 rounded-sm ml-2 font-bold">[ DRAFT ]</span>}
              </h3>
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

export default PostManager;
