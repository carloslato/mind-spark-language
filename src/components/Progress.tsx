import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Clock, Star, TrendingUp, Award } from "lucide-react";

const Progress = () => {
  const progressData = {
    overall: {
      level: "Intermedio",
      xp: 1250,
      nextLevelXp: 2000,
      streak: 7,
      totalHours: 24,
    },
    skills: [
      { name: "Vocabulario", progress: 75, level: "Intermedio", color: "bg-primary" },
      { name: "Gramática", progress: 60, level: "Intermedio", color: "bg-secondary" },
      { name: "Pronunciación", progress: 45, level: "Principiante", color: "bg-accent" },
      { name: "Comprensión", progress: 80, level: "Intermedio", color: "bg-success" },
    ],
    achievements: [
      { name: "Primera Lección", description: "Completaste tu primera lección", earned: true, icon: Target },
      { name: "Racha de 7 días", description: "Mantuviste el aprendizaje por 7 días seguidos", earned: true, icon: Clock },
      { name: "Maestro del Vocabulario", description: "Aprendiste 100 palabras nuevas", earned: true, icon: Star },
      { name: "Perfeccionista", description: "Completaste 5 ejercicios con puntuación perfecta", earned: false, icon: Trophy },
      { name: "Estudiante Dedicado", description: "Acumula 50 horas de estudio", earned: false, icon: Award },
    ],
    weeklyStats: [
      { day: "Lun", minutes: 20, completed: true },
      { day: "Mar", minutes: 15, completed: true },
      { day: "Mié", minutes: 25, completed: true },
      { day: "Jue", minutes: 30, completed: true },
      { day: "Vie", minutes: 18, completed: true },
      { day: "Sáb", minutes: 22, completed: true },
      { day: "Dom", minutes: 28, completed: true },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Tu Progreso de Aprendizaje</h2>
        <p className="text-muted-foreground text-lg">
          Revisa tus estadísticas y logros conseguidos
        </p>
      </div>

      {/* Overall Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="border-0 shadow-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Progreso General
            </CardTitle>
            <CardDescription>Tu nivel actual y progreso hacia el siguiente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{progressData.overall.level}</div>
              <Badge variant="secondary" className="mb-4">
                {progressData.overall.xp} / {progressData.overall.nextLevelXp} XP
              </Badge>
              <ProgressBar 
                value={(progressData.overall.xp / progressData.overall.nextLevelXp) * 100} 
                className="h-3"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {progressData.overall.nextLevelXp - progressData.overall.xp} XP para el siguiente nivel
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{progressData.overall.streak}</div>
                <p className="text-sm text-muted-foreground">Días seguidos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{progressData.overall.totalHours}h</div>
                <p className="text-sm text-muted-foreground">Total estudiado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              Actividad Semanal
            </CardTitle>
            <CardDescription>Minutos de estudio por día</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressData.weeklyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-10">{stat.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-muted rounded-full h-2 relative overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          stat.completed ? 'bg-gradient-primary' : 'bg-muted-foreground'
                        }`}
                        style={{ width: `${Math.min((stat.minutes / 30) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {stat.minutes}min
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Progress */}
      <Card className="border-0 shadow-soft mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Habilidades
          </CardTitle>
          <CardDescription>Tu progreso en diferentes áreas del inglés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {progressData.skills.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{skill.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {skill.level}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <ProgressBar value={skill.progress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{skill.progress}% completado</span>
                    <span>{skill.progress}/100</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            Logros
          </CardTitle>
          <CardDescription>Tus logros conseguidos y objetivos por alcanzar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressData.achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    achievement.earned 
                      ? 'border-warning bg-warning/10 shadow-soft' 
                      : 'border-muted bg-muted/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.earned ? 'bg-warning text-warning-foreground' : 'bg-muted'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {achievement.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                      {achievement.earned && (
                        <Badge variant="secondary" className="mt-2 bg-warning/20 text-warning-foreground">
                          Conseguido
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;