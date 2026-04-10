import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileForm from './pages/ProfileForm';
import Questions from './pages/Questions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <main className='flex-grow'>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
      </main>
      <ToastContainer/>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
