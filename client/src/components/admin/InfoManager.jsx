import { useState, useEffect } from 'react';
import api from '../../lib/api';

const InfoManager = () => {
  const [info, setInfo] = useState({ name: '', title: '', aboutText: '', email: '', phone: '', socialLinks: { github: '', linkedin: '', facebook: '', instagram: '' }, resumeUrl: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/info').then((res) => setInfo(res.data)).catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const key = name.split('.')[1];
      setInfo((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }));
    } else {
      setInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      await api.put('/info', info);
      setMsg('Saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Error saving: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-red transition-colors";
  const labelClass = "text-gray-400 text-xs uppercase tracking-wider mb-1 block";

  return (
    <div className="max-w-2xl">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Name</label><input name="name" value={info.name} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Title</label><input name="title" value={info.title} onChange={handleChange} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>About Text</label><textarea name="aboutText" value={info.aboutText} onChange={handleChange} rows={5} className={inputClass} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Email</label><input name="email" value={info.email} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Phone</label><input name="phone" value={info.phone} onChange={handleChange} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>Resume URL</label><input name="resumeUrl" value={info.resumeUrl} onChange={handleChange} className={inputClass} /></div>
        <h3 className="text-white text-sm font-semibold mt-6 mb-2">Social Links</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(info.socialLinks || {}).map((key) => (
            <div key={key}><label className={labelClass}>{key}</label><input name={`social.${key}`} value={info.socialLinks[key] || ''} onChange={handleChange} className={inputClass} /></div>
          ))}
        </div>
        {msg && <p className={`text-sm ${msg.includes('Error') ? 'text-red' : 'text-green-500'}`}>{msg}</p>}
        <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-maroon hover:bg-red text-white text-sm rounded transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button>
      </div>
    </div>
  );
};

export default InfoManager;
