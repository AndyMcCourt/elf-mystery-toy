import React, { useState } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { getElfHint } from '../services/gemini';

interface ElfHelperProps {
  lastGuess: string;
}

const ElfHelper: React.FC<ElfHelperProps> = ({ lastGuess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string>("Hi! I'm Jingle. Need a hint? Click me!");

  const handleAskHint = async () => {
    if (loading) return;
    setLoading(true);
    setIsOpen(true);
    const newHint = await getElfHint(lastGuess);
    setHint(newHint);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white p-4 rounded-2xl shadow-xl border-4 border-berry-red max-w-xs animate-bounce-in relative">
           <button 
             onClick={() => setIsOpen(false)}
             className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
           >
             <X size={16} />
           </button>
           <h4 className="font-christmas text-xl font-bold text-holly-green mb-1">Jingle the Elf 🧝</h4>
           <p className="text-gray-700 text-sm font-body leading-relaxed">
             {loading ? "Checking the Magical Scroll..." : hint}
           </p>
        </div>
      )}

      <button
        onClick={handleAskHint}
        className="group relative flex items-center justify-center w-16 h-16 bg-holly-green rounded-full shadow-lg border-4 border-gold hover:scale-110 transition-transform duration-300"
      >
        <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 animate-pulse">
            <Sparkles size={12} className="text-white" />
        </div>
        <img 
            src="https://api.iconify.design/noto:elf.svg" 
            alt="Elf" 
            className="w-10 h-10 drop-shadow-md" 
        />
        <span className="sr-only">Ask for a hint</span>
      </button>
    </div>
  );
};

export default ElfHelper;