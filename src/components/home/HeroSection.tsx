import { ArrowRight, Users, Calendar, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Students",
    color: "text-primary"
  },
  {
    icon: Calendar,
    value: "1000+",
    label: "Events Monthly",
    color: "text-accent"
  },
  {
    icon: Award,
    value: "200+",
    label: "Mentors",
    color: "text-verified"
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    color: "text-premium"
  }
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-hero opacity-5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 pulse-new"></span>
            India's #1 Student Platform
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in">
            Elevate Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Student Journey
            </span>
          </h1>

          {/* Hero Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            Connect with peers, discover exciting events, and find expert mentors. 
            Build your profile and network in India's most trusted student community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
            <Button size="lg" className="btn-primary text-lg px-8 py-4">
              Start Networking
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 nav-item">
              Discover Events
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="card-elevated p-6 text-center">
                  <CardContent className="p-0">
                    <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}