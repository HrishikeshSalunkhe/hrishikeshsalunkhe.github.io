import { experience } from '../data/experience';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const Experience = () => {
  return (
    <div className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Professional Experience
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-500 transform md:-translate-x-1/2"></div>

            {experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative mb-12 animate-fade-in-up ${
                  index % 2 === 0 ? 'md:pr-1/2 md:pr-8' : 'md:pl-1/2 md:pl-8'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-gray-900 transform md:-translate-x-1/2 -translate-x-1/2 top-6`}></div>

                <div className={`glass p-6 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:max-w-md' : 'md:ml-auto md:max-w-md'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaBriefcase className="text-primary-400 flex-shrink-0" />
                    <h2 className="text-2xl font-bold text-gray-100">{exp.role}</h2>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4 text-primary-400">
                    <FaCalendarAlt className="flex-shrink-0" />
                    <span className="text-sm font-medium">{exp.duration}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-300 mb-4">{exp.company}</h3>
                  
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-400 flex items-start">
                        <span className="text-primary-400 mr-2 flex-shrink-0">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
