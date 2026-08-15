import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LetterGlitch from '../Effects/LetterGlitch';
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
            className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white"
        >
            {/* STICKY NAVBAR */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 border-b border-slate-200 flex flex-col">
                <div className="px-4 md:px-8 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 text-xs md:text-sm font-medium transition-all"
                        >
                            <FiArrowLeft className="text-base" />
                            <span className="hidden sm:inline">Changer de classe</span>
                            <span className="sm:hidden">Retour</span>
                        </button>

                        <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />

                        <div className="flex flex-col">
                            <span className="text-base md:text-xl font-black italic tracking-tight text-slate-900 flex items-center gap-2">
                                RINA.DEV <span className="text-blue-600 font-mono text-[10px] sm:text-xs not-italic uppercase tracking-widest px-2 py-0.5 rounded bg-blue-50 border border-blue-200 font-semibold">FULL-STACK</span>
                            </span>
                        </div>
                    </div>

                    {/* NAV LINKS (Desktop) */}
                    <div className="hidden lg:flex items-center gap-6 text-sm font-mono text-slate-600">
                        <button onClick={() => scrollToSection('projets')} className="hover:text-blue-600 transition-colors">Projets</button>
                        <button onClick={() => scrollToSection('stack')} className="hover:text-blue-600 transition-colors">Stack Tech</button>
                        <button onClick={() => scrollToSection('parcours')} className="hover:text-blue-600 transition-colors">Parcours</button>
                        <button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 transition-colors">Contact</button>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <a
                            href="https://github.com/Rinatovo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-2 text-xs font-mono"
                            aria-label="GitHub Rinatovo"
                        >
                            <FiGithub className="text-lg" />
                            <span className="hidden sm:inline">Rinatovo</span>
                        </a>

                        <button
                            onClick={() => scrollToSection('contact')}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs md:text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
                        >
                            <FiMail />
                            <span className="hidden sm:inline">Me Contacter / Recruter</span>
                            <span className="sm:hidden">Contact</span>
                        </button>
                    </div>
                </div>

                {/* MOBILE QUICK NAV SUB-BAR */}
                <div className="flex lg:hidden overflow-x-auto gap-2 px-4 py-2 border-t border-slate-200 bg-white/90 text-xs font-mono text-slate-600 scrollbar-none snap-x">
                    <button onClick={() => scrollToSection('projets')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 border border-slate-200">#Projets</button>
                    <button onClick={() => scrollToSection('stack')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 border border-slate-200">#Stack</button>
                    <button onClick={() => scrollToSection('parcours')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 border border-slate-200">#Parcours</button>
                    <button onClick={() => scrollToSection('contact')} className="snap-start shrink-0 px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 border border-slate-200">#Contact</button>
                </div>
            </nav>

            <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-20">

                {/* HERO SECTION */}
                <section className="relative pt-6 md:pt-12 pb-8 rounded-3xl bg-gradient-to-b from-blue-50/90 via-white to-slate-50 border border-slate-200 p-6 md:p-12 overflow-hidden shadow-sm">
                    {/* LetterGlitch Background Effect */}
                    <div className="absolute inset-0 z-0 opacity-20 rounded-3xl overflow-hidden pointer-events-none">
                        <LetterGlitch
                            glitchSpeed={50}
                            centerVignette={true}
                            outerVignette={true}
                            smooth={true}
                            glitchColors={["#0061ff", "#00aaff", "#2563eb", "#3b82f6"]}
                        />
                    </div>

                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                        {/* LEFT TEXT & PRESENTATION */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200 text-blue-600 text-xs font-mono font-medium backdrop-blur-xs">
                                <FiTerminal className="text-sm" />
                                <span>CONCEPIEUR DÉVELOPPEUR D'APPLICATIONS</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 uppercase leading-none">
                                Rina Rasolonjatovo. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600">
                                    Full-Stack Engineer.
                                </span>
                            </h1>

                            <p className="text-slate-800 text-base md:text-lg max-w-2xl font-normal leading-relaxed">
                                Développeur Web spécialisé dans la conception d'APIs REST hautes performances (NestJS, Node.js), la création d'architectures multi-tenant sécurisées et le développement d'interfaces réactives (React, TypeScript, Tailwind).
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <button
                                    onClick={() => scrollToSection('projets')}
                                    className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/25"
                                >
                                    <span>Explorer mes Projets</span>
                                    <FiCode />
                                </button>
                                <button
                                    onClick={() => scrollToSection('stack')}
                                    className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-sm font-medium transition-all shadow-sm"
                                >
                                    Voir la Stack Technique
                                </button>
                            </div>
                        </div>

                        {/* RIGHT PROFILE CARD & AVATAR */}
                        <div className="lg:col-span-4 flex flex-col items-center justify-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                                <div className="relative p-6 rounded-3xl bg-white border border-slate-200 flex flex-col items-center text-center space-y-4 shadow-xl">
                                    <div
                                        onClick={() => setZoomedImage('/projet/rina3.jpg')}
                                        className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-md cursor-pointer group/avatar"
                                    >
                                        <img
                                            src="/projet/rina3.jpg"
                                            alt="Rina Rasolonjatovo"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-1">
                                            <FiMaximize2 className="text-xl text-blue-200" />
                                            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Agrandir</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Rina Rasolonjatovo</h3>
                                        <p className="text-xs font-mono text-blue-600 mt-0.5 font-medium">Bachelor CDA • INGETIS Paris</p>
                                    </div>

                                    <div className="w-full grid grid-cols-2 gap-2 text-left pt-2 border-t border-slate-200 text-xs font-mono">
                                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                                            <span className="text-slate-400 text-[10px] block">LOCALISATION</span>
                                            <span className="text-slate-800 font-semibold">Paris, France</span>
                                        </div>
                                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                                            <span className="text-slate-400 text-[10px] block">DISPONIBILITÉ</span>
                                            <span className="text-emerald-600 font-semibold">À l'écoute</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STATS METRICS */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all">
                        <FiBriefcase className="text-blue-600 text-2xl mb-4" />
                        <div>
                            <span className="text-3xl font-black italic text-slate-900 block">3+ ans</span>
                            <span className="text-xs font-mono text-slate-500 uppercase">Études & Pratique</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all">
                        <FiServer className="text-blue-600 text-2xl mb-4" />
                        <div>
                            <span className="text-3xl font-black italic text-slate-900 block">10+</span>
                            <span className="text-xs font-mono text-slate-500 uppercase">Technologies Maîtrisées</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all">
                        <FiShield className="text-blue-600 text-2xl mb-4" />
                        <div>
                            <span className="text-3xl font-black italic text-slate-900 block">100%</span>
                            <span className="text-xs font-mono text-slate-500 uppercase">Code Clean & Type-Safe</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all">
                        <FiZap className="text-blue-600 text-2xl mb-4" />
                        <div>
                            <span className="text-3xl font-black italic text-slate-900 block">SaaS & API</span>
                            <span className="text-xs font-mono text-slate-500 uppercase">Spécialisation Backend</span>
                        </div>
                    </div>
                </section>

                {/* GALERIE DE PROJETS */}
                <section id="projets" className="space-y-8 scroll-mt-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
                        <div>
                            <span className="text-xs font-mono text-blue-600 uppercase tracking-wider block mb-1">RÉALISATIONS MAJEURES</span>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-slate-900">
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
                                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-mono transition-all flex items-center gap-2 ${selectedCategory === cat.id
                                            ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                                            : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                                        }`}
                                >
                                    <span>{cat.label}</span>
                                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
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
                                    className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group shadow-sm"
                                >
                                    <div className="space-y-4">
                                        {/* HEADER CARD */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 font-semibold">
                                                {project.category.toUpperCase()}
                                            </span>

                                            {project.github && project.github !== '#' && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
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
                                                className="w-full h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group-hover:border-blue-400 transition-colors cursor-pointer group/img"
                                            >
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-blue-950/70 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-mono">
                                                    <FiMaximize2 className="text-lg text-blue-300" />
                                                    <span>Voir en grand</span>
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs font-mono text-slate-500 mt-1">
                                                {project.subtitle}
                                            </p>
                                        </div>

                                        <p className="text-sm text-slate-600 font-light leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* TECH BADGES */}
                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {project.tech.map(t => (
                                                <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* FOOTER BUTTON */}
                                    <button
                                        onClick={() => setActiveProject(project)}
                                        className="w-full py-3 rounded-full bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white font-medium text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-200 hover:border-blue-600 shadow-xs"
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
                    <div className="border-b border-slate-200 pb-6">
                        <span className="text-xs font-mono text-blue-600 uppercase tracking-wider block mb-1">ENVIRONNEMENT & COMPÉTENCES</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-slate-900">
                            Stack Technique.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* FRONTEND */}
                        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-blue-400 transition-all">
                            <div className="flex items-center gap-3 text-blue-600">
                                <FiCode className="text-2xl" />
                                <h3 className="text-lg font-bold text-slate-900">Frontend</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML5/CSS3', 'Vite'].map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-mono font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* BACKEND */}
                        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-blue-400 transition-all">
                            <div className="flex items-center gap-3 text-blue-600">
                                <FiServer className="text-2xl" />
                                <h3 className="text-lg font-bold text-slate-900">Backend</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['NestJS', 'Node.js', 'Express.js', 'Laravel', 'PHP', 'REST APIs', 'JWT'].map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-mono font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* DATABASES */}
                        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-blue-400 transition-all">
                            <div className="flex items-center gap-3 text-blue-600">
                                <FiDatabase className="text-2xl" />
                                <h3 className="text-lg font-bold text-slate-900">Bases de Données</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['MariaDB', 'MySQL', 'PostgreSQL', 'Redis', 'TypeORM', 'Migrations'].map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-mono font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* DEVOPS & TOOLS */}
                        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-blue-400 transition-all">
                            <div className="flex items-center gap-3 text-blue-600">
                                <FiCpu className="text-2xl" />
                                <h3 className="text-lg font-bold text-slate-900">DevOps & Outils</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['Docker', 'Docker Compose', 'Git / GitHub', 'CI/CD', 'Postman', 'Linux', 'Dev Containers'].map(item => (
                                    <span key={item} className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-mono font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PARCOURS & EXPÉRIENCES */}
                <section id="parcours" className="space-y-8 scroll-mt-24">
                    <div className="border-b border-slate-200 pb-6">
                        <span className="text-xs font-mono text-blue-600 uppercase tracking-wider block mb-1">PARCOURS PROFESSIONNEL</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-slate-900">
                            Formations & Expériences.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* FORMATIONS */}
                        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <FiBookOpen className="text-blue-600" />
                                <span>Formations & Diplômes</span>
                            </h3>

                            <div className="relative border-l-2 border-slate-200 pl-6 space-y-8 ml-2">
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-blue-600 rounded-full ring-4 ring-white" />
                                    <span className="text-xs font-mono text-blue-600 font-semibold block mb-1">Octobre 2024 - Août 2025</span>
                                    <h4 className="text-lg font-bold text-slate-900">Bachelor Concepteur Développeur d'Applications</h4>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">CFA INGETIS Paris</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-slate-300 rounded-full ring-4 ring-white" />
                                    <span className="text-xs font-mono text-slate-500 block mb-1">Septembre 2022 - Juillet 2024</span>
                                    <h4 className="text-lg font-bold text-slate-900">BTS SIO — Solutions Logicielles et Applications</h4>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">CFA INGETIS Paris</p>
                                </div>
                            </div>
                        </div>

                        {/* EXPÉRIENCES */}
                        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <FiBriefcase className="text-blue-600" />
                                <span>Expériences Pro</span>
                            </h3>

                            <div className="relative border-l-2 border-slate-200 pl-6 space-y-8 ml-2">
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-blue-600 rounded-full ring-4 ring-white" />
                                    <span className="text-xs font-mono text-blue-600 font-semibold block mb-1">Stage - 4 Mois (2025)</span>
                                    <h4 className="text-lg font-bold text-slate-900">Développeur Web Fullstack & Chef de Projet Junior</h4>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5 mb-2">BookiBox</p>
                                    <ul className="text-xs text-slate-600 font-light space-y-1.5 mb-3 list-disc list-inside">
                                        <li>Développement d'une application métier en Next.js / NestJS (TypeScript) en production</li>
                                        <li>Conception d'un module de scan via l'API Dilicom (ONIX) & algorithme de matching stock/abonnés</li>
                                        <li>Architecture de processus asynchrones avec BullMQ & Redis et enrichissement IA en tâche de fond</li>
                                        <li>Pilotage technique : Sprints Jira, coordination d'équipe Agile, déploiements Docker</li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Next.js', 'NestJS', 'TypeScript', 'BullMQ', 'Redis', 'Dilicom ONIX', 'IA', 'Docker', 'Jira'].map(t => (
                                            <span key={t} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-medium">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-blue-500 rounded-full ring-4 ring-white" />
                                    <span className="text-xs font-mono text-blue-600 font-semibold block mb-1">Janvier - Mars 2025</span>
                                    <h4 className="text-lg font-bold text-slate-900">Stagiaire Développeur Web Fullstack</h4>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5 mb-2">ADNCLY</p>
                                    <p className="text-xs text-slate-600 font-light mb-3">
                                        Développement de fonctionnalités fullstack en méthodes agiles, intégration React et gestion des données MySQL/Node.js.
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {['React', 'Node.js', 'MySQL', 'Agile'].map(t => (
                                            <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-700 border border-slate-200">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-slate-300 rounded-full ring-4 ring-white" />
                                    <span className="text-xs font-mono text-slate-500 block mb-1">Avril 2023 - Septembre 2024</span>
                                    <h4 className="text-lg font-bold text-slate-900">Technicien Informatique N1/N2</h4>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">MEDIABAR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* CONTACT & LINKS */}
                <section id="contact" className="space-y-8 scroll-mt-24 pb-16">
                    <div className="border-b border-slate-200 pb-6">
                        <span className="text-xs font-mono text-blue-600 uppercase tracking-wider block mb-1">OPPORTUNITÉS & ME CONTACTER</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-slate-900">
                            Travaillons Ensemble.
                        </h2>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-slate-50 border border-slate-200 space-y-4 shadow-xs">
                        <h3 className="text-2xl font-bold text-slate-900">Une opportunité ou un projet ?</h3>
                        <p className="text-sm text-slate-600 font-light leading-relaxed max-w-3xl">
                            Je suis ouvert aux opportunités en entreprise (CDI/CDD), aux missions d'ingénierie web freelance et aux projets SaaS innovants. N'hésitez pas à me contacter directement ou à consulter mon profil.
                        </p>
                    </div>

                    {/* DIRECT CONTACT CARDS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a
                            href="mailto:rinatovo2103@gmail.com"
                            className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 border border-blue-600 hover:border-blue-800 transition-all flex flex-col justify-between space-y-6 group hover:scale-[1.02] shadow-lg shadow-blue-600/20 text-white"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                                <FiMail />
                            </div>
                            <div>
                                <span className="text-xs font-mono text-blue-200 uppercase tracking-widest block mb-1">EMAIL DIRECT</span>
                                <h4 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">Me contacter par mail</h4>
                                <p className="text-xs text-blue-100 font-mono mt-1">rinatovo2103@gmail.com</p>
                            </div>
                        </a>

                        <a
                            href="https://github.com/Rinatovo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between space-y-6 group hover:scale-[1.02] shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xl group-hover:scale-110 transition-transform">
                                <FiGithub />
                            </div>
                            <div>
                                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">GITHUB PROFIL</span>
                                <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Explorer mes dépôts</h4>
                                <p className="text-xs text-slate-600 font-mono mt-1">github.com/Rinatovo</p>
                            </div>
                        </a>

                        <a
                            href="/projet/CVRINA.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between space-y-6 group hover:scale-[1.02] shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 text-xl group-hover:scale-110 transition-transform">
                                    <FiExternalLink />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-xs font-mono font-medium">
                                    PDF
                                </span>
                            </div>
                            <div>
                                <span className="text-xs font-mono text-blue-600 uppercase tracking-widest block mb-1">CURRICULUM VITAE</span>
                                <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Télécharger mon CV</h4>
                                <p className="text-xs text-slate-600 font-light mt-1">Consulter le CV complet.</p>
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
                        className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={() => setActiveProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-white border border-slate-200 text-slate-900 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* CLOSE BUTTON */}
                            <button
                                onClick={() => setActiveProject(null)}
                                className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-colors"
                                aria-label="Fermer"
                            >
                                <FiX className="text-xl" />
                            </button>

                            <div className="space-y-2">
                                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 px-2.5 py-1 rounded bg-blue-50 border border-blue-200 inline-block font-semibold">
                                    {activeProject.category.toUpperCase()}
                                </span>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                                    {activeProject.title}
                                </h3>
                                <p className="text-sm font-mono text-slate-500">
                                    {activeProject.subtitle}
                                </p>
                            </div>

                            {activeProject.image && (
                                <div 
                                    onClick={() => setZoomedImage(activeProject.image!)}
                                    className="w-full h-48 md:h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group relative"
                                >
                                    <img
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-blue-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-mono">
                                        <FiMaximize2 className="text-xl text-blue-300" />
                                        <span>Voir en plein écran</span>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <h4 className="text-sm font-mono text-slate-500 uppercase tracking-wider">
                                    Description Fonctionnelle & Technique
                                </h4>
                                <p className="text-sm text-slate-600 font-light leading-relaxed">
                                    {activeProject.description}
                                </p>
                            </div>

                            {activeProject.architectureDetails && (
                                <div className="space-y-3 pt-4 border-t border-slate-200">
                                    <h4 className="text-sm font-mono text-blue-600 uppercase tracking-wider">
                                        Points Clés de l'Architecture
                                    </h4>
                                    <ul className="space-y-2 text-xs font-mono text-slate-700">
                                        {activeProject.architectureDetails.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-2.5">
                                                <FiCheck className="text-blue-600 shrink-0 mt-0.5 text-sm" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                                <div className="flex flex-wrap gap-1.5">
                                    {activeProject.tech.map(t => (
                                        <span key={t} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-medium">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {activeProject.github && activeProject.github !== '#' && (
                                    <a
                                        href={activeProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
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
