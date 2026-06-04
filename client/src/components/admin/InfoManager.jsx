import { useState, useEffect } from 'react';
import api from '../../lib/api';
import WaxSeal from '../ui/WaxSeal';

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

  const inputClass = "w-full bg-[#fbf6eb] border border-[#5e4530]/40 rounded-sm px-3.5 py-2.5 text-[#2c1e16] text-sm focus:outline-none focus:border-[#800000] focus:ring-1 focus:ring-[#800000] transition-colors font-serif shadow-inner";
  const labelClass = "text-[#4a2c11] text-xs font-bold uppercase tracking-wider mb-1.5 block font-serif";

  return (
    <div className="max-w-3xl">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className={labelClass}>Name</label><input name="name" value={info.name} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Title</label><input name="title" value={info.title} onChange={handleChange} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>About Text</label><textarea name="aboutText" value={info.aboutText} onChange={handleChange} rows={5} className={inputClass} /></div>
        <div className="relative border-t border-[#5e4530]/20 pt-6">
          <div className="absolute top-4 right-2 w-8 h-8 text-[#5e4530] opacity-40 hidden sm:block pointer-events-none select-none">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M21 3c-1.5 1.5-3.5 1.5-6 1.5s-5.5-1-8.5.5C4 6.2 3.5 8 3 11c1.5-.5 3-1 4.5-1s2.5.5 3.5 1.5c-2.5-.5-5 0-7 2-.5 1-1.5 2.5-1.5 4.5 0 2 1.5 3.5 3.5 3.5 2 0 3.5-1 4.5-1.5 2-2 2.5-4.5 2-7 1 1 1.5 2 1.5 3.5s-.5 3-1 4.5c3-3 4.8-6 4.8-8.5s-.5-4.5 1.5-6z" />
              <path d="M3 21l3-3" />
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelClass}>Email</label><input name="email" value={info.email} onChange={handleChange} className={inputClass} /></div>
            <div><label className={labelClass}>Phone</label><input name="phone" value={info.phone} onChange={handleChange} className={inputClass} /></div>
          </div>
        </div>
        <div><label className={labelClass}>Resume URL</label><input name="resumeUrl" value={info.resumeUrl} onChange={handleChange} className={inputClass} /></div>
        <div className="border-t border-[#5e4530]/20 pt-6">
          <h3 className="text-[#4a2c11] text-sm font-bold mb-4 uppercase tracking-widest font-serif flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#800000] rounded-full" />
            Social Routing Addresses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.keys(info.socialLinks || {}).map((key) => (
              <div key={key}><label className={labelClass}>{key}</label><input name={`social.${key}`} value={info.socialLinks[key] || ''} onChange={handleChange} className={inputClass} /></div>
            ))}
          </div>
        </div>
        <div className="border-t border-[#5e4530]/20 pt-6 flex flex-col items-start gap-4">
          {msg && <p className={`text-sm font-serif italic ${msg.includes('Error') ? 'text-red-700' : 'text-[#800000]'}`}>{msg}</p>}
          <div className="relative inline-flex items-center gap-4 group">
            <button onClick={handleSave} disabled={saving} className="relative z-10 px-8 py-3.5 bg-[#800000] hover:bg-[#991b1b] text-white text-xs font-bold font-mono uppercase tracking-widest rounded-sm transition-all duration-300 shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border border-[#6b1111]">{saving ? 'Transcribing...' : 'Record Changes'}</button>
            <WaxSeal text="S" size="md" className="transition-transform duration-300 group-hover:scale-110 shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoManager;
