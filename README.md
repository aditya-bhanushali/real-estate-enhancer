
# LuminaSim: AI Interior Lighting Simulator

LuminaSim is a high-performance, production-ready web application built with Next.js 14, designed for interior design visualization. It allows users to simulate various lighting conditions on indoor images in real-time.

## Features

- **Real-time Lighting Simulation**: Adjust brightness, temperature, contrast, and shadows instantly.
- **Lighting Presets**: Quick-apply moods like Warm, Cool, Daylight, Sunset, Night, and Studio.
- **Before/After Comparison**: interactive slider to visualize changes.
- **High-Resolution Export**: Download your results as high-quality JPEGs.
- **Privacy First**: All heavy image processing happens locally in your browser using Canvas/WebGL.
- **Modern UI**: Sleek glassmorphism design with fluid animations.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Processing**: HTML5 Canvas API

## Quick Start (VS Code)

1. **Clone the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run development server**:
   ```bash
   npm run dev
   ```
4. **Open in browser**: [http://localhost:3000](http://localhost:3000)

## Vercel Deployment (One-Click)

This project is optimized for Vercel with zero configuration required.

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/new).
3. Import your repository.
4. Click **Deploy**.

*Optional: Add `RELIGHT_API_KEY` to Environment Variables if integrating with an AI relighting service.*

## Project Structure

- `/src/app`: App Router pages and API routes.
- `/src/components`: Reusable UI components.
- `/src/lib`: Core lighting simulation logic.
- `/public`: Static assets.

---
Developed by Antigravity AI
