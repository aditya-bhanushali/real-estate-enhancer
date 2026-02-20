
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploader from '@/components/ImageUploader';
import LightingControls from '@/components/LightingControls';
import ImageCanvas from '@/components/ImageCanvas';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { LightingSettings, PRESETS } from '@/lib/lightingUtils';
import { Moon, Sun, ArrowLeft, Maximize2, Minimize2, Wand2, Eraser, LayoutTemplate, Sparkles, Building, Download } from 'lucide-react';
import Link from 'next/link';
import { processWithAI } from '@/lib/aiUtils';

const DEFAULT_SETTINGS: LightingSettings = {
    brightness: 100,
    temperature: 5500,
    contrast: 100,
    shadows: 100,
};

type AppMode = 'lighting' | 'cleaning' | 'staging';

export default function SimulatorPage() {
    const [image, setImage] = useState<File | null>(null);
    const [originalSrc, setOriginalSrc] = useState<string>('');
    const [modifiedSrc, setModifiedSrc] = useState<string>('');
    const [settings, setSettings] = useState<LightingSettings>(DEFAULT_SETTINGS);
    const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [appMode, setAppMode] = useState<AppMode>('lighting');
    const [isAILoading, setIsAILoading] = useState(false);
    const [stagingPrompt, setStagingPrompt] = useState('modern minimalist living room furniture, high quality');

    const handleImageUpload = (file: File) => {
        setImage(file);
        setOriginalSrc(URL.createObjectURL(file));
    };

    const handleAIDone = (newUrl: string) => {
        setModifiedSrc(newUrl);
        // Important: if we want to continue editing, we might need to convert the URL back to a File/Image
        // But for now, just showing the result is enough.
    };

    const handleAutoEnhance = async () => {
        if (!originalSrc) return;
        setIsAILoading(true);
        try {
            // Convert current canvas/file to base64
            const response = await processWithAI({
                image: originalSrc, // Note: In a real app, this should be base64
                mode: 'enhance'
            });
            if (response.outputUrl) {
                setModifiedSrc(response.outputUrl);
            }
        } finally {
            setIsAILoading(false);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const [maskBase64, setMaskBase64] = useState<string>('');

    const handleCleaning = async () => {
        if (!originalSrc || !maskBase64) return;
        setIsAILoading(true);
        try {
            const response = await processWithAI({
                image: originalSrc,
                mask: maskBase64,
                mode: 'remove_object'
            });
            if (response.outputUrl) {
                setModifiedSrc(response.outputUrl);
            }
        } finally {
            setIsAILoading(false);
        }
    };

    const handleStaging = async () => {
        if (!originalSrc) return;
        setIsAILoading(true);
        try {
            const response = await processWithAI({
                image: originalSrc,
                prompt: stagingPrompt,
                mode: 'virtual_stage'
            });
            if (response.outputUrl) {
                setModifiedSrc(response.outputUrl);
            }
        } finally {
            setIsAILoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-orange-500/30">
            {/* Header */}
            <header className="p-4 md:px-8 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-white/60" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                            <Building className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold tracking-tight">EstateLens AI</h1>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Workspace</p>
                        </div>
                    </div>
                </div>

                {image && (
                    <div className="hidden md:flex items-center bg-white/5 p-1 rounded-2xl border border-white/10">
                        {(['lighting', 'cleaning', 'staging'] as AppMode[]).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setAppMode(mode)}
                                className={`
                                    flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all
                                    ${appMode === mode
                                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                {mode === 'lighting' && <Sun className="w-4 h-4" />}
                                {mode === 'cleaning' && <Eraser className="w-4 h-4" />}
                                {mode === 'staging' && <LayoutTemplate className="w-4 h-4" />}
                                <span className="capitalize">{mode}</span>
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-3">
                    {image && (
                        <>
                            <button
                                onClick={() => setViewMode(viewMode === 'single' ? 'compare' : 'single')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${viewMode === 'compare'
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {viewMode === 'compare' ? 'Exit Compare' : 'Compare Mode'}
                            </button>
                            <button
                                onClick={toggleFullscreen}
                                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                            >
                                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                        </>
                    )}
                </div>
            </header>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {!image ? (
                        <motion.div
                            key="uploader"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="flex-1 flex items-center justify-center p-6"
                        >
                            <ImageUploader onImageUpload={handleImageUpload} />
                        </motion.div>
                    ) : (
                        <>
                            {/* Main Canvas Area */}
                            <motion.div
                                key="simulator"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 relative overflow-hidden flex flex-col bg-[#0a0a0a]"
                            >
                                <div className="flex-1 flex items-center justify-center relative p-8">
                                    {viewMode === 'compare' ? (
                                        <div className="w-full h-full max-w-6xl">
                                            <BeforeAfterSlider
                                                originalSrc={originalSrc}
                                                modifiedSrc={modifiedSrc || originalSrc}
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative group">
                                            <ImageCanvas
                                                imageFile={image}
                                                settings={settings}
                                                onDownload={(dataUrl) => setModifiedSrc(dataUrl)}
                                                brushMode={appMode === 'cleaning'}
                                                onMaskChange={setMaskBase64}
                                            />
                                            {isAILoading && (
                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-4 rounded-3xl">
                                                    <div className="relative">
                                                        <div className="w-20 h-20 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                                                        <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-orange-500 animate-pulse" />
                                                    </div>
                                                    <p className="text-orange-500 font-black text-sm tracking-[0.2em] uppercase">AI Enhancing...</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Floating Tool Bar Mobile */}
                                <div className="md:hidden p-4 border-t border-white/5 bg-black/40 backdrop-blur-md flex justify-around">
                                    <button onClick={() => setAppMode('lighting')} className={`p-2 rounded-lg ${appMode === 'lighting' ? 'bg-orange-500' : 'text-white/40'}`}><Sun /></button>
                                    <button onClick={() => setAppMode('cleaning')} className={`p-2 rounded-lg ${appMode === 'cleaning' ? 'bg-orange-500' : 'text-white/40'}`}><Eraser /></button>
                                    <button onClick={() => setAppMode('staging')} className={`p-2 rounded-lg ${appMode === 'staging' ? 'bg-orange-500' : 'text-white/40'}`}><LayoutTemplate /></button>
                                </div>
                            </motion.div>

                            {/* Sidebar Controls */}
                            <motion.aside
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="w-full md:w-[400px] border-l border-white/5 bg-black/20 backdrop-blur-3xl z-40 overflow-y-auto"
                            >
                                <div className="p-8 h-full flex flex-col gap-8">
                                    {appMode === 'lighting' && (
                                        <>
                                            <div className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl border border-orange-500/20">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-orange-500 rounded-lg">
                                                        <Sparkles className="w-5 h-5 text-white" />
                                                    </div>
                                                    <h3 className="font-bold text-lg">AI Auto-Boost</h3>
                                                </div>
                                                <p className="text-sm text-white/50 mb-6 leading-relaxed">Let our Neural Engine automatically optimize exposure, shadows, and color balance for real estate standards.</p>
                                                <button
                                                    onClick={handleAutoEnhance}
                                                    disabled={isAILoading}
                                                    className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                                >
                                                    {isAILoading ? "Optimizing..." : "Run AI Enhancement"}
                                                </button>
                                            </div>
                                            <LightingControls
                                                settings={settings}
                                                setSettings={setSettings}
                                                resetSettings={() => setSettings(DEFAULT_SETTINGS)}
                                            />
                                        </>
                                    )}

                                    {appMode === 'cleaning' && (
                                        <div className="space-y-8">
                                            <div className="p-6 bg-blue-500/10 rounded-3xl border border-blue-500/20">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-blue-500 rounded-lg">
                                                        <Eraser className="w-5 h-5 text-white" />
                                                    </div>
                                                    <h3 className="font-bold text-lg">Smart Clean Up</h3>
                                                </div>
                                                <p className="text-sm text-white/50 mb-6 leading-relaxed">Rub over unwanted objects (wires, personal items, clutter) to remove them seamlessly.</p>
                                                {!maskBase64 && (
                                                    <div className="bg-orange-500/10 p-4 rounded-2xl text-xs text-orange-500 font-bold text-center border border-orange-500/10 mb-4 animate-pulse">
                                                        Start brushing on the image
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={handleCleaning}
                                                disabled={isAILoading || !maskBase64}
                                                className="w-full py-4 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300/20 text-white font-black rounded-2xl transition-all"
                                            >
                                                {isAILoading ? "Removing Objects..." : "Finalize Object Removal"}
                                            </button>
                                        </div>
                                    )}

                                    {appMode === 'staging' && (
                                        <div className="space-y-8">
                                            <div className="p-6 bg-green-500/10 rounded-3xl border border-green-500/20">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-green-500 rounded-lg">
                                                        <LayoutTemplate className="w-5 h-5 text-white" />
                                                    </div>
                                                    <h3 className="font-bold text-lg">Virtual Staging</h3>
                                                </div>
                                                <p className="text-sm text-white/50 mb-6 leading-relaxed">Describe the style of furniture you want to add to this room.</p>
                                                <textarea
                                                    value={stagingPrompt}
                                                    onChange={(e) => setStagingPrompt(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm text-white/80 focus:border-green-500/50 outline-none transition-all h-32 resize-none"
                                                    placeholder="e.g. Modern Scandinavian living room with a grey sofa and plants..."
                                                />
                                            </div>
                                            <button
                                                onClick={handleStaging}
                                                disabled={isAILoading}
                                                className="w-full py-4 bg-green-500 hover:bg-green-400 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                <Sparkles className="w-4 h-4" />
                                                {isAILoading ? "Staging Room..." : "Generate Staging"}
                                            </button>
                                        </div>
                                    )}

                                    {/* Export Section */}
                                    <div className="mt-auto border-t border-white/5 pt-8">
                                        <button
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.download = `estate-enhanced-${Date.now()}.jpg`;
                                                link.href = modifiedSrc || originalSrc;
                                                link.click();
                                            }}
                                            className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-3"
                                        >
                                            <Download className="w-5 h-5" />
                                            Export Listing Photo
                                        </button>
                                    </div>
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
