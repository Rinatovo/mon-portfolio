import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GameIntroProps {
    onStart: () => void;
}

export default function GameIntro({ onStart }: GameIntroProps) {
    const [textVisible, setTextVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextVisible((v) => !v);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white cursor-pointer"
            onClick={onStart}
        >
            <div className="relative z-10 text-center space-y-8">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="text-4xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 px-4"
                >
                    BIENVENUE DANS LE PORTFOLIO DE RINA
                </motion.h1>

                <div className="space-y-2">
                    <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">System Initialized</p>
                    <p className="text-orange-400 font-mono text-sm tracking-widest uppercase">v2.0.24</p>
                </div>

                <div className={`mt-12 text-2xl md:text-4xl font-bold transition-opacity duration-100 ${textVisible ? 'opacity-100' : 'opacity-0'}`}>
                    PRESS START
                </div>
            </div>

            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" />
            <div className="absolute inset-0 bg-black/80 z-0" />
        </motion.div>
    );
}
