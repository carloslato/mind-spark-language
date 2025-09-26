// frontend/src/services/api.ts

const AUTH_BASE_URL = 'http://localhost:3000/api/auth';
const MODEL_BASE_URL = 'http://localhost:3000/api/model';

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
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// --- Auth Endpoints ---

export const authService = {
  /**
   * Registro de Usuario (POST /sign-up/email)
   * @param data { name: string, email: string, password: string }
   */
  signUp: async (data: { name: string, email: string, password: string }) => {
    const response = await fetch(`${AUTH_BASE_URL}/sign-up/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response); // Devuelve UserAuthResponse o lanza error
  },

  /**
   * Inicio de Sesión (POST /sign-in/email)
   * @param data { email: string, password: string }
   */
  signIn: async (data: { email: string, password: string }) => {
    const response = await fetch(`${AUTH_BASE_URL}/sign-in/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response); // Devuelve UserSignInResponse o lanza error
  },

  /**
   * Cerrar Sesión (POST /sign-out)
   * @param token El token de sesión actual.
   */
  signOut: async (token: string) => {
    const response = await fetch(`${AUTH_BASE_URL}/sign-out`, {
      method: 'POST',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response); // Devuelve { success: boolean } o lanza error
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
      headers: getAuthHeaders(token),
    });
    return handleResponse(response); // Devuelve LessonSummary[] o lanza error
  },

  /**
   * Crear Lección (POST /lesson)
   * @param data { title: string, difficulty: 'EASY'|'MEDIUM'|'HARD', section: string }
   */
  createLesson: async (data: { title: string, difficulty: 'EASY'|'MEDIUM'|'HARD', section: string }, token: string) => {
    const response = await fetch(`${MODEL_BASE_URL}/lesson`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    return handleResponse(response); // Devuelve LessonSummary o lanza error
  },

  /**
   * Listar Ejercicios (GET /exercise)
   */
  listExercises: async (token: string | null) => {
    const response = await fetch(`${MODEL_BASE_URL}/exercise`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response); // Devuelve ExerciseSummary[] o lanza error
  },

  /**
   * Crear Ejercicio (POST /exercise)
   * @param data { type: 'TRANSLATION'|..., question: string, answer: string, lessonId: string }
   */
  createExercise: async (data: { type: 'TRANSLATION'|'FILL_IN_BLANKS'|'LISTENING', question: string, answer: string, lessonId: string }, token: string) => {
    const response = await fetch(`${MODEL_BASE_URL}/exercise`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
    });
    return handleResponse(response); // Devuelve UserAnswerSummary o lanza error
  }
};