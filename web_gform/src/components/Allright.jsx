// src/components/Allright.jsx
import React from 'react';

function Allright() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-bg-dark text-white p-6 text-center text-sm shadow-inner-lg mt-auto">
      &copy; {currentYear} Aplikasi Form Evaluasi Diskominf. All rights reserved.
    </footer>
  );
}

export default Allright;