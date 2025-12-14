import { Link } from 'react-router-dom';
import { FaDownload, FaEnvelope } from 'react-icons/fa';

const Home = () => {
  const handleDownloadResume = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Resume-Hrishikesh-Salunkhe.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-padding pt-32">
      <div className="container-custom text-center animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
            Hrishikesh Salunkhe
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
            Associate Software Engineer
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Passionate Associate Software Engineer with 3+ years of experience building scalable web applications 
            using React JS, JavaScript, Node JS, MySQL, HTML, and CSS. Skilled in designing user-friendly front-end 
            interfaces and developing efficient back-end systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleDownloadResume}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <FaDownload />
              <span>Download Resume</span>
            </button>
            
            <Link
              to="/contact"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <FaEnvelope />
              <span>Contact Me</span>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="mt-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
