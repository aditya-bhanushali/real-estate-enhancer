
'use client';

import React from 'react';
import { LightingSettings, PRESETS } from '@/lib/lightingUtils';
import { Sun, Thermometer, Moon, Sparkles, Sliders, RotateCcw } from 'lucide-react';

interface LightingControlsProps {
    settings: LightingSettings;
    setSettings: (settings: LightingSettings) => void;
    resetSettings: () => void;
}

export default function LightingControls({ settings, setSettings, resetSettings }: LightingControlsProps) {
    const handleSliderChange = (key: keyof LightingSettings, value: number) => {
        setSettings({ ...settings, [key]: value, preset: undefined });
    };

    const applyPreset = (name: string) => {
        setSettings({ ...PRESETS[name], preset: name });
    };

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Sparkles className="text-orange-500 w-4 h-4" />
                    Neural Presets
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {Object.keys(PRESETS).map((name) => (
                        <button
                            key={name}
                            onClick={() => applyPreset(name)}
                            className={`
                                px-4 py-4 rounded-2xl text-xs font-bold transition-all border
                                ${settings.preset === name
                                    ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20 active:scale-95'
                                    : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/10'}
                            `}
                        >
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-8">
                <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Sliders className="text-orange-500 w-4 h-4" />
                    Fine Tuning
                </h3>

                {/* Brightness */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-white/70 flex items-center gap-2 italic uppercase">
                            Brightness
                        </label>
                        <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20">
                            {settings.brightness}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="200"
                        value={settings.brightness}
                        onChange={(e) => handleSliderChange('brightness', parseInt(e.target.value))}
                        className="w-full accent-orange-500 bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                    />
                </div>

                {/* Temperature */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-white/70 flex items-center gap-2 italic uppercase">
                            Temperature
                        </label>
                        <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20">
                            {settings.temperature}K
                        </span>
                    </div>
                    <input
                        type="range"
                        min="2000"
                        max="8000"
                        step="100"
                        value={settings.temperature}
                        onChange={(e) => handleSliderChange('temperature', parseInt(e.target.value))}
                        className="w-full accent-orange-500 bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                    />
                </div>

                {/* Contrast */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-white/70 flex items-center gap-2 italic uppercase">
                            Contrast
                        </label>
                        <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20">
                            {settings.contrast}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="150"
                        value={settings.contrast}
                        onChange={(e) => handleSliderChange('contrast', parseInt(e.target.value))}
                        className="w-full accent-orange-500 bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                    />
                </div>

                {/* Shadow Intensity */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-white/70 flex items-center gap-2 italic uppercase">
                            Shadows
                        </label>
                        <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20">
                            {settings.shadows}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={settings.shadows}
                        onChange={(e) => handleSliderChange('shadows', parseInt(e.target.value))}
                        className="w-full accent-orange-500 bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <button
                onClick={resetSettings}
                className="w-full py-4 rounded-2xl border border-white/5 text-white/30 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
            >
                <RotateCcw className="w-4 h-4" />
                Reset Engine
            </button>
        </div>
    );
}
