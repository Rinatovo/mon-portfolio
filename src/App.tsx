import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StarField from './components/Effects/StarField';
import GameIntro from './components/Game/GameIntro';
import ClassSelection from './components/Game/ClassSelection';
import ProfileSection from './components/Portfolio/ProfileSection';
import GallerySection from './components/Portfolio/GallerySection';
import SocialLinks from './components/UI/SocialLinks';
import './App.css';

type GameState = 'intro' | 'selection' | 'dev' | 'photo';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('intro');

  const handleStart = () => {
    setGameState('selection');
  };

  const handleClassSelect = (classe: 'dev' | 'photo') => {
    setGameState(classe);
  };

  const handleBackToMenu = () => {
    setGameState('selection');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#020202] text-white overflow-hidden font-sans flex flex-col items-center justify-center">

      {/* Background Effect (Persistent) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#0a0a1a] to-[#1a0a1a] opacity-80" />
        <StarField speed={2} starCount={1500} />
      </div>

      <SocialLinks />

      <AnimatePresence mode="wait">

        {gameState === 'intro' && (
          <GameIntro key="intro" onStart={handleStart} />
        )}

        {gameState === 'selection' && (
          <ClassSelection key="selection" onSelect={handleClassSelect} />
        )}

        {gameState === 'dev' && (
          <ProfileSection key="dev" onBack={handleBackToMenu} />
        )}

        {gameState === 'photo' && (
          <GallerySection key="photo" onBack={handleBackToMenu} />
        )}

      </AnimatePresence>

    </div>
  );
}
