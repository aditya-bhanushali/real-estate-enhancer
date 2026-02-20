
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Building, Shield, Image as ImageIcon, Eraser, LayoutTemplate } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30">
      {/* Hero Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Building className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            EstateLens AI
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <Link href="/simulator" className="text-white bg-white/10 px-5 py-2 rounded-full hover:bg-white/20 transition-all border border-white/5 backdrop-blur-md">
            Launch Platform
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-orange-400 text-sm font-semibold mb-8">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span>Next-Gen Real Estate Image Enhancement</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
          Sell Faster with <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-orange-400 to-red-600">
            AI-Enhanced Photos
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-white/40 mb-12 leading-relaxed">
          Transform low-quality property shots into high-engagement listings. Lighting correction, object removal, and virtual staging—delivered instantly by AI.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link
            href="/simulator"
            className="group relative px-8 py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all w-full md:w-auto overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center justify-center gap-3">
              Enhance Property Image <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
          <button className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white text-lg font-bold rounded-2xl border border-white/10 backdrop-blur-md transition-all w-full md:w-auto">
            View Live Demo
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <ImageIcon className="w-8 h-8 text-orange-400" />,
              title: "AI Lighting Correction",
              desc: "Automatically balance exposure, recover shadows, and enhance colors for a professional look."
            },
            {
              icon: <Eraser className="w-8 h-8 text-blue-400" />,
              title: "Smart Object Removal",
              desc: "Effortlessly remove clutter, personal items, or unsightly objects with precision in-painting."
            },
            {
              icon: <LayoutTemplate className="w-8 h-8 text-green-400" />,
              title: "Virtual Staging",
              desc: "Turn empty rooms into beautifully furnished spaces that resonate with potential buyers."
            }
          ].map((feature, i) => (
            <div key={i} className="glass-morphism p-10 rounded-[32px] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2 group bg-white/[0.02]">
              <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-orange-500/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 pt-12 pb-24 text-center">
        <p className="text-white/20 text-sm font-medium tracking-widest uppercase mb-4">Empowering Real Estate Professionals</p>
        <p className="text-white/40">&copy; 2024 EstateLens AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
