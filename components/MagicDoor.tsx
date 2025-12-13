import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface MagicDoorProps {
  isOpen: boolean;
  onEnter: () => void;
}

const MagicDoor: React.FC<MagicDoorProps> = ({ isOpen, onEnter }) => {
  return (
    <div className="relative w-64 h-96 md:w-80 md:h-[28rem] perspective-2000 mx-auto mt-8">
      {/* Door Frame/Background (What's behind the door) */}
      <div className="absolute inset-0 bg-yellow-100 rounded-t-full border-8 border-stone-800 shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Glowing Portal Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br from-gold via-yellow-200 to-white opacity-0 transition-opacity duration-1000 ${isOpen ? 'opacity-100' : ''}`}>
           <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
              <span className="text-4xl mb-4">✨</span>
              <button 
                onClick={onEnter}
                className="px-6 py-3 bg-holly-green text-white font-christmas text-2xl rounded-full hover:bg-green-700 transform hover:scale-105 transition-all shadow-lg border-2 border-gold cursor-pointer z-10"
              >
                Reveal Secret
              </button>
           </div>
        </div>
      </div>

      {/* The Door Itself */}
      <div 
        className={`absolute inset-0 bg-red-800 rounded-t-full border-4 border-red-900 origin-left transform-style-3d transition-transform duration-[2000ms] ease-in-out flex flex-col items-center justify-center shadow-lg ${isOpen ? 'rotate-y-110' : ''}`}
      >
        {/* Door Pattern/Texture */}
        <div className="absolute inset-4 border-2 border-dashed border-red-900/50 rounded-t-full pointer-events-none"></div>
        
        {/* Wreath */}
        <div className="w-32 h-32 relative mb-8">
           <div className="absolute inset-0 bg-green-700 rounded-full border-4 border-green-800 shadow-md flex items-center justify-center">
             <div className="w-20 h-20 bg-red-800 rounded-full border-4 border-green-900/30"></div>
           </div>
           {/* Bow */}
           <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 text-red-600 drop-shadow-md">
             🎀
           </div>
        </div>

        {/* Door Handle / Lock Status */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
             <div className="w-4 h-20 bg-gold rounded-full shadow-inner flex flex-col items-center justify-around py-2">
                 {isOpen ? <Unlock size={16} className="text-yellow-800" /> : <Lock size={16} className="text-yellow-800" />}
             </div>
             <div className="w-3 h-6 bg-black/20 rounded-full mt-1 mx-auto blur-[1px]"></div>
        </div>
        
        <div className="mt-12 text-gold font-christmas text-xl opacity-80">
            North Pole
        </div>
      </div>
    </div>
  );
};

export default MagicDoor;