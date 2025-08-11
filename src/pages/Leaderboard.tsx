import { useState } from "react";
import { Trophy, Medal, Award, Star, TrendingUp, Users, Calendar, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/layout/Navigation";

// Mock data for leaderboard
const leaderboardData = [{
  rank: 1,
  name: "Arjun Patel",
  avatar: "",
  college: "IIT Delhi",
  points: 2845,
  badges: 15,
  eventsAttended: 28,
  connectionsHelped: 42,
  specialty: "AI/ML Expert",
  trend: "up",
  weeklyGain: 145
}, {
  rank: 2,
  name: "Priya Sharma",
  avatar: "",
  college: "BITS Pilani",
  points: 2720,
  badges: 13,
  eventsAttended: 25,
  connectionsHelped: 38,
  specialty: "Full Stack Dev",
  trend: "up",
  weeklyGain: 98
}, {
  rank: 3,
  name: "Sneha Reddy",
  avatar: "",
  college: "NIT Warangal",
  points: 2650,
  badges: 12,
  eventsAttended: 22,
  connectionsHelped: 35,
  specialty: "Data Science",
  trend: "down",
  weeklyGain: -23
}, {
  rank: 4,
  name: "Vikash Kumar",
  avatar: "",
  college: "VIT Vellore",
  points: 2580,
  badges: 11,
  eventsAttended: 24,
  connectionsHelped: 31,
  specialty: "Mobile Dev",
  trend: "up",
  weeklyGain: 67
}, {
  rank: 5,
  name: "Ananya Singh",
  avatar: "",
  college: "IIIT Bangalore",
  points: 2490,
  badges: 10,
  eventsAttended: 21,
  connectionsHelped: 29,
  specialty: "UI/UX Design",
  trend: "up",
  weeklyGain: 54
}, {
  rank: 6,
  name: "Rohit Gupta",
  avatar: "",
  college: "DTU Delhi",
  points: 2380,
  badges: 9,
  eventsAttended: 19,
  connectionsHelped: 26,
  specialty: "Blockchain",
  trend: "up",
  weeklyGain: 89
}, {
  rank: 7,
  name: "Kavya Reddy",
  avatar: "",
  college: "IIIT Hyderabad",
  points: 2310,
  badges: 9,
  eventsAttended: 18,
  connectionsHelped: 24,
  specialty: "Cybersecurity",
  trend: "down",
  weeklyGain: -12
}, {
  rank: 8,
  name: "Amit Sharma",
  avatar: "",
  college: "IIT Bombay",
  points: 2250,
  badges: 8,
  eventsAttended: 17,
  connectionsHelped: 22,
  specialty: "DevOps",
  trend: "up",
  weeklyGain: 43
}];
const achievements = [{
  title: "Event Participant",
  description: "Attended 10+ events",
  icon: Calendar,
  color: "text-primary",
  count: 156
}, {
  title: "Network Builder",
  description: "Connected 50+ students",
  icon: Users,
  color: "text-accent",
  count: 89
}, {
  title: "Top Performer",
  description: "Top 10 this month",
  icon: Trophy,
  color: "text-premium",
  count: 23
}, {
  title: "Goal Achiever",
  description: "Completed all goals",
  icon: Target,
  color: "text-success",
  count: 67
}];
export default function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-premium" />;
      case 2:
        return <Medal className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="h-6 w-6 flex items-center justify-center bg-muted rounded-full text-sm font-bold">{rank}</div>;
    }
  };
  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = ["bg-premium", "bg-muted-foreground", "bg-amber-600"];
      return <Badge className={`${colors[rank - 1]} text-white`}>#{rank}</Badge>;
    }
    return <Badge variant="outline">#{rank}</Badge>;
  };
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Student{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              See how you rank among peers. Earn points through events, connections, and community contributions.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="mb-8">
          
        </Tabs>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-premium" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaderboardData.map((student, index) => <div key={student.rank} className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 hover:bg-muted/50 ${student.rank <= 3 ? 'bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20' : 'bg-card'}`}>
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {getRankIcon(student.rank)}
                    </div>

                    {/* Avatar */}
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(student.name)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Student Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">
                          {student.name}
                        </h3>
                        {getRankBadge(student.rank)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {student.college} • {student.specialty}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg text-foreground">
                          {student.points.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">pts</span>
                      </div>
                      
                      <div className={`flex items-center text-sm ${student.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                        <TrendingUp className={`h-3 w-3 mr-1 ${student.trend === 'down' ? 'rotate-180' : ''}`} />
                        {student.weeklyGain > 0 ? '+' : ''}{student.weeklyGain}
                      </div>
                    </div>

                    {/* Action */}
                    <Button variant="outline" size="sm" className="nav-item">
                      View Profile
                    </Button>
                  </div>)}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Rank Card */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Your Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-primary">#12</div>
                  <div className="text-sm text-muted-foreground">Current Rank</div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">2,180</div>
                      <div className="text-xs text-muted-foreground">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-success">+87</div>
                      <div className="text-xs text-muted-foreground">This Week</div>
                    </div>
                  </div>
                  
                  <Button className="w-full btn-primary">
                    Improve Rank
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Top Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return <div key={index} className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-primary/10`}>
                        <Icon className={`h-4 w-4 ${achievement.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {achievement.count}
                      </Badge>
                    </div>;
              })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Platform Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="font-bold text-primary">50K+</div>
                    <div className="text-xs text-muted-foreground">Active Students</div>
                  </div>
                  <div className="text-center p-3 bg-accent/10 rounded-lg">
                    <div className="font-bold text-accent">1000+</div>
                    <div className="text-xs text-muted-foreground">Monthly Events</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
}