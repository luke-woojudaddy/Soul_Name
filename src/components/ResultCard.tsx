'use client';

import React, { useRef } from 'react';
import { GeneratedName } from '../utils/nameGenerator';
import { Download, X, Quote } from 'lucide-react';
import { toPng } from 'html-to-image';

interface ResultCardProps {
    data: GeneratedName;
    onClose: () => void;
}

export default function ResultCard({ data, onClose }: ResultCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!cardRef.current) return;

        try {
            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                pixelRatio: 2,
                filter: (node) => {
                    // Filter out elements with 'no-capture' class
                    return !node.classList?.contains('no-capture');
                }
            });

            const link = document.createElement('a');
            const filename = `soul-name-${data.fullNameEn.replace(/\s+/g, '-').toLowerCase()}.png`;

            link.href = dataUrl;
            link.download = filename;
            link.click();
        } catch (error) {
            console.error("Failed to generate image", error);
        }
    };

    return (
        <div ref={cardRef} className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-sm mx-auto border border-gray-100 animate-fade-in-up">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Your Soul Name
                </h3>
                <div className="flex gap-2 no-capture">
                    <button
                        onClick={handleDownload}
                        className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-indigo-500 transition-colors"
                        title="Save as Image"
                    >
                        <Download className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-8 flex flex-col items-center text-center bg-gradient-to-b from-white to-gray-50">
                <div className="mb-2">
                    <span className="text-6xl font-black text-gray-900 leading-tight">
                        {data.fullNameKr}
                    </span>
                </div>

                <div className="mb-8">
                    <span className="text-xl font-medium text-gray-500 tracking-wide font-serif italic">
                        {data.fullNameEn}
                    </span>
                </div>

                <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-center gap-4 mb-4 text-gray-400">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-xs font-semibold uppercase">Meaning</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-center gap-2">
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 font-mono">
                                {data.hanja}
                            </span>
                        </div>
                        <p className="text-gray-700 font-medium">
                            {data.surnameMeaning} <span className="text-gray-300 mx-1">•</span> {data.firstNameMeaning}
                        </p>
                    </div>

                    <div className="relative bg-indigo-50/50 p-4 rounded-xl text-left">
                        <Quote className="w-8 h-8 text-indigo-200 absolute -top-4 -left-2 fill-current" />
                        <p className="text-sm text-gray-600 leading-relaxed font-medium pl-2 relative z-10">
                            {data.fullInterpretation}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer / Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                </div>
            </div>
        </div>
    );
}
