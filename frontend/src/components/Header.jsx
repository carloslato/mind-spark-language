import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      // Redirección implícita: AuthContext limpia el estado, y el router en App.jsx
      // redirigirá al usuario a /login automáticamente.
      console.log("Sesión cerrada exitosamente.");
    } else {
      console.error("Fallo al cerrar sesión:", result.message);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Título */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-indigo-600">MindSpark</span>
          </div>

          {/* Navegación y Estado de Usuario */}
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700 hidden sm:inline">
                  Hola, {user?.name || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                {/* Enrutamiento real se manejará en App.jsx, pero aquí se muestran enlaces si no estamos en las páginas de auth */}
                <a href="/login" className="text-gray-600 hover:text-indigo-600 text-sm">Login</a>
                <a href="/register" className="text-gray-600 hover:text-indigo-600 text-sm">Registro</a>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;