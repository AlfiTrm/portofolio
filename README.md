# Alfi Tsani | Personal Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer)

**A modern, animated personal portfolio website built with cutting-edge web technologies.**

[Live Demo](https://alfitsani.my.id)

</div>

---

## Features

- Modern dark theme UI with glassmorphism effects
- Smooth animations powered by Framer Motion with GPU-accelerated CSS
- Fully responsive design for all device sizes
- Interactive elements: scramble text, curved rotating text, spotlight rays
- Custom animated pixel art character
- Contact form integrated with EmailJS
- Smooth scrolling with Lenis
- Performance optimized with React 19 and React Compiler

## Tech Stack

| Category  | Technology                |
| --------- | ------------------------- |
| Framework | Next.js 16 (App Router)   |
| Language  | TypeScript                |
| Styling   | TailwindCSS 4             |
| Animation | Framer Motion             |
| Icons     | Lucide React, React Icons |
| Scroll    | Lenis                     |
| Email     | EmailJS                   |
| Analytics | Vercel Speed Insights     |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── features/               # Feature-based modules
│   └── home/
│       ├── hero/          # Hero section components
│       ├── about/         # About section
│       ├── skills/        # Skills showcase
│       ├── projects/      # Project portfolio
│       └── contact/       # Contact form
└── shared/                 # Shared components & utilities
    └── components/        # Reusable UI components
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/AlfiTrm/portofolio.git
cd my-porto

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file with your EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## License

This project is open source and available under the [MIT License](LICENSE).
