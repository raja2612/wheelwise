import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication status
    setIsAuthenticated(false);
    
    // Remove all auth-related data from localStorage
    localStorage.removeItem('isAuthenticated');
    
    // Optional: Clear other user-specific data if needed
    // localStorage.removeItem('userData');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo-containe">
        <img 
          src="/logo.jpg" 
          alt="WheelWise Logo" 
          className="rounded-logo" 
        />
        <span className="company-name">WheelWise</span>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/marketplace" className="nav-link">Marketplace</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}