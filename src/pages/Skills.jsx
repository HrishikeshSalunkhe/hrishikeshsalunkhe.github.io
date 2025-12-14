import { skills } from '../data/skills';
import { 
  SiJavascript, 
  SiTypescript, 
  SiHtml5, 
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiAmazonaws,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiGit,
  SiVisualstudiocode,
  SiPostman,
  SiJira,
  SiFigma,
  SiUbuntu,
} from 'react-icons/si';
import { FaDatabase, FaCode } from 'react-icons/fa';

const Skills = () => {
  // Icon mapping with colors similar to About page
  const iconMap = {
    javascript: { Icon: SiJavascript, color: 'text-yellow-400' },
    typescript: { Icon: SiTypescript, color: 'text-blue-500' },
    html5: { Icon: SiHtml5, color: 'text-orange-400' },
    css3: { Icon: SiCss3, color: 'text-blue-400' },
    sql: { Icon: FaDatabase, color: 'text-blue-400' },
    react: { Icon: SiReact, color: 'text-blue-400' },
    nodejs: { Icon: SiNodedotjs, color: 'text-green-400' },
    express: { Icon: SiExpress, color: 'text-gray-300' },
    mysql: { Icon: SiMysql, color: 'text-blue-500' },
    mongodb: { Icon: SiMongodb, color: 'text-green-500' },
    redis: { Icon: SiRedis, color: 'text-red-500' },
    aws: { Icon: SiAmazonaws, color: 'text-orange-400' },
    docker: { Icon: SiDocker, color: 'text-blue-500' },
    kubernetes: { Icon: SiKubernetes, color: 'text-blue-400' },
    githubactions: { Icon: SiGithubactions, color: 'text-gray-300' },
    git: { Icon: SiGit, color: 'text-red-400' },
    vscode: { Icon: SiVisualstudiocode, color: 'text-blue-400' },
    postman: { Icon: SiPostman, color: 'text-orange-400' },
    jira: { Icon: SiJira, color: 'text-blue-500' },
    figma: { Icon: SiFigma, color: 'text-purple-400' },
    ubuntu: { Icon: SiUbuntu, color: 'text-orange-400' },
    cursorai: { Icon: FaCode, color: 'text-purple-400' },
  };

  const skillCategories = [
    { title: 'Languages', data: skills.languages, color: 'from-blue-500 to-cyan-500' },
    { title: 'Frameworks', data: skills.frameworks, color: 'from-purple-500 to-pink-500' },
    { title: 'Databases', data: skills.databases, color: 'from-green-500 to-emerald-500' },
    { title: 'Cloud/DevOps', data: skills.cloudDevOps, color: 'from-orange-500 to-red-500' },
    { title: 'Tools', data: skills.tools, color: 'from-indigo-500 to-blue-500' },
  ];

  return (
    <div className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Skills & Technologies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="glass p-6 card-hover animate-fade-in-up"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h2 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {category.data.map((skill, skillIndex) => {
                  const iconData = iconMap[skill.iconKey];
                  const IconComponent = iconData?.Icon;
                  const iconColor = iconData?.color || 'text-primary-400';
                  
                  return (
                    <div
                      key={skillIndex}
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110"
                    >
                      {IconComponent ? (
                        <IconComponent className={`${iconColor} text-4xl mb-2`} />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mb-2 border border-primary-500/30">
                          <span className="text-primary-400 font-bold text-sm">{skill.name}</span>
                        </div>
                      )}
                      <span className="text-sm text-gray-300 font-medium text-center">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-12 glass p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-200">Always Learning</h2>
          <p className="text-gray-400">
            Technology evolves rapidly, and I'm committed to staying current with the latest 
            trends and best practices. I regularly explore new frameworks, tools, and methodologies 
            to enhance my skill set and deliver better solutions.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Skills;
