import { Link } from 'react-router-dom';
import { DollarSign, LogOut, User } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ currentUser, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <DollarSign size={30} color="#267556ff" />
            <span>FTracker</span>
          </Link>
        </div>

        <div className="navbar-menu">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/add-transaction" className="nav-link">
            Add Transaction
          </Link>
          <Link to="/transactions" className="nav-link">
            Transactions
          </Link>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <User size={24} />
            <span>{currentUser?.name}</span>
          </div>
          <button onClick={onLogout} className="logout-button">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 