import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { contentService } from '../services/api';
import Header from '../components/Header';

const LessonsList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        // El token es necesario para acceder a los recursos protegidos
        const data = await contentService.listLessons(token);
        setLessons(data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
        setError(err.message || "No se pudieron cargar las lecciones.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
        fetchLessons();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl text-indigo-600">Cargando lecciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-100 border border-red-400 text-red-700 rounded-lg m-4">
        <p>Error al cargar lecciones: {error}</p>
        <p>Asegúrate de que el backend esté corriendo y el token sea válido.</p>
      </div>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <main className="p-8 max-w-4xl mx-auto pt-20"> {/* Añadido padding superior para el header fijo */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Lecciones Disponibles</h1>

      {lessons.length === 0 ? (
        <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-lg text-gray-500">Aún no hay lecciones creadas.</p>
          {/* Si el usuario es admin, aquí podría haber un enlace para crear una */}
        </div>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id} 
              className="bg-white p-5 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-indigo-700">{lesson.attributes.title}</h3>
              {/* <p className="text-sm text-gray-500 mt-1">Sección: {lesson.attributes.section}</p> */}
              <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                Sección: {lesson.attributes.section}
              </span>
              {/* Enlace para ver ejercicios o empezar lección */}
              <button
                className="mt-3 ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                onClick={() => alert(`Ir a ejercicios de la lección: ${lesson.title}`)}
              >
                Ver Lección
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
    </>
  );
};

export default LessonsList;