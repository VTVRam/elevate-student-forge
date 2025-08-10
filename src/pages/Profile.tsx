import { useState } from "react";
import { 
  User, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  Github, 
  Linkedin, 
  Edit,
  Plus,
  Trophy,
  Star,
  Users,
  BookOpen,
  Award,
  Target,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/layout/Navigation";

// Mock user data
const userData = {
  name: "Rahul Sharma",
  avatar: "",
  email: "rahul.sharma@iitdelhi.ac.in",
  phone: "+91 98765 43210",
  college: "IIT Delhi",
  year: "3rd Year",
  course: "Computer Science & Engineering",
  location: "Delhi, India",
  bio: "Passionate computer science student with a keen interest in artificial intelligence and machine learning. I love building innovative solutions and contributing to open-source projects. Currently working on my final year project involving natural language processing.",
  website: "https://rahulsharma.dev",
  github: "https://github.com/rahulsharma",
  linkedin: "https://linkedin.com/in/rahulsharma-dev",
  joinDate: "September 2022",
  verified: true,
  
  stats: {
    rank: 12,
    points: 2180,
    badges: 8,
    eventsAttended: 15,
    connections: 147,
    projects: 6
  },
  
  skills: [
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Machine Learning", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "SQL", level: 85 },
    { name: "Docker", level: 65 },
    { name: "AWS", level: 60 }
  ],
  
  badges: [
    { name: "Event Champion", description: "Attended 10+ events", color: "#007BFF", icon: Calendar },
    { name: "Network Builder", description: "Connected 100+ students", color: "#C6FF00", icon: Users },
    { name: "Top Performer", description: "Top 20 this month", color: "#FFC107", icon: Trophy },
    { name: "Open Source", description: "Contributed to 5+ projects", color: "#28A745", icon: Github },
    { name: "Mentor", description: "Helped 20+ juniors", color: "#17A2B8", icon: Star },
    { name: "Hackathon Winner", description: "Won 3 hackathons", color: "#DC3545", icon: Award },
    { name: "Project Lead", description: "Led 5+ projects", color: "#6F42C1", icon: Target },
    { name: "Community Leader", description: "Active community member", color: "#FD7E14", icon: Users }
  ],
  
  projects: [
    {
      title: "AI-Powered Study Assistant",
      description: "A machine learning application that helps students organize their study materials and provides personalized recommendations.",
      tech: ["Python", "TensorFlow", "React", "Flask"],
      status: "Completed",
      link: "https://github.com/rahulsharma/ai-study-assistant"
    },
    {
      title: "Campus Event Management System",
      description: "A full-stack web application for managing college events with real-time notifications and user engagement features.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      status: "In Progress", 
      link: "https://github.com/rahulsharma/campus-events"
    },
    {
      title: "Blockchain Voting System",
      description: "A secure and transparent voting system built on blockchain technology for college elections.",
      tech: ["Solidity", "Web3.js", "React", "Ethereum"],
      status: "Completed",
      link: "https://github.com/rahulsharma/blockchain-voting"
    }
  ],
  
  recentActivity: [
    { type: "event", title: "Attended AI/ML Workshop", date: "2 days ago" },
    { type: "connection", title: "Connected with Priya from BITS", date: "3 days ago" },
    { type: "badge", title: "Earned 'Mentor' badge", date: "1 week ago" },
    { type: "project", title: "Updated Study Assistant project", date: "1 week ago" },
    { type: "event", title: "Won Hackathon at IIT Mumbai", date: "2 weeks ago" }
  ]
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="card-elevated mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center lg:items-start space-y-4 mb-6 lg:mb-0">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                      {getInitials(userData.name)}
                    </AvatarFallback>
                  </Avatar>
                  {userData.verified && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="verified-badge">Verified</Badge>
                    </div>
                  )}
                </div>
                
                <Button variant="outline" className="nav-item">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {userData.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-1">
                    {userData.course}
                  </p>
                  <p className="text-muted-foreground">
                    {userData.college} • {userData.year}
                  </p>
                </div>

                <p className="text-foreground leading-relaxed">
                  {userData.bio}
                </p>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {userData.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined {userData.joinDate}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {userData.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {userData.phone}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 pt-2">
                  <Button variant="outline" size="sm" className="nav-item">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                  <Button variant="outline" size="sm" className="nav-item">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm" className="nav-item">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6 lg:text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">#{userData.stats.rank}</div>
                  <div className="text-sm text-muted-foreground">Rank</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{userData.stats.points}</div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">{userData.stats.badges}</div>
                  <div className="text-sm text-muted-foreground">Badges</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Skills */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Skills & Technologies</span>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userData.skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="font-bold text-foreground">{userData.stats.eventsAttended}</div>
                        <div className="text-sm text-muted-foreground">Events</div>
                      </div>
                      <div className="text-center">
                        <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                        <div className="font-bold text-foreground">{userData.stats.connections}</div>
                        <div className="text-sm text-muted-foreground">Connections</div>
                      </div>
                      <div className="text-center">
                        <BookOpen className="h-8 w-8 text-verified mx-auto mb-2" />
                        <div className="font-bold text-foreground">{userData.stats.projects}</div>
                        <div className="text-sm text-muted-foreground">Projects</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Top Badges */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Badges</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {userData.badges.slice(0, 4).map((badge, index) => {
                      const Icon = badge.icon;
                      return (
                        <div key={index} className="flex items-center space-x-3">
                          <div 
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${badge.color}20` }}
                          >
                            <Icon className="h-4 w-4" style={{ color: badge.color }} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground text-sm">
                              {badge.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {badge.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">My Projects</h2>
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {userData.projects.map((project, index) => (
                  <Card key={index} className="card-elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lg">{project.title}</span>
                        <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="w-full nav-item">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Project
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="mt-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Achievement Badges</h2>
                <p className="text-muted-foreground">{userData.badges.length} badges earned</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.badges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <Card key={index} className="card-elevated text-center">
                      <CardContent className="p-6">
                        <div 
                          className="p-4 rounded-full w-fit mx-auto mb-4"
                          style={{ backgroundColor: `${badge.color}20` }}
                        >
                          <Icon className="h-8 w-8" style={{ color: badge.color }} />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {badge.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {badge.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-8">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.recentActivity.map((activity, index) => {
                  const getActivityIcon = (type: string) => {
                    switch (type) {
                      case "event": return Calendar;
                      case "connection": return Users;
                      case "badge": return Award;
                      case "project": return BookOpen;
                      default: return Star;
                    }
                  };
                  
                  const Icon = getActivityIcon(activity.type);
                  
                  return (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}