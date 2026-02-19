import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ClassSelectionProps {
    onSelect: (classe: 'dev' | 'photo') => void;
}

export default function ClassSelection({ onSelect }: ClassSelectionProps) {
    const [hoveredClass, setHoveredClass] = useState<'dev' | 'photo' | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
    };

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center p-4 md:p-10 z-20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            >

                {/* DEVELOPER CLASS */}
                <motion.div
                    variants={itemVariants}
                    className="group relative w-full md:w-[500px] h-[240px] md:h-[600px] cursor-pointer perspective-1000"
                    onMouseEnter={() => !isMobile && setHoveredClass('dev')}
                    onMouseLeave={() => !isMobile && setHoveredClass(null)}
                    onClick={() => onSelect('dev')}
                >
                    <div className={`
             absolute inset-0 rounded-3xl border-2 bg-black/80 backdrop-blur-sm transition-all duration-500 overflow-hidden
             ${(hoveredClass === 'dev' || isMobile) ? 'border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.5)] scale-105 z-20' : 'border-white/10 scale-100 grayscale hover:grayscale-0'}
             ${(hoveredClass === 'photo' && !isMobile) ? 'opacity-40 scale-95 blur-sm' : 'opacity-100'}
          `}>

                        {/* Background Image/Asset */}
                        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
                            <img
                                src={(hoveredClass === 'dev' || isMobile) ? '/pcon.png' : '/pcoff.png'}
                                alt="Developer Class"
                                className={`w-full h-auto object-contain transition-transform duration-700 ${(hoveredClass === 'dev' || isMobile) ? 'scale-110 drop-shadow-[0_20px_40px_rgba(59,130,246,0.6)]' : 'scale-90'}`}
                            />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <h2 className={`text-2xl md:text-4xl font-black italic uppercase mb-2 ${(hoveredClass === 'dev' || isMobile) ? 'text-white' : 'text-gray-500'}`}>Le Développeur</h2>
                            <div className="space-y-2 md:space-y-4">
                                <div className="flex justify-between items-center text-xs md:text-sm font-mono text-blue-300">
                                    <span>INTELLIGENCE</span>
                                    <div className="w-20 md:w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-blue-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: (hoveredClass === 'dev' || isMobile) ? '90%' : '0%' }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs md:text-sm font-mono text-blue-300">
                                    <span>CREATIVITY</span>
                                    <div className="w-20 md:w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-blue-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: (hoveredClass === 'dev' || isMobile) ? '85%' : '0%' }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs md:text-sm font-mono text-blue-300">
                                    <span>COFFEE</span>
                                    <div className="w-20 md:w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-blue-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: (hoveredClass === 'dev' || isMobile) ? '100%' : '0%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* VS Separator (Optional) */}
                <motion.div
                    variants={itemVariants}
                    className="text-2xl md:text-4xl font-black italic text-white/20 my-2 md:my-0"
                >
                    VS
                </motion.div>


                {/* PHOTOGRAPHER CLASS */}
                <motion.div
                    variants={itemVariants}
                    className="group relative w-full md:w-[500px] h-[240px] md:h-[600px] cursor-pointer perspective-1000"
                    onMouseEnter={() => !isMobile && setHoveredClass('photo')}
                    onMouseLeave={() => !isMobile && setHoveredClass(null)}
                    onClick={() => onSelect('photo')}
                >
                    <div className={`
             absolute inset-0 rounded-3xl border-2 bg-black/80 backdrop-blur-sm transition-all duration-500 overflow-hidden
             ${(hoveredClass === 'photo' || isMobile) ? 'border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.5)] scale-105 z-20' : 'border-orange-500/10 scale-100 grayscale hover:grayscale-0'}
             ${(hoveredClass === 'dev' && !isMobile) ? 'opacity-40 scale-95 blur-sm' : 'opacity-100'}
          `}>

                        {/* Background Image/Asset */}
                        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
                            <img
                                src={(hoveredClass === 'photo' || isMobile) ? '/camon.png' : '/cam.png'}
                                alt="Photographer Class"
                                className={`w-full h-auto object-contain transition-transform duration-700 ${(hoveredClass === 'photo' || isMobile) ? 'scale-110 rotate-12 drop-shadow-[0_20px_40px_rgba(249,115,22,0.6)]' : 'scale-90'}`}
                            />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <h2 className={`text-2xl md:text-4xl font-black italic uppercase mb-2 ${(hoveredClass === 'photo' || isMobile) ? 'text-white' : 'text-gray-500'}`}>Le Photographe</h2>
                            <div className="space-y-2 md:space-y-4">
                                <div className="flex justify-between items-center text-xs md:text-sm font-mono text-orange-300">
                                    <span>VISION</span>
                                    <div className="w-20 md:w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-orange-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: (hoveredClass === 'photo' || isMobile) ? '95%' : '0%' }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs md:text-sm font-mono text-orange-300">
                                    <span>PATIENCE</span>
                                    <div className="w-20 md:w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-orange-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: (hoveredClass === 'photo' || isMobile) ? '90%' : '0%' }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs md:text-sm font-mono text-orange-300">
                                    <span>AESTHETIC</span>
                                    <div className="w-20 md:w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-orange-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: (hoveredClass === 'photo' || isMobile) ? '100%' : '0%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </motion.div>

            <div className="mt-8 text-center">
                <p className="text-white/40 font-mono text-sm uppercase tracking-widest animate-pulse">Select Your Character</p>
            </div>

        </div>
    );
}
