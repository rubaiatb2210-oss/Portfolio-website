import mongoose from 'mongoose';

const infoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Rubaiat',
    },
    title: {
      type: String,
      default: 'Full-Stack Developer & Designer',
    },
    aboutText: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    resumeUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Info = mongoose.model('Info', infoSchema);
export default Info;
