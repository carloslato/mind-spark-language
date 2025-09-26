# Documentación de la API REST - Mind Spark Language

## Introducción
Esta documentación describe los endpoints disponibles en la API REST del backend de Mind Spark Language. Todos los endpoints devuelven respuestas en formato JSON y requieren autenticación mediante token JWT para las rutas protegidas.

## Autenticación
La autenticación se realiza mediante tokens JWT. Los endpoints de autenticación generan un token que debe incluirse en el header Authorization de las solicitudes protegidas.

### Login
- **Endpoint**: `POST /api/users/login`
- **Descripción**: Inicia sesión con credenciales de usuario
- **Body**:
```json
{
  "correo": "usuario@ejemplo.com",
  "contrasena": "contraseña"
}
```
- **Respuesta exitosa**:
```json
{
  "message": "Inicio de sesión exitoso",
  "token": "jwt-token",
  "user": {
    "id": 1,
    "nombre": "Nombre Usuario",
    "correo": "usuario@ejemplo.com",
    "nivel": "principiante",
    "xp": 0,
    "racha": 0
  }
}
```

## Usuarios

### Registrar usuario
- **Endpoint**: `POST /api/users/register`
- **Descripción**: Registra un nuevo usuario
- **Body**:
```json
{
  "nombre": "Nombre Usuario",
  "correo": "usuario@ejemplo.com",
  "contrasena": "contraseña"
}
```
- **Respuesta exitosa**: `201 Created`
- **Validaciones**:
  - Nombre: requerido, cadena no vacía
  - Correo: requerido, formato de email válido
  - Contraseña: requerida, mínimo 6 caracteres

### Obtener perfil
- **Endpoint**: `GET /api/users/profile/:id`
- **Descripción**: Obtiene el perfil de un usuario
- **Autenticación**: Requiere token JWT
- **Respuesta exitosa**:
```json
{
  "user": {
    "id": 1,
    "nombre": "Nombre Usuario",
    "correo": "usuario@ejemplo.com",
    "nivel": "principiante",
    "xp": 0,
    "racha": 0,
    "fecha_registro": "2025-09-25T10:30:00.000Z",
    "preferencias": null
  }
}
```

### Actualizar perfil
- **Endpoint**: `PUT /api/users/profile/:id`
- **Descripción**: Actualiza el perfil de un usuario
- **Autenticación**: Requiere token JWT
- **Body** (campos opcionales):
```json
{
  "nombre": "Nuevo Nombre",
  "correo": "nuevo@ejemplo.com",
  "contrasena": "nueva-contraseña",
  "nivel": "intermedio",
  "xp": 100,
  "racha": 5,
  "preferencias": "temas_preferidos"
}
```

### Eliminar usuario
- **Endpoint**: `DELETE /api/users/profile/:id`
- **Descripción**: Elimina un usuario
- **Autenticación**: Requiere token JWT
- **Respuesta exitosa**:
```json
{
  "message": "Usuario eliminado correctamente"
}
```

## Lecciones

### Crear lección
- **Endpoint**: `POST /api/lessons/`
- **Descripción**: Crea una nueva lección
- **Autenticación**: Requiere token JWT
- **Body**:
```json
{
  "titulo": "Introducción a los verbos",
  "descripcion": "Aprende los verbos básicos en inglés",
  "nivel": "principiante",
  "duracion": 15,
  "orden_secuencia": 1,
  "estado": "desbloqueada",
  "puntuacion": 3,
  "id_idioma": 1,
  "contenido": "Contenido de la lección"
}
```
- **Validaciones**:
  - Título: requerido, cadena no vacía
  - Nivel: requerido, valores permitidos: principiante, intermedio, avanzado
  - Duración: número positivo
  - Orden secuencia: número no negativo

### Obtener todas las lecciones
- **Endpoint**: `GET /api/lessons/`
- **Descripción**: Obtiene todas las lecciones ordenadas por secuencia
- **Respuesta exitosa**:
```json
{
  "lecciones": [
    {
      "id": 1,
      "titulo": "Introducción a los verbos",
      "descripcion": "Aprende los verbos básicos en inglés",
      "nivel": "principiante",
      "duracion": 15,
      "orden_secuencia": 1,
      "estado": "desbloqueada",
      "puntuacion": 3,
      "id_idioma": 1,
      "contenido": "Contenido de la lección"
    }
  ]
}
```

### Obtener lección por ID
- **Endpoint**: `GET /api/lessons/:id`
- **Descripción**: Obtiene una lección específica por ID
- **Respuesta exitosa**:
```json
{
  "leccion": {
    "id": 1,
    "titulo": "Introducción a los verbos",
    "descripcion": "Aprende los verbos básicos en inglés",
    "nivel": "principiante",
    "duracion": 15,
    "orden_secuencia": 1,
    "estado": "desbloqueada",
    "puntuacion": 3,
    "id_idioma": 1,
    "contenido": "Contenido de la lección"
  }
}
```

### Actualizar lección
- **Endpoint**: `PUT /api/lessons/:id`
- **Descripción**: Actualiza una lección existente
- **Autenticación**: Requiere token JWT
- **Body** (campos opcionales):
```json
{
  "titulo": "Nuevo título",
  "descripcion": "Nueva descripción",
  "nivel": "intermedio",
  "duracion": 20,
  "orden_secuencia": 2,
  "estado": "completada",
  "puntuacion": 2,
  "id_idioma": 1,
  "contenido": "Nuevo contenido"
}
```

### Eliminar lección
- **Endpoint**: `DELETE /api/lessons/:id`
- **Descripción**: Elimina una lección
- **Autenticación**: Requiere token JWT
- **Respuesta exitosa**:
```json
{
  "message": "Lección eliminada correctamente"
}
```

## Ejercicios

### Crear ejercicio
- **Endpoint**: `POST /api/exercises/`
- **Descripción**: Crea un nuevo ejercicio
- **Autenticación**: Requiere token JWT
- **Body**:
```json
{
  "tipo": "traducción",
  "enunciado": "Traduce: 'Hello, how are you?'",
  "respuesta_correcta": "Hola, ¿cómo estás?",
  "opciones": ["Hola, ¿cómo estás?", "Adiós, ¿cómo estás?", "Hola, ¿qué haces?"],
  "dificultad": "fácil",
  "puntuacion_maxima": 10,
  "id_leccion": 1
}
```
- **Validaciones**:
  - Tipo: requerido, cadena no vacía
  - Enunciado: requerido, cadena no vacía
  - Respuesta correcta: requerida, cadena no vacía
  - Opciones: array con al menos un elemento (opcional)
  - Dificultad: valores permitidos: fácil, media, difícil (opcional)
  - Puntuación máxima: número positivo (opcional, por defecto 10)
  - ID lección: requerido, número positivo

### Obtener ejercicios por lección
- **Endpoint**: `GET /api/exercises/lesson/:id`
- **Descripción**: Obtiene todos los ejercicios de una lección específica
- **Respuesta exitosa**:
```json
{
  "ejercicios": [
    {
      "id": 1,
      "tipo": "traducción",
      "enunciado": "Traduce: 'Hello, how are you?'",
      "respuesta_correcta": "Hola, ¿cómo estás?",
      "opciones": ["Hola, ¿cómo estás?", "Adiós, ¿cómo estás?", "Hola, ¿qué haces?"],
      "dificultad": "fácil",
      "puntuacion_maxima": 10,
      "id_leccion": 1
    }
  ]
}
```

### Obtener ejercicio por ID
- **Endpoint**: `GET /api/exercises/:id`
- **Descripción**: Obtiene un ejercicio específico por ID
- **Respuesta exitosa**:
```json
{
  "ejercicio": {
    "id": 1,
    "tipo": "traducción",
    "enunciado": "Traduce: 'Hello, how are you?'",
    "respuesta_correcta": "Hola, ¿cómo estás?",
    "opciones": ["Hola, ¿cómo estás?", "Adiós, ¿cómo estás?", "Hola, ¿qué haces?"],
    "dificultad": "fácil",
    "puntuacion_maxima": 10,
    "id_leccion": 1
  }
}
```

### Actualizar ejercicio
- **Endpoint**: `PUT /api/exercises/:id`
- **Descripción**: Actualiza un ejercicio existente
- **Autenticación**: Requiere token JWT
- **Body** (campos opcionales):
```json
{
  "tipo": "opción múltiple",
  "enunciado": "Nueva pregunta",
  "respuesta_correcta": "Respuesta correcta",
  "opciones": ["Opción 1", "Opción 2", "Opción 3"],
  "dificultad": "media",
  "puntuacion_maxima": 15,
  "id_leccion": 2
}
```

### Eliminar ejercicio
- **Endpoint**: `DELETE /api/exercises/:id`
- **Descripción**: Elimina un ejercicio
- **Autenticación**: Requiere token JWT
- **Respuesta exitosa**:
```json
{
  "message": "Ejercicio eliminado correctamente"
}
```

## Progreso

### Crear registro de progreso
- **Endpoint**: `POST /api/progress/`
- **Descripción**: Crea un nuevo registro de progreso para un usuario en una lección
- **Autenticación**: Requiere token JWT
- **Body**:
```json
{
  "id_usuario": 1,
  "id_leccion": 1,
  "estado_completitud": "completada",
  "puntuacion_obtenida": 3,
  "numero_intentos": 1,
  "fecha_inicio": "2025-09-25T10:30:00.000Z",
  "fecha_finalizacion": "2025-09-25T10:45:00.000Z",
  "tiempo_dedicado": 900,
  "puntuacion_vocabulario": 3,
  "puntuacion_gramatica": 2,
  "puntuacion_pronunciacion": 1,
  "puntuacion_comprension": 3
}
```
- **Validaciones**:
  - ID usuario: requerido, número positivo
  - ID lección: requerido, número positivo
  - Estado completitud: valores permitidos: no_iniciada, en_progreso, completada (opcional)
  - Puntuación obtenida: número entre 0 y 3 (opcional)
  - Número intentos: número no negativo (opcional)
  - Puntuaciones por habilidad: números entre 0 y 3 (opcional)

### Obtener progreso por usuario y lección
- **Endpoint**: `GET /api/progress/user/:usuarioId/lesson/:leccionId`
- **Descripción**: Obtiene el progreso de un usuario en una lección específica
- **Respuesta exitosa**:
```json
{
  "progreso": {
    "id": 1,
    "id_usuario": 1,
    "id_leccion": 1,
    "estado_completitud": "completada",
    "puntuacion_obtenida": 3,
    "numero_intentos": 1,
    "fecha_inicio": "2025-09-25T10:30:00.000Z",
    "fecha_finalizacion": "2025-09-25T10:45:00.000Z",
    "tiempo_dedicado": 900,
    "puntuacion_vocabulario": 3,
    "puntuacion_gramatica": 2,
    "puntuacion_pronunciacion": 1,
    "puntuacion_comprension": 3
  }
}
```

### Obtener progreso de usuario
- **Endpoint**: `GET /api/progress/user/:usuarioId`
- **Descripción**: Obtiene todo el progreso de un usuario
- **Respuesta exitosa**:
```json
{
  "progresos": [
    {
      "id": 1,
      "id_usuario": 1,
      "id_leccion": 1,
      "estado_completitud": "completada",
      "puntuacion_obtenida": 3,
      "numero_intentos": 1,
      "fecha_inicio": "2025-09-25T10:30:00.000Z",
      "fecha_finalizacion": "2025-09-25T10:45:00.000Z",
      "tiempo_dedicado": 900,
      "puntuacion_vocabulario": 3,
      "puntuacion_gramatica": 2,
      "puntuacion_pronunciacion": 1,
      "puntuacion_comprension": 3
    }
  ]
}
```

### Actualizar progreso
- **Endpoint**: `PUT /api/progress/:id`
- **Descripción**: Actualiza un registro de progreso existente
- **Autenticación**: Requiere token JWT
- **Body** (campos opcionales):
```json
{
  "id_usuario": 1,
  "id_leccion": 1,
  "estado_completitud": "en_progreso",
  "puntuacion_obtenida": 2,
  "numero_intentos": 2,
  "fecha_inicio": "2025-09-25T10:30:00.000Z",
  "fecha_finalizacion": "2025-09-25T10:50:00.000Z",
  "tiempo_dedicado": 1200,
  "puntuacion_vocabulario": 2,
  "puntuacion_gramatica": 2,
  "puntuacion_pronunciacion": 1,
  "puntuacion_comprension": 2
}
```

### Eliminar progreso
- **Endpoint**: `DELETE /api/progress/:id`
- **Descripción**: Elimina un registro de progreso
- **Autenticación**: Requiere token JWT
- **Respuesta exitosa**:
```json
{
  "message": "Registro de progreso eliminado correctamente"
}
```

## Logros

### Crear logro
- **Endpoint**: `POST /api/achievements/`
- **Descripción**: Crea un nuevo logro
- **Autenticación**: Requiere token JWT
- **Body**:
```json
{
  "nombre": "Primer Paso",
  "descripcion": "Completa tu primera lección",
  "icono": "icon-url",
  "criterios": "completar_leccion_1",
  "estado": "pendiente"
}
```
- **Validaciones**:
  - Nombre: requerido, cadena no vacía
  - Criterios: requeridos, cadena no vacía
  - Descripción: cadena (opcional)
  - Icono: cadena (opcional)
  - Estado: valores permitidos: pendiente, obtenido (opcional, por defecto pendiente)

### Obtener todos los logros
- **Endpoint**: `GET /api/achievements/`
- **Descripción**: Obtiene todos los logros disponibles
- **Respuesta exitosa**:
```json
{
  "logros": [
    {
      "id": 1,
      "nombre": "Primer Paso",
      "descripcion": "Completa tu primera lección",
      "icono": "icon-url",
      "criterios": "completar_leccion_1",
      "estado": "pendiente"
    }
  ]
}
```

### Obtener logro por ID
- **Endpoint**: `GET /api/achievements/:id`
- **Descripción**: Obtiene un logro específico por ID
- **Respuesta exitosa**:
```json
{
  "logro": {
    "id": 1,
    "nombre": "Primer Paso",
    "descripcion": "Completa tu primera lección",
    "icono": "icon-url",
    "criterios": "completar_leccion_1",
    "estado": "pendiente"
  }
}
```

### Actualizar logro
- **Endpoint**: `PUT /api/achievements/:id`
- **Descripción**: Actualiza un logro existente
- **Autenticación**: Requiere token JWT
- **Body** (campos opcionales):
```json
{
  "nombre": "Nuevo Nombre",
  "descripcion": "Nueva descripción",
  "icono": "nuevo-icon-url",
  "criterios": "nuevos_criterios",
  "estado": "obtenido"
}
```

### Eliminar logro
- **Endpoint**: `DELETE /api/achievements/:id`
- **Descripción**: Elimina un logro
- **Autenticación**: Requiere token JWT
- **Respuesta exitosa**:
```json
{
  "message": "Logro eliminado correctamente"
}
```

### Asignar logro a usuario
- **Endpoint**: `POST /api/achievements/assign`
- **Descripción**: Asigna un logro a un usuario
- **Autenticación**: Requiere token JWT
- **Body**:
```json
{
  "id_usuario": 1,
  "id_logro": 1,
  "fecha_obtencion": "2025-09-25T10:30:00.000Z"
}
```

### Obtener logros de usuario
- **Endpoint**: `GET /api/achievements/user/:usuarioId`
- **Descripción**: Obtiene todos los logros obtenidos por un usuario
- **Respuesta exitosa**:
```json
{
  "logros": [
    {
      "id": 1,
      "id_usuario": 1,
      "id_logro": 1,
      "fecha_obtencion": "2025-09-25T10:30:00.000Z",
      "nombre": "Primer Paso",
      "descripcion": "Completa tu primera lección",
      "icono": "icon-url",
      "criterios": "completar_leccion_1"
    }
  ]
}
```

## Manejo de Errores
Todos los endpoints pueden devolver los siguientes códigos de error:

- `400 Bad Request`: Datos de entrada inválidos o faltantes
- `401 Unauthorized`: Token JWT no proporcionado o inválido
- `403 Forbidden`: Token JWT expirado o sin permisos suficientes
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error interno del servidor

## Consideraciones
- Todos los endpoints de escritura (POST, PUT, DELETE) requieren autenticación JWT
- Los IDs en las URLs deben ser números válidos
- Las fechas se manejan en formato ISO 8601
- La base de datos utiliza SQLite con el archivo `backend/database/mind-spark.db`