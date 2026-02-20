
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { LightingSettings, applyLighting } from '@/lib/lightingUtils';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCanvasProps {
    imageFile: File | null;
    settings: LightingSettings;
    onDownload: (dataUrl: string) => void;
    brushMode?: boolean;
    onMaskChange?: (maskBase64: string) => void;
}

export default function ImageCanvas({ imageFile, settings, onDownload, brushMode = false, onMaskChange }: ImageCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const maskCanvasRef = useRef<HTMLCanvasElement>(null);
    const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        if (!imageFile) return;

        const img = new Image();
        img.src = URL.createObjectURL(imageFile);
        img.onload = () => {
            setOriginalImage(img);
        };
    }, [imageFile]);

    useEffect(() => {
        if (!originalImage || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        setIsProcessing(true);

        canvas.width = originalImage.width;
        canvas.height = originalImage.height;

        if (maskCanvasRef.current) {
            maskCanvasRef.current.width = originalImage.width;
            maskCanvasRef.current.height = originalImage.height;
        }

        const timer = setTimeout(() => {
            applyLighting(ctx, originalImage, settings);
            setIsProcessing(false);
        }, 10);

        return () => clearTimeout(timer);
    }, [originalImage, settings]);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        if (!brushMode) return;
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        if (maskCanvasRef.current && onMaskChange) {
            onMaskChange(maskCanvasRef.current.toDataURL());
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !brushMode || !maskCanvasRef.current) return;

        const canvas = maskCanvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fill();
    };

    if (!imageFile) return null;

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            <div
                className={`relative rounded-[32px] overflow-hidden shadow-2xl max-w-full max-h-[70vh] border border-white/5 bg-black ${brushMode ? 'cursor-crosshair' : ''}`}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            >
                <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-[70vh] object-contain block"
                />

                {/* Mask Overlay Canvas */}
                <canvas
                    ref={maskCanvasRef}
                    className={`absolute inset-0 max-w-full max-h-[70vh] object-contain block pointer-events-none transition-opacity ${brushMode ? 'opacity-100' : 'opacity-0'}`}
                />

                <AnimatePresence>
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center"
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-orange-500/20" />
                                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Processing Engine</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {brushMode && (
                <div className="mt-8 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Brushing Mode Active</span>
                    <button
                        onClick={() => {
                            const ctx = maskCanvasRef.current?.getContext('2d');
                            ctx?.clearRect(0, 0, maskCanvasRef.current!.width, maskCanvasRef.current!.height);
                        }}
                        className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition-colors"
                    >
                        Clear Mask
                    </button>
                </div>
            )}
        </div>
    );
}
