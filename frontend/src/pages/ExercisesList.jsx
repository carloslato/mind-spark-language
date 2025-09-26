import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { contentService } from '../services/api';
import Header from '../components/Header';

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      setError(null);
      try {
        // El token es necesario para acceder a los recursos protegidos
        const data = await contentService.listExercises(token);
        setExercises(data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError(err.message || "No se pudieron cargar los ejercicios.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
        fetchExercises();
    }
  }, [token]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-8 text-center pt-20">
          <p className="text-xl text-indigo-600">Cargando ejercicios...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="p-8 text-center bg-red-100 border border-red-400 text-red-700 rounded-lg m-4 pt-20">
          <p>Error al cargar ejercicios: {error}</p>
          <p>Asegúrate de que el backend esté corriendo y el token sea válido.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="p-8 max-w-5xl mx-auto pt-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-2">Lista de Ejercicios</h1>
        
        {exercises.length === 0 ? (
          <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-lg text-gray-500">No hay ejercicios disponibles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <div 
                key={exercise.id} 
                className="bg-white p-5 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-200"
              >
                <p className="text-xs font-medium text-gray-500 mb-1">Lección ID: {exercise.lessonId}</p>
                <h3 className="text-lg font-semibold text-gray-800">{exercise.question.substring(0, 50)}{exercise.question.length > 50 ? '...' : ''}</h3>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
                  Tipo: {exercise.type}
                </span>
                <button 
                  className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  onClick={() => alert(`Responder Ejercicio ID: ${exercise.id}`)}
                >
                  Responder / Ver Detalles
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default ExercisesList;