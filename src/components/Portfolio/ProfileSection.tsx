import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Billzy",
        subtitle: "API REST de gestion de facturation (Multi-tenant)",
        tech: ["NestJS", "TypeScript", "MariaDB", "TypeORM", "Redis", "JWT", "Docker"],
        description: "Billzy est une API REST robuste de gestion de facturation développée avec NestJS. Elle permet aux entreprises de gérer clients, utilisateurs et articles de facturation dans une architecture multi-tenant sécurisée. Authentification JWT (cookies HTTP-only), hachage des mots de passe avec Bcrypt, et protection HTTP via Helmet. MariaDB est gérée avec TypeORM (migrations et seeders). Redis est utilisé pour les sessions et la gestion des codes OTP. Conteneurisation avec Docker et Docker Compose; Dev Containers pour le développement.",
        github: "https://github.com/Rinatovo/my-invoice-api",
        image: '/projet/Bilzy.png'
    },
    {
        title: "PROJET CYNA 2025",
        subtitle: "Marketplace SaaS Cybersécurité Full-Stack",
        tech: ["React.js", "Laravel", "MySQL", "JWT"],
        description: "Développement full-stack d'une plateforme de cybersécurité avec système d'authentification JWT sécurisé",
        github: "#",
        image: null
    },
    {
        title: "CMS E-COMMERCE",
        subtitle: "CMS Backend pour mini-boutiques sans code",
        tech: ["Node.js", "Express.js", "MySQL", "REST API"],
        description: "Backend robuste permettant la création de boutiques en ligne personnalisables sans code",
        github: "#",
        image: null
    }
];

interface ProfileSectionProps {
    onBack: () => void;
}

export default function ProfileSection({ onBack }: ProfileSectionProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);

    const handleContainerScroll = () => {
        if (scrollContainerRef.current) {
            setShowLeftArrow(scrollContainerRef.current.scrollLeft > 10);
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (!scrollContainerRef.current) return;

        // Si le défilement est horizontal (trackpad), on laisse le comportement natif
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        let current = e.target as HTMLElement;
        let canScrollVertically = false;

        while (current && current !== scrollContainerRef.current) {
            if (current instanceof HTMLElement && current.scrollHeight > current.clientHeight) {
                const style = window.getComputedStyle(current);
                if (['auto', 'scroll'].includes(style.overflowY)) {
                    const canScrollUp = e.deltaY < 0 && current.scrollTop > 0;
                    const canScrollDown = e.deltaY > 0 && Math.abs(current.scrollHeight - current.scrollTop - current.clientHeight) > 1;

                    if (canScrollUp || canScrollDown) {
                        canScrollVertically = true;
                        break;
                    }
                }
            }
            current = current.parentElement as HTMLElement;
        }

        if (!canScrollVertically) {
            scrollContainerRef.current.scrollLeft += e.deltaY;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[999] flex items-center justify-center p-0 md:p-6 bg-black/90"
            onClick={onBack}
        >
            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full md:max-w-6xl md:h-[85vh] rounded-none md:rounded-[2rem] p-6 pt-12 md:p-10 shadow-2xl overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border-none md:border md:border-white/10"
                onClick={(e: MouseEvent) => e.stopPropagation()}
            >
                <div className="h-full flex flex-col relative">
                    <div className="mb-4 shrink-0 flex items-start md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">PROFIL DEVELOPPEUR</h2>
                            <div className="h-1 w-12 md:w-24 bg-gradient-to-r from-blue-500 to-transparent mt-1 md:mt-2 rounded-full"></div>
                        </div>
                        <button onClick={onBack} className="shrink-0 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 md:p-3 rounded-full transition-all leading-none border border-white/5 hover:border-white/20">✕</button>
                    </div>

                    <p className="text-white/70 text-sm md:text-lg mb-8 font-light">Conception et développement d'applications robustes avec un focus sur la performance et l'expérience utilisateur.</p>

                    <div
                        ref={scrollContainerRef}
                        onWheel={handleWheel}
                        onScroll={handleContainerScroll}
                        className="flex-1 w-full min-h-0 overflow-x-auto flex gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: 'none' }}
                    >

                        {/* CARTE PROFIL */}
                        <div className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-[#111111]/80 p-8 md:p-10 rounded-3xl border border-white/10 shadow-lg transition-transform duration-300 hover:bg-[#151515] hover:-translate-y-1 overflow-y-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8">
                            <div className="shrink-0 relative group">
                                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <img src="/projet/rina3.jpg" alt="Photo de profil de Rina Rasolonjatovo" className="w-40 h-40 rounded-full object-cover border-4 border-white/10 relative z-10" />
                            </div>
                            <div className="max-w-md">
                                <h3 className="text-xl md:text-3xl font-bold text-white mb-2">Rina Rasolonjatovo</h3>
                                <p className="text-blue-400 font-medium mb-3 md:mb-4 text-xs md:text-sm tracking-wide uppercase">Développeur Full-Stack</p>
                                <p className="text-white/70 leading-relaxed font-light text-xs md:text-base">
                                    Développeur Full-Stack avec une appétence pour le design et les belles interfaces. Voici un bref résumé de mon parcours et de mes compétences. N'hésitez pas à explorer mes projets et expériences.
                                </p>
                            </div>
                        </div>

                        {/* FORMATION & EXPERIENCES (TIMELINE COMBINED OR SEPARATED) */}
                        <div className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-[#111111]/80 p-8 md:p-10 rounded-3xl border border-white/10 shadow-lg transition-transform duration-300 hover:bg-[#151515] hover:-translate-y-1 overflow-y-auto">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3">
                                <span className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">🎓</span>
                                Formation & Diplômes
                            </h3>
                            <div className="relative border-l-2 border-white/10 pl-6 space-y-8 ml-3">
                                <div className="relative">
                                    <div className="absolute -left-[33px] top-1 w-4 h-4 bg-blue-500 rounded-full ring-4 ring-black"></div>
                                    <p className="text-xs md:text-sm text-blue-400 font-semibold mb-1">Octobre 2024 - Août 2025</p>
                                    <p className="font-bold text-white text-base md:text-lg">Bachelor Concepteur Développeur d'Applications</p>
                                    <p className="text-white/60 font-light mt-1 text-xs md:text-base">CFA INGETIS Paris</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[33px] top-1 w-4 h-4 bg-white/20 rounded-full ring-4 ring-black"></div>
                                    <p className="text-xs md:text-sm text-white/50 font-semibold mb-1">Septembre 2022 - Juillet 2024</p>
                                    <p className="font-bold text-white text-base md:text-lg">BTS SIO – Solutions Logicielles et Applications</p>
                                    <p className="text-white/60 font-light mt-1 text-xs md:text-base">CFA INGETIS Paris</p>
                                </div>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-white mt-8 md:mt-12 mb-6 md:mb-8 flex items-center gap-3">
                                <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">💼</span>
                                Expérience Pro
                            </h3>
                            <div className="relative border-l-2 border-white/10 pl-6 space-y-8 ml-3">
                                <div className="relative">
                                    <div className="absolute -left-[33px] top-1 w-4 h-4 bg-indigo-500 rounded-full ring-4 ring-black"></div>
                                    <p className="text-xs md:text-sm text-indigo-400 font-semibold mb-1">Janvier - Mars 2025</p>
                                    <p className="font-bold text-white text-base md:text-lg">Stagiaire Développeur Web Fullstack</p>
                                    <p className="text-white/60 font-light mt-1 mb-2 text-xs md:text-base">ADNCLY</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-white/5 text-white/70 text-[10px] md:text-xs rounded-md">React</span>
                                        <span className="px-2 py-1 bg-white/5 text-white/70 text-[10px] md:text-xs rounded-md">Node.js</span>
                                        <span className="px-2 py-1 bg-white/5 text-white/70 text-[10px] md:text-xs rounded-md">MySQL</span>
                                        <span className="px-2 py-1 bg-white/5 text-white/70 text-[10px] md:text-xs rounded-md">Agile</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[33px] top-1 w-4 h-4 bg-white/20 rounded-full ring-4 ring-black"></div>
                                    <p className="text-xs md:text-sm text-white/50 font-semibold mb-1">Avril 2023 - Septembre 2024</p>
                                    <p className="font-bold text-white text-base md:text-lg">Technicien Informatique N1/N2</p>
                                    <p className="text-white/60 font-light mt-1 text-xs md:text-base">MEDIABAR</p>
                                </div>
                            </div>
                        </div>

                        {/* COMPETENCES */}
                        <div className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-[#111111]/80 p-8 md:p-10 rounded-3xl border border-white/10 shadow-lg transition-transform duration-300 hover:bg-[#151515] hover:-translate-y-1 overflow-y-auto">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">⚡</span>
                                Stack Technique
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider font-semibold mb-2 md:mb-3">Frontend</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'TypeScript', 'Tailwind CSS', 'SASS', 'HTML5', 'CSS3', 'Framer Motion'].map(tech => (
                                            <span key={tech} className="px-3 py-1.5 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-lg text-xs md:text-sm font-medium hover:bg-blue-500/20 transition-colors">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider font-semibold mb-2 md:mb-3">Backend</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Node.js', 'NestJS', 'Express', 'Laravel', 'PHP', 'REST API'].map(tech => (
                                            <span key={tech} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg text-xs md:text-sm font-medium hover:bg-indigo-500/20 transition-colors">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider font-semibold mb-2 md:mb-3">Databases</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['MySQL', 'MariaDB', 'PostgreSQL', 'Redis', 'MongoDB', 'TypeORM'].map(tech => (
                                            <span key={tech} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg text-xs md:text-sm font-medium hover:bg-emerald-500/20 transition-colors">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider font-semibold mb-2 md:mb-3">DevOps & Tools</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Docker', 'Git', 'CI/CD', 'Agile', 'Vite', 'Webpack'].map(tech => (
                                            <span key={tech} className="px-3 py-1.5 bg-white/5 text-white/80 border border-white/10 rounded-lg text-xs md:text-sm font-medium hover:bg-white/10 transition-colors">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROJETS */}
                        {projects.map((project, index) => (
                            <div key={index} className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-[#111111]/80 p-8 md:p-10 rounded-3xl border border-white/10 shadow-lg transition-transform duration-300 hover:bg-[#151515] hover:-translate-y-1 overflow-y-auto flex flex-col group/card">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1 md:mb-2">
                                            <span className="text-[10px] md:text-xs font-mono text-white/40">0{index + 1}</span>
                                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover/card:text-blue-400 transition-colors">{project.title}</h3>
                                        </div>
                                        <p className="text-white/60 text-xs md:text-sm">{project.subtitle}</p>
                                    </div>
                                    {project.github && project.github !== '#' && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-white/50 hover:text-white"
                                            aria-label="Voir le code sur GitHub"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                            </svg>
                                        </a>
                                    )}
                                </div>

                                <div className="w-full h-48 md:h-56 bg-[#050505] rounded-2xl mb-6 overflow-hidden border border-white/5 relative group/image shrink-0">
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110 opacity-80 group-hover/image:opacity-100" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                            <span className="text-sm font-light tracking-wider uppercase">Aucun aperçu</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 flex-1">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map(t => (
                                            <span key={t} className="px-2 md:px-2.5 py-1 bg-white/[0.04] text-white/70 text-[10px] md:text-xs rounded-md border border-white/5">{t}</span>
                                        ))}
                                    </div>
                                    <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">{project.description}</p>
                                </div>
                            </div>
                        ))}

                        {/* LANGUES & CONTACT COMBINED */}
                        <div className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-[#111111]/80 p-8 md:p-10 rounded-3xl border border-white/10 shadow-lg transition-transform duration-300 hover:bg-[#151515] hover:-translate-y-1 overflow-y-auto flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">🌍</span>
                                    Langues
                                </h3>
                                <div className="space-y-4 mb-10 text-sm md:text-base">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <span className="font-semibold text-white">Français</span>
                                        <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1 rounded-full">Natif</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <span className="font-semibold text-white">Anglais</span>
                                        <span className="text-blue-400 text-sm font-medium bg-blue-400/10 px-3 py-1 rounded-full">Courant (C1)</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <span className="font-semibold text-white">Malgache</span>
                                        <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1 rounded-full">Natif</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">✉️</span>
                                    Contact
                                </h3>
                                <div className="flex flex-col gap-3">
                                    <a
                                        href="mailto:rinatovo2103@gmail.com"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all duration-300 group cursor-pointer"
                                    >
                                        <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white">
                                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-medium text-sm md:text-base">Email</p>
                                            <p className="text-white/50 text-xs md:text-sm font-light">rinatovo2103@gmail.com</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://www.linkedin.com/in/rinatovo/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/5 hover:bg-[#0A66C2]/10 border border-white/5 hover:border-[#0A66C2]/30 rounded-xl transition-all duration-300 group cursor-pointer"
                                    >
                                        <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/70 group-hover:text-[#0A66C2]">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-medium text-sm md:text-base">LinkedIn</p>
                                            <p className="text-white/50 text-xs md:text-sm font-light">rinatovo</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://github.com/Rinatovo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all duration-300 group cursor-pointer"
                                    >
                                        <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/70 group-hover:text-white">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-medium text-sm md:text-base">GitHub</p>
                                            <p className="text-white/50 text-xs md:text-sm font-light">Rinatovo</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Arrow Controllers */}
                    <motion.div
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center cursor-pointer group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showLeftArrow ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={scrollLeft}
                        style={{ pointerEvents: showLeftArrow ? 'auto' : 'none' }}
                    >
                        <motion.div
                            animate={{ x: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="bg-black/60 p-4 rounded-full border border-white/10 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center cursor-pointer group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        onClick={scrollRight}
                    >
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="bg-black/60 p-4 rounded-full border border-white/10 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
