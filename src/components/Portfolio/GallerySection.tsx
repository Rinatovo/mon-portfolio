import { useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
    id: string;
    img: string;
    height: number;
    orientation?: 'vertical' | 'horizontal';
    category: 'portrait' | 'event' | 'landscape';
}

// Helper to assign random categories ensuring we have enough for each
const galleryItems: GalleryItem[] = [
    // EVENT
    // Horizontal
    { id: "1", img: '/galerie/event/horizontal/DSCF3131.jpg', height: 500, orientation: 'horizontal', category: 'event' },
    { id: "2", img: '/galerie/event/horizontal/DSCF3139.jpg', height: 500, orientation: 'horizontal', category: 'event' },
    { id: "3", img: '/galerie/event/horizontal/DSCF4509.jpg', height: 500, orientation: 'horizontal', category: 'event' },
    // Vertical
    { id: "4", img: '/galerie/event/vertical/DSCF3110.jpg', height: 500, orientation: 'vertical', category: 'event' },
    { id: "5", img: '/galerie/event/vertical/DSCF3156.jpg', height: 500, orientation: 'vertical', category: 'event' },
    { id: "6", img: '/galerie/event/vertical/DSCF4643.jpg', height: 500, orientation: 'vertical', category: 'event' },
    { id: "7", img: '/galerie/event/vertical/DSCF4682.jpg', height: 500, orientation: 'vertical', category: 'event' },
    { id: "8", img: '/galerie/event/vertical/DSCF4728.jpg', height: 500, orientation: 'vertical', category: 'event' },
    { id: "9", img: '/galerie/event/vertical/IMG_6165.JPG.jpg', height: 500, orientation: 'vertical', category: 'event' },

    // PAYSAGE
    // Horizontal
    { id: "10", img: '/galerie/paysage/horizontal/DSCF0433 (1).jpg', height: 500, orientation: 'horizontal', category: 'landscape' },
    // Vertical
    { id: "11", img: '/galerie/paysage/vertical/DSCF2523-Modifier (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },
    { id: "12", img: '/galerie/paysage/vertical/DSCF3351 (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },
    { id: "13", img: '/galerie/paysage/vertical/DSCF5467 (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },
    { id: "14", img: '/galerie/paysage/vertical/DSCF6202 (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },
    { id: "15", img: '/galerie/paysage/vertical/DSCF6508 (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },
    { id: "16", img: '/galerie/paysage/vertical/DSCF6579 (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },
    { id: "17", img: '/galerie/paysage/vertical/DSCF6632 (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },
    { id: "18", img: '/galerie/paysage/vertical/DSCF6640 (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },
    { id: "19", img: '/galerie/paysage/vertical/DSCF6997 (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },
    { id: "20", img: '/galerie/paysage/vertical/DSCF7127 (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },
    { id: "21", img: '/galerie/paysage/vertical/DSCF7461 (1).jpg', height: 500, orientation: 'vertical', category: 'landscape' },

    // PORTRAIT
    // Horizontal
    { id: "22", img: '/galerie/portrait/horizontal/DSCF5408.jpg', height: 500, orientation: 'horizontal', category: 'portrait' },
    { id: "23", img: '/galerie/portrait/horizontal/DSCF5578-Modifier (1).jpg', height: 500, orientation: 'horizontal', category: 'portrait' },
    { id: "24", img: '/galerie/portrait/horizontal/DSCF5980 (1).jpg', height: 500, orientation: 'horizontal', category: 'portrait' },
    { id: "25", img: '/galerie/portrait/horizontal/DSCF6161 (1).jpg', height: 500, orientation: 'horizontal', category: 'portrait' },
    // Vertical
    { id: "26", img: '/galerie/portrait/vertical/DSCF1254 (1).jpg', height: 500, orientation: 'vertical', category: 'portrait' },
    { id: "27", img: '/galerie/portrait/vertical/DSCF1596 (1).jpg', height: 500, orientation: 'vertical', category: 'portrait' },
    { id: "28", img: '/galerie/portrait/vertical/DSCF1828 (1).jpg', height: 500, orientation: 'vertical', category: 'portrait' },
    { id: "29", img: '/galerie/portrait/vertical/DSCF5517-Modifier (1).jpg', height: 500, orientation: 'vertical', category: 'portrait' },
    { id: "30", img: '/galerie/portrait/vertical/DSCF5991 (1).jpg', height: 500, orientation: 'vertical', category: 'portrait' },
    { id: "31", img: '/galerie/portrait/vertical/DSCF6293.jpg', height: 500, orientation: 'vertical', category: 'portrait' },
    { id: "32", img: '/galerie/portrait/vertical/DSCF6902 (1).jpg', height: 500, orientation: 'vertical', category: 'portrait' },
    { id: "33", img: '/galerie/portrait/vertical/DSCF7381 (1).jpg', height: 500, orientation: 'vertical', category: 'portrait' },
    { id: "34", img: '/galerie/portrait/vertical/DSCF7509.jpg', height: 500, orientation: 'vertical', category: 'portrait' }
];

interface GallerySectionProps {
    onBack: () => void;
}

export default function GallerySection({ onBack }: GallerySectionProps) {
    const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
    const [visibleCounts, setVisibleCounts] = useState<{ [key: string]: number }>({
        portrait: 3,
        event: 3,
        landscape: 3
    });

    const categories: { id: 'portrait' | 'event' | 'landscape'; label: string }[] = [
        { id: 'portrait', label: 'PORTRAITS' },
        { id: 'event', label: 'ÉVÉNEMENTS' },
        { id: 'landscape', label: 'PAYSAGES' },
    ];

    const handleLoadMore = (categoryId: string) => {
        setVisibleCounts(prev => ({
            ...prev,
            [categoryId]: (prev[categoryId] || 3) + 3
        }));
    };

    const scrollContainer = (id: string, direction: 'left' | 'right') => {
        const container = document.getElementById(`scroll-${id}`);
        if (container) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[999] flex items-center justify-center p-0 md:p-6 bg-white md:bg-transparent"
            onClick={onBack}
        >
            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-full md:max-w-7xl h-full md:h-[90vh] md:rounded-[2rem] p-4 md:p-8 shadow-2xl overflow-hidden bg-white"
                onClick={(e: MouseEvent) => e.stopPropagation()}
            >
                <div className="h-full w-full flex flex-col bg-white">
                    {/* HEADER */}
                    <div className="px-2 md:px-4 pb-4 md:pb-6 shrink-0 flex items-center justify-between border-b border-gray-100">
                        <div className="flex flex-col">
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-black">GALERIE.</h2>
                            <p className="text-gray-400 text-xs md:text-sm font-mono mt-1">SELECT YOUR MEMORY</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <a
                                href="https://www.instagram.com/err.raw/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Instagram"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 hover:text-orange-600">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <circle cx="17.5" cy="6.5" r="1.5"></circle>
                                </svg>
                            </a>
                            <button
                                onClick={onBack}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-orange-500 hover:text-orange-600 text-3xl leading-none"
                                aria-label="Fermer"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* CONTENT - SCROLLABLE CATEGORIES */}
                    <div className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden space-y-8 py-6">

                        {categories.map((cat) => {
                            const categoryItems = galleryItems.filter(item => item.category === cat.id);
                            const visibleItems = categoryItems.slice(0, visibleCounts[cat.id]);
                            const hasMore = visibleItems.length < categoryItems.length;

                            return (
                                <div key={cat.id} className="space-y-4 group/section relative">
                                    <div className="px-2 md:px-4 flex items-center gap-4">
                                        <h3 className="text-xl md:text-2xl font-black italic text-gray-900 border-l-4 border-orange-500 pl-4">
                                            {cat.label}
                                        </h3>
                                        <div className="h-[1px] flex-1 bg-gray-200"></div>

                                        {/* PC Scroll Controls (Hidden on Mobile) */}
                                        <div className="hidden md:flex gap-2">
                                            <button
                                                onClick={() => scrollContainer(cat.id, 'left')}
                                                className="p-2 rounded-full hover:bg-gray-100 border border-black text-black transition-colors"
                                                aria-label="Scroll Left"
                                            >
                                                ←
                                            </button>
                                            <button
                                                onClick={() => scrollContainer(cat.id, 'right')}
                                                className="p-2 rounded-full hover:bg-gray-100 border border-black text-black transition-colors"
                                                aria-label="Scroll Right"
                                            >
                                                →
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        id={`scroll-${cat.id}`}
                                        className="flex overflow-x-auto gap-4 px-2 md:px-4 pb-4 snap-x snap-mandatory hide-scrollbar scroll-smooth"
                                    >
                                        {visibleItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`snap-center shrink-0 relative group overflow-hidden rounded-xl cursor-pointer bg-gray-100 ${item.orientation === 'horizontal' ? 'w-[300px] md:w-[450px] aspect-[4/3]' : 'w-[200px] md:w-[300px] aspect-[2/3] md:aspect-[3/4]'}`}
                                                onClick={() => setSelectedPhoto(item)}
                                            >
                                                <img
                                                    src={item.img}
                                                    alt={`Photo ${item.id}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                    decoding="async"
                                                />

                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                            </div>
                                        ))}

                                        {/* Load More Button Card */}
                                        {hasMore && (
                                            <div
                                                className="snap-center shrink-0 w-[100px] md:w-[150px] flex items-center justify-center"
                                            >
                                                <button
                                                    onClick={() => handleLoadMore(cat.id)}
                                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-transform hover:scale-110 shadow-lg"
                                                    title="Load More"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="h-20"></div> {/* Spacer */}
                    </div>
                </div>
            </motion.div>

            {/* MODALE PHOTO FULLSCREEN */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full h-full max-w-5xl max-h-5xl flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute top-4 right-4 z-10 text-white/40 hover:text-white text-4xl transition-colors duration-200"
                                aria-label="Fermer"
                            >
                                ✕
                            </button>

                            <img
                                src={selectedPhoto.img}
                                alt="Photo agrandie"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-sm font-mono uppercase border border-white/10">
                                {selectedPhoto.category}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
