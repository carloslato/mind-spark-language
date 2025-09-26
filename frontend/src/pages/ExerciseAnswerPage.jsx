import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { contentService, studentActivityService } from '../services/api';
import Header from '../components/Header';

// Nota: En una aplicación real, primero cargaríamos el ejercicio específico usando su ID
// para mostrar la pregunta correcta (e.g., contentService.getExercise(exerciseId, token)).
// Aquí, nos enfocamos en la funcionalidad de respuesta POST.

const ExerciseAnswerPage = ({ exerciseId }) => {
  const [answerContent, setAnswerContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  
  const { token, user } = useAuth();

  // Placeholder para mostrar qué ejercicio se está respondiendo
  const [exerciseDetails, setExerciseDetails] = useState({ question: 'Cargando pregunta...', type: 'N/A' });

  // Simulación de carga de detalles del ejercicio (Paso 10.5)
  useEffect(() => {
    // En un escenario real, llamaríamos a un endpoint GET /exercise/:id
    // Por ahora, solo mostramos un placeholder basado en el ID recibido.
    if (exerciseId) {
        // Si tuviéramos un servicio para obtener un ejercicio específico:
        // const fetchExercise = async () => { ... };
        // fetchExercise();
        setExerciseDetails({
            question: `Respondiendo al Ejercicio ID: ${exerciseId}. (Pregunta real se cargaría aquí)`,
            type: 'Traducción/Completar' // Placeholder
        });
    }
  }, [exerciseId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!token || !user?.id) {
        setError("Usuario no autenticado o sin ID de usuario.");
        return;
    }

    if (!answerContent) {
      setError('La respuesta no puede estar vacía.');
      return;
    }

    try {
      setLoadingSubmit(true);
      
      const submissionData = {
        content: answerContent,
        exerciseId: exerciseId,
        userId: user.id,
      };
      
      const result = await studentActivityService.submitAnswer(submissionData, token);
      
      setSuccessMessage('Respuesta enviada exitosamente. ID de respuesta: ' + result.id);
      setAnswerContent(''); // Limpiar campo de respuesta

    } catch (err) {
      console.error('Answer submission error:', err);
      setError(err.message || 'Error al enviar la respuesta.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <Header />
      <main className="p-8 max-w-3xl mx-auto pt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Responder Ejercicio</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <p className="text-sm font-medium text-indigo-600 mb-2">Tipo: {exerciseDetails.type}</p>
            <p className="text-xl font-semibold text-gray-900 mb-4">{exerciseDetails.question}</p>
            
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

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="answerContent" className="block text-sm font-medium text-gray-700">
                        Tu Respuesta
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="answerContent"
                            name="answerContent"
                            rows="4"
                            required
                            value={answerContent}
                            onChange={(e) => setAnswerContent(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Escribe tu respuesta aquí..."
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        disabled={loadingSubmit || !answerContent}
                    >
                        {loadingSubmit ? 'Enviando...' : 'Enviar Respuesta'}
                    </button>
                </div>
            </form>
        </div>
      </main>
    </>
  );
};

export default ExerciseAnswerPage;