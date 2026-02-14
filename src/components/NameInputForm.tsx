'use client';

import React, { useState, useEffect } from 'react';
import { Gender } from '../utils/nameGenerator';
import { Sparkles } from 'lucide-react';

interface NameInputFormProps {
    onSubmit: (data: { name: string; gender: Gender; vibe: string; birthYear: number }) => void;
}

const maleVibes = [
    { value: 'strength', label: 'Strength', emoji: '💪' },
    { value: 'ambition', label: 'Ambition', emoji: '🚀' },
    { value: 'wisdom', label: 'Wisdom', emoji: '🦉' },
    { value: 'humor', label: 'Humor', emoji: '😆' },
    { value: 'justice', label: 'Justice', emoji: '⚖️' },
];

const femaleVibes = [
    { value: 'grace', label: 'Grace', emoji: '🦢' },
    { value: 'nature', label: 'Nature', emoji: '🌿' },
    { value: 'lovely', label: 'Lovely', emoji: '💝' },
    { value: 'wisdom', label: 'Wisdom', emoji: '🦉' },
    { value: 'creativity', label: 'Creativity', emoji: '🎨' },
];

export default function NameInputForm({ onSubmit }: NameInputFormProps) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState<Gender>('female');
    const [vibe, setVibe] = useState<string>('grace');
    const [birthYear, setBirthYear] = useState<number>(2024);

    // Update default vibe when gender changes
    useEffect(() => {
        if (gender === 'male') {
            if (!maleVibes.some(v => v.value === vibe)) {
                setVibe(maleVibes[0].value);
            }
        } else {
            if (!femaleVibes.some(v => v.value === vibe)) {
                setVibe(femaleVibes[0].value);
            }
        }
    }, [gender, vibe]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, gender, vibe, birthYear });
    };

    const currentVibes = gender === 'male' ? maleVibes : femaleVibes;

    // Generate years from 2026 down to 1950
    const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 2026 - i);

    return (
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm p-4 rounded-b-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">English Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alice"
                        className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all outline-none text-gray-800 font-medium"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Gender</label>
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setGender('female')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${gender === 'female' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Female
                            </button>
                            <button
                                type="button"
                                onClick={() => setGender('male')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${gender === 'male' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Male
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Year of Birth</label>
                        <select
                            value={birthYear}
                            onChange={(e) => setBirthYear(Number(e.target.value))}
                            className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all outline-none text-gray-800 font-medium appearance-none"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Vibe ({gender})</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {currentVibes.map((v) => (
                            <button
                                key={v.value}
                                type="button"
                                onClick={() => setVibe(v.value)}
                                className={`flex items-center gap-1 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium border transition-all ${vibe === v.value
                                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <span>{v.emoji}</span>
                                {v.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-2 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <Sparkles className="w-5 h-5" />
                    Generate My Soul Name
                </button>
            </form>
        </div>
    );
}
