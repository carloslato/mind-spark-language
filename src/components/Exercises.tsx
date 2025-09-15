import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, RotateCcw, Trophy, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TranslationExercise {
  id: number;
  spanish: string;
  english: string;
  type: "translation";
}

interface FillBlankExercise {
  id: number;
  sentence: string;
  answer: string;
  options: string[];
  type: "fillBlank";
}

type Exercise = TranslationExercise | FillBlankExercise;

const Exercises = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [exerciseType, setExerciseType] = useState<"translation" | "fillBlank">("translation");
  const { toast } = useToast();

  const translationExercises: TranslationExercise[] = [
    {
      id: 1,
      spanish: "Mi nombre es Carlos",
      english: "my name is carlos",
      type: "translation"
    },
    {
      id: 2,
      spanish: "Ella tiene veinte años",
      english: "she is twenty years old",
      type: "translation"
    },
    {
      id: 3,
      spanish: "Nosotros vivimos en Madrid",
      english: "we live in madrid",
      type: "translation"
    }
  ];

  const fillBlankExercises: FillBlankExercise[] = [
    {
      id: 1,
      sentence: "I ___ a student",
      answer: "am",
      options: ["am", "is", "are"],
      type: "fillBlank"
    },
    {
      id: 2,
      sentence: "She ___ to school every day",
      answer: "goes",
      options: ["go", "goes", "going"],
      type: "fillBlank"
    },
    {
      id: 3,
      sentence: "They ___ watching TV",
      answer: "are",
      options: ["am", "is", "are"],
      type: "fillBlank"
    }
  ];

  const getExercises = (): Exercise[] => {
    return exerciseType === "translation" ? translationExercises : fillBlankExercises;
  };

  const exercises = getExercises();
  const currentExerciseData = exercises[currentExercise];

  const checkAnswer = () => {
    const isCorrect = exerciseType === "translation" 
      ? userAnswer.toLowerCase().trim() === (currentExerciseData as TranslationExercise).english
      : userAnswer.toLowerCase().trim() === (currentExerciseData as FillBlankExercise).answer.toLowerCase();

    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "¡Correcto!",
        description: "Excelente respuesta. Sigue así.",
      });
    } else {
      const correctAnswer = exerciseType === "translation" 
        ? (currentExerciseData as TranslationExercise).english 
        : (currentExerciseData as FillBlankExercise).answer;
      toast({
        title: "Incorrecto",
        description: `La respuesta correcta es: ${correctAnswer}`,
        variant: "destructive",
      });
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer("");
      setShowResult(false);
    } else {
      const correctAnswer = exerciseType === "translation" 
        ? (currentExerciseData as TranslationExercise).english 
        : (currentExerciseData as FillBlankExercise).answer.toLowerCase();
      const finalScore = score + (showResult && userAnswer.toLowerCase().trim() === correctAnswer ? 1 : 0);
      toast({
        title: "¡Ejercicio completado!",
        description: `Puntuación final: ${finalScore}/${exercises.length}`,
      });
      resetExercise();
    }
  };

  const resetExercise = () => {
    setCurrentExercise(0);
    setUserAnswer("");
    setShowResult(false);
    setScore(0);
  };

  const selectOption = (option: string) => {
    setUserAnswer(option);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Ejercicios Interactivos</h2>
        <p className="text-muted-foreground text-lg">
          Practica tus habilidades con ejercicios dinámicos
        </p>
      </div>

      {/* Exercise Type Selection */}
      <div className="flex gap-4 mb-8">
        <Button
          variant={exerciseType === "translation" ? "default" : "outline"}
          onClick={() => {
            setExerciseType("translation");
            resetExercise();
          }}
          className="flex items-center gap-2"
        >
          <Target className="h-4 w-4" />
          Traducción
        </Button>
        <Button
          variant={exerciseType === "fillBlank" ? "default" : "outline"}
          onClick={() => {
            setExerciseType("fillBlank");
            resetExercise();
          }}
          className="flex items-center gap-2"
        >
          <Trophy className="h-4 w-4" />
          Completar Oraciones
        </Button>
      </div>

      {/* Exercise Card */}
      <Card className="border-0 shadow-success mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Ejercicio {currentExercise + 1} de {exercises.length}
            </CardTitle>
            <Badge variant="secondary">
              Puntuación: {score}/{exercises.length}
            </Badge>
          </div>
          <CardDescription>
            {exerciseType === "translation" 
              ? "Traduce la siguiente oración al inglés"
              : "Completa la oración con la palabra correcta"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {exerciseType === "translation" ? (
            <>
              <div className="bg-muted/50 p-6 rounded-lg text-center">
                <p className="text-lg font-medium">{(currentExerciseData as TranslationExercise).spanish}</p>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="Escribe tu traducción aquí..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showResult}
                  className="text-lg p-4"
                />
              </div>
            </>
          ) : (
            <>
              <div className="bg-muted/50 p-6 rounded-lg text-center">
                <p className="text-lg font-medium">
                  {(currentExerciseData as FillBlankExercise).sentence.split('___').map((part, index) => (
                    <span key={index}>
                      {part}
                      {index < (currentExerciseData as FillBlankExercise).sentence.split('___').length - 1 && (
                        <span className="inline-block min-w-[100px] border-b-2 border-primary mx-2 pb-1">
                          {showResult || userAnswer ? (
                            <span className={`font-bold ${
                              userAnswer === (currentExerciseData as FillBlankExercise).answer ? 'text-success' : 'text-destructive'
                            }`}>
                              {userAnswer || '___'}
                            </span>
                          ) : (
                            '___'
                          )}
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(currentExerciseData as FillBlankExercise).options.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswer === option ? "default" : "outline"}
                    onClick={() => selectOption(option)}
                    disabled={showResult}
                    className="p-4 text-lg"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </>
          )}

          {showResult && (
            <div className={`p-4 rounded-lg border-2 ${
              (exerciseType === "translation" 
                ? userAnswer.toLowerCase().trim() === (currentExerciseData as TranslationExercise).english
                : userAnswer.toLowerCase().trim() === (currentExerciseData as FillBlankExercise).answer.toLowerCase()
              ) 
                ? 'border-success bg-success/10' 
                : 'border-destructive bg-destructive/10'
            }`}>
              <div className="flex items-center gap-2">
                {(exerciseType === "translation" 
                  ? userAnswer.toLowerCase().trim() === (currentExerciseData as TranslationExercise).english
                  : userAnswer.toLowerCase().trim() === (currentExerciseData as FillBlankExercise).answer.toLowerCase()
                ) ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  <X className="h-5 w-5 text-destructive" />
                )}
                <span className="font-medium">
                  {(exerciseType === "translation" 
                    ? userAnswer.toLowerCase().trim() === (currentExerciseData as TranslationExercise).english
                    : userAnswer.toLowerCase().trim() === (currentExerciseData as FillBlankExercise).answer.toLowerCase()
                  ) ? '¡Correcto!' : 'Incorrecto'}
                </span>
              </div>
              {(exerciseType === "translation" 
                ? userAnswer.toLowerCase().trim() !== (currentExerciseData as TranslationExercise).english
                : userAnswer.toLowerCase().trim() !== (currentExerciseData as FillBlankExercise).answer.toLowerCase()
              ) && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Respuesta correcta: {exerciseType === "translation" 
                    ? (currentExerciseData as TranslationExercise).english 
                    : (currentExerciseData as FillBlankExercise).answer}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3">
            {!showResult ? (
              <Button 
                onClick={checkAnswer} 
                disabled={!userAnswer.trim()}
                className="flex-1"
              >
                Verificar Respuesta
              </Button>
            ) : (
              <>
                <Button onClick={nextExercise} className="flex-1">
                  {currentExercise < exercises.length - 1 ? 'Siguiente' : 'Finalizar'}
                </Button>
                <Button variant="outline" onClick={resetExercise}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reiniciar
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Exercises;