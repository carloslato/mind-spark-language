import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const ProgressStats = () => {
  const { user } = useAuth();

  // Datos simulados ya que no hay API para estadísticas
  const mockStats = {
    lessonsCompleted: 5,
    exercisesAttempted: 42,
    accuracy: '85%',
  };

  return (
    <>
      <main className="p-8 max-w-4xl mx-auto pt-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-2">Estadísticas de Progreso</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <p className="text-lg text-gray-700">Bienvenido, <span className="font-semibold text-indigo-600">{user?.name || user?.email}</span>.</p>
            <p className="text-md text-gray-600">Aquí se mostrarán tus estadísticas de aprendizaje.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                
                <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow">
                    <p className="text-sm font-medium text-blue-600 uppercase">Lecciones Completadas</p>
                    <p className="text-3xl font-bold text-blue-800 mt-1">{mockStats.lessonsCompleted}</p>
                </div>

                <div className="p-5 bg-green-50 border-l-4 border-green-500 rounded-lg shadow">
                    <p className="text-sm font-medium text-green-600 uppercase">Ejercicios Intentados</p>
                    <p className="text-3xl font-bold text-green-800 mt-1">{mockStats.exercisesAttempted}</p>
                </div>

                <div className="p-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow">
                    <p className="text-sm font-medium text-yellow-600 uppercase">Precisión General</p>
                    <p className="text-3xl font-bold text-yellow-800 mt-1">{mockStats.accuracy}</p>
                </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="font-semibold text-gray-700">Próximos Pasos</h3>
                <p className="text-sm text-gray-500">Implementar la lógica para poblar estas estadísticas con datos reales del backend.</p>
            </div>
        </div>
      </main>
    </>
  );
};

export default ProgressStats;