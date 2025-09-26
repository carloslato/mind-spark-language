# Documentación de Requerimientos para el Backend - Aplicación de Aprendizaje de ingles

## 1. Introducción

Esta documentación define los requerimientos funcionales, modelos de datos y aspectos técnicos necesarios para desarrollar el backend de una aplicación de aprendizaje de ingles similar a Duolingo. El objetivo es proporcionar una guía clara para el desarrollo del sistema sin especificar tecnologías o librerías particulares.

## 2. Entidades Principales del Sistema

Basado en el análisis del frontend, las entidades principales del sistema son:

- **Usuario**: Representa a los estudiantes que utilizan la aplicación
- **Lección**: Contenido educativo organizado por niveles y temas
- **Ejercicio**: Actividades interactivas para practicar el idioma
- **Progreso**: Registro del avance del usuario en el aprendizaje
- **Logro**: Recompensas y reconocimientos por el desempeño del usuario

## 3. Modelos de Datos

### 3.1 Usuario

El modelo de usuario debe contener información básica del estudiante y su estado en la aplicación.

**Atributos:**
- ID único
- Nombre completo
- Correo electrónico
- Contraseña (almacenada de forma segura)
- Nivel actual (principiante, intermedio, avanzado)
- Puntos de experiencia (XP)
- Racha de días consecutivos de estudio
- Fecha de registro
- Preferencias de idioma


### 3.3 Lección

Contenido educativo organizado por niveles y temas específicos.

**Atributos:**
- ID único
- Título
- Descripción
- Nivel (principiante, intermedio, avanzado)
- Duración estimada (en minutos)
- Orden de secuencia
- Estado (bloqueada, desbloqueada, completada)
- Puntuación obtenida (estrellas: 0-3)
- ID del curso/idioma al que pertenece
- Contenido (puede ser texto, audio, video o combinación)

### 3.4 Ejercicio

Actividades interactivas para practicar el idioma.

**Atributos:**
- ID único
- Tipo (traducción, completar oraciones, opción múltiple, etc.)
- Enunciado/pregunta
- Respuesta correcta
- Opciones (para ejercicios de opción múltiple)
- Dificultad
- Puntuación máxima
- ID de la lección a la que pertenece

### 3.5 Progreso del Usuario

Registro detallado del avance del usuario en el aprendizaje.

**Atributos:**
- ID único
- ID del usuario
- ID de la lección
- Estado de completitud
- Puntuación obtenida
- Número de intentos
- Fecha de inicio
- Fecha de finalización
- Tiempo dedicado
- Puntuación por habilidad (vocabulario, gramática, pronunciación, comprensión)

### 3.6 Logro

Recompensas y reconocimientos por el desempeño del usuario.

**Atributos:**
- ID único
- Nombre
- Descripción
- Icono asociado
- Criterios para obtenerlo
- Estado (obtenido, pendiente)
- ID del usuario que lo obtuvo
- Fecha de obtención

### 3.7 Logro_usuario

Tabla para registrar los logros que ha obtenidoo cada usuario

**Atributos:**
- ID único autoincremental
- id usuario
- id logro

## 4. Requerimientos Funcionales

### 4.1 Gestión de Usuarios
- Registro de nuevos usuarios
- Autenticación segura (login/logout)
- Recuperación de contraseña
- Perfil de usuario con información personal y estadísticas
- Actualización de preferencias

### 4.2 Gestión de Cursos
- Listado de cursos/idiomas disponibles
- Detalle de cada curso con descripción y progreso
- Selección de curso principal
- Progreso general en el curso

### 4.3 Gestión de Lecciones
- Acceso a lecciones organizadas por niveles
- Progresión secuencial de lecciones (una lección desbloquea la siguiente)
- Estado de cada lección (no iniciada, en progreso, completada)
- Visualización del contenido de la lección
- Registro de completitud y puntuación

### 4.4 Gestión de Ejercicios
- Presentación de ejercicios interactivos
- Validación de respuestas en tiempo real
- Retroalimentación inmediata (correcto/incorrecto)
- Opción de repetir ejercicios
- Registro de intentos y puntuaciones
- Diversos tipos de ejercicios (traducción, completar espacios, opción múltiple, etc.)

### 4.5 Seguimiento de Progreso
- Dashboard con estadísticas generales
- Progreso por habilidades (vocabulario, gramática, pronunciación, comprensión)
- Racha de días consecutivos de estudio
- Tiempo total dedicado al aprendizaje
- Nivel actual y progreso hacia el siguiente nivel
- Historial de actividades recientes

### 4.6 Sistema de Logros
- Visualización de logros obtenidos y pendientes
- Notificación cuando se obtiene un nuevo logro
- Descripción de los criterios para obtener cada logro
- Colección de logros por usuario

### 4.7 API REST
- Endpoints para todas las operaciones CRUD
- Autenticación mediante tokens
- Respuestas en formato JSON
- Manejo adecuado de errores
- Filtros y búsquedas

### 5 Persistencia de Datos
- Base de datos sqlite
- Esquema bien definido con relaciones apropiadas

