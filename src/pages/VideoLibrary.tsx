import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreHorizontal, 
  Play, 
  Download, 
  Share2, 
  Bookmark, 
  Eye,
  Clock,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const mockVideos = [
  {
    id: "1",
    title: "CNC Machine Setup - Part 1",
    description: "Basic setup procedures for CNC machine operation",
    duration: 180,
    thumbnail: "/api/placeholder/300/200",
    tags: ["CNC", "Setup", "Machine Operation"],
    machineType: "CNC Mill",
    processType: "Setup",
    status: "published",
    viewCount: 1247,
    likeCount: 89,
    createdAt: "2024-01-15",
    uploadedBy: "John Smith"
  },
  {
    id: "2",
    title: "Tool Change Procedure",
    description: "Step-by-step tool change process for precision machining",
    duration: 240,
    thumbnail: "/api/placeholder/300/200",
    tags: ["Tool Change", "Precision", "Machining"],
    machineType: "CNC Lathe",
    processType: "Tooling",
    status: "published",
    viewCount: 892,
    likeCount: 67,
    createdAt: "2024-01-14",
    uploadedBy: "Sarah Johnson"
  },
  {
    id: "3",
    title: "Quality Control Check",
    description: "Essential quality control procedures for finished parts",
    duration: 150,
    thumbnail: "/api/placeholder/300/200",
    tags: ["Quality Control", "Inspection", "Measurement"],
    machineType: "Inspection Station",
    processType: "Quality Control",
    status: "pending_review",
    viewCount: 456,
    likeCount: 34,
    createdAt: "2024-01-13",
    uploadedBy: "Mike Chen"
  },
  {
    id: "4",
    title: "Safety Protocols - Lockout/Tagout",
    description: "Critical safety procedures for equipment maintenance",
    duration: 300,
    thumbnail: "/api/placeholder/300/200",
    tags: ["Safety", "Lockout", "Maintenance"],
    machineType: "General",
    processType: "Safety",
    status: "published",
    viewCount: 2103,
    likeCount: 156,
    createdAt: "2024-01-12",
    uploadedBy: "David Rodriguez"
  },
  {
    id: "5",
    title: "Troubleshooting Common Issues",
    description: "How to identify and resolve common machining problems",
    duration: 420,
    thumbnail: "/api/placeholder/300/200",
    tags: ["Troubleshooting", "Maintenance", "Problem Solving"],
    machineType: "CNC Mill",
    processType: "Troubleshooting",
    status: "published",
    viewCount: 1789,
    likeCount: 123,
    createdAt: "2024-01-11",
    uploadedBy: "Lisa Wang"
  }
];

export default function VideoLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedMachine, setSelectedMachine] = useState<string>("all");
  const [selectedProcess, setSelectedProcess] = useState<string>("all");

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === "all" || video.status === selectedStatus;
    const matchesMachine = selectedMachine === "all" || video.machineType === selectedMachine;
    const matchesProcess = selectedProcess === "all" || video.processType === selectedProcess;
    
    return matchesSearch && matchesStatus && matchesMachine && matchesProcess;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-emerald-green text-white";
      case "pending_review": return "bg-amber text-white";
      case "draft": return "bg-secondary text-white";
      case "archived": return "bg-error-red text-white";
      default: return "bg-secondary text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Video Library</h1>
          <p className="text-muted-foreground">Browse and manage your training videos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>
          <Button>
            <Play className="w-4 h-4 mr-2" />
            Upload Video
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search videos, tags, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedMachine} onValueChange={setSelectedMachine}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Machine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Machines</SelectItem>
                  <SelectItem value="CNC Mill">CNC Mill</SelectItem>
                  <SelectItem value="CNC Lathe">CNC Lathe</SelectItem>
                  <SelectItem value="Inspection Station">Inspection Station</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Process" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Processes</SelectItem>
                  <SelectItem value="Setup">Setup</SelectItem>
                  <SelectItem value="Tooling">Tooling</SelectItem>
                  <SelectItem value="Quality Control">Quality Control</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="Troubleshooting">Troubleshooting</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredVideos.length} of {mockVideos.length} videos
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select defaultValue="newest">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="views">Most Views</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Video Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="card-hover group">
              <div className="relative">
                <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                  <Play className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                </div>
                <Badge className={cn("absolute top-2 right-2", getStatusColor(video.status))}>
                  {video.status.replace('_', ' ')}
                </Badge>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {video.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {video.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{video.tags.length - 2}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.viewCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.createdAt}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bookmark className="w-4 h-4 mr-2" />
                        Bookmark
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Machine Type</TableHead>
                <TableHead>Process</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVideos.map((video) => (
                <TableRow key={video.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                      <Play className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{video.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {video.description}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {video.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {video.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{video.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{video.machineType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{video.processType}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{formatDuration(video.duration)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(video.status)}>
                      {video.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{video.viewCount.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{video.createdAt}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bookmark className="w-4 h-4 mr-2" />
                          Bookmark
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No videos found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or upload a new video.
            </p>
            <Button>
              <Play className="w-4 h-4 mr-2" />
              Upload Video
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
