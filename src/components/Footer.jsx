import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Prep Me
            </h3>
            <p className="text-sm text-gray-400">
              Prepare for your next interview with AI-powered practice questions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-400 hover:text-blue-400 transition duration-300">
                Home
              </Link>
              <Link to="/login" className="text-gray-400 hover:text-blue-400 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="text-gray-400 hover:text-blue-400 transition duration-300">
                Register
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-400">
              Email: support@prepme.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Prep Me. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
