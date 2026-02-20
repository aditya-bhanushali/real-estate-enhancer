
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
    originalSrc: string;
    modifiedSrc: string;
}

export default function BeforeAfterSlider({ originalSrc, modifiedSrc }: BeforeAfterSliderProps) {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const position = ((x - rect.left) / rect.width) * 100;

        setSliderPos(Math.min(Math.max(position, 0), 100));
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none glass-morphism shadow-2xl"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
        >
            {/* Modified Image (After) */}
            <img
                src={modifiedSrc}
                alt="Modified"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Original Image (Before) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%`, borderRight: '2px solid white' }}
            >
                <img
                    src={originalSrc}
                    alt="Original"
                    className="absolute inset-0 h-full object-cover"
                    style={{ width: `${100 / (sliderPos / 100)}%` }} // Maintain aspect ratio skip
                // Actually, just making it w-full h-full object-cover with the parent clipping it
                />
                <img
                    src={originalSrc}
                    alt="Original"
                    className="w-full h-full object-cover"
                    style={{ width: containerRef.current?.offsetWidth || '100vw' }}
                />
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                Original
            </div>
            <div className="absolute bottom-4 right-4 bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                Simulated
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
                <div className="h-full w-0.5 bg-white/50 backdrop-blur-sm" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center">
                    <div className="flex gap-1">
                        <div className="w-0.5 h-3 bg-primary rounded-full" />
                        <div className="w-0.5 h-3 bg-primary rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
