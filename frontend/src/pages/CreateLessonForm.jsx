import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { contentService } from '../services/api';
import Header from '../components/Header';

const DIFFICULTY_OPTIONS = [
  { value: 'EASY', label: 'Fácil' },
  { value: 'MEDIUM', label: 'Medio' },
  { value: 'HARD', label: 'Difícil' },
];

const CreateLessonForm = () => {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState(DIFFICULTY_OPTIONS[0].value);
  const [section, setSection] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { token, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!title || !section || !difficulty) {
      setError('Todos los campos (Título, Sección, Dificultad) son obligatorios.');
      return;
    }

    if (!token) {
        setError("No hay token de autenticación. Por favor, inicie sesión de nuevo.");
        return;
    }

    try {
      const newLessonData = {
        title,
        difficulty,
        section,
      };
      
      const createdLesson = await contentService.createLesson(newLessonData, token);
      
      setSuccessMessage('Lección "' + createdLesson.title + '" creada exitosamente con ID: ' + createdLesson.id);
      
      // Limpiar formulario
      setTitle('');
      setSection('');
      setDifficulty(DIFFICULTY_OPTIONS[0].value);

    } catch (err) {
      console.error('Lesson creation error:', err);
      setError(err.message || 'Error al crear la lección. Verifique permisos.');
    }
  };

  return (
    <>
      {/* <Header /> */}
      <main className="p-8 max-w-3xl mx-auto pt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Crear Nueva Lección</h1>
        
        {successMessage && (
          <div className="mb-4 p-3 text-sm font-medium text-green-800 bg-green-100 rounded-lg" role="alert">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 text-sm font-medium text-red-800 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título de la Lección
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                Sección (Ej: Nivel 1, Vocabulario Básico)
              </label>
              <div className="mt-1">
                <input
                  id="section"
                  name="section"
                  type="text"
                  required
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                Dificultad
              </label>
              <div className="mt-1">
                <select
                  id="difficulty"
                  name="difficulty"
                  required
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {DIFFICULTY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                disabled={!title || !section || !token || successMessage}
              >
                Crear Lección
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateLessonForm;