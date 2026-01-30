import { FaReact, FaNode, FaDocker, FaGitAlt, FaGraduationCap } from 'react-icons/fa';
import { SiMysql, SiJavascript, SiKubernetes } from 'react-icons/si';

const About = () => {
  const techLogos = [
    { icon: FaReact, name: 'React JS', color: 'text-blue-400' },
    { icon: FaNode, name: 'Node JS', color: 'text-green-400' },
    { icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
    { icon: SiMysql, name: 'MySQL', color: 'text-blue-500' },
    { icon: FaGitAlt, name: 'Git', color: 'text-red-400' },
    { icon: FaDocker, name: 'Docker', color: 'text-blue-500' },
    { icon: SiKubernetes, name: 'Kubernetes', color: 'text-blue-400' },
  ];

  return (
    <div className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            About Me
          </h1>

          <div className="glass p-8 mb-12 animate-fade-in-up">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I’m a Software Engineer with 3+ years of experience building scalable web applications using React, JavaScript, Node.js, and MySQL. At Tricog Health, I progressed from Associate Software Engineer to Software Engineer in January 2026, taking on greater ownership in designing, developing, and maintaining production-grade systems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I specialize in full-stack development, crafting intuitive front-end interfaces and developing efficient, reliable back-end services. My work focuses on writing clean, maintainable code and building systems that are easy to scale and operate.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I enjoy solving complex engineering problems, collaborating across teams, and turning real-world requirements into simple, effective technical solutions. I’m currently exploring Docker and Kubernetes to strengthen my understanding of deployment and system reliability.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My interests lie in backend system architecture, database performance optimization, and creating seamless user experiences through thoughtful engineering.
            </p>

          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">Tech Stack</h2>
            <div className="glass p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {techLogos.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110"
                    >
                      <Icon className={`${tech.color} text-4xl mb-2`} />
                      <span className="text-sm text-gray-300 font-medium">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">Education</h2>
            <div className="glass p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FaGraduationCap className="text-primary-400 text-2xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-100 mb-1">
                      Computer Engineering (Bachelor of Technology)
                    </h3>
                    <p className="text-gray-300 font-medium mb-1">
                      Rajarambapu Institute of Technology, Sangli, Maharashtra, India
                    </p>
                    <p className="text-gray-400 text-sm">
                      CGPA: 7.18 | Aug 2016 - Oct 2020
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 pt-4 border-t border-gray-700/50">
                  <FaGraduationCap className="text-primary-400 text-2xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-100 mb-1">
                      Senior Secondary (XII), Science
                    </h3>
                    <p className="text-gray-300 font-medium mb-1">
                      STEM And Jr College, Pune
                    </p>
                    <p className="text-gray-400 text-sm">
                      Percentage: 77.85% | Jun 2015 – Feb 2016
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="glass p-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Skills Overview</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">Frontend Development</span>
                  <span className="text-primary-400">90%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">Backend Development</span>
                  <span className="text-primary-400">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">Database Design</span>
                  <span className="text-primary-400">80%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">Cloud & DevOps</span>
                  <span className="text-primary-400">75%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default About;
