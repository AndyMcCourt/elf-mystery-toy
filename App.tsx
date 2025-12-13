import React, { useState } from 'react';
import Snowfall from './components/Snowfall';
import MagicDoor from './components/MagicDoor';
import { VALID_ANSWERS, SECRET_STORY_URL } from './constants';
import { Sparkles, X, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState<'locked' | 'unlocked' | 'viewing'>('locked');
  const [shake, setShake] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedGuess = guess.toLowerCase().trim();

    if (VALID_ANSWERS.includes(normalizedGuess)) {
      setStatus('unlocked');
      setShowConfetti(true);
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-magical-shine-reveal-2920.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio autoplay prevented'));
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio autoplay prevented'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex flex-col font-body text-slate-100">
      <Snowfall />

      {/* Confetti Effect (Simple CSS Implementation for success) */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-[fall_3s_linear_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                backgroundColor: ['#f00', '#0f0', '#ff0', '#fff'][Math.floor(Math.random() * 4)],
                width: '10px',
                height: '10px',
                animationDelay: `${Math.random() * 2}s`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0'
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content Container */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in-down">
            <h1 className="text-5xl md:text-7xl font-christmas text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 drop-shadow-lg mb-2">
                The Christmas Puzzle
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-lg mx-auto">
                A mysterious riddle has locked the North Pole door. Guess the name correctly to reveal the secret inside!
            </p>
        </div>

        {/* The Magic Door */}
        <MagicDoor 
            isOpen={status === 'unlocked' || status === 'viewing'} 
            onEnter={() => setStatus('viewing')}
        />

        {/* Guess Input Form */}
        {status === 'locked' && (
            <div className={`mt-8 w-full max-w-md transition-all duration-300 ${shake ? 'animate-wiggle text-red-500' : ''}`}>
                <form onSubmit={checkAnswer} className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Sparkles className="text-red-400" />
                    </div>
                    <input
                        type="text"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        placeholder="Who is the secret person?"
                        className="w-full pl-10 pr-24 py-4 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 shadow-xl text-lg transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-berry-red to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full font-bold shadow-lg transform transition hover:scale-105 active:scale-95"
                    >
                        Guess
                    </button>
                </form>
                {shake && (
                    <p className="text-center text-red-400 mt-2 font-bold animate-pulse">
                        That doesn't seem right... try again!
                    </p>
                )}
            </div>
        )}

        {/* Success Message */}
        {status === 'unlocked' && (
            <div className="mt-8 text-center animate-bounce">
                <p className="text-2xl font-christmas text-gold">
                    Correct! You guessed it! <br/>
                    <span className="text-sm font-sans text-white/80">Click "Reveal Secret" on the door to see the answer.</span>
                </p>
            </div>
        )}

      </main>

      {/* Story Modal / Overlay */}
      {status === 'viewing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
             <div className="bg-white rounded-3xl overflow-hidden w-full max-w-2xl p-8 text-center shadow-2xl relative flex flex-col items-center border-4 border-gold">
                <button 
                    onClick={() => setStatus('unlocked')}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                >
                    <X size={24} />
                </button>
                
                <h2 className="font-christmas text-4xl text-holly-green mb-6">The Secret Revealed</h2>
                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-100 mb-8 w-full">
                    <p className="text-gray-700 text-lg mb-2">You've solved the mystery!</p>
                    <p className="text-gray-500 text-sm">The final reveal is waiting for you at the North Pole cloud.</p>
                </div>
                
                <a 
                  href={SECRET_STORY_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-berry-red to-red-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center gap-2 text-xl hover:shadow-2xl"
                >
                  <Sparkles size={24} />
                  View the Reveal
                  <ExternalLink size={20} className="opacity-75" />
                </a>
             </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full p-4 text-center text-slate-500 text-xs z-10 font-christmas tracking-widest">
          MADE AT THE NORTH POLE WORKSHOP &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;