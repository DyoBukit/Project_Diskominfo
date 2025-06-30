// src/components/EvaluationForm.jsx
import React, { useState } from 'react';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';

const EVALUATION_QUESTIONS = [
  {
    id: 'q1',
    type: 'radio',
    question: 'Bagaimana kualitas layanan yang Anda terima?',
    options: [
      { value: 'sangat_buruk', label: 'Sangat Buruk' },
      { value: 'buruk', label: 'Buruk' },
      { value: 'cukup', label: 'Cukup' },
      { value: 'baik', label: 'Baik' },
      { value: 'sangat_baik', label: 'Sangat Baik' },
    ],
  },
  {
    id: 'q2',
    type: 'textarea', // Ganti 'text' jadi 'textarea' agar lebih jelas
    question: 'Mohon berikan masukan atau saran untuk perbaikan:',
    placeholder: 'Tulis masukan Anda di sini...',
  },
  {
    id: 'q3',
    type: 'radio',
    question: 'Apakah Anda akan merekomendasikan layanan ini kepada orang lain?',
    options: [
      { value: 'ya', label: 'Ya' },
      { value: 'tidak', label: 'Tidak' },
      { value: 'mungkin', label: 'Mungkin' },
    ],
  },
  {
    id: 'q4',
    type: 'text',
    question: 'Nama lengkap Anda (opsional):',
    placeholder: 'Masukan nama Anda',
    optional: true // Menandakan ini opsional
  }
];

function EvaluationForm({ onSubmit }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    EVALUATION_QUESTIONS.forEach(q => {
      // Hanya validasi jika pertanyaan tidak opsional
      if (!q.optional && (!formData[q.id] || formData[q.id].trim() === '')) {
        newErrors[q.id] = 'Kolom ini wajib diisi.';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({});
    } else {
      console.log('Form has errors:', errors);
      // Scroll to first error or highlight them
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        {EVALUATION_QUESTIONS.map((q) => (
          <div key={q.id} className="mb-8 pb-8 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
            <div className="mb-6">
              <label htmlFor={q.id} className="block text-gray-800 font-semibold mb-4 text-xl md:text-2xl text-center">
                {q.question} {q.optional && <span className="text-gray-500 text-base font-normal">(Opsional)</span>}
              </label>
              {q.type === 'radio' && (
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  {q.options.map((option) => (
                    <label key={option.value} className="inline-flex items-center cursor-pointer p-3 px-5 border-2 border-primary rounded-lg text-primary text-base font-medium bg-white transition-all duration-300 hover:bg-primary/10">
                      <input
                        type="radio"
                        id={`${q.id}-${option.value}`}
                        name={q.id}
                        value={option.value}
                        checked={formData[q.id] === option.value}
                        onChange={handleChange}
                        className="hidden peer"
                      />
                      <span className="peer-checked:bg-red-800 peer-checked:text-white peer-checked:shadow-md py-1 px-3 rounded-md transition-all duration-300">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
              {(q.type === 'text' || q.type === 'textarea') && (
                <InputField
                  type={q.type}
                  id={q.id}
                  name={q.id}
                  value={formData[q.id] || ''}
                  onChange={handleChange}
                  placeholder={q.placeholder}
                  error={errors[q.id]}
                />
              )}
              {errors[q.id] && <ErrorMessage message={errors[q.id]} />}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-black text-white w-full py-4 px-6 rounded-lg text-xl font-bold mt-8 hover:bg-secondary transition-colors duration-300"
        >
          Kirim Evaluasi
        </button>
      </form>
    </div>
  );
}

export default EvaluationForm;