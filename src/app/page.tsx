'use client';

import React, { useState, useEffect } from 'react';
import NameInputForm from '../components/NameInputForm';
import ResultCard from '../components/ResultCard';
import { generateName, GeneratedName, Gender, Vibe } from '../utils/nameGenerator';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

export default function Home() {
  const [history, setHistory] = useState<GeneratedName[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('soulname_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    setMounted(true);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('soulname_history', JSON.stringify(history));
    }
  }, [history, mounted]);

  const handleGenerate = async (data: { name: string; gender: Gender; vibe: Vibe; birthYear: number }) => {
    setLoading(true);

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newName = generateName({
      gender: data.gender,
      vibe: data.vibe,
      birthYear: data.birthYear,
      history: history // Pass current history for duplicate checks
    });

    setHistory(prev => [newName, ...prev]);
    setLoading(false);

    // Scroll to top to see the new result
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Header / Logo */}
      <header className="pt-8 pb-4 text-center bg-white">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            Soul Name
          </h1>
        </div>
        <p className="text-gray-400 text-sm font-medium">Discover your Korean identity</p>
      </header>

      {/* Sticky Input Form */}
      <NameInputForm onSubmit={handleGenerate} />

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-indigo-500" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-lg font-bold text-gray-700"
            >
              Analyzing your destiny...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Feed */}
      <main className="max-w-md mx-auto px-4 mt-8 space-y-6">
        <AnimatePresence mode='popLayout'>
          {history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              layout
            >
              <ResultCard data={item} onClose={() => handleDelete(item.id)} />
            </motion.div>
          ))}
        </AnimatePresence>

        {history.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-400">
            <p className="mb-2 text-4xl">🔮</p>
            <p className="font-medium">No names generated yet.</p>
            <p className="text-sm opacity-60">Enter your details above to start.</p>
          </div>
        )}
      </main>
    </div>
  );
}
