import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  stack: string;
  details: string;
  githubLink: string;
  image: string;
}

interface ProjectSlideProps {
  project: Project;
}

export default function ProjectSlide({ project }: ProjectSlideProps) {
  return (
    <div className="snap-center shrink-0 w-[90%] md:w-[600px] h-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-blue-500/10 overflow-y-auto">
      <h3 className="text-3xl font-bold text-blue-400 mb-4">{project.title}</h3>
      <div className="space-y-4">
        <div>
          {project.image && <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
          <p className="text-blue-300 text-sm">{project.description}</p>
          <p className="text-white/70 text-sm mt-2">{project.stack}</p>
          <p className="text-white/60 text-xs mt-1">{project.details}</p>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 mt-4 inline-block"
            >
              Voir sur GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
