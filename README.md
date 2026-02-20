
# EstateLens AI: Real Estate Image Enhancer

**EstateLens AI** is a professional-grade image enhancement suite designed for real estate professionals. Elevate your property listings with AI-driven lighting correction, smart object removal, and virtual staging.

## 🌟 Key Features

*   **AI Lighting Correction**: Instantly optimize exposure, shadow recovery, and color balance to meet real estate photography standards.
*   **Neural Presets**: Specialized moods optimized for property types (Daylight, Golden Hour, Luxury Studio, etc.).
*   **Smart Object Removal**: An interactive brush tool that lets you remove clutter, personal items, or unsightly objects from photos with AI in-painting.
*   **Virtual Staging**: Transform empty rooms into beautifully furnished spaces by describing your desired style (Modern, Scandinavian, Industrial, etc.).
*   **Comparison Engine**: Side-by-side "Before & After" slider for precision visualization.
*   **High-Res Export**: Download production-ready JPEGs for your MLS listings.

## 🛠️ Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Styling**: Tailwind CSS 4
*   **Animations**: Framer Motion
*   **AI Backend**: Replicate (CodeFormer & SDXL)
*   **Graphics**: HTML5 Canvas & WebGL

## 🚀 Quick Start

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up AI (Optional but recommended)**:
    Rename `.env.example` to `.env.local` and add your `REPLICATE_API_TOKEN`.
4.  **Launch the Workspace**:
    ```bash
    npm run dev
    ```
5.  **Open**: [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

Optimized for **Vercel** deployment:
1.  Connect your GitHub repository.
2.  Add your `REPLICATE_API_TOKEN` to Environment Variables.
3.  Deploy instantly.

---
Developed by Antigravity AI | Transforming Real Estate Photography
