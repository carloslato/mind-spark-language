import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LessonsList from './pages/LessonsList';
import CreateLessonForm from './pages/CreateLessonForm';
import ExerciseAnswerPage from './pages/ExerciseAnswerPage';
import ProgressStats from './pages/ProgressStats'; // Nuevo import

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <p className="text-xl text-indigo-600">Cargando estado de autenticación...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Componente para proteger rutas de administración (asumiendo que solo usuarios logueados pueden crear contenido)
const AdminRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    // Nota: En una app real, se verificaría el rol del usuario aquí.
    return children;
}

// Componente Wrapper para manejar parámetros de ruta en componentes funcionales
const ExerciseAnswerWrapper = () => {
    const { id } = useParams();
    return (
        <ProtectedRoute>
            <ExerciseAnswerPage exerciseId={id} />
        </ProtectedRoute>
    );
}


function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rutas protegidas para el alumno/usuario general */}
        <Route
          path="/lessons"
          element={
            <ProtectedRoute>
              <LessonsList />
            </ProtectedRoute>
          }
        />
        
        {/* Ruta para responder ejercicios */}
        <Route
          path="/exercise/:id"
          element={<ExerciseAnswerWrapper />}
        />

        {/* Ruta para estadísticas de progreso */}
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <ProgressStats />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas para administración (Creación de contenido) */}
        <Route
          path="/admin/create-lesson"
          element={
            <AdminRoute>
              <CreateLessonForm />
            </AdminRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/lessons" replace />} />
        
        {/* Ruta 404 (Opcional, pero buena práctica) */}
        <Route path="*" element={<div><h1>404 - Página no encontrada</h1><Navigate to="/lessons" replace /></div>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
 
export default App;
