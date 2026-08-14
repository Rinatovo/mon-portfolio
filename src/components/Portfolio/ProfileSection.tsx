import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiCode, 
    FiGithub, 
    FiExternalLink, 
    FiArrowLeft, 
    FiTerminal, 
    FiCpu, 
    FiDatabase, 
    FiLayers, 
    FiCheck, 
    FiSend, 
    FiCheckCircle, 
    FiBriefcase, 
    FiBookOpen, 
    FiMail, 
    FiShield, 
    FiServer, 
    FiX,
    FiZap,
    FiMaximize2
} from 'react-icons/fi';

interface Project {
    id: string;
    title: string;
    subtitle: string;
    category: 'backend' | 'fullstack' | 'frontend';
    tech: string[];
    description: string;
    architectureDetails?: string[];
    github?: string;
    demo?: string;
    image?: string | null;
}

const projects: Project[] = [
    {
        id: "bookibox",
        title: "BookiBox",
        subtitle: "Dev Fullstack & Chef de Projet Junior • App en Production",
        category: "fullstack",
        tech: ["Next.js", "NestJS", "TypeScript", "BullMQ", "Redis", "Docker", "Dilicom ONIX", "IA", "Jira"],
        description: "Développement d'une application métier en Next.js / NestJS (TypeScript) déployée en production. Intégration d'un module de scan via l'API Dilicom (ONIX) avec algorithme de matching stock/abonnés, architecture de tâches asynchrones BullMQ & Redis, et enrichissement IA en tâche de fond.",
        architectureDetails: [
            "Développement Fullstack Type-Safe sous Next.js (frontend) et NestJS (API REST backend)",
            "Conception du module de scan de livres via l'API Dilicom (format ONIX) et algorithme de matching automatique stock / abonnés",
            "Architecture événementielle asynchrone avec BullMQ et Redis pour l'enrichissement par IA en tâche de fond",
            "Pilotage technique Agile : gestion des Sprints Jira, coordination d'équipe et conteneurisation Docker"
        ],
        github: "https://github.com/Rinatovo",
        image: '/projet/bookibox.png'
    },
    {
        id: "billzy",
        title: "Billzy API",
        subtitle: "API REST Multi-tenant de Gestion de Facturation",
        category: "backend",
        tech: ["NestJS", "TypeScript", "MariaDB", "TypeORM", "Redis", "JWT", "Docker"],
        description: "Billzy est une API REST robuste et hautement sécurisée conçue avec NestJS pour gérer clients, utilisateurs et facturation dans un contexte multi-tenant.",
        architectureDetails: [
            "Architecture Multi-tenant sécurisée isolant les données par organisation",
            "Authentification JWT avec cookies HTTP-Only et hash Bcrypt",
            "Protection HTTP renforcée avec Helmet et gestion des CORS",
            "Base de données MariaDB administrée via TypeORM (migrations et seeders automatiques)",
            "Redis pour la gestion de session distribuée et les codes de validation OTP",
            "Conteneurisation complète avec Docker et Docker Compose"
        ],
        github: "https://github.com/Rinatovo/my-invoice-api",
        image: '/projet/Bilzy.png'
    },
    {
        id: "cyna",
        title: "Projet CYNA 2025",
        subtitle: "Marketplace SaaS Cybersécurité Full-Stack",
        category: "fullstack",
        tech: ["React.js", "Laravel", "MySQL", "JWT", "Tailwind CSS"],
        description: "Plateforme SaaS complète dédiée à la commercialisation de services de cybersécurité avec tableau de bord interactif et système d'authentification robuste.",
        architectureDetails: [
            "Frontend réactif en React.js avec gestion d'état centralisée",
            "API REST Laravel structurée en micro-ressources avec validation stricte",
            "Gestion des rôles (Admin, Client, Prestataire) via middleware JWT",
            "Base de données relationnelle MySQL optimisée pour les transactions"
        ],
        github: "https://github.com/Rinatovo",
        image: null
    },
    {
        id: "cms-ecommerce",
        title: "CMS E-Commerce",
        subtitle: "Moteur Backend No-Code pour Mini-Boutiques",
        category: "backend",
        tech: ["Node.js", "Express.js", "MySQL", "REST API", "JWT"],
        description: "Backend modulaire permettant à des commerçants de déployer et personnaliser une boutique en ligne sans écrire une ligne de code.",
        architectureDetails: [
            "API REST Express ultra-rapide avec routing dynamique",
            "Gestion de panier, catalogue produits, stocks et commandes",
            "Système de templates et de configurations personnalisables à la volée",
            "Modèle de données relationnel MySQL normalisé"
        ],
        github: "https://github.com/Rinatovo",
        image: null
    }
];

interface ProfileSectionProps {
    onBack: () => void;
}

export default function ProfileSection({ onBack }: ProfileSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'backend' | 'fullstack' | 'frontend'>('all');
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    const filteredProjects = projects.filter(p =>
        selectedCategory === 'all' ? true : p.category === selectedCategory
    );

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
            className="fixed inset-0 z-[9999] overflow-y-auto bg-[#07080d] text-gray-100 font-sans selection:bg-blue-500 selection:text-white"
        >
            {/* STICKY NAVBAR */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#07080d]/85 border-b border-white/10 flex flex-col">
                <div className="px-4 md:px-8 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-300 hover:text-blue-400 border border-white/10 hover:border-blue-500/40 text-xs md:text-sm font-medium transition-all"
                        >
                            <FiArrowLeft className="text-base" />
                            <span className="hidden sm:inline">Changer de classe</span>
                            <span className="sm:hidden">Retour</span>
                        </button>

                        <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

                        <div className="flex flex-col">
                            <span className="text-base md:text-xl font-black italic tracking-tight text-white flex items-center gap-2">
                                RINA.DEV <span className="text-blue-400 font-mono text-[10px] sm:text-xs not-italic uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">FULL-STACK</span>
                            </span>
                        </div>
                    </div>

                    {/* NAV LINKS (Desktop) */}
                    <div className="hidden lg:flex items-center gap-6 text-sm font-mono text-gray-400">
                        <button onClick={() => scrollToSection('projets')} className="hover:text-blue-400 transition-colors">Projets</button>
                        <button onClick={() => scrollToSection('stack')} className="hover:text-blue-400 transition-colors">Stack Tech</button>
                        <button onClick={() => scrollToSection('parcours')} className="hover:text-blue-400 transition-colors">Parcours</button>
                        <button onClick={() => scrollToSection('philosophie')} className="hover:text-blue-400 transition-colors">Approche Code</button>
                        <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">Contact</button>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <a
                            href="https://github.com/Rinatovo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-300 hover:text-blue-400 border border-white/10 hover:border-blue-500/30 transition-all flex items-center gap-2 text-xs font-mono"
                            aria-label="GitHub Rinatovo"
                        >
                            <FiGithub className="text-lg" />
                            <span className="hidden sm:inline">Rinatovo</span>
                        </a>

                        <button
                            onClick={() => scrollToSection('contact')}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs md:text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
                        >
                            <FiMail />
                            <span className="hidden sm:inline">Me Contacter / Recruter</span>
                            <span className="sm:hidden">Contact</span>
                        </button>
                    </div>
                </div>

                {/* MOBILE QUICK NAV SUB-BAR */}
                <div className="flex lg:hidden overflow-x-auto gap-2 px-4 py-2 border-t border-white/5 bg-black/40 text-xs font-mono text-gray-400 scrollbar-none snap-x">
                    <button onClick={() => scrollToSection('projets')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 border border-white/5">#Projets</button>
                    <button onClick={() => scrollToSection('stack')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 border border-white/5">#Stack</button>
                    <button onClick={() => scrollToSection('parcours')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 border border-white/5">#Parcours</button>
                    <button onClick={() => scrollToSection('philosophie')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 border border-white/5">#Approche</button>
                    <button onClick={() => scrollToSection('contact')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 border border-white/5">#Contact</button>
                </div>
            </nav>

            <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-20">

                {/* HERO SECTION */}
                <section className="relative pt-6 md:pt-12 pb-8 rounded-3xl bg-gradient-to-b from-blue-600/10 via-indigo-900/5 to-transparent border border-white/5 p-6 md:p-12 overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                        {/* LEFT TEXT & PRESENTATION */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
                                <FiTerminal className="text-sm" />
                                <span>CONCEPIEUR DÉVELOPPEUR D'APPLICATIONS</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none">
                                Rina Rasolonjatovo. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
                                    Full-Stack Engineer.
                                </span>
                            </h1>

                            <p className="text-gray-300 text-base md:text-lg max-w-2xl font-light leading-relaxed">
                                Développeur Web spécialisé dans la conception d'APIs REST hautes performances (NestJS, Node.js), la création d'architectures multi-tenant sécurisées et le développement d'interfaces réactives (React, TypeScript, Tailwind).
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <button
                                    onClick={() => scrollToSection('projets')}
                                    className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30"
                                >
                                    <span>Explorer mes Projets</span>
                                    <FiCode />
                                </button>
                                <button
                                    onClick={() => scrollToSection('stack')}
                                    className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-sm font-medium transition-all"
                                >
                                    Voir la Stack Technique
                                </button>
                            </div>
                        </div>

                        {/* RIGHT PROFILE CARD & AVATAR */}
                        <div className="lg:col-span-4 flex flex-col items-center justify-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                                
                                <div className="relative p-6 rounded-3xl bg-[#10121a]/90 border border-white/10 flex flex-col items-center text-center space-y-4 shadow-2xl">
                                    <div 
                                        onClick={() => setZoomedImage('/projet/rina3.jpg')}
                                        className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-inner cursor-pointer group/avatar"
                                    >
                                        <img
                                            src="/projet/rina3.jpg"
                                            alt="Rina Rasolonjatovo"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-1">
                                            <FiMaximize2 className="text-xl text-blue-400" />
                                            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Agrandir</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white">Rina Rasolonjatovo</h3>
                                        <p className="text-xs font-mono text-blue-400 mt-0.5">Bachelor CDA • INGETIS Paris</p>
                                    </div>

                                    <div className="w-full grid grid-cols-2 gap-2 text-left pt-2 border-t border-white/10 text-xs font-mono">
                                        <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                                            <span className="text-gray-500 text-[10px] block">LOCALISATION</span>
                                            <span className="text-gray-200 font-semibold">Paris, France</span>
                                        </div>
                                        <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                                            <span className="text-gray-500 text-[10px] block">DISPONIBILITÉ</span>
                                            <span className="text-emerald-400 font-semibold">À l'écoute</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STATS METRICS */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-blue-500/40 transition-colors">
                        <FiBriefcase className="text-blue-400 text-2xl mb-4" />
                        <div>
                            <span className="text-3xl font-black italic text-white block">3+ ans</span>
                            <span className="text-xs font-mono text-gray-400 uppercase">Études & Pratique</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-blue-500/40 transition-colors">
                        <FiServer className="text-indigo-400 text-2xl mb-4" />
                        <div>
                            <span className="text-3xl font-black italic text-white block">10+</span>
                            <span className="text-xs font-mono text-gray-400 uppercase">Technologies Maîtrisées</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-blue-500/40 transition-colors">
                        <FiShield className="text-cyan-400 text-2xl mb-4" />
                        <div>
                            <span className="text-3xl font-black italic text-white block">100%</span>
                            <span className="text-xs font-mono text-gray-400 uppercase">Code Clean & Type-Safe</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-blue-500/40 transition-colors">
                        <FiZap className="text-amber-400 text-2xl mb-4" />
                        <div>
                            <span className="text-3xl font-black italic text-white block">SaaS & API</span>
                            <span className="text-xs font-mono text-gray-400 uppercase">Spécialisation Backend</span>
                        </div>
                    </div>
                </section>

                {/* GALERIE DE PROJETS */}
                <section id="projets" className="space-y-8 scroll-mt-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
                        <div>
                            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">RÉALISATIONS MAJEURES</span>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
                                Projets & Architectures.
                            </h2>
                        </div>

                        {/* FILTRES CATEGORY */}
                        <div className="flex flex-wrap items-center gap-2">
                            {[
                                { id: 'all', label: 'Tous les projets', count: projects.length },
                                { id: 'backend', label: 'Backend & APIs', count: projects.filter(p => p.category === 'backend').length },
                                { id: 'fullstack', label: 'Full-Stack / SaaS', count: projects.filter(p => p.category === 'fullstack').length }
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id as any)}
                                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-mono transition-all flex items-center gap-2 ${
                                        selectedCategory === cat.id
                                            ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30'
                                            : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-white/5'
                                    }`}
                                >
                                    <span>{cat.label}</span>
                                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                                        selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-400'
                                    }`}>
                                        {cat.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* GRID DE PROJETS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6 group"
                                >
                                    <div className="space-y-4">
                                        {/* HEADER CARD */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                                                {project.category.toUpperCase()}
                                            </span>

                                            {project.github && project.github !== '#' && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                    aria-label="GitHub Code"
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <FiGithub className="text-lg" />
                                                </a>
                                            )}
                                        </div>

                                        {/* IMAGE PREVIEW IF ANY */}
                                        {project.image && (
                                            <div 
                                                onClick={(e) => { e.stopPropagation(); setZoomedImage(project.image); }}
                                                className="w-full h-40 rounded-2xl overflow-hidden bg-black/40 border border-white/5 relative group-hover:border-blue-500/30 transition-colors cursor-pointer group/img"
                                            >
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-mono">
                                                    <FiMaximize2 className="text-lg text-blue-400" />
                                                    <span>Voir en grand</span>
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs font-mono text-gray-400 mt-1">
                                                {project.subtitle}
                                            </p>
                                        </div>

                                        <p className="text-sm text-gray-300 font-light leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* TECH BADGES */}
                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {project.tech.map(t => (
                                                <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/5 text-xs font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* FOOTER BUTTON */}
                                    <button
                                        onClick={() => setActiveProject(project)}
                                        className="w-full py-3 rounded-full bg-white/5 hover:bg-blue-600 text-gray-300 hover:text-white font-medium text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-blue-500"
                                    >
                                        <span>Détails & Architecture</span>
                                        <FiExternalLink />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* STACK TECHNIQUE */}
                <section id="stack" className="space-y-8 scroll-mt-24">
                    <div className="border-b border-white/10 pb-6">
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">ENVIRONNEMENT & COMPÉTENCES</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
                            Stack Technique.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* FRONTEND */}
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-blue-500/40 transition-colors">
                            <div className="flex items-center gap-3 text-blue-400">
                                <FiCode className="text-2xl" />
                                <h3 className="text-lg font-bold text-white">Frontend</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML5/CSS3', 'Vite'].map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-mono">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* BACKEND */}
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-indigo-500/40 transition-colors">
                            <div className="flex items-center gap-3 text-indigo-400">
                                <FiServer className="text-2xl" />
                                <h3 className="text-lg font-bold text-white">Backend</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['NestJS', 'Node.js', 'Express.js', 'Laravel', 'PHP', 'REST APIs', 'JWT'].map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-mono">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* DATABASES */}
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-cyan-500/40 transition-colors">
                            <div className="flex items-center gap-3 text-cyan-400">
                                <FiDatabase className="text-2xl" />
                                <h3 className="text-lg font-bold text-white">Bases de Données</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['MariaDB', 'MySQL', 'PostgreSQL', 'Redis', 'TypeORM', 'Migrations'].map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* DEVOPS & TOOLS */}
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-amber-500/40 transition-colors">
                            <div className="flex items-center gap-3 text-amber-400">
                                <FiCpu className="text-2xl" />
                                <h3 className="text-lg font-bold text-white">DevOps & Outils</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['Docker', 'Docker Compose', 'Git / GitHub', 'CI/CD', 'Postman', 'Linux', 'Dev Containers'].map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PARCOURS & EXPÉRIENCES */}
                <section id="parcours" className="space-y-8 scroll-mt-24">
                    <div className="border-b border-white/10 pb-6">
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">PARCOURS PROFESSIONNEL</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
                            Formations & Expériences.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* FORMATIONS */}
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                <FiBookOpen className="text-blue-400" />
                                <span>Formations & Diplômes</span>
                            </h3>

                            <div className="relative border-l-2 border-white/10 pl-6 space-y-8 ml-2">
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-blue-500 rounded-full ring-4 ring-[#07080d]" />
                                    <span className="text-xs font-mono text-blue-400 font-semibold block mb-1">Octobre 2024 - Août 2025</span>
                                    <h4 className="text-lg font-bold text-white">Bachelor Concepteur Développeur d'Applications</h4>
                                    <p className="text-xs text-gray-400 font-mono mt-0.5">CFA INGETIS Paris</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-white/30 rounded-full ring-4 ring-[#07080d]" />
                                    <span className="text-xs font-mono text-gray-400 block mb-1">Septembre 2022 - Juillet 2024</span>
                                    <h4 className="text-lg font-bold text-white">BTS SIO — Solutions Logicielles et Applications</h4>
                                    <p className="text-xs text-gray-400 font-mono mt-0.5">CFA INGETIS Paris</p>
                                </div>
                            </div>
                        </div>

                        {/* EXPÉRIENCES */}
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                <FiBriefcase className="text-indigo-400" />
                                <span>Expériences Pro</span>
                            </h3>

                            <div className="relative border-l-2 border-white/10 pl-6 space-y-8 ml-2">
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-blue-500 rounded-full ring-4 ring-[#07080d]" />
                                    <span className="text-xs font-mono text-blue-400 font-semibold block mb-1">Stage - 4 Mois (2025)</span>
                                    <h4 className="text-lg font-bold text-white">Développeur Web Fullstack & Chef de Projet Junior</h4>
                                    <p className="text-xs text-gray-400 font-mono mt-0.5 mb-2">BookiBox</p>
                                    <ul className="text-xs text-gray-300 font-light space-y-1.5 mb-3 list-disc list-inside">
                                        <li>Développement d'une application métier en Next.js / NestJS (TypeScript) en production</li>
                                        <li>Conception d'un module de scan via l'API Dilicom (ONIX) & algorithme de matching stock/abonnés</li>
                                        <li>Architecture de processus asynchrones avec BullMQ & Redis et enrichissement IA en tâche de fond</li>
                                        <li>Pilotage technique : Sprints Jira, coordination d'équipe Agile, déploiements Docker</li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Next.js', 'NestJS', 'TypeScript', 'BullMQ', 'Redis', 'Dilicom ONIX', 'IA', 'Docker', 'Jira'].map(t => (
                                            <span key={t} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-mono">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-indigo-500 rounded-full ring-4 ring-[#07080d]" />
                                    <span className="text-xs font-mono text-indigo-400 font-semibold block mb-1">Janvier - Mars 2025</span>
                                    <h4 className="text-lg font-bold text-white">Stagiaire Développeur Web Fullstack</h4>
                                    <p className="text-xs text-gray-400 font-mono mt-0.5 mb-2">ADNCLY</p>
                                    <p className="text-xs text-gray-300 font-light mb-3">
                                        Développement de fonctionnalités fullstack en méthodes agiles, intégration React et gestion des données MySQL/Node.js.
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {['React', 'Node.js', 'MySQL', 'Agile'].map(t => (
                                            <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-white/30 rounded-full ring-4 ring-[#07080d]" />
                                    <span className="text-xs font-mono text-gray-400 block mb-1">Avril 2023 - Septembre 2024</span>
                                    <h4 className="text-lg font-bold text-white">Technicien Informatique N1/N2</h4>
                                    <p className="text-xs text-gray-400 font-mono mt-0.5">MEDIABAR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PHILOSOPHIE & APPROCHE CODE */}
                <section id="philosophie" className="space-y-8 scroll-mt-24">
                    <div className="border-b border-white/10 pb-6">
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">PRINCIPES D'INGÉNIERIE</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
                            Philosophie de Code.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl">
                                <FiShield />
                            </div>
                            <h3 className="text-xl font-bold text-white">01. Type-Safety & Robustesse</h3>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                Adoption stricte de TypeScript pour éradiquer les erreurs à la compilation. Typage rigoureux des endpoints d'API, des DTOs et des entités TypeORM.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 transition-all space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl">
                                <FiLayers />
                            </div>
                            <h3 className="text-xl font-bold text-white">02. Architecture Modulaire</h3>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                Séparation claire des responsabilités (Controllers, Services, Repositories). Code modulaire, facilement testable et prêt pour le passage à l'échelle.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                                <FiZap />
                            </div>
                            <h3 className="text-xl font-bold text-white">03. Performance & DX</h3>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                Optimisation des requêtes SQL, mise en cache Redis, conteneurisation Docker pour un environnement de développement reproductible et des déploiements fluides.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CONTACT & LINKS */}
                <section id="contact" className="space-y-8 scroll-mt-24 pb-16">
                    <div className="border-b border-white/10 pb-6">
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">OPPORTUNITÉS & ME CONTACTER</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
                            Travaillons Ensemble.
                        </h2>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 space-y-4">
                        <h3 className="text-2xl font-bold text-white">Une opportunité ou un projet ?</h3>
                        <p className="text-sm text-gray-300 font-light leading-relaxed max-w-3xl">
                            Je suis ouvert aux opportunités en entreprise (CDI/CDD), aux missions d'ingénierie web freelance et aux projets SaaS innovants. N'hésitez pas à me contacter directement ou à consulter mon profil.
                        </p>
                    </div>

                    {/* DIRECT CONTACT CARDS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a
                            href="mailto:rinatovo2103@gmail.com"
                            className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-indigo-600/10 border border-blue-500/30 hover:border-blue-500/60 transition-all flex flex-col justify-between space-y-6 group hover:scale-[1.02]"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xl group-hover:scale-110 transition-transform">
                                <FiMail />
                            </div>
                            <div>
                                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1">EMAIL DIRECT</span>
                                <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">Me contacter par mail</h4>
                                <p className="text-xs text-gray-400 font-mono mt-1">rinatovo2103@gmail.com</p>
                            </div>
                        </a>

                        <a
                            href="https://github.com/Rinatovo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6 group hover:scale-[1.02]"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 text-xl group-hover:scale-110 transition-transform">
                                <FiGithub />
                            </div>
                            <div>
                                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-1">GITHUB PROFIL</span>
                                <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Explorer mes dépôts</h4>
                                <p className="text-xs text-gray-400 font-mono mt-1">github.com/Rinatovo</p>
                            </div>
                        </a>

                        <a
                            href="/projet/CVRINA.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-6 group hover:scale-[1.02]"
                        >
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl group-hover:scale-110 transition-transform">
                                    <FiExternalLink />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono">
                                    PDF
                                </span>
                            </div>
                            <div>
                                <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-1">CURRICULUM VITAE</span>
                                <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">Télécharger mon CV</h4>
                                <p className="text-xs text-gray-400 font-light mt-1">Consulter le CV complet.</p>
                            </div>
                        </a>
                    </div>
                </section>
            </main>

            {/* MODAL DETAIL ARCHITECTURE PROJET */}
            <AnimatePresence>
                {activeProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
                        onClick={() => setActiveProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-[#0d0f17] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* CLOSE BUTTON */}
                            <button
                                onClick={() => setActiveProject(null)}
                                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-blue-500 text-white transition-colors"
                                aria-label="Fermer"
                            >
                                <FiX className="text-xl" />
                            </button>

                            <div className="space-y-2">
                                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 inline-block">
                                    {activeProject.category.toUpperCase()}
                                </span>
                                <h3 className="text-3xl font-black text-white tracking-tight">
                                    {activeProject.title}
                                </h3>
                                <p className="text-sm font-mono text-gray-400">
                                    {activeProject.subtitle}
                                </p>
                            </div>

                            {activeProject.image && (
                                <div 
                                    onClick={() => setZoomedImage(activeProject.image!)}
                                    className="w-full h-48 md:h-64 rounded-2xl overflow-hidden bg-black/50 border border-white/10 cursor-pointer group relative"
                                >
                                    <img
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-mono">
                                        <FiMaximize2 className="text-xl text-blue-400" />
                                        <span>Voir en plein écran</span>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <h4 className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                                    Description Fonctionnelle & Technique
                                </h4>
                                <p className="text-sm text-gray-300 font-light leading-relaxed">
                                    {activeProject.description}
                                </p>
                            </div>

                            {activeProject.architectureDetails && (
                                <div className="space-y-3 pt-4 border-t border-white/10">
                                    <h4 className="text-sm font-mono text-blue-400 uppercase tracking-wider">
                                        Points Clés de l'Architecture
                                    </h4>
                                    <ul className="space-y-2 text-xs font-mono text-gray-300">
                                        {activeProject.architectureDetails.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-2.5">
                                                <FiCheck className="text-blue-400 shrink-0 mt-0.5 text-sm" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                <div className="flex flex-wrap gap-1.5">
                                    {activeProject.tech.map(t => (
                                        <span key={t} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-mono">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {activeProject.github && activeProject.github !== '#' && (
                                    <a
                                        href={activeProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-2"
                                    >
                                        <FiGithub />
                                        <span>Voir le Code</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* FULLSCREEN IMAGE ZOOM MODAL */}
            <AnimatePresence>
                {zoomedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[20000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
                        onClick={() => setZoomedImage(null)}
                    >
                        <button
                            onClick={() => setZoomedImage(null)}
                            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-blue-500 text-white transition-colors z-50 shadow-lg"
                            aria-label="Fermer"
                        >
                            <FiX className="text-2xl" />
                        </button>
                        <img
                            src={zoomedImage}
                            alt="Photo agrandie"
                            className="max-w-[95vw] max-h-[92vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
