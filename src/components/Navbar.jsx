import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';

function Navbar() {

   const {user} = useSelector(state => state.auth)

   const dispatch = useDispatch()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Prep Me
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Home
            </Link>
            {
              user ? (
                <>
                <Link to="/questions" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Start Practice
            </Link>

            <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition duration-300">
              My Profile
            </Link>

            <button
            onClick={()=>dispatch(logoutUser())}
             className="px-6 py-2 bg-red-600 cursor-pointer to-cyan-500 text-white rounded-full hover:shadow-lg hover:scale-105 transition duration-300">
              Logout
            </button>
                </>
              ) : (
                <>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Start Practice
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Login
            </Link>
            <Link to="/register" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full hover:shadow-lg hover:scale-105 transition duration-300">
              Sign Up
            </Link>
                </>
              )
            }
          </div>

          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
