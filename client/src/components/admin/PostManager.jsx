import { useState, useEffect } from 'react';
import api from '../../lib/api';

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

  const inputClass = "w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-red transition-colors";
  const labelClass = "text-gray-400 text-xs uppercase tracking-wider mb-1 block";

  if (editing !== null) {
    return (
      <div className="max-w-2xl">
        <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-1">← Back</button>
        <h2 className="text-white text-lg mb-4">{editing === 'new' ? 'New Post' : 'Edit Post'}</h2>
        <div className="space-y-4">
          <div><label className={labelClass}>Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} /></div>
          <div><label className={labelClass}>Excerpt</label><textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className={inputClass} /></div>
          <div><label className={labelClass}>Tags (comma-separated)</label><input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={inputClass} placeholder="Node.js, API, Backend" /></div>
          <div><label className={labelClass}>Cover Image URL</label><input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className={inputClass} /></div>
          <div>
            <label className={labelClass}>Content (Markdown)</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={16} className={inputClass + " font-mono text-xs"} placeholder="# Article Title&#10;&#10;Write your article in Markdown..." />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} id="published" className="accent-red" />
            <label htmlFor="published" className="text-gray-400 text-sm">Published</label>
          </div>
          {msg && <p className={`text-sm ${msg.includes('Error') ? 'text-red' : 'text-green-500'}`}>{msg}</p>}
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-maroon hover:bg-red text-white text-sm rounded transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save Post'}</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg">Posts ({posts.length})</h2>
        <button onClick={handleNew} className="px-4 py-2 bg-maroon hover:bg-red text-white text-sm rounded transition-colors">+ New Post</button>
      </div>
      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p._id} className="flex items-center justify-between p-4 border border-gray-800 rounded bg-gray-950">
            <div>
              <h3 className="text-white text-sm font-medium">{p.title} {!p.published && <span className="text-yellow-500 text-xs ml-2">(Draft)</span>}</h3>
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

export default PostManager;
