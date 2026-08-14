import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiCamera, 
    FiInstagram, 
    FiX, 
    FiChevronLeft, 
    FiChevronRight, 
    FiMail,
    FiArrowLeft,
    FiMaximize2,
    FiPlus
} from 'react-icons/fi';

interface GalleryItem {
    id: string;
    title: string;
    img: string;
    orientation: 'vertical' | 'horizontal';
    category: 'marque' | 'portrait' | 'event' | 'landscape';
    exif: {
        camera: string;
        lens: string;
        aperture: string;
        shutter: string;
        iso: string;
        location: string;
    };
}

const galleryItems: GalleryItem[] = [
    // MARQUE & ÉDITO
    { 
        id: "m-h-1", 
        title: "", 
        img: '/galerie/Marque/horizontal/DSCF0088d.jpg', 
        orientation: 'horizontal', 
        category: 'marque',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/500s', iso: 'ISO 160', location: 'Studio Marque' }
    },
    { 
        id: "m-v-1", 
        title: "", 
        img: '/galerie/Marque/vertical/DSCF0096.jpg', 
        orientation: 'vertical', 
        category: 'marque',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/500s', iso: 'ISO 160', location: 'Studio Marque' }
    },
    { 
        id: "m-h-2", 
        title: "", 
        img: '/galerie/Marque/horizontal/DSCF0124.jpg', 
        orientation: 'horizontal', 
        category: 'marque',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/640s', iso: 'ISO 160', location: 'Session Éditoriale' }
    },
    { 
        id: "m-v-2", 
        title: "", 
        img: '/galerie/Marque/vertical/DSCF0131.jpg', 
        orientation: 'vertical', 
        category: 'marque',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/800s', iso: 'ISO 160', location: 'Session Éditoriale' }
    },
    { 
        id: "m-v-3", 
        title: "", 
        img: '/galerie/Marque/vertical/DSCF0223.jpg', 
        orientation: 'vertical', 
        category: 'marque',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/800s', iso: 'ISO 160', location: 'Session Éditoriale' }
    },
    { 
        id: "m-v-4", 
        title: "", 
        img: '/galerie/Marque/vertical/DSCF0244.jpg', 
        orientation: 'vertical', 
        category: 'marque',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/640s', iso: 'ISO 200', location: 'Studio Light' }
    },
    { 
        id: "m-v-5", 
        title: "", 
        img: '/galerie/Marque/vertical/DSCF0260.jpg', 
        orientation: 'vertical', 
        category: 'marque',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/500s', iso: 'ISO 160', location: 'Studio Marque' }
    },

    // EVENT
    { 
        id: "e-h-1", 
        title: "", 
        img: '/galerie/event/horizontal/DSCF0518d.jpg', 
        orientation: 'horizontal', 
        category: 'event',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/320s', iso: 'ISO 640', location: 'Concert Live' }
    },
    { 
        id: "e-v-1", 
        title: "", 
        img: '/galerie/event/vertical/DSCF0382 (1).jpg', 
        orientation: 'vertical', 
        category: 'event',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/500s', iso: 'ISO 400', location: 'Live Session' }
    },
    { 
        id: "e-h-2", 
        title: "", 
        img: '/galerie/event/horizontal/DSCF6014.jpg', 
        orientation: 'horizontal', 
        category: 'event',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/400s', iso: 'ISO 500', location: 'Soirée Privée' }
    },
    { 
        id: "e-v-2", 
        title: "", 
        img: '/galerie/event/vertical/DSCF0427.jpg', 
        orientation: 'vertical', 
        category: 'event',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/640s', iso: 'ISO 400', location: 'Concert Live' }
    },
    { 
        id: "e-v-3", 
        title: "", 
        img: '/galerie/event/vertical/DSCF3110.jpg', 
        orientation: 'vertical', 
        category: 'event',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/500s', iso: 'ISO 400', location: 'Live Performance' }
    },
    { 
        id: "e-v-4", 
        title: "", 
        img: '/galerie/event/vertical/IMG_6165.JPG.jpg', 
        orientation: 'vertical', 
        category: 'event',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/500s', iso: 'ISO 500', location: 'Festival Outdoor' }
    },

    // PAYSAGE
    { 
        id: "l-h-1", 
        title: "", 
        img: '/galerie/paysage/horizontal/DSCF0433 (1).jpg', 
        orientation: 'horizontal', 
        category: 'landscape',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/8.0', shutter: '1/125s', iso: 'ISO 160', location: 'Côte Sauvage' }
    },
    { 
        id: "l-v-1", 
        title: "", 
        img: '/galerie/paysage/vertical/DSCF2523-Modifier (1).jpg', 
        orientation: 'vertical', 
        category: 'landscape',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/5.6', shutter: '1/250s', iso: 'ISO 160', location: 'Alpes' }
    },
    { 
        id: "l-h-2", 
        title: "", 
        img: '/galerie/paysage/horizontal/DSCF9748.jpg', 
        orientation: 'horizontal', 
        category: 'landscape',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/4.0', shutter: '1/500s', iso: 'ISO 200', location: 'Espace Sauvage' }
    },
    { 
        id: "l-v-2", 
        title: "", 
        img: '/galerie/paysage/vertical/DSCF3351 (1).jpg', 
        orientation: 'vertical', 
        category: 'landscape',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/8.0', shutter: '1/160s', iso: 'ISO 160', location: 'Forêt' }
    },
    { 
        id: "l-v-3", 
        title: "", 
        img: '/galerie/paysage/vertical/DSCF4007 (1).jpg', 
        orientation: 'vertical', 
        category: 'landscape',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/5.6', shutter: '1/250s', iso: 'ISO 160', location: 'Sentier Sauvage' }
    },
    { 
        id: "l-v-4", 
        title: "", 
        img: '/galerie/paysage/vertical/DSCF5467 (1).jpg', 
        orientation: 'vertical', 
        category: 'landscape',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/4.0', shutter: '1/500s', iso: 'ISO 200', location: 'Vallée' }
    },
    { 
        id: "l-v-5", 
        title: "", 
        img: '/galerie/paysage/vertical/DSCF6579 (1).jpg', 
        orientation: 'vertical', 
        category: 'landscape',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/5.6', shutter: '1/320s', iso: 'ISO 250', location: 'Gorges Naturelles' }
    },
    { 
        id: "l-v-6", 
        title: "", 
        img: '/galerie/paysage/vertical/DSCF8750 (1).jpg', 
        orientation: 'vertical', 
        category: 'landscape',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/5.6', shutter: '1/400s', iso: 'ISO 160', location: 'Clairière' }
    },

    // PORTRAIT
    { 
        id: "p-v-1", 
        title: "", 
        img: '/galerie/portrait/vertical/DSCF1254 (1).jpg', 
        orientation: 'vertical', 
        category: 'portrait',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/800s', iso: 'ISO 160', location: 'Portrait' }
    },
    { 
        id: "p-v-2", 
        title: "", 
        img: '/galerie/portrait/vertical/DSCF1596 (1).jpg', 
        orientation: 'vertical', 
        category: 'portrait',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/400s', iso: 'ISO 250', location: 'Street Session' }
    },
    { 
        id: "p-v-3", 
        title: "", 
        img: '/galerie/portrait/vertical/DSCF1828 (1).jpg', 
        orientation: 'vertical', 
        category: 'portrait',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/640s', iso: 'ISO 160', location: 'Studio' }
    },
    { 
        id: "p-v-4", 
        title: "", 
        img: '/galerie/portrait/vertical/DSCF8246 (1).jpg', 
        orientation: 'vertical', 
        category: 'portrait',
        exif: { camera: 'Fujifilm X100VI', lens: 'Fujinon 23mm f/2.0', aperture: 'f/2.0', shutter: '1/1000s', iso: 'ISO 160', location: 'Studio Light' }
    }
];

interface GallerySectionProps {
    onBack: () => void;
}

export default function GallerySection({ onBack }: GallerySectionProps) {
    const BATCH_SIZE = 9;
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'marque' | 'portrait' | 'event' | 'landscape'>('all');
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);

    const filteredItems = galleryItems.filter(item => 
        selectedCategory === 'all' ? true : item.category === selectedCategory
    );

    // Reset batch count when category filter changes
    useEffect(() => {
        setVisibleCount(BATCH_SIZE);
    }, [selectedCategory]);

    const displayedItems = filteredItems.slice(0, visibleCount);
    const hasMore = visibleCount < filteredItems.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + BATCH_SIZE);
    };

    const activePhoto = selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

    const handleNextPhoto = () => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
        }
    };

    const handlePrevPhoto = () => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length);
        }
    };

    // Keyboard shortcuts for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedPhotoIndex === null) return;
            if (e.key === 'ArrowRight') handleNextPhoto();
            if (e.key === 'ArrowLeft') handlePrevPhoto();
            if (e.key === 'Escape') {
                if (isZoomed) {
                    setIsZoomed(false);
                } else {
                    setSelectedPhotoIndex(null);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPhotoIndex, filteredItems.length, isZoomed]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] overflow-y-auto bg-[#060608] text-gray-100 font-sans selection:bg-amber-500 selection:text-white"
        >
            {/* STICKY NAVBAR */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#060608]/85 border-b border-white/10 flex flex-col">
                <div className="px-4 md:px-8 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-gray-300 hover:text-amber-400 border border-white/10 hover:border-amber-500/40 text-xs md:text-sm font-medium transition-all"
                        >
                            <FiArrowLeft className="text-base" />
                            <span className="hidden sm:inline">Changer de classe</span>
                            <span className="sm:hidden">Retour</span>
                        </button>

                        <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

                        <div className="flex flex-col">
                            <span className="text-base md:text-xl font-black italic tracking-tighter text-white flex items-center gap-1.5">
                                ERR.RAW <span className="text-amber-500 font-mono text-[10px] sm:text-xs not-italic uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">GALERIE ART</span>
                            </span>
                        </div>
                    </div>

                    {/* NAV LINKS (Desktop) */}
                    <div className="hidden lg:flex items-center gap-6 text-sm font-mono text-gray-400">
                        <button onClick={() => scrollToSection('galerie')} className="hover:text-amber-400 transition-colors">Exposition</button>
                        <button onClick={() => scrollToSection('contact')} className="hover:text-amber-400 transition-colors">Contact</button>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <a
                            href="https://www.instagram.com/err.raw/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-gray-300 hover:text-amber-400 border border-white/10 hover:border-amber-500/30 transition-all flex items-center gap-2 text-xs font-mono"
                            aria-label="Instagram @err.raw"
                        >
                            <FiInstagram className="text-lg text-amber-400" />
                            <span className="hidden sm:inline">@err.raw</span>
                        </a>

                        <a
                            href="mailto:rinatovo2103@gmail.com"
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-medium text-xs md:text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                        >
                            <FiMail />
                            <span className="hidden sm:inline">Contact Éditorial</span>
                            <span className="sm:hidden">Contact</span>
                        </a>
                    </div>
                </div>

                {/* MOBILE QUICK NAV SUB-BAR */}
                <div className="flex lg:hidden overflow-x-auto gap-2 px-4 py-2 border-t border-white/5 bg-black/40 text-xs font-mono text-gray-400 scrollbar-none snap-x">
                    <button onClick={() => scrollToSection('galerie')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/5">#Exposition</button>
                    <button onClick={() => scrollToSection('contact')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">#Contact</button>
                </div>
            </nav>

            <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-24">

                {/* HERO ARTISTIQUE */}
                <section className="relative pt-4 md:pt-8 pb-6 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 p-6 md:p-10 overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="max-w-4xl space-y-4 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                            <FiCamera className="text-sm" />
                            <span>GALERIE & DIRECTION ARTISTIQUE</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">
                            ERR.RAW
                        </h1>

                        <div className="pt-2">
                            <a
                                href="https://www.instagram.com/err.raw/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-sm font-medium transition-all"
                            >
                                <FiInstagram className="text-amber-400" />
                                <span>Instagram @err.raw</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* GALERIE D'EXPOSITION (MASONRY ADAPTATIVE FORMAT RÉEL) */}
                <section id="galerie" className="space-y-8 scroll-mt-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
                        <div>
                            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">EUVRES & CLICHÉS SÉLECTIONNÉS</span>
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tight uppercase text-white">
                                Exposition Visuelle.
                            </h2>
                        </div>

                        {/* FILTRES PAR CATEGORIE (SWIPEABLE TABS SUR MOBILE) */}
                        <div className="flex overflow-x-auto gap-2 pb-2 w-full md:w-auto scrollbar-none snap-x">
                            {[
                                { id: 'all', label: 'Toutes les œuvres', count: galleryItems.length },
                                { id: 'marque', label: 'Marque & Édito', count: galleryItems.filter(i => i.category === 'marque').length },
                                { id: 'portrait', label: 'Portraits', count: galleryItems.filter(i => i.category === 'portrait').length },
                                { id: 'event', label: 'Événements', count: galleryItems.filter(i => i.category === 'event').length },
                                { id: 'landscape', label: 'Paysages', count: galleryItems.filter(i => i.category === 'landscape').length }
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id as any)}
                                    className={`snap-start shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-mono transition-all flex items-center gap-2 ${
                                        selectedCategory === cat.id
                                            ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/30'
                                            : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-white/5'
                                    }`}
                                >
                                    <span>{cat.label}</span>
                                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                                        selectedCategory === cat.id ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-gray-400'
                                    }`}>
                                        {cat.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* INSTAGRAM PROFILE STYLE GRID (3 COLUMNS 1:1 SQUARE) */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4">
                        <AnimatePresence mode="popLayout">
                            {displayedItems.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: idx * 0.015 }}
                                    className="group relative overflow-hidden rounded-xl bg-[#0e0e14] border border-white/10 aspect-square cursor-pointer hover:border-amber-500/50 transition-all duration-300 shadow-md"
                                    onClick={() => setSelectedPhotoIndex(idx)}
                                >
                                    <img
                                        src={item.img}
                                        alt="Photographie ERR.RAW"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* OVERLAY DISCRET SURVOL (INSTAGRAM STYLE) */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-2 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-amber-400 border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                                                <FiMaximize2 className="text-base" />
                                            </span>
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 hidden sm:inline-block">
                                                {item.orientation === 'horizontal' ? 'PAYSAGE' : 'PORTRAIT'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* BOUTON CHARGER PLUS (LOAD MORE) FOR MAXIMUM SPEED & FLUIDITY */}
                    {hasMore && (
                        <div className="flex flex-col items-center justify-center pt-8 pb-4">
                            <button
                                onClick={handleLoadMore}
                                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-amber-500/20 hover:from-amber-500 hover:to-orange-500 text-white font-mono text-xs sm:text-sm border border-amber-500/40 hover:border-amber-400 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-amber-500/25 active:scale-95"
                            >
                                <FiPlus className="text-amber-400 group-hover:text-white group-hover:rotate-90 transition-transform duration-300 text-base sm:text-lg" />
                                <span className="tracking-wider uppercase font-bold">Charger plus d'œuvres</span>
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/50 border border-white/10 font-mono text-amber-300 group-hover:bg-white/20 group-hover:text-white">
                                    +{filteredItems.length - visibleCount}
                                </span>
                            </button>
                            <span className="text-[11px] font-mono text-gray-500 mt-2">
                                Affichage de {visibleCount} sur {filteredItems.length} photos
                            </span>
                        </div>
                    )}
                </section>



                {/* CONTACT & DISCUSSIONS ÉDITORIALES */}
                <section id="contact" className="space-y-8 scroll-mt-24 pb-16">
                    <div className="border-b border-white/10 pb-6">
                        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">ÉCHANGES & COLLABORATIONS</span>
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tight uppercase text-white">
                            Contact Éditorial.
                        </h2>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 space-y-4">
                        <h3 className="text-2xl font-bold text-white">Une collaboration artistique ou un projet de marque ?</h3>
                        <p className="text-sm text-gray-300 font-light leading-relaxed max-w-3xl">
                            Pour toute demande de direction artistique, projets de lookbook de marque, expositions ou tirages d'art, vous pouvez me contacter directement par email ou suivre mes travaux sur Instagram.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <a
                            href="mailto:rinatovo2103@gmail.com"
                            className="p-8 rounded-3xl bg-gradient-to-br from-amber-600/20 to-orange-600/10 border border-amber-500/30 hover:border-amber-500/60 transition-all flex flex-col justify-between space-y-6 group hover:scale-[1.02]"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl group-hover:scale-110 transition-transform">
                                <FiMail />
                            </div>
                            <div>
                                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">EMAIL DIRECT</span>
                                <h4 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">Écrire un e-mail</h4>
                                <p className="text-xs text-gray-400 font-mono mt-1">rinatovo2103@gmail.com</p>
                            </div>
                        </a>

                        <a
                            href="https://www.instagram.com/err.raw/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-6 group hover:scale-[1.02]"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 text-xl group-hover:scale-110 transition-transform">
                                <FiInstagram className="text-amber-400" />
                            </div>
                            <div>
                                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-1">INSTAGRAM OFFICIEL</span>
                                <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">Suivre @err.raw</h4>
                                <p className="text-xs text-gray-400 font-mono mt-1">instagram.com/err.raw</p>
                            </div>
                        </a>
                    </div>
                </section>
            </main>

            {/* LIGHTBOX MODAL (AVEC EXIF ET FORMAT REEL / PLEIN ÉCRAN MOBILE) */}
            <AnimatePresence>
                {activePhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-8"
                        onClick={() => { setSelectedPhotoIndex(null); setIsZoomed(false); }}
                    >
                        {/* FULLSCREEN ZOOM MODE OVERLAY */}
                        {isZoomed ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="fixed inset-0 z-[20000] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-2 sm:p-4 select-none"
                                onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                            >
                                {/* TOP TOOLBAR */}
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50">
                                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-xs font-mono text-amber-400">
                                        <FiMaximize2 />
                                        <span>Plein Écran ({selectedPhotoIndex! + 1} / {filteredItems.length})</span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                                        className="p-3 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-black transition-colors"
                                        aria-label="Réduire"
                                    >
                                        <FiX className="text-2xl" />
                                    </button>
                                </div>

                                {/* NAV ARROWS IN ZOOM MODE */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
                                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black border border-white/20 transition-all z-50 backdrop-blur-md"
                                    aria-label="Photo précédente"
                                >
                                    <FiChevronLeft className="text-2xl sm:text-3xl" />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
                                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black border border-white/20 transition-all z-50 backdrop-blur-md"
                                    aria-label="Photo suivante"
                                >
                                    <FiChevronRight className="text-2xl sm:text-3xl" />
                                </button>

                                {/* FULLSCREEN IMAGE */}
                                <div 
                                    className="w-full h-full max-w-[98vw] max-h-[94vh] flex items-center justify-center cursor-zoom-out p-1"
                                    onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                                >
                                    <img
                                        src={activePhoto.img}
                                        alt="Photographie grand format ERR.RAW"
                                        className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                                    />
                                </div>

                                <span className="absolute bottom-4 text-[11px] font-mono text-gray-400 bg-black/70 px-3.5 py-1 rounded-full border border-white/10">
                                    Toucher la photo pour revenir aux détails EXIF
                                </span>
                            </motion.div>
                        ) : (
                            <>
                                {/* CLOSE BUTTON */}
                                <button
                                    onClick={() => { setSelectedPhotoIndex(null); setIsZoomed(false); }}
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-amber-500 text-white transition-colors z-50"
                                    aria-label="Fermer"
                                >
                                    <FiX className="text-2xl" />
                                </button>

                                {/* NAV PREV / NEXT (DESKTOP FLOATING SIDE ARROWS) */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
                                    className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black border border-white/20 transition-all z-50 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
                                    aria-label="Photo précédente"
                                >
                                    <FiChevronLeft className="text-2xl" />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
                                    className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black border border-white/20 transition-all z-50 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
                                    aria-label="Photo suivante"
                                >
                                    <FiChevronRight className="text-2xl" />
                                </button>

                                {/* CONTENT CONTAINER */}
                                <div
                                    className="relative max-w-6xl w-full max-h-[92vh] flex flex-col lg:flex-row items-center gap-4 lg:gap-6 bg-[#0c0c10] border border-white/10 rounded-3xl overflow-y-auto lg:overflow-hidden shadow-2xl p-4 md:p-6"
                                    onClick={e => e.stopPropagation()}
                                >
                                    {/* IMAGE PREVIEW IN WHITE PASSE-PARTOUT FRAME (CLICKABLE TO ZOOM FULLSCREEN) */}
                                    <div 
                                        onClick={() => setIsZoomed(true)}
                                        className="w-full lg:w-2/3 h-[50vh] sm:h-[60vh] lg:h-[75vh] flex flex-col items-center justify-center bg-white rounded-2xl overflow-hidden relative p-3 md:p-8 shadow-2xl border border-white/20 cursor-pointer group"
                                    >
                                        <img
                                            src={activePhoto.img}
                                            alt="Cliché original ERR.RAW"
                                            className="max-w-full max-h-full object-contain rounded shadow-md group-hover:scale-[1.02] transition-transform duration-300"
                                        />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setIsZoomed(true); }}
                                            className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-amber-400 text-xs font-mono flex items-center gap-2 border border-amber-500/40 shadow-xl group-hover:bg-amber-500 group-hover:text-black transition-all"
                                        >
                                            <FiMaximize2 className="text-sm" />
                                            <span>Plein Écran</span>
                                        </button>
                                    </div>

                                    {/* NAVIGATION MOBILE TACTILE SOUS L'IMAGE (PRÉCÉDENTE / SUIVANTE) */}
                                    <div className="flex lg:hidden items-center justify-between w-full p-2 bg-white/5 rounded-2xl border border-white/10">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
                                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-mono text-xs font-bold transition-all border border-amber-500/30 active:scale-95"
                                        >
                                            <FiChevronLeft className="text-lg" />
                                            <span>Précédente</span>
                                        </button>

                                        <span className="text-xs font-mono font-bold text-gray-400">
                                            {selectedPhotoIndex! + 1} / {filteredItems.length}
                                        </span>

                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
                                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-mono text-xs font-bold transition-all border border-amber-500/30 active:scale-95"
                                        >
                                            <span>Suivante</span>
                                            <FiChevronRight className="text-lg" />
                                        </button>
                                    </div>

                                    {/* SIDE PANEL EXIF & DETAILS */}
                                    <div className="w-full lg:w-1/3 flex flex-col justify-between space-y-6 p-2 md:p-4 text-left">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30">
                                                    {activePhoto.category === 'marque' ? 'MARQUE & ÉDITO' : activePhoto.category.toUpperCase()}
                                                </span>
                                                <span className="text-xs font-mono text-gray-500">
                                                    {selectedPhotoIndex! + 1} / {filteredItems.length}
                                                </span>
                                            </div>
                                        </div>

                                        {/* EXIF DATA GRID */}
                                        <div className="space-y-3 pt-4 border-t border-white/10">
                                            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
                                                Données EXIF / Fiche Œuvre
                                            </span>

                                            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                                                    <span className="text-gray-500 text-[10px] block">BOÎTIER</span>
                                                    <span className="text-gray-200 font-semibold">{activePhoto.exif.camera}</span>
                                                </div>

                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                                                    <span className="text-gray-500 text-[10px] block">OBJECTIF</span>
                                                    <span className="text-gray-200 font-semibold">{activePhoto.exif.lens}</span>
                                                </div>

                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                                                    <span className="text-gray-500 text-[10px] block">OUVERTURE</span>
                                                    <span className="text-amber-400 font-semibold">{activePhoto.exif.aperture}</span>
                                                </div>

                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                                                    <span className="text-gray-500 text-[10px] block">VITESSE</span>
                                                    <span className="text-orange-300 font-semibold">{activePhoto.exif.shutter}</span>
                                                </div>

                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                                                    <span className="text-gray-500 text-[10px] block">ORIENTATION</span>
                                                    <span className="text-gray-200 font-semibold uppercase">{activePhoto.orientation}</span>
                                                </div>

                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                                                    <span className="text-gray-500 text-[10px] block">QUALITÉ</span>
                                                    <span className="text-emerald-400 font-semibold">RAW 14-bit</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2 flex items-center justify-between text-xs font-mono text-gray-500">
                                            <span>← → Flèches</span>
                                            <span>Échap pour fermer</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
