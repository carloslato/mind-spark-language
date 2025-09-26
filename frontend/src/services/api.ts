// frontend/src/services/api.ts
import { createAuthClient } from "better-auth/react"
const { useSession } = createAuthClient() 

const HOST_BASE = 'http://localhost:3000'
const AUTH_BASE_URL = `${HOST_BASE}/api/auth`;
const MODEL_BASE_URL = `${HOST_BASE}/api/model`;

export const authClient = createAuthClient({
    baseURL: HOST_BASE // The base URL of your auth server
})

/**
 * Función auxiliar para manejar la respuesta de la API y extraer datos o errores.
 * @param response La respuesta del fetch.
 * @returns El JSON de la respuesta si es exitosa.
 * @throws Error si la respuesta no es OK.
 */
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.json();
    } catch (e) {
      errorBody = { description: `HTTP error! status: ${response.status}` };
    }
    // Intentamos usar la descripción del error si existe en el cuerpo JSON (como en OpenAPI)
    const errorMessage = errorBody.description || errorBody.message || `Error ${response.status}`;
    throw new Error(errorMessage);
  }
  // Manejar el caso de 204 No Content si fuera necesario, pero aquí asumimos JSON
  if (response.status === 204) return null;
  return response.json();
};

/**
 * Función auxiliar para obtener headers con token de autorización.
 * @param token El token JWT.
 * @returns Objeto de headers.
 */
const getAuthHeaders = (token: string | null) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  // if (token) {
  //   headers['Authorization'] = `Bearer ${token}`;
  // }
  return headers;
};

// --- Auth Endpoints ---

export const authService = {
  /**
   * Registro de Usuario (POST /sign-up/email)
   * @param data { name: string, email: string, password: string }
   */
  signUp: async (signUpData: { name: string, email: string, password: string }) => {
    const { data, error } = await authClient.signUp.email({
      name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password
    })
    return data; // Devuelve UserAuthResponse o lanza error
  },

  /**
   * Inicio de Sesión (POST /sign-in/email)
   * @param data { email: string, password: string }
   */
  signIn: async (sigInData: { email: string, password: string }) => {
    const { data, error } = await authClient.signIn.email({
        email: sigInData.email,
        password: sigInData.password
    })
    return data; // Devuelve UserSignInResponse o lanza error
  },

  /**
   * Cerrar Sesión (POST /sign-out)
   * @param token El token de sesión actual.
   */
  signOut: async (token: string) => {
    const { data, error } = await authClient.signOut();
    return data; // Devuelve { success: boolean } o lanza error
  }
};

// --- Content Management Endpoints ---

export const contentService = {
  /**
   * Listar Lecciones (GET /lesson)
   */
  listLessons: async (token: string | null) => {
    const response = await fetch(`${MODEL_BASE_URL}/lesson`, {
      method: 'GET',
      credentials: "include"
      // headers: getAuthHeaders(token),
    });
    const result = await handleResponse(response); // Obtiene la respuesta completa
    return result.data; // Devuelve solo el array de lecciones
  },

  /**
   * Crear Lección (POST /lesson)
   * @param data { title: string, difficulty: 'EASY'|'MEDIUM'|'HARD', section: string }
   */
  createLesson: async (data: { title: string, difficulty: 'EASY'|'MEDIUM'|'HARD', section: string }, token: string) => {
    const response = await fetch(`${MODEL_BASE_URL}/lesson`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      credentials: "include",
      body: JSON.stringify({
        data: {
          type: "lesson",
          attributes: data
        }
      }),
    });
    return handleResponse(response); // Devuelve LessonSummary o lanza error
  },

  /**
   * Listar Ejercicios (GET /exercise)
   */
  listExercises: async (token: string | null) => {
    const response = await fetch(`${MODEL_BASE_URL}/exercise`, {
      method: 'GET',
      credentials: "include",
      headers: getAuthHeaders(token),
    });
    const result = await handleResponse(response); // Obtiene la respuesta completa
    return result.data; // Devuelve solo el array de ejercicios
  },

  /**
   * Crear Ejercicio (POST /exercise)
   * @param data { type: 'TRANSLATION'|..., question: string, answer: string, lessonId: string }
   */
  createExercise: async (data: { type: 'TRANSLATION'|'FILL_IN_BLANKS'|'LISTENING', question: string, answer: string, lessonId: string }, token: string) => {
    const response = await fetch(`${MODEL_BASE_URL}/exercise`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      credentials: "include",
      body: JSON.stringify({
        data: {
          type: "exercise",
          attributes: data
        }
      }),
    });
    return handleResponse(response); // Devuelve ExerciseSummary o lanza error
  }
};

// --- Student Activity Endpoints ---

export const studentActivityService = {
  /**
   * Responder Ejercicio (POST /userAnswer)
   * @param data { content: string, exerciseId: string, userId: string }
   */
  submitAnswer: async (data: { content: string, exerciseId: string, userId: string }, token: string) => {
    const response = await fetch(`${MODEL_BASE_URL}/userAnswer`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      credentials: "include",
      body: JSON.stringify({
        data: {
          type: "userAnswer",
          attributes: data
        }
      }),
    });
    return handleResponse(response); // Devuelve UserAnswerSummary o lanza error
  }
};