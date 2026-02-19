import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa';

export default function SocialLinks() {
    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/Rinatovo',
            icon: FaGithub,
            color: 'hover:text-white',
            download: false
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/rinatovo/',
            icon: FaLinkedin,
            color: 'hover:text-blue-400',
            download: false
        },
        {
            name: 'CV',
            url: '/projet/CVRINA.pdf',
            icon: FaFilePdf,
            color: 'hover:text-red-400',
            download: true,
            filename: 'CV_Rina_Rasolonjatovo.pdf'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-2 md:gap-4"
        >
            {socialLinks.map((link, index) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={link.download ? link.filename : undefined}
                    className={`p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/50 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white/20 ${link.color} group relative`}
                    aria-label={link.name}
                >
                    <link.icon size={24} />

                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {link.name}
                    </span>
                </a>
            ))}
        </motion.div>
    );
}
