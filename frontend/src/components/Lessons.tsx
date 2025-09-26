import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Lock, CheckCircle, Play, Clock, Star } from "lucide-react";

const Lessons = () => {
  const [selectedLevel, setSelectedLevel] = useState("beginner");

  const levels = [
    { id: "beginner", name: "Principiante", color: "bg-success", lessons: 12, completed: 8 },
    { id: "intermediate", name: "Intermedio", color: "bg-secondary", lessons: 16, completed: 5 },
    { id: "advanced", name: "Avanzado", color: "bg-accent", lessons: 20, completed: 0 },
  ];

  const lessonsData = {
    beginner: [
      { id: 1, title: "Saludos y Presentaciones", description: "Aprende a saludarte y presentarte en inglés", duration: 15, completed: true, stars: 3 },
      { id: 2, title: "Alfabeto y Números", description: "Domina la pronunciación del alfabeto y números básicos", duration: 20, completed: true, stars: 3 },
      { id: 3, title: "Vocabulario Familiar", description: "Palabras para describir a tu familia", duration: 18, completed: true, stars: 2 },
      { id: 4, title: "Colores y Formas", description: "Aprende los colores básicos y formas geométricas", duration: 12, completed: true, stars: 3 },
      { id: 5, title: "Días y Meses", description: "Vocabulario sobre tiempo: días, semanas, meses", duration: 16, completed: true, stars: 3 },
      { id: 6, title: "Presente Simple", description: "Conjugación básica del presente simple", duration: 25, completed: true, stars: 2 },
      { id: 7, title: "Artículos (a, an, the)", description: "Uso correcto de los artículos en inglés", duration: 14, completed: true, stars: 3 },
      { id: 8, title: "Pronombres Personales", description: "I, you, he, she, it, we, they", duration: 12, completed: true, stars: 3 },
      { id: 9, title: "Comida y Bebidas", description: "Vocabulario esencial para restaurantes", duration: 20, completed: false, stars: 0 },
      { id: 10, title: "Ropa y Accesorios", description: "Describe tu vestimenta en inglés", duration: 18, completed: false, stars: 0 },
    ],
    intermediate: [
      { id: 1, title: "Pasado Simple", description: "Verbos regulares e irregulares en pasado", duration: 30, completed: true, stars: 3 },
      { id: 2, title: "Futuro con Will/Going to", description: "Expresar planes y predicciones futuras", duration: 25, completed: true, stars: 2 },
      { id: 3, title: "Presente Perfecto", description: "Have/Has + participio pasado", duration: 35, completed: true, stars: 3 },
      { id: 4, title: "Comparativos y Superlativos", description: "Bigger, biggest, more beautiful, most beautiful", duration: 22, completed: true, stars: 2 },
      { id: 5, title: "Preposiciones de Lugar", description: "In, on, at, under, between, etc.", duration: 18, completed: true, stars: 3 },
      { id: 6, title: "Condicionales Tipo 1", description: "If + presente simple, will + infinitivo", duration: 28, completed: false, stars: 0 },
    ],
    advanced: [
      { id: 1, title: "Passive Voice", description: "Voz pasiva en diferentes tiempos verbales", duration: 40, completed: false, stars: 0 },
      { id: 2, title: "Reported Speech", description: "Discurso indirecto y cambios de tiempo", duration: 35, completed: false, stars: 0 },
      { id: 3, title: "Subjunctive Mood", description: "Modo subjuntivo en inglés", duration: 45, completed: false, stars: 0 },
    ]
  };

  const currentLessons = lessonsData[selectedLevel as keyof typeof lessonsData] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Lecciones por Nivel</h2>
        <p className="text-muted-foreground text-lg">
          Selecciona tu nivel y comienza a aprender paso a paso
        </p>
      </div>

      {/* Level Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {levels.map((level) => (
          <Card 
            key={level.id} 
            className={`cursor-pointer border-2 transition-all duration-300 ${
              selectedLevel === level.id 
                ? 'border-primary shadow-success scale-105' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedLevel(level.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{level.name}</span>
                <div className={`w-4 h-4 rounded-full ${level.color}`} />
              </CardTitle>
              <CardDescription>
                {level.completed}/{level.lessons} lecciones completadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(level.completed / level.lessons) * 100} 
                className="h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentLessons.map((lesson) => (
          <Card 
            key={lesson.id} 
            className={`border-0 shadow-soft transition-all duration-300 hover:shadow-success hover:scale-105 ${
              lesson.completed ? 'bg-success/5' : 'bg-card'
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {lesson.completed ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      lesson.id <= 8 ? (
                        <BookOpen className="h-5 w-5 text-primary" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )
                    )}
                    {lesson.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {lesson.description}
                  </CardDescription>
                </div>
                {lesson.completed && lesson.stars > 0 && (
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < lesson.stars ? 'text-warning fill-warning' : 'text-muted-foreground'
                        }`} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {lesson.duration} min
                </div>
                {lesson.completed && (
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    Completada
                  </Badge>
                )}
              </div>
              <Button 
                className="w-full" 
                variant={lesson.completed ? "outline" : "default"}
                disabled={!lesson.completed && lesson.id > 8}
              >
                {lesson.completed ? (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Repasar
                  </>
                ) : lesson.id <= 8 ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Comenzar
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Bloqueada
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Lessons;