// src/pages/User/DashboardUser.jsx
import React from 'react';
import Navbar from '../../components/Navbar';
import { useAuthUser } from '../../contexts/AuthLoginUser';
import { Link } from 'react-router-dom';

function DashboardUser() {
  const { user } = useAuthUser();

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
      <Navbar role="user" />
      <main className="flex-grow p-8 md:p-12 max-w-3xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-10">
          Hello,   <span className="text-primary">{user?.username || 'User'}</span>!
        </h1>
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg mt-8">
          <h2 className="text-accent text-center text-3xl md:text-4xl font-bold mb-4">EVALUASI SISTEM PEMERINTAHAN BERBASIS ELEKTRONIK (SPBE) TAHUN 2024</h2>
          <Link
            to="/user/evaluasi"
            className="inline-block bg-black text-white py-3 px-8 rounded-lg text-xl font-semibold hover:bg-secondary transition-colors duration-300 transform hover:-translate-y-1"
          >
            Mulai Evaluasi Sekarang
          </Link>
        </div>
      </main>
    </div>
  );
}

export default DashboardUser;