import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* <Navbar /> */}

      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent leading-tight">
              Ace Your Interviews with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get personalized interview questions powered by AI. Practice, improve, and land your dream job with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/profile"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/questions"
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 hover:scale-105 transition duration-300"
              >
                Try Demo
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700 font-medium">What is your experience with React hooks?</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                  <p className="text-gray-700 font-medium">Explain the concept of closure in JavaScript</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                  <p className="text-gray-700 font-medium">How do you optimize database queries?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose AI Interview Prep?
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to succeed in your next interview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              AI Generated Questions
            </h3>
            <p className="text-gray-600">
              Get intelligent questions tailored to your skill level and job role
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Personalized Learning
            </h3>
            <p className="text-gray-600">
              Questions adapted to your experience and technologies you know
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Instant Practice
            </h3>
            <p className="text-gray-600">
              Start practicing immediately with no setup required
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Build Confidence
            </h3>
            <p className="text-gray-600">
              Practice until you feel ready to ace any technical interview
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to interview success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
              1
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Enter Your Profile
            </h3>
            <p className="text-gray-600">
              Tell us about your experience, skills, and the role you're targeting
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
              2
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              AI Generates Questions
            </h3>
            <p className="text-gray-600">
              Our AI creates personalized interview questions just for you
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
              3
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Practice & Improve
            </h3>
            <p className="text-gray-600">
              Review questions, practice answers, and boost your confidence
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl shadow-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start preparing for your next interview today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who are acing their interviews
          </p>
          <Link
            to="/profile"
            className="inline-block px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            Start Practice
          </Link>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}

export default Landing;
