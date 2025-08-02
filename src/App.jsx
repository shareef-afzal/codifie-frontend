import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from '../pages/userPage';
import NotFoundPage from '../pages/notFoundPage';
import EditPage from './components/userComponents/edit';
import SignupPage from './components/login&signup/Signup';
import LoginPage from './components/login&signup/login';
import './App.css';
import Navbar from './components/navbar';
import HomePage from './components/homePage';
import SearchPage from '../pages/searchPage';
import Friends from './components/userComponents/friends';
import Footer from './components/footer';
function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users/search" element={<SearchPage />} />
            <Route path="/users/:username" element={<UserPage />} />
            <Route path="/users/signup" element={<SignupPage />} />
            <Route path="/users/login" element={<LoginPage />} />
            <Route path="/users/:username/edit" element={<EditPage />} />
            <Route path="/users/:username/friends" element={<Friends />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
