import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Download, 
  Share2, 
  Bookmark, 
  Heart, 
  Flag,
  Clock,
  Eye,
  User,
  Tag,
  Settings,
  PlayCircle,
  ThumbsUp,
  MessageCircle
} from "lucide-react";

// Mock data
const mockVideo = {
  id: "1",
  title: "CNC Machine Setup - Part 1",
  description: "Comprehensive guide to setting up CNC machines for precision machining operations. This video covers all essential steps from initial machine preparation to final calibration.",
  duration: 180,
  videoUrl: "/api/video/sample.mp4",
  thumbnail: "/api/placeholder/800/450",
  tags: ["CNC", "Setup", "Machine Operation", "Precision", "Manufacturing"],
  machineType: "CNC Mill",
  processType: "Setup",
  tooling: "Standard Tooling Set",
  step: "Initial Setup",
  status: "published",
  viewCount: 1247,
  likeCount: 89,
  bookmarkCount: 23,
  commentCount: 12,
  createdAt: "2024-01-15",
  uploadedBy: "John Smith",
  organization: "Winbro Manufacturing",
  transcript: `Welcome to this comprehensive guide on CNC machine setup. In this video, we'll cover all the essential steps to properly set up your CNC machine for precision machining operations.

First, let's start with the machine preparation. Make sure the machine is properly leveled and all safety systems are functioning correctly. Check that the work area is clean and free of debris.

Next, we'll move on to tooling setup. Select the appropriate tools for your operation and ensure they're properly secured in the tool holders. Pay special attention to tool length and diameter measurements.

Now let's set up the work coordinate system. This is crucial for accurate positioning and machining. We'll establish the X, Y, and Z origins based on your part geometry.

Finally, we'll run through the calibration procedures to ensure everything is working correctly before starting your machining operation.`,
  comments: [
    {
      id: "1",
      user: "Mike Chen",
      content: "Great explanation! This really helped me understand the setup process.",
      timestamp: "2 hours ago",
      likes: 5
    },
    {
      id: "2", 
      user: "Sarah Johnson",
      content: "Could you cover more about tool length compensation in the next video?",
      timestamp: "1 day ago",
      likes: 3
    }
  ],
  relatedVideos: [
    {
      id: "2",
      title: "CNC Machine Setup - Part 2",
      description: "Advanced setup procedures and troubleshooting",
      duration: 240,
      thumbnail: "/api/placeholder/300/200",
      viewCount: 892
    },
    {
      id: "3",
      title: "Tool Change Procedure",
      description: "Step-by-step tool change process",
      duration: 150,
      thumbnail: "/api/placeholder/300/200",
      viewCount: 456
    },
    {
      id: "4",
      title: "CNC Programming Basics",
      description: "Introduction to CNC programming concepts",
      duration: 300,
      thumbnail: "/api/placeholder/300/200",
      viewCount: 1789
    }
  ]
};

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(mockVideo.duration);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-black">
          {/* Video Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Play className="w-10 h-10 text-white" />
              </div>
              <p className="text-white/80">Video Player</p>
              <p className="text-white/60 text-sm">Click to play</p>
            </div>
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-white/80">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
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
                      onClick={handleToggleMute}
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
                      onChange={handleVolumeChange}
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
      </Card>

      {/* Video Info and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-foreground">{mockVideo.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {mockVideo.viewCount.toLocaleString()} views
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTime(mockVideo.duration)}
                    </span>
                    <span>{mockVideo.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={handleLike}
                    className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {mockVideo.likeCount + (isLiked ? 1 : 0)}
                  </Button>
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={handleBookmark}
                  >
                    <Bookmark className="w-4 h-4 mr-1" />
                    {mockVideo.bookmarkCount + (isBookmarked ? 1 : 0)}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{mockVideo.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mockVideo.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Machine Type:</span>
                  <p className="font-medium">{mockVideo.machineType}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Process:</span>
                  <p className="font-medium">{mockVideo.processType}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tooling:</span>
                  <p className="font-medium">{mockVideo.tooling}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Step:</span>
                  <p className="font-medium">{mockVideo.step}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="transcript" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="comments">Comments ({mockVideo.commentCount})</TabsTrigger>
              <TabsTrigger value="related">Related Videos</TabsTrigger>
            </TabsList>

            <TabsContent value="transcript" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Video Transcript
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {mockVideo.transcript.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Comments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Comment */}
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-end">
                      <Button size="sm">Post Comment</Button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {mockVideo.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-process-orange rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{comment.user}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-foreground">{comment.content}</p>
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <MessageCircle className="w-3 h-3 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockVideo.relatedVideos.map((video) => (
                  <Card key={video.id} className="card-hover group">
                    <div className="flex space-x-3 p-4">
                      <div className="relative w-24 h-16 bg-muted rounded flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                          {formatTime(video.duration)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors duration-200">
                          {video.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {video.description}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Eye className="w-3 h-3 mr-1" />
                          {video.viewCount.toLocaleString()} views
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Uploader Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Uploaded by</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-industrial-gray rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{mockVideo.uploadedBy}</p>
                  <p className="text-sm text-muted-foreground">{mockVideo.organization}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Bookmark className="w-4 h-4 mr-2" />
                Add to Course
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Flag className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Video Settings
              </Button>
            </CardContent>
          </Card>

          {/* Video Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Video Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Views</span>
                <span className="font-medium">{mockVideo.viewCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Likes</span>
                <span className="font-medium">{mockVideo.likeCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bookmarks</span>
                <span className="font-medium">{mockVideo.bookmarkCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Comments</span>
                <span className="font-medium">{mockVideo.commentCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
