import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Upload, 
  Camera, 
  FileVideo, 
  CheckCircle, 
  X, 
  Plus,
  Wand2,
  Eye,
  Edit3,
  Save,
  Tag,
  Clock,
  Play,
  Users,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UploadVideo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    machineType: "",
    processType: "",
    tooling: "",
    step: "",
    tags: [] as string[],
    privacyLevel: "internal",
    customerAccess: [] as string[],
    submitForReview: false,
    newTag: ""
  });

  // AI suggestions
  const [aiSuggestions, setAiSuggestions] = useState({
    suggestedTags: ["CNC", "Setup", "Machine Operation", "Precision", "Manufacturing"],
    suggestedTitle: "CNC Machine Setup - Advanced Techniques",
    suggestedDescription: "Comprehensive guide covering advanced CNC machine setup procedures for precision machining operations.",
    transcript: "Welcome to this comprehensive guide on CNC machine setup. In this video, we'll cover all the essential steps...",
    thumbnailSuggestions: [
      { time: 30, url: "/api/placeholder/300/200" },
      { time: 60, url: "/api/placeholder/300/200" },
      { time: 120, url: "/api/placeholder/300/200" }
    ]
  });

  const steps = [
    { id: 1, title: "Upload Video", description: "Select and upload your video file" },
    { id: 2, title: "Basic Info", description: "Add title, description, and metadata" },
    { id: 3, title: "AI Processing", description: "Review AI-generated suggestions" },
    { id: 4, title: "Review & Publish", description: "Final review and publish settings" }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('video/')) {
      setUploadedFile(file);
      setCurrentStep(2);
      // Simulate AI processing
      setTimeout(() => {
        setAiSuggestions(prev => ({
          ...prev,
          suggestedTitle: file.name.replace(/\.[^/.]+$/, ""),
          suggestedDescription: `Training video: ${file.name.replace(/\.[^/.]+$/, "")}`
        }));
      }, 1000);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setCurrentStep(3);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ""
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const applyAISuggestion = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload Video</h1>
        <p className="text-muted-foreground">Create and upload training videos with AI assistance</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                  currentStep >= step.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <div className="ml-3">
                  <p className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-16 h-0.5 mx-4",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Video File
                </CardTitle>
                <CardDescription>
                  Select a video file from your device or drag and drop it here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200",
                    dragActive 
                      ? "border-primary bg-primary/5" 
                      : "border-muted-foreground/25 hover:border-primary/50"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <FileVideo className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Drop your video here</h3>
                      <p className="text-muted-foreground">
                        or click to browse files
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                      <Button variant="outline">
                        <Camera className="w-4 h-4 mr-2" />
                        Record New
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supports MP4, MOV, AVI up to 2GB
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </CardContent>
            </Card>
          )}

          {/* Step 2: Basic Info */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Edit3 className="w-5 h-5 mr-2" />
                  Video Information
                </CardTitle>
                <CardDescription>
                  Provide details about your training video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter video title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="machineType">Machine Type</Label>
                    <Select value={formData.machineType} onValueChange={(value) => setFormData(prev => ({ ...prev, machineType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select machine type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CNC Mill">CNC Mill</SelectItem>
                        <SelectItem value="CNC Lathe">CNC Lathe</SelectItem>
                        <SelectItem value="Inspection Station">Inspection Station</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this video covers"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="processType">Process Type</Label>
                    <Select value={formData.processType} onValueChange={(value) => setFormData(prev => ({ ...prev, processType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select process type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Setup">Setup</SelectItem>
                        <SelectItem value="Tooling">Tooling</SelectItem>
                        <SelectItem value="Quality Control">Quality Control</SelectItem>
                        <SelectItem value="Safety">Safety</SelectItem>
                        <SelectItem value="Troubleshooting">Troubleshooting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tooling">Tooling</Label>
                    <Input
                      id="tooling"
                      value={formData.tooling}
                      onChange={(e) => setFormData(prev => ({ ...prev, tooling: e.target.value }))}
                      placeholder="e.g., Standard Tooling Set"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="step">Step/Procedure</Label>
                  <Input
                    id="step"
                    value={formData.step}
                    onChange={(e) => setFormData(prev => ({ ...prev, step: e.target.value }))}
                    placeholder="e.g., Initial Setup, Tool Change, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={formData.newTag}
                      onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button onClick={addTag} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: AI Processing */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wand2 className="w-5 h-5 mr-2" />
                  AI Suggestions
                </CardTitle>
                <CardDescription>
                  Review and apply AI-generated suggestions for your video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Suggested Title */}
                <div className="space-y-2">
                  <Label>Suggested Title</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={aiSuggestions.suggestedTitle} readOnly />
                    <Button 
                      size="sm" 
                      onClick={() => applyAISuggestion('title', aiSuggestions.suggestedTitle)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Suggested Description */}
                <div className="space-y-2">
                  <Label>Suggested Description</Label>
                  <div className="space-y-2">
                    <Textarea value={aiSuggestions.suggestedDescription} readOnly className="min-h-[80px]" />
                    <Button 
                      size="sm" 
                      onClick={() => applyAISuggestion('description', aiSuggestions.suggestedDescription)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Suggested Tags */}
                <div className="space-y-2">
                  <Label>Suggested Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestions.suggestedTags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          if (!formData.tags.includes(tag)) {
                            setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
                          }
                        }}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Transcript */}
                <div className="space-y-2">
                  <Label>Generated Transcript</Label>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">{aiSuggestions.transcript}</p>
                  </div>
                </div>

                {/* Thumbnail Suggestions */}
                <div className="space-y-2">
                  <Label>Thumbnail Suggestions</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {aiSuggestions.thumbnailSuggestions.map((thumb, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-video bg-muted rounded border">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-6 h-6 text-muted-foreground" />
                          </div>
                        </div>
                        <p className="text-xs text-center mt-1">{thumb.time}s</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Publish */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Review & Publish
                </CardTitle>
                <CardDescription>
                  Review your video details and publish settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Video Preview */}
                <div className="space-y-2">
                  <Label>Video Preview</Label>
                  <div className="aspect-video bg-muted rounded border">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-12 h-12 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4">
                  <Label>Privacy & Access</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Submit for Review</span>
                      <Switch
                        checked={formData.submitForReview}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, submitForReview: checked }))}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formData.submitForReview 
                        ? "Video will be reviewed before publishing" 
                        : "Video will be published immediately"
                      }
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <Label>Summary</Label>
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div><strong>Title:</strong> {formData.title || "Untitled"}</div>
                    <div><strong>Machine Type:</strong> {formData.machineType || "Not specified"}</div>
                    <div><strong>Process:</strong> {formData.processType || "Not specified"}</div>
                    <div><strong>Tags:</strong> {formData.tags.join(", ") || "None"}</div>
                    <div><strong>Status:</strong> {formData.submitForReview ? "Pending Review" : "Ready to Publish"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upload Progress */}
          {isUploading && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(uploadProgress)}% complete
                </p>
              </CardContent>
            </Card>
          )}

          {/* File Info */}
          {uploadedFile && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">File Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">File Name:</span>
                  <span className="font-medium truncate ml-2">{uploadedFile.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">File Size:</span>
                  <span className="font-medium">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{uploadedFile.type}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-primary mt-0.5" />
                <p className="text-sm">Keep videos under 30 seconds for best engagement</p>
              </div>
              <div className="flex items-start space-x-2">
                <Tag className="w-4 h-4 text-primary mt-0.5" />
                <p className="text-sm">Add relevant tags to improve discoverability</p>
              </div>
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-primary mt-0.5" />
                <p className="text-sm">Consider your audience when setting privacy levels</p>
              </div>
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-primary mt-0.5" />
                <p className="text-sm">Review content before publishing</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            onClick={currentStep === 1 ? simulateUpload : nextStep}
            disabled={currentStep === 1 && !uploadedFile}
          >
            {currentStep === 4 ? "Publish Video" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
