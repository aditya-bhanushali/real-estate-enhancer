
'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            onImageUpload(acceptedFiles[0]);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div
                {...getRootProps()}
                className={`
          relative group cursor-pointer
          border-2 border-dashed rounded-2xl p-12
          transition-all duration-300 ease-in-out
          flex flex-col items-center justify-center gap-4
          ${isDragActive
                        ? 'border-primary bg-primary/10'
                        : 'border-white/20 hover:border-primary/50 hover:bg-white/5'}
          glass-morphism
        `}
            >
                <input {...getInputProps()} />

                <div className={`
          p-4 rounded-full transition-transform duration-300
          ${isDragActive ? 'scale-110 bg-primary/20' : 'bg-white/10 group-hover:scale-110'}
        `}>
                    {isDragActive ? (
                        <Upload className="w-12 h-12 text-primary" />
                    ) : (
                        <ImageIcon className="w-12 h-12 text-white/50 group-hover:text-primary" />
                    )}
                </div>

                <div className="text-center">
                    <p className="text-xl font-semibold text-white mb-2">
                        {isDragActive ? 'Drop your image here' : 'Select an Indoor Image'}
                    </p>
                    <p className="text-white/40 text-sm">
                        Drag & drop or click to browse (JPG, PNG, WEBP max 10MB)
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
