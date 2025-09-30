import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorStatus, setErrorStatus] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const { register, isAuthenticated } = useAuth();

  // Si ya está autenticado, podríamos redirigir, pero por ahora solo mostramos un mensaje.
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Ya Estás Registrado</h2>
          <p className="text-center text-gray-600">Ya has iniciado sesión. Navega a las lecciones.</p>
        </div>
      </div>
    );
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrorStatus('');
    // setSuccessMessage('');

    if (!name || !email || !password) {
      setErrorStatus('Todos los campos son obligatorios.');
      return;
    }

    const result = await register(name, email, password);

    if (result.success) {
      setSuccessMessage('Registro exitoso. Ahora puedes iniciar sesión.');
      // Limpiar formulario después de éxito
      setName('');
      setEmail('');
      setPassword('');
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setErrorStatus(result.message || 'Error desconocido durante el registro.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      {/* <div>
        <p>DEBUG errorStatus: {String(errorStatus)}</p>
        <p>DEBUG successMessage: {String(successMessage)}</p>
      </div> */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Registrarse
        </h2>
        
        {successMessage && (
          <div className="mb-4 p-3 text-sm font-medium text-green-800 bg-green-100 rounded-lg" role="alert">
            {successMessage}
          </div>
        )}

        {errorStatus && (
          <div className="mb-4 p-3 text-sm font-medium text-red-800 bg-red-100 rounded-lg" role="alert">
            {errorStatus}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={!name || !email || !password}
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;