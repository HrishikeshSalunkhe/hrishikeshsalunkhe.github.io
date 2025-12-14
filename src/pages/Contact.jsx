import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'salunkhehrishikesh23@gmail.com',
      href: 'mailto:salunkhehrishikesh23@gmail.com',
      color: 'text-blue-400',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Bengaluru, India',
      href: null,
      color: 'text-green-400',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Availability',
      value: 'Available for remote work',
      href: null,
      color: 'text-purple-400',
    },
  ];

  const socialLinks = [
    { 
      icon: FaGithub, 
      url: 'https://github.com/HrishikeshSalunkhe', 
      label: 'GitHub',
      color: 'hover:text-gray-100',
    },
    { 
      icon: FaLinkedin, 
      url: 'https://www.linkedin.com/in/salunkhehrishikesh/', 
      label: 'LinkedIn',
      color: 'hover:text-blue-500',
    },
    { 
      icon: FaEnvelope, 
      url: 'mailto:salunkhehrishikesh23@gmail.com', 
      label: 'Email',
      color: 'hover:text-blue-400',
    },
  ];

  return (
    <div className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Feel free to reach out through any of the channels below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const content = (
                <div className="flex items-start space-x-4 p-6 glass card-hover h-full">
                  <div className={`${info.color} text-2xl flex-shrink-0 mt-1`}>
                    <Icon />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wide">
                      {info.label}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-200 hover:text-primary-400 transition-colors duration-200 text-lg font-medium"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-200 text-lg font-medium">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              );

              return info.href ? (
                <a key={index} href={info.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={index}>
                  {content}
                </div>
              );
            })}
          </div>

          <div className="glass p-8 text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-200">Connect With Me</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center space-y-2 p-6 rounded-lg bg-gray-800/50 border border-gray-700/50 transition-all duration-300 transform hover:scale-110 hover:border-primary-500/50 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon size={32} />
                    <span className="text-sm font-medium text-gray-300">{social.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700/50">
              <a
                href="mailto:salunkhehrishikesh23@gmail.com"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <FaEnvelope />
                <span>Send me an Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
