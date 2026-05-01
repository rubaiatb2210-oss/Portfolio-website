import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Project from './models/Project.js';
import Info from './models/Info.js';
import Post from './models/Post.js';

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Info.deleteMany({});
    await Post.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Admin User
    const admin = await User.create({
      email: 'admin@rubaiat.dev',
      password: 'admin123',
    });
    console.log(`👤 Admin created: ${admin.email}`);

    // Seed Site Info
    await Info.create({
      name: 'Rubaiat',
      title: 'Full-Stack Developer & Product Designer',
      aboutText:
        'I am a multidisciplinary creator who bridges the gap between design and engineering. With a passion for building digital products that are both beautiful and functional, I craft experiences that leave a lasting impression. My work spans from pixel-perfect interfaces to scalable backend architectures.',
      email: 'hello@rubaiat.dev',
      phone: '+880 1XXX-XXXXXX',
      socialLinks: {
        github: 'https://github.com/rubaiat',
        linkedin: 'https://linkedin.com/in/rubaiat',
        facebook: 'https://facebook.com/rubaiat',
        instagram: 'https://instagram.com/rubaiat',
      },
    });
    console.log('📋 Site info seeded');

    // Seed Projects
    const campusConnect = await Project.create({
      title: 'Campus Connect',
      description:
        'A comprehensive university platform that bridges the gap between students, faculty, and campus resources. Features real-time event tracking, course management, and a social hub for academic collaboration.',
      tags: ['Full-Stack', 'Product Design', 'React', 'Node.js'],
      thumbnailUrl: '/images/projects/campus-connect-thumb.jpg',
      images: [
        '/images/projects/campus-connect-1.jpg',
        '/images/projects/campus-connect-2.jpg',
      ],
      caseStudy: `## The Challenge

Campus Connect was born from a simple observation: university students were juggling too many disconnected tools. From checking class schedules to finding study groups, everything lived in different silos.

## The Solution

We designed a unified platform that brings together:

- **Smart Scheduling** — AI-powered timetable that adapts to your preferences
- **Social Hub** — Connect with classmates, form study groups, and share notes
- **Event Discovery** — Never miss a campus event with personalized recommendations
- **Resource Center** — Access library, labs, and facility bookings in one place

## Technical Architecture

The platform is built on a **microservices architecture** using Node.js and Express for the backend, with a React frontend. We use WebSocket connections for real-time features and Redis for caching frequently accessed data.

\`\`\`javascript
// Real-time notification system
const notifyStudents = async (event) => {
  const subscribers = await getSubscribers(event.courseId);
  subscribers.forEach(student => {
    socket.to(student.socketId).emit('notification', {
      type: 'event',
      message: event.title,
      timestamp: Date.now()
    });
  });
};
\`\`\`

## Results

- **5,000+** active student users in the first semester
- **40%** reduction in missed deadlines
- **4.7/5** average user satisfaction rating`,
      architectureDiagram: '/images/projects/campus-connect-arch.svg',
      featured: true,
      order: 1,
    });
    console.log(`📦 Project seeded: ${campusConnect.title}`);

    const adda = await Project.create({
      title: 'Adda',
      description:
        'A hyperlocal social platform designed for South Asian communities. Adda reimagines neighborhood interactions through digital storytelling, local marketplace, and community-driven content curation.',
      tags: ['Product Design', 'Mobile', 'UI/UX', 'Full-Stack'],
      thumbnailUrl: '/images/projects/adda-thumb.jpg',
      images: [
        '/images/projects/adda-1.jpg',
        '/images/projects/adda-2.jpg',
      ],
      caseStudy: `## The Vision

"Adda" (আড্ডা) — the Bengali word for a casual, intellectual gathering — captures the essence of this project. We wanted to digitize the warmth of neighborhood conversations.

## Design Philosophy

Our design language draws from South Asian visual culture:

- **Warm color palette** inspired by street markets and festival lights
- **Bilingual typography** supporting both English and Bangla scripts
- **Illustration-heavy UI** featuring hand-drawn local motifs

## Key Features

### 1. Story Circles
Neighbors can share hyper-local stories — from the best chai stall opening to community alerts. Think Instagram Stories, but for your neighborhood block.

### 2. Local Marketplace
A trust-based marketplace where verified community members can buy, sell, and trade. No strangers — only people from your verified locality.

### 3. Community Events
Organize and discover local events — from rooftop movie nights to coding workshops at the local library.

## Technical Stack

- **Frontend**: React Native (cross-platform mobile)
- **Backend**: Node.js + Express + MongoDB
- **Real-time**: Socket.io for live chat and notifications
- **Maps**: Mapbox GL for hyper-local geofencing

\`\`\`python
# Community boundary detection
def define_community_boundary(center_lat, center_lng, radius_km):
    return {
        "type": "circle",
        "center": [center_lat, center_lng],
        "radius": radius_km * 1000,
        "properties": {
            "community_id": generate_id(),
            "verified_members": 0
        }
    }
\`\`\`

## Impact

- **12** pilot communities across Dhaka
- **3,200+** verified community members
- Featured in **TechCrunch Disrupt** Southeast Asia`,
      architectureDiagram: '/images/projects/adda-arch.svg',
      featured: true,
      order: 2,
    });
    console.log(`📦 Project seeded: ${adda.title}`);

    // Seed a sample blog post
    await Post.create({
      title: 'Building Scalable APIs with Node.js',
      content: `# Building Scalable APIs with Node.js

When it comes to building modern web APIs, Node.js remains one of the most versatile choices. In this post, I'll share patterns I've learned from building production systems.

## Why Node.js?

Node.js excels at I/O-heavy workloads thanks to its **non-blocking event loop**. This makes it perfect for:

- RESTful APIs serving thousands of concurrent requests
- Real-time applications (chat, live updates)
- Microservices that need to communicate over HTTP

## Architecture Patterns

### 1. The Controller-Service-Repository Pattern

\`\`\`javascript
// controller: handles HTTP
const getUser = async (req, res) => {
  const user = await userService.findById(req.params.id);
  res.json(user);
};

// service: business logic
const findById = async (id) => {
  const user = await userRepo.findById(id);
  if (!user) throw new NotFoundError('User not found');
  return user;
};

// repository: data access
const findById = (id) => User.findById(id).select('-password');
\`\`\`

### 2. Error Handling Middleware

Always centralize your error handling:

\`\`\`javascript
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
\`\`\`

## Performance Tips

1. **Use connection pooling** for database connections
2. **Implement caching** with Redis for frequently accessed data
3. **Add rate limiting** to prevent abuse
4. **Use compression** middleware for response payloads

## Conclusion

Building scalable APIs is as much about architecture decisions as it is about the technology. Choose patterns that make your codebase maintainable, testable, and resilient.

---

*What patterns do you use in your Node.js APIs? Let me know!*`,
      excerpt:
        'Patterns and best practices for building production-grade Node.js APIs that scale.',
      tags: ['Node.js', 'API', 'Backend', 'Architecture'],
      published: true,
    });
    console.log('📝 Sample blog post seeded');

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
