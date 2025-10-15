import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Users, 
  Shield, 
  Zap, 
  Search, 
  BookOpen, 
  Award,
  ArrowRight,
  Star
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-process-orange/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-green/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-process-orange rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Play className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Winbro Training Reels</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="hover:bg-primary/10 transition-colors duration-200">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="btn-gradient">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-process-orange/10 border-primary/20">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              Industrial Knowledge Sharing Platform
            </Badge>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Revolutionize Industrial
              <span className="text-gradient block mt-2"> Training</span>
              <br />
              <span className="text-4xl md:text-5xl">with Short, Searchable Video Clips</span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Capture machine operation, tooling, setup, and troubleshooting expertise in 20-30 second clips. 
              Build courses, track progress, and preserve tribal knowledge for your team.
            </p>
          </div>
          
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style={{animationDelay: '0.6s'}}>
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto btn-gradient group">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 group">
              <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need for Industrial Training
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From video capture to course creation, we provide all the tools your team needs to succeed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Play,
                title: "Video Capture & Upload",
                description: "Easy drag-and-drop upload with guided capture workflow and quality controls.",
                gradient: "from-primary to-primary/80"
              },
              {
                icon: Search,
                title: "AI-Powered Search",
                description: "Find exactly what you need with semantic search across transcripts and metadata.",
                gradient: "from-process-orange to-process-orange/80"
              },
              {
                icon: BookOpen,
                title: "Course Builder",
                description: "Drag-and-drop course creation with quizzes, progress tracking, and certifications.",
                gradient: "from-emerald-green to-emerald-green/80"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Share knowledge across teams with role-based access and customer-specific libraries.",
                gradient: "from-amber to-amber/80"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security with SSO, encryption, and comprehensive audit trails.",
                gradient: "from-industrial-gray to-industrial-gray/80"
              },
              {
                icon: Award,
                title: "Certification & Analytics",
                description: "Track progress, issue certificates, and gain insights into training effectiveness.",
                gradient: "from-primary to-process-orange"
              }
            ].map((feature, index) => (
              <Card key={index} className="card-hover group animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-200">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Capture & Upload",
                description: "Record short training clips or upload existing videos with guided metadata entry.",
                gradient: "from-primary to-primary/80"
              },
              {
                step: "2",
                title: "Organize & Build",
                description: "Use AI-powered tagging and search to organize content and build structured courses.",
                gradient: "from-process-orange to-process-orange/80"
              },
              {
                step: "3",
                title: "Share & Track",
                description: "Assign courses to teams, track progress, and issue certificates upon completion.",
                gradient: "from-emerald-green to-emerald-green/80"
              }
            ].map((step, index) => (
              <div key={index} className="text-center animate-fade-in-up group" style={{animationDelay: `${index * 0.2}s`}}>
                <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                  <span className="text-3xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-200">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our customers are saying about Winbro Training Reels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "This platform has transformed how we share knowledge across our manufacturing teams. 
                  The search functionality is incredible - we can find exactly what we need in seconds."
                </p>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">Operations Manager, TechCorp</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The course builder is so intuitive. We've created comprehensive training programs 
                  that our new hires can complete at their own pace. Completion rates have increased by 40%."
                </p>
                <div className="font-semibold">Mike Chen</div>
                <div className="text-sm text-muted-foreground">Training Director, Global Manufacturing</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally, a solution that understands industrial training needs. The offline capability 
                  is perfect for our shop floor environment where connectivity can be spotty."
                </p>
                <div className="font-semibold">David Rodriguez</div>
                <div className="text-sm text-muted-foreground">Plant Manager, Precision Tools Inc.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Training?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using Winbro Training Reels to accelerate 
            onboarding and preserve tribal knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Winbro Training Reels</span>
              </div>
              <p className="text-muted-foreground">
                Revolutionizing industrial knowledge sharing through short, searchable video clips.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/integrations">Integrations</Link></li>
                <li><Link to="/api">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/status">Status</Link></li>
                <li><Link to="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Winbro Training Reels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
