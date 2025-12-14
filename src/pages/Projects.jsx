import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  return (
    <div className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          A collection of projects showcasing my skills in full-stack development, 
          UI/UX design, and problem-solving.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Want to see more? Check out my GitHub profile for additional projects and contributions.
          </p>
          <a
            href="https://github.com/HrishikeshSalunkhe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>View All Projects on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
