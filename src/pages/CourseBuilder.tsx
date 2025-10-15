import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Edit3, 
  Eye, 
  Save, 
  BookOpen,
  Video,
  HelpCircle,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
  order: number;
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

export default function CourseBuilder() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Mock data
  const [modules, setModules] = useState<CourseModule[]>([
    {
      id: "1",
      title: "Introduction to CNC Machining",
      description: "Basic concepts and safety procedures",
      order: 1,
      lessons: [
        {
          id: "1-1",
          title: "Welcome to CNC Machining",
          type: "video",
          duration: 180,
          videoId: "video-1",
          order: 1
        },
        {
          id: "1-2",
          title: "Safety First",
          type: "video",
          duration: 240,
          videoId: "video-2",
          order: 2
        },
        {
          id: "1-3",
          title: "Safety Quiz",
          type: "quiz",
          duration: 300,
          order: 3,
          quiz: {
            id: "quiz-1",
            title: "Safety Knowledge Check",
            timeLimit: 5,
            passThreshold: 80,
            questions: [
              {
                id: "q1",
                question: "What is the first thing you should do before operating a CNC machine?",
                type: "multiple_choice",
                options: ["Check the tool", "Read the manual", "Put on safety glasses", "Start the machine"],
                correctAnswer: "Put on safety glasses",
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
      lessons: [
        {
          id: "2-1",
          title: "Machine Preparation",
          type: "video",
          duration: 300,
          videoId: "video-3",
          order: 1
        },
        {
          id: "2-2",
          title: "Tool Setup",
          type: "video",
          duration: 420,
          videoId: "video-4",
          order: 2
        }
      ]
    }
  ]);

  const [availableVideos] = useState([
    { id: "video-1", title: "CNC Machine Setup - Part 1", duration: 180, thumbnail: "/api/placeholder/300/200" },
    { id: "video-2", title: "Safety Protocols", duration: 240, thumbnail: "/api/placeholder/300/200" },
    { id: "video-3", title: "Tool Change Procedure", duration: 300, thumbnail: "/api/placeholder/300/200" },
    { id: "video-4", title: "Quality Control Check", duration: 420, thumbnail: "/api/placeholder/300/200" }
  ]);

  const addModule = () => {
    const newModule: CourseModule = {
      id: `module-${Date.now()}`,
      title: "New Module",
      description: "Module description",
      order: modules.length + 1,
      lessons: []
    };
    setModules([...modules, newModule]);
    setSelectedModule(newModule.id);
  };

  const addLesson = (moduleId: string, type: 'video' | 'quiz' | 'text') => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const newLesson: CourseLesson = {
      id: `lesson-${Date.now()}`,
      title: `New ${type === 'video' ? 'Video' : type === 'quiz' ? 'Quiz' : 'Lesson'}`,
      type,
      duration: 0,
      order: module.lessons.length + 1
    };

    const updatedModules = modules.map(m => 
      m.id === moduleId 
        ? { ...m, lessons: [...m.lessons, newLesson] }
        : m
    );
    setModules(updatedModules);
    setSelectedLesson(newLesson.id);
  };

  const updateModule = (moduleId: string, updates: Partial<CourseModule>) => {
    setModules(modules.map(m => 
      m.id === moduleId ? { ...m, ...updates } : m
    ));
  };

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<CourseLesson>) => {
    setModules(modules.map(m => 
      m.id === moduleId 
        ? {
            ...m,
            lessons: m.lessons.map(l => 
              l.id === lessonId ? { ...l, ...updates } : l
            )
          }
        : m
    ));
  };


  const getTotalDuration = () => {
    return modules.reduce((total, module) => 
      total + module.lessons.reduce((moduleTotal, lesson) => moduleTotal + lesson.duration, 0), 0
    );
  };

  const getTotalLessons = () => {
    return modules.reduce((total, module) => total + module.lessons.length, 0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const selectedModuleData = modules.find(m => m.id === selectedModule);
  const selectedLessonData = selectedModuleData?.lessons.find(l => l.id === selectedLesson);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Builder</h1>
          <p className="text-muted-foreground">Create and organize your training courses</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? "Edit Mode" : "Preview"}
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Course
          </Button>
        </div>
      </div>

      {/* Course Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Course Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter course title"
              />
            </div>
            <div className="space-y-2">
              <Label>Course Type</Label>
              <Select defaultValue="internal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal Training</SelectItem>
                  <SelectItem value="customer">Customer Training</SelectItem>
                  <SelectItem value="public">Public Course</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseDescription">Description</Label>
            <Textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              placeholder="Describe what this course covers"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Course Structure */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Course Structure</CardTitle>
                <Button size="sm" onClick={addModule}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {modules.map((module) => (
                <div key={module.id} className="space-y-1">
                  <div
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-colors duration-200",
                      selectedModule === module.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{module.title}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-muted-foreground">
                          {module.lessons.length} lessons
                        </span>
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Module Lessons */}
                  {selectedModule === module.id && (
                    <div className="ml-4 space-y-1">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={cn(
                            "p-2 rounded border cursor-pointer transition-colors duration-200",
                            selectedLesson === lesson.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => setSelectedLesson(lesson.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {lesson.type === 'video' && <Video className="w-3 h-3 text-primary" />}
                              {lesson.type === 'quiz' && <HelpCircle className="w-3 h-3 text-amber" />}
                              {lesson.type === 'text' && <BookOpen className="w-3 h-3 text-muted-foreground" />}
                              <span className="text-xs">{lesson.title}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDuration(lesson.duration)}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add Lesson Buttons */}
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-6"
                          onClick={() => addLesson(module.id, 'video')}
                        >
                          <Video className="w-3 h-3 mr-1" />
                          Video
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-6"
                          onClick={() => addLesson(module.id, 'quiz')}
                        >
                          <HelpCircle className="w-3 h-3 mr-1" />
                          Quiz
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-6"
                          onClick={() => addLesson(module.id, 'text')}
                        >
                          <BookOpen className="w-3 h-3 mr-1" />
                          Text
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Course Stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Course Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Duration</span>
                <span className="font-medium">{formatDuration(getTotalDuration())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Lessons</span>
                <span className="font-medium">{getTotalLessons()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Modules</span>
                <span className="font-medium">{modules.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {selectedModuleData ? (
            <Tabs defaultValue="content" className="w-full">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                {/* Module Editor */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Module: {selectedModuleData.title}</CardTitle>
                        <CardDescription>{selectedModuleData.description}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Module Title</Label>
                          <Input
                            value={selectedModuleData.title}
                            onChange={(e) => updateModule(selectedModuleData.id, { title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Order</Label>
                          <Input
                            type="number"
                            value={selectedModuleData.order}
                            onChange={(e) => updateModule(selectedModuleData.id, { order: parseInt(e.target.value) })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={selectedModuleData.description}
                          onChange={(e) => updateModule(selectedModuleData.id, { description: e.target.value })}
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lesson Editor */}
                {selectedLessonData && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            {selectedLessonData.type === 'video' && <Video className="w-5 h-5 mr-2 text-primary" />}
                            {selectedLessonData.type === 'quiz' && <HelpCircle className="w-5 h-5 mr-2 text-amber" />}
                            {selectedLessonData.type === 'text' && <BookOpen className="w-5 h-5 mr-2 text-muted-foreground" />}
                            {selectedLessonData.title}
                          </CardTitle>
                          <CardDescription>
                            {selectedLessonData.type === 'video' && 'Video Lesson'}
                            {selectedLessonData.type === 'quiz' && 'Quiz Lesson'}
                            {selectedLessonData.type === 'text' && 'Text Lesson'}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Lesson Title</Label>
                            <Input
                              value={selectedLessonData.title}
                              onChange={(e) => updateLesson(selectedModuleData.id, selectedLessonData.id, { title: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Duration (seconds)</Label>
                            <Input
                              type="number"
                              value={selectedLessonData.duration}
                              onChange={(e) => updateLesson(selectedModuleData.id, selectedLessonData.id, { duration: parseInt(e.target.value) })}
                            />
                          </div>
                        </div>

                        {selectedLessonData.type === 'video' && (
                          <div className="space-y-2">
                            <Label>Select Video</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a video" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableVideos.map((video) => (
                                  <SelectItem key={video.id} value={video.id}>
                                    {video.title} ({formatDuration(video.duration)})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {selectedLessonData.type === 'quiz' && selectedLessonData.quiz && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Quiz Title</Label>
                              <Input value={selectedLessonData.quiz.title} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Time Limit (minutes)</Label>
                                <Input type="number" value={selectedLessonData.quiz.timeLimit} />
                              </div>
                              <div className="space-y-2">
                                <Label>Pass Threshold (%)</Label>
                                <Input type="number" value={selectedLessonData.quiz.passThreshold} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Questions</Label>
                              <div className="space-y-2">
                                {selectedLessonData.quiz.questions.map((question) => (
                                  <div key={question.id} className="p-3 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">{question.question}</span>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant="outline">{question.type}</Badge>
                                        <Button variant="ghost" size="sm">
                                          <Edit3 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <Button variant="outline" className="w-full">
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Question
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedLessonData.type === 'text' && (
                          <div className="space-y-2">
                            <Label>Content</Label>
                            <Textarea
                              value={selectedLessonData.content || ''}
                              onChange={(e) => updateLesson(selectedModuleData.id, selectedLessonData.id, { content: e.target.value })}
                              className="min-h-[200px]"
                              placeholder="Enter lesson content..."
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Module Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Require completion of previous module</span>
                        <Switch />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Allow skipping lessons</span>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Module Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Analytics data will appear here once the course is published and learners start taking it.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No module selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select a module from the sidebar to start editing, or create a new module.
                </p>
                <Button onClick={addModule}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Module
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
