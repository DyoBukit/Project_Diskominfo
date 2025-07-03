// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthLoginAdmin';
import { useAuthUser } from '../contexts/AuthLoginUser';

function Navbar() {
  const navigate = useNavigate();

  const { logout: adminLogout, role: adminRole, isAuthenticated: isAdmin } = useAuth();
  const { logout: userLogout, role: userRole, isAuthenticated: isUser } = useAuthUser();

  const handleLogout = () => {
    adminLogout(); // panggil dua-duanya untuk jaga-jaga
    userLogout();
    navigate('/login');
  };

  // Tentukan role yang sedang aktif
  const role = isAdmin ? adminRole : isUser ? userRole : null;


  return (
    <nav className="bg-bg-dark text-white p-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center shadow-lg">
      <Link to="/" className="text-3xl font-bold text-white uppercase tracking-wider mb-4 sm:mb-0">
        Eval<span className="text-primary">App</span>
      </Link>
      <ul className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
        {role === 'admin' && (
          <>
            <li><Link to="/admin/dashboard" className="text-lg py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-300">Dashboard</Link></li>
            <li><Link to="/admin/users" className="text-lg py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-300">Manage Users</Link></li>
            <li><Link to="/admin/forms" className="text-lg py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-300">Manage Forms</Link></li>
          </>
        )}
        {role === 'user' && (
          <>
            <li><Link to="/user/dashboard" className="text-lg py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-300">Dashboard</Link></li>
            <li><Link to="/user/evaluasi" className="text-lg py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-300">Isi Evaluasi</Link></li>
          </>
        )}
        <li>
          <button
            onClick={handleLogout}
            className="bg-transparent border border-white text-white text-lg py-2 px-4 rounded-lg hover:bg-white hover:text-bg-dark transition-colors duration-300"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;