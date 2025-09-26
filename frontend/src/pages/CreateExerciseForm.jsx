import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { contentService } from '../services/api';
import Header from '../components/Header';

const EXERCISE_TYPE_OPTIONS = [
  { value: 'TRANSLATION', label: 'Traducción' },
  { value: 'FILL_IN_BLANKS', label: 'Completar Oraciones' },
  { value: 'LISTENING', label: 'Escucha Activa' },
];

const CreateExerciseForm = () => {
  const [type, setType] = useState(EXERCISE_TYPE_OPTIONS[0].value);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [lessonId, setLessonId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!token) {
        setError("No hay token de autenticación. Por favor, inicie sesión de nuevo.");
        return;
    }

    if (!question || !answer || !lessonId || !type) {
      setError('Todos los campos (Tipo, Pregunta, Respuesta, Lesson ID) son obligatorios.');
      return;
    }

    try {
      const newExerciseData = {
        type,
        question,
        answer,
        lessonId,
      };
      
      const createdExercise = await contentService.createExercise(newExerciseData, token);
      
      setSuccessMessage('Ejercicio (' + createdExercise.type + ') creado exitosamente con ID: ' + createdExercise.id + ' para la Lección ID: ' + createdExercise.lessonId);
      
      // Limpiar formulario
      setQuestion('');
      setAnswer('');
      setLessonId('');
      setType(EXERCISE_TYPE_OPTIONS[0].value);

    } catch (err) {
      console.error('Exercise creation error:', err);
      setError(err.message || 'Error al crear el ejercicio. Verifique el Lesson ID y permisos.');
    }
  };

  return (
    <>
      <Header />
      <main className="p-8 max-w-3xl mx-auto pt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Crear Nuevo Ejercicio</h1>
        
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
              <label htmlFor="lessonId" className="block text-sm font-medium text-gray-700">
                ID de la Lección Asociada
              </label>
              <div className="mt-1">
                <input
                  id="lessonId"
                  name="lessonId"
                  type="text"
                  required
                  value={lessonId}
                  onChange={(e) => setLessonId(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Tipo de Ejercicio
              </label>
              <div className="mt-1">
                <select
                  id="type"
                  name="type"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {EXERCISE_TYPE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                Pregunta / Enunciado
              </label>
              <div className="mt-1">
                <textarea
                  id="question"
                  name="question"
                  rows="3"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                Respuesta Correcta
              </label>
              <div className="mt-1">
                <input
                  id="answer"
                  name="answer"
                  type="text"
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                disabled={!lessonId || !question || !answer || !token || successMessage}
              >
                Crear Ejercicio
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateExerciseForm;