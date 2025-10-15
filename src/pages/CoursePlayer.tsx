import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Video, 
  HelpCircle, 
  Award,
  RotateCcw,
  Bookmark,
  Share2,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
  order: number;
  completed: boolean;
}

interface CourseLesson {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'text';
  duration: number;
  videoId?: string;
  content?: string;
  quiz?: Quiz;
  order: number;
  completed: boolean;
  score?: number;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number;
  passThreshold: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'text_input';
  options?: string[];
  correctAnswer: string;
  points: number;
}

export default function CoursePlayer() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime] = useState(0);
  const [volume] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Mock course data
  const [course] = useState({
    id: "1",
    title: "CNC Machining Fundamentals",
    description: "Complete course covering CNC machine operation, safety, and maintenance",
    totalDuration: 3600,
    modules: [
      {
        id: "1",
        title: "Introduction to CNC Machining",
        description: "Basic concepts and safety procedures",
        order: 1,
        completed: true,
        lessons: [
          {
            id: "1-1",
            title: "Welcome to CNC Machining",
            type: "video" as const,
            duration: 180,
            videoId: "video-1",
            order: 1,
            completed: true,
            score: undefined
          },
          {
            id: "1-2",
            title: "Safety First",
            type: "video" as const,
            duration: 240,
            videoId: "video-2",
            order: 2,
            completed: true,
            score: undefined
          },
          {
            id: "1-3",
            title: "Safety Quiz",
            type: "quiz" as const,
            duration: 300,
            order: 3,
            completed: false,
            score: undefined,
            quiz: {
              id: "quiz-1",
              title: "Safety Knowledge Check",
              timeLimit: 5,
              passThreshold: 80,
              questions: [
                {
                  id: "q1",
                  question: "What is the first thing you should do before operating a CNC machine?",
                  type: "multiple_choice" as const,
                  options: ["Check the tool", "Read the manual", "Put on safety glasses", "Start the machine"],
                  correctAnswer: "Put on safety glasses",
                  points: 10
                },
                {
                  id: "q2",
                  question: "True or False: You can operate a CNC machine without proper training.",
                  type: "true_false" as const,
                  correctAnswer: "False",
                  points: 10
                }
              ]
            }
          }
        ]
      },
      {
        id: "2",
        title: "Machine Setup and Operation",
        description: "Hands-on setup procedures",
        order: 2,
        completed: false,
        lessons: [
          {
            id: "2-1",
            title: "Machine Preparation",
            type: "video" as const,
            duration: 300,
            videoId: "video-3",
            order: 1,
            completed: false,
            score: undefined
          },
          {
            id: "2-2",
            title: "Tool Setup",
            type: "video" as const,
            duration: 420,
            videoId: "video-4",
            order: 2,
            completed: false,
            score: undefined
          }
        ]
      }
    ]
  });

  const currentModule = course.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[currentLessonIndex];
  const [modules, setModules] = useState<CourseModule[]>(course.modules);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalProgress = () => {
    const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = modules.reduce((total, module) => 
      total + module.lessons.filter(lesson => lesson.completed).length, 0
    );
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  const getModuleProgress = (module: CourseModule) => {
    const totalLessons = module.lessons.length;
    const completedLessons = module.lessons.filter(lesson => lesson.completed).length;
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentLessonIndex(modules[currentModuleIndex - 1].lessons.length - 1);
    }
  };

  const handleLessonComplete = () => {
    setModules(modules.map((module, moduleIndex) => 
      moduleIndex === currentModuleIndex 
        ? {
            ...module,
            lessons: module.lessons.map((lesson, lessonIndex) => 
              lessonIndex === currentLessonIndex 
                ? { ...lesson, completed: true }
                : lesson
            )
          }
        : module
    ));
  };

  const handleQuizSubmit = () => {
    if (!currentLesson?.quiz) return;

    let score = 0;
    let totalPoints = 0;

    currentLesson.quiz.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = quizAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        score += question.points;
      }
    });

    const percentage = (score / totalPoints) * 100;
    setQuizScore(percentage);

    if (percentage >= currentLesson.quiz.passThreshold) {
      handleLessonComplete();
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const isCourseComplete = () => {
    return modules.every(module => 
      module.lessons.every(lesson => lesson.completed)
    );
  };

  useEffect(() => {
    if (isCourseComplete()) {
      setShowCertificate(true);
    }
  }, [modules]);

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmark
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(getTotalProgress())}%</span>
            </div>
            <Progress value={getTotalProgress()} className="w-full" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Course Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {modules.map((module, moduleIndex) => (
                <div key={module.id} className="space-y-2">
                  <div
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-colors duration-200",
                      moduleIndex === currentModuleIndex 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => {
                      setCurrentModuleIndex(moduleIndex);
                      setCurrentLessonIndex(0);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{module.title}</h4>
                        <p className="text-xs text-muted-foreground">{module.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          {module.lessons.filter(l => l.completed).length}/{module.lessons.length} lessons
                        </div>
                        <Progress value={getModuleProgress(module)} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Module Lessons */}
                  {moduleIndex === currentModuleIndex && (
                    <div className="ml-4 space-y-1">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className={cn(
                            "p-2 rounded border cursor-pointer transition-colors duration-200",
                            lessonIndex === currentLessonIndex
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => setCurrentLessonIndex(lessonIndex)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {lesson.type === 'video' && <Video className="w-3 h-3 text-primary" />}
                              {lesson.type === 'quiz' && <HelpCircle className="w-3 h-3 text-amber" />}
                              {lesson.type === 'text' && <BookOpen className="w-3 h-3 text-muted-foreground" />}
                              <span className="text-xs">{lesson.title}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {lesson.completed && <CheckCircle className="w-3 h-3 text-emerald-green" />}
                              <span className="text-xs text-muted-foreground">
                                {formatTime(lesson.duration)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {currentLesson ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      {currentLesson.type === 'video' && <Video className="w-5 h-5 mr-2 text-primary" />}
                      {currentLesson.type === 'quiz' && <HelpCircle className="w-5 h-5 mr-2 text-amber" />}
                      {(currentLesson.type as string) === 'text' && <BookOpen className="w-5 h-5 mr-2 text-muted-foreground" />}
                      {currentLesson.title}
                    </CardTitle>
                    <CardDescription>
                      {currentModule.title} • {formatTime(currentLesson.duration)}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={currentLesson.completed ? "default" : "secondary"}>
                      {currentLesson.completed ? "Completed" : "In Progress"}
                    </Badge>
                    {currentLesson.score && (
                      <Badge variant="outline">
                        Score: {Math.round(currentLesson.score)}%
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {currentLesson && currentLesson.type === 'video' && (
                  <div className="space-y-4">
                    {/* Video Player */}
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <Play className="w-10 h-10 text-white" />
                          </div>
                          <p className="text-white/80">Video Player</p>
                          <p className="text-white/60 text-sm">Click to play</p>
                        </div>
                      </div>

                      {/* Video Controls */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="space-y-3">
                          {/* Progress Bar */}
                          <div className="space-y-1">
                            <input
                              type="range"
                              min="0"
                              max={currentLesson.duration}
                              value={currentTime}
                              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-white/80">
                              <span>{formatTime(currentTime)}</span>
                              <span>{formatTime(currentLesson.duration)}</span>
                            </div>
                          </div>

                          {/* Control Buttons */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePlayPause}
                                className="text-white hover:bg-white/20"
                              >
                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                              </Button>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setIsMuted(!isMuted)}
                                  className="text-white hover:bg-white/20"
                                >
                                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                </Button>
                                <input
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.1"
                                  value={isMuted ? 0 : volume}
                                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                                />
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:bg-white/20"
                              >
                                <Maximize className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button onClick={handleLessonComplete} disabled={currentLesson.completed}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Complete
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" onClick={handlePrevLesson} disabled={currentModuleIndex === 0 && currentLessonIndex === 0}>
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>
                        <Button onClick={handleNextLesson} disabled={currentModuleIndex === modules.length - 1 && currentLessonIndex === currentModule.lessons.length - 1}>
                          Next
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {currentLesson && currentLesson.type === 'quiz' && currentLesson.quiz && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">{currentLesson.quiz.title}</h3>
                      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {currentLesson.quiz.timeLimit} minutes
                        </span>
                        <span>Pass: {currentLesson.quiz.passThreshold}%</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {currentLesson.quiz.questions.map((question, index) => (
                        <div key={question.id} className="space-y-3">
                          <h4 className="font-medium">
                            Question {index + 1}: {question.question}
                          </h4>
                          
                          {question.type === 'multiple_choice' && question.options && (
                            <RadioGroup
                              value={quizAnswers[question.id] || ''}
                              onValueChange={(value) => handleAnswerChange(question.id, value)}
                            >
                              {question.options.map((option) => (
                                <div key={option} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                                  <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer">
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}

                          {question.type === 'true_false' && (
                            <RadioGroup
                              value={quizAnswers[question.id] || ''}
                              onValueChange={(value) => handleAnswerChange(question.id, value)}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="True" id={`${question.id}-true`} />
                                <Label htmlFor={`${question.id}-true`} className="cursor-pointer">True</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="False" id={`${question.id}-false`} />
                                <Label htmlFor={`${question.id}-false`} className="cursor-pointer">False</Label>
                              </div>
                            </RadioGroup>
                          )}

                          {(question.type as string) === 'text_input' && (
                            <Textarea
                              value={quizAnswers[question.id] || ''}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              placeholder="Enter your answer..."
                              className="min-h-[80px]"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="outline" onClick={handlePrevLesson}>
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      <Button onClick={handleQuizSubmit}>
                        Submit Quiz
                      </Button>
                    </div>
                  </div>
                )}

                {currentLesson && (currentLesson.type as string) === 'text' && (
                  <div className="space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <p>{(currentLesson as any).content || 'No content available.'}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="outline" onClick={handlePrevLesson}>
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Button onClick={handleLessonComplete} disabled={currentLesson.completed}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Complete
                        </Button>
                        <Button onClick={handleNextLesson}>
                          Next
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No lesson selected</h3>
                <p className="text-muted-foreground">
                  Select a lesson from the sidebar to start learning.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quiz Results Dialog */}
      <Dialog open={quizScore !== null} onOpenChange={() => setQuizScore(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz Results</DialogTitle>
            <DialogDescription>
              {quizScore !== null && quizScore >= (currentLesson?.quiz?.passThreshold || 0) 
                ? "Congratulations! You passed the quiz." 
                : "You didn't pass this time. You can retake the quiz."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {quizScore !== null ? Math.round(quizScore) : 0}%
              </div>
              <p className="text-muted-foreground">
                Pass threshold: {currentLesson?.quiz?.passThreshold}%
              </p>
            </div>
            <div className="flex justify-center space-x-2">
              {quizScore !== null && quizScore < (currentLesson?.quiz?.passThreshold || 0) && (
                <Button variant="outline" onClick={() => {
                  setQuizScore(null);
                  setQuizAnswers({});
                }}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
              )}
              <Button onClick={() => {
                setQuizScore(null);
                if (quizScore !== null && quizScore >= (currentLesson?.quiz?.passThreshold || 0)) {
                  handleNextLesson();
                }
              }}>
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Certificate Dialog */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Award className="w-6 h-6 mr-2 text-amber" />
              Course Completed!
            </DialogTitle>
            <DialogDescription>
              Congratulations! You have successfully completed the course.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-amber to-amber/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certificate of Completion</h3>
              <p className="text-muted-foreground">
                {course.title}
              </p>
            </div>
            <div className="flex justify-center space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
              <Button>
                <Share2 className="w-4 h-4 mr-2" />
                Share Achievement
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
