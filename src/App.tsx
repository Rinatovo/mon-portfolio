/* c:\Users\rinas\Documents\potfolio\mon-portfolio\src\App.tsx */
import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DotGrid from './DotGrid';
import CardNav from './CardNav';
import './App.css';



type Section = 'dev' | 'photo' | null;

interface GalleryItem {
  id: string;
  img: string;
  height: number;
  orientation?: 'vertical' | 'horizontal';
}

export default function App() {
  const [active, setActive] = useState<Section>(null);
  const [hovered, setHovered] = useState<Section>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const items = [
    {
      label: "RESEAUX SOCIAUX",
      bgColor: "rgba(255, 255, 255, 0.05)", 
      textColor: "#fff",
      onClick: () => {
        const link = document.createElement('a');
        link.href = '/projet/CV.pdf';
        link.download = 'CV_Rina.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      links: [
        { label: "Email", ariaLabel: "Email", href: "mailto:rinatovo2103@gmail.com" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://www.linkedin.com/in/rinatovo/" },
        { label: "GitHub", ariaLabel: "GitHub", href: "https://github.com/Rinatovo" }
      ]
    }
  ];

  const galleryItems = [
    { id: "1", img: '/galerie/DSCF0433.jpg', height: 500 ,orientation: 'horizontal' },
    { id: "2", img: '/galerie/DSCF1254.jpg', height: 500 },
    { id: "3", img: '/galerie/DSCF1596.jpg', height: 500 },
    { id: "4", img: '/galerie/DSCF1828.jpg', height: 500 },
    { id: "5", img: '/galerie/DSCF2523-Modifier.jpg', height: 500 },
    { id: "6", img: '/galerie/DSCF2616-Modifier.jpg', height: 500 },
    { id: "7", img: '/galerie/DSCF3351.jpg', height: 500 },
    { id: "8", img: '/galerie/DSCF5467.jpg', height: 500 },
    { id: "9", img: '/galerie/DSCF5517-Modifier.jpg', height: 500 },
    { id: "10", img: '/galerie/DSCF5578-Modifier.jpg', height: 500 ,orientation: 'horizontal'  },
    { id: "11", img: '/galerie/DSCF6202.jpg', height: 500 },
    
    { id: "12", img: '/galerie/DSCF5991.jpg', height: 500 },
    { id: "13", img: '/galerie/DSCF6161.jpg', height: 500 ,orientation: 'horizontal' },
    { id: "14", img: '/galerie/DSCF5980.jpg', height: 500 ,orientation: 'horizontal'  },
    { id: "15", img: '/galerie/DSCF6508.jpg', height: 500 },
    { id: "16", img: '/galerie/DSCF6579.jpg', height: 500 },
    { id: "17", img: '/galerie/DSCF6632.jpg', height: 500 },
    { id: "18", img: '/galerie/DSCF6640.jpg', height: 500 },
    { id: "19", img: '/galerie/DSCF6902.jpg', height: 500 },
    { id: "20", img: '/galerie/DSCF6997.jpg', height: 500 },
    { id: "21", img: '/galerie/DSCF7127.jpg', height: 500 },
    { id: "22", img: '/galerie/DSCF7381.jpg', height: 500 },
    { id: "23", img: '/galerie/DSCF7461.jpg', height: 500 }
  ];

  const projects = [
    {
      title: "Billzy",
      subtitle: "API REST de gestion de facturation (Multi-tenant)",
      tech: "NestJS • TypeScript • MariaDB • TypeORM • Redis • JWT • Docker",
      description: "Billzy est une API REST robuste de gestion de facturation développée avec NestJS. Elle permet aux entreprises de gérer clients, utilisateurs et articles de facturation dans une architecture multi-tenant sécurisée. Authentification JWT (cookies HTTP-only), hachage des mots de passe avec Bcrypt, et protection HTTP via Helmet. MariaDB est gérée avec TypeORM (migrations et seeders). Redis est utilisé pour les sessions et la gestion des codes OTP. Conteneurisation avec Docker et Docker Compose; Dev Containers pour le développement.",
      github: "https://github.com/Rinatovo/my-invoice-api",
      image: '/projet/Bilzy.png'
    },
    {
      title: "PROJET CYNA 2025",
      subtitle: "Marketplace SaaS Cybersécurité Full-Stack",
      tech: "React.js • Laravel • MySQL • JWT",
      description: "Développement full-stack d'une plateforme de cybersécurité avec système d'authentification JWT sécurisé",
      github: "#",
      image: null
    },
    {
      title: "CMS E-COMMERCE",
      subtitle: "CMS Backend pour mini-boutiques sans code",
      tech: "Node.js • Express.js • MySQL • REST API",
      description: "Backend robuste permettant la création de boutiques en ligne personnalisables sans code",
      github: "#",
      image: null
    }
  ];

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
    <div className={`relative w-full min-h-screen bg-[#020202] text-white overflow-hidden font-sans flex flex-col items-center justify-center ${active ? 'cursor-auto' : ''}`}>
      <CardNav
        title="LE PORTFOLIO DE RINA"
        items={items}
        baseColor="transparent"
        menuColor="#fff"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        logo={null}
      />
      
      {!active && (
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          style={{}}
        />
      </div>
      )}

      
      {/* 4. CONTENEUR PRINCIPAL */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-6 md:gap-0 px-4 md:px-0">

        {/* SECTION DÉVELOPPEUR */}
        <motion.div
          className="cursor-target group relative -mr-6 md:-mr-16 will-change-transform"
          onHoverStart={() => setHovered('dev')}
          onHoverEnd={() => setHovered(null)}
          onClick={() => setActive('dev')}
          whileHover={{ scale: 1.05, zIndex: 30 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          <div className={`absolute inset-0 bg-blue-500/10 blur-[100px] transition-opacity duration-500 ${hovered === 'dev' ? 'opacity-100' : 'opacity-0'}`} />
          <img
            src={hovered === 'dev' ? "/pcoff.png" : "/pcon.png"}
            className="w-[16rem] sm:w-[22rem] md:w-[38rem] max-w-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-300 brightness-90 group-hover:brightness-110"
            alt="Dev Mode"
          />
        </motion.div>

        {/* SECTION PHOTOGRAPHE */}
        <motion.div
          className="cursor-target group relative will-change-transform"
          onHoverStart={() => setHovered('photo')}
          onHoverEnd={() => setHovered(null)}
          onClick={() => setActive('photo')}
          whileHover={{ scale: 1.05, zIndex: 30 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          <div className={`absolute inset-0 bg-orange-500/10 blur-[100px] transition-opacity duration-500 ${hovered === 'photo' ? 'opacity-100' : 'opacity-0'}`} />
          <img
            src={hovered === 'photo' ? "/camon.png" : "/cam.png"}
            className="w-[14rem] sm:w-[20rem] md:w-[34rem] max-w-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-300 brightness-75 group-hover:brightness-110"
            alt="Photo Mode"
          />
        </motion.div>
      </main>

      {/* 5. FOOTER */}
      <footer className="absolute bottom-6 md:bottom-12 w-full flex flex-col items-center justify-center z-40 pointer-events-none">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="h-[1px] w-16 bg-white/20" />
          <div className="text-sm font-black italic tracking-tighter uppercase">
            {hovered === 'dev' ? "[ INITIALISER ENVIRONNEMENT ]" : hovered === 'photo' ? "[ CHARGER GALERIE ]" : "[ EN ATTENTE ]"}
          </div>
        </motion.div>
      </footer>

      {/* 6. MODALES */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute inset-0 z-[999] flex items-center justify-center p-6 ${active === 'photo' ? 'bg-white' : 'bg-black/90'}`}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full max-w-full md:max-w-6xl h-[85vh] rounded-[2rem] p-6 md:p-10 shadow-2xl overflow-hidden ${active === 'photo' ? 'bg-white' : 'bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10'}`}
              onClick={(e: MouseEvent) => e.stopPropagation()}
            >
              {active === 'dev' ? (
                <div className="h-full flex flex-col relative">
                  <div className="mb-4 shrink-0 flex items-center justify-between">
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-blue-500">PROFIL.</h2>
                    <button onClick={() => setActive(null)} className="text-blue-500 hover:text-blue-400 text-3xl transition-colors leading-none">✕</button>
                  </div>
                  <p className="text-white/60 text-sm md:text-base mb-4">Développeur Full-Stack passionné par les technologies modernes et l'innovation</p>

                  <div 
                    ref={scrollContainerRef}
                    onWheel={handleWheel}
                    onScroll={handleContainerScroll}
                    className="flex-1 w-full min-h-0 overflow-x-auto flex gap-6 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none' }}
                  >

                  <div className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-blue-500/10 overflow-y-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8">
                    <div className="shrink-0">
                      <img src="/projet/rina3.jpg" alt="Photo de profil de Rina Rasolonjatovo" className="w-40 h-40 rounded-full object-cover border-4 border-blue-500/50" />
                    </div>
                    <div className="max-w-md">
                      <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">Rina Rasolonjatovo</h3>
                      <p className="text-white/80">
                        Développeur Full-Stack avec une appétence pour le design et les belles interfaces. Voici un bref résumé de mon parcours et de mes compétences. N'hésitez pas à explorer mes projets et expériences.
                      </p>
                    </div>
                  </div>

                  <div className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-blue-500/10 overflow-y-auto">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">DIPLÔMES ET FORMATION</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-white">CFA INGETIS Paris</p>
                        <p className="text-blue-300">Bachelor Concepteur Développeur d'Applications</p>
                        <p className="text-white/50 text-sm">Octobre 2024 - Août 2025</p>
                      </div>
                      <div>
                        <p className="font-semibold text-white">CFA INGETIS Paris</p>
                        <p className="text-blue-300">BTS SIO – Solutions Logicielles et Applications</p>
                        <p className="text-white/50 text-sm">Septembre 2022 - Juillet 2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-blue-500/10 overflow-y-auto">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">EXPÉRIENCES PROFESSIONNELLES</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-white">ADNCLY - Stagiaire Développeur Web Fullstack</p>
                        <p className="text-blue-300 text-sm">Janvier - Mars 2025</p>
                        <ul className="text-white/70 text-sm mt-2 space-y-1">
                          <li>• React, Node.js, MySQL, Bootstrap</li>
                          <li>• Développement CRUD, HTML5/CSS3</li>
                          <li>• Travail Agile avec Git</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-white">MEDIABAR - Technicien Informatique</p>
                        <p className="text-blue-300 text-sm">Avril 2023 - Septembre 2024</p>
                        <ul className="text-white/70 text-sm mt-2 space-y-1">
                          <li>• Support utilisateurs et incidents</li>
                          <li>• Installation/configuration matériel</li>
                          <li>• Niveau 1 & 2 Support</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {projects.map((project, index) => (
                    <div key={index} className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-blue-500/10 overflow-y-auto flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-400">PROJET {index + 1}</h3>
                        {project.github && project.github !== '#' && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white"
                            aria-label="Voir le code sur GitHub"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                          </a>
                        )}
                      </div>

                      <div className="w-full h-48 md:h-64 bg-black/30 rounded-xl mb-6 overflow-hidden border border-white/5 relative group/image shrink-0">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20">
                            <span className="text-sm">Aperçu du projet</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-white text-lg">{project.title}</p>
                          <p className="text-blue-300 text-sm">{project.subtitle}</p>
                          <p className="text-white/70 text-sm mt-2">{project.tech}</p>
                          <p className="text-white/60 text-xs mt-1">{project.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-blue-500/10 overflow-y-auto">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">COMPÉTENCES TECHNIQUES</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/90 font-semibold mb-2">Frontend</p>
                        <p className="text-white/70 text-sm">React • TypeScript • Tailwind CSS • SASS • HTML5 • CSS3</p>
                      </div>
                      <div>
                        <p className="text-white/90 font-semibold mb-2">Backend</p>
                        <p className="text-white/70 text-sm">Node.js • Express • Laravel • PHP • REST API • GraphQL</p>
                      </div>
                      <div>
                        <p className="text-white/90 font-semibold mb-2">Databases</p>
                        <p className="text-white/70 text-sm">MySQL • PostgreSQL • MongoDB • SQLite</p>
                      </div>
                      <div>
                        <p className="text-white/90 font-semibold mb-2">DevOps & Tools</p>
                        <p className="text-white/70 text-sm">Docker • Git • CI/CD • Agile • Vite • Webpack</p>
                      </div>
                    </div>
                  </div>

                  <div className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-blue-500/10 overflow-y-auto">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">LANGUES</h3>
                    <div className="space-y-2">
                      <p className="text-white/80"><span className="font-semibold">Français</span> - Natif</p>
                      <p className="text-white/80"><span className="font-semibold">Anglais</span> - Courant (C1)</p>
                      <p className="text-white/80"><span className="font-semibold">Malgache</span> - Natif</p>
                    </div>
                  </div>

                  <div className="snap-center shrink-0 w-[92%] md:w-[600px] h-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-blue-500/10 overflow-y-auto flex flex-col items-center justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-8 text-center">RESTEZ EN CONTACT</h3>
                    <div className="flex flex-col gap-6 w-full">
                      <a
                        href="mailto:rinatovo2103@gmail.com"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-4 p-4 bg-white/10 hover:bg-blue-600/20 rounded-xl transition-all duration-300 group cursor-pointer"
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 group-hover:text-blue-300">
                          <rect x="2" y="4" width="20" height="16" rx="2"/>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                        <div>
                          <p className="text-white font-semibold">Email</p>
                          <p className="text-white/60 text-sm">rinatovo2103@gmail.com</p>
                        </div>
                      </a>

                      <a
                        href="https://www.linkedin.com/in/rinatovo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-4 p-4 bg-white/10 hover:bg-blue-600/20 rounded-xl transition-all duration-300 group cursor-pointer"
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400 group-hover:text-blue-300">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                        </svg>
                        <div>
                          <p className="text-white font-semibold">LinkedIn</p>
                          <p className="text-white/60 text-sm">rinatovo</p>
                        </div>
                      </a>

                      <a
                        href="https://github.com/Rinatovo"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-4 p-4 bg-white/10 hover:bg-blue-600/20 rounded-xl transition-all duration-300 group cursor-pointer"
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400 group-hover:text-blue-300">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <div>
                          <p className="text-white font-semibold">GitHub</p>
                          <p className="text-white/60 text-sm">Rinatovo</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  </div>

                  {/* Flèche gauche de défilement animée */}
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
                      className="bg-black/60 p-4 rounded-full border border-white/20 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:bg-blue-600/20 group-hover:border-blue-400/50 group-hover:scale-110"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 group-hover:text-blue-300">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Flèche droite de défilement animée */}
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
                      className="bg-black/60 p-4 rounded-full border border-white/20 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:bg-blue-600/20 group-hover:border-blue-400/50 group-hover:scale-110"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 group-hover:text-blue-300">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </motion.div>
                  </motion.div>

                  </div>
              ) : (
                <div className="h-full w-full flex flex-col bg-white">
                  <div className="px-6 md:px-10 pt-6 md:pt-10 shrink-0 flex items-center justify-between">
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-black">GALERIE.</h2>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.instagram.com/err.raw/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Instagram"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 hover:text-orange-600">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <circle cx="17.5" cy="6.5" r="1.5"></circle>
                        </svg>
                      </a>
                      <button 
                        onClick={() => setActive(null)} 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-orange-500 hover:text-orange-600 text-3xl leading-none"
                        aria-label="Fermer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 w-full min-h-0 overflow-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 pb-24 grid-flow-dense">
                      {galleryItems.map((item) => (
                        <div
                          key={item.id}
                          className={`relative group overflow-hidden rounded-xl cursor-pointer bg-gray-100 ${
                            item.orientation === 'horizontal' ? 'col-span-2 aspect-[4/3]' : 'col-span-1 aspect-[2/3]'
                          }`}
                          onClick={() => setSelectedPhoto(item)}
                        >
                          <img
                            src={item.img}
                            alt={`Photo ${item.id}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden">
        <img src="/pcoff.png" alt="" />
        <img src="/camon.png" alt="" />
      </div>

      {/* MODALE PHOTO FULLSCREEN */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
