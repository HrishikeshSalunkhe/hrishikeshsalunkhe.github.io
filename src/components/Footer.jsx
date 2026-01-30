import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/HrishikeshSalunkhe', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/salunkhehrishikesh/', label: 'LinkedIn' },
    { icon: FaEnvelope, url: 'mailto:salunkhehrishikesh23@gmail.com', label: 'Email' },
  ];

  const footerLinks = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="glass-dark border-t border-gray-700/50">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-4">
              Hrishikesh Salunkhe
            </h3>
            <p className="text-gray-400 text-sm">
              Software Engineer with 3+ years of experience building scalable web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Hrishikesh Salunkhe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
