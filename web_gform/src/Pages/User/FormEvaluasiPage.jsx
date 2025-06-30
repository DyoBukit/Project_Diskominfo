// src/pages/User/FormEvaluasiPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import EvaluationForm from '../../components/EvaluationForm';

function FormEvaluasiPage() {
  const navigate = useNavigate();

  const handleSubmitEvaluation = (formData) => {
    console.log('Form data submitted:', formData);
    // Di sini Anda akan mengirim data ke backend
    // Setelah sukses, arahkan ke halaman terima kasih/end page
    navigate('/user/evaluasi/complete');
  };

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col">
      <Navbar role="user" />
      <main className="flex-grow p-8 md:p-12 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-dark mb-8 text-center">
          Isi <span className="text-primary">Form Evaluasi</span>
        </h1>
        <EvaluationForm onSubmit={handleSubmitEvaluation} />
      </main>
    </div>
  );
}

export default FormEvaluasiPage;