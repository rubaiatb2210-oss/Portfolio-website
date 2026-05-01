# Adham's Portfolio — MERN Stack

A premium personal portfolio website built with **React + Vite + Tailwind CSS v4** frontend and **Node.js + Express + MongoDB** backend.

## ✨ Features

- **Interactive Split-Hero** — Dual-identity hero with Artist (light/serif) and Coder (dark/mono) sides
- **Framer Motion** page transitions and micro-animations throughout
- **Hidden Admin CMS** — Triple-click the copyright or press `Ctrl+Shift+A` to access
- **JWT Authentication** with bcrypt password hashing
- **Markdown Blog** — react-markdown with syntax highlighting for code blocks
- **Portfolio** with filterable tag grid and rich case study pages
- **Custom 404** page with terminal-inspired error display
- **Docker** deployment ready for Google Cloud Run (scale-to-zero)
- **Responsive** with mobile-first design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas cluster (or local MongoDB)

### 1. Install Dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2. Configure Environment

Create `server/.env`:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

This creates:
- Admin user: `admin@adham.dev` / `admin123`
- 2 sample projects: "Campus Connect" and "Adda"
- 1 sample blog post

### 4. Run Development Servers

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

Frontend: http://localhost:3000  
Backend API: http://localhost:5000/api

## 🔐 Admin Access

The admin panel is hidden by design:
1. **Triple-click** the copyright text in the footer, OR
2. Press **Ctrl + Shift + A**
3. Login with `admin@adham.dev` / `admin123`
4. Navigate to `/admin` to manage content

## 🐳 Docker Deployment

```bash
docker build -t adham-portfolio .
docker run -p 8080:8080 \
  -e MONGODB_URI=your_uri \
  -e JWT_SECRET=your_secret \
  -e NODE_ENV=production \
  adham-portfolio
```

### Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT/adham-portfolio
gcloud run deploy adham-portfolio \
  --image gcr.io/YOUR_PROJECT/adham-portfolio \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars MONGODB_URI=your_uri,JWT_SECRET=your_secret
```

## 📁 Project Structure

```
├── client/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/hero/    # SplitHero
│   │   ├── components/layout/  # Header, Footer, Layout
│   │   ├── components/admin/   # CMS managers
│   │   ├── components/ui/      # LoginModal, ProjectCard, GridPattern
│   │   ├── pages/              # All route pages
│   │   ├── context/            # AuthContext
│   │   └── lib/                # Axios API client
│   └── public/images/          # Hero images
│
├── server/          # Express + Mongoose
│   ├── models/      # User, Project, Info, Post
│   ├── routes/      # auth, projects, info, posts
│   ├── middleware/   # JWT auth
│   └── seed.js      # Database seeder
│
├── Dockerfile       # Multi-stage build for Cloud Run
└── .env.example     # Environment template
```

## 🎨 Design System

- **Colors**: `#000` (Black), `#FFF` (White), `#800000` (Maroon), `#FF0000` (Red), `#808080` (Gray)
- **Fonts**: Playfair Display (serif), Inter (sans), JetBrains Mono (mono)
- **Grid**: 12-column with generous whitespace
- **Patterns**: Subtle SVG grid backgrounds with maroon accent glows

## 🖼️ Hero Images

Place your images in `client/public/images/`:
- `hero-artist-maroon.jpg` — Professional photo (Artist side)
- `hero-coder-ghibli-style.jpg` — Illustrated face (Coder side)
