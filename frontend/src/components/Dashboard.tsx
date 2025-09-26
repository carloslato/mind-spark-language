import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Trophy, Clock, Target, Star, Play } from "lucide-react";
import heroImage from "@/assets/hero-language-learning.jpg";

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

const Dashboard = ({ onSectionChange }: DashboardProps) => {
  const userStats = {
    level: "Intermedio",
    totalLessons: 24,
    completedLessons: 16,
    streak: 7,
    totalPoints: 1250,
  };

  const recentActivities = [
    { title: "Presente Simple", type: "Lección", completed: true },
    { title: "Ejercicio de Traducción", type: "Ejercicio", completed: true },
    { title: "Vocabulario Básico", type: "Lección", completed: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero rounded-3xl p-8 mb-8 overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¡Continúa tu viaje de aprendizaje!
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Domina el inglés con lecciones interactivas y ejercicios prácticos diseñados para tu nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => onSectionChange("lessons")}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Play className="mr-2 h-5 w-5" />
                Continuar Lección
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onSectionChange("exercises")}
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <Trophy className="mr-2 h-5 w-5" />
                Practicar
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src={heroImage} 
              alt="Estudiantes aprendiendo inglés" 
              className="rounded-2xl shadow-success w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Nivel Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{userStats.level}</div>
            <p className="text-sm text-muted-foreground">¡Sigue así!</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-secondary" />
              Progreso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary mb-2">
              {userStats.completedLessons}/{userStats.totalLessons}
            </div>
            <Progress 
              value={(userStats.completedLessons / userStats.totalLessons) * 100} 
              className="h-2"
            />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-accent" />
              Racha Diaria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{userStats.streak} días</div>
            <p className="text-sm text-muted-foreground">¡Increíble consistencia!</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-warning" />
              Puntos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{userStats.totalPoints}</div>
            <p className="text-sm text-muted-foreground">Total acumulado</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>
            Tus últimas lecciones y ejercicios completados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.completed ? 'bg-success' : 'bg-muted-foreground'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.type}</p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  activity.completed ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {activity.completed ? 'Completado' : 'En progreso'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;