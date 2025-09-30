import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar estado inicial desde localStorage al montar
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user data:", e);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Guardar token y usuario cada vez que cambian
  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [token, user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.signIn({ email, password });
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Error de red o servidor' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data, error} = await authService.signUp({ name, email, password });
      // Si el registro es exitoso, a menudo se devuelve el token y el usuario (como en UserAuthResponse)
      
      if (!error) {
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        if (error.status === 422) {
          return { success: false, message: 'El correo ya esta registrado en el sitio web' }
        }
        return { success: false, message: error.message || 'Error desconocido durante el registro' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.message || 'Error de red o servidor' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Se asume que el token debe enviarse en los headers para un logout efectivo
      if (!token) {
          setUser(null);
          setToken(null);
          return { success: true };
      }
      
      await authService.signOut();
      
      // Si la respuesta es 200, limpiamos localmente
      setUser(null);
      setToken(null);
      return { success: true };

    } catch (error) {
      console.error('Logout error:', error);
      // Aún limpiamos localmente si hay un error de red, ya que el estado local es la fuente de verdad para el frontend
      setUser(null);
      setToken(null);
      return { success: false, message: 'Error al cerrar sesión, pero el estado local ha sido limpiado.' };
    } finally {
      setLoading(false);
    }
  };

  const contextValue = useMemo(() => ({
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  }), [user, token, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70">
          <p className="text-lg font-semibold text-indigo-600">Cargando...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};