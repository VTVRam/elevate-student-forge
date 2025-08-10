import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Trophy, 
  Shield, 
  Zap,
  Star,
  UserCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Calendar,
    title: "Event Discovery",
    description: "Find hackathons, workshops, competitions, and networking events tailored to your interests.",
    badge: "Popular",
    badgeVariant: "default" as const,
    highlights: ["Real-time updates", "Smart filtering", "Registration tracking"]
  },
  {
    icon: Users,
    title: "Student Networking",
    description: "Connect with like-minded students, build professional relationships, and collaborate on projects.",
    badge: "Trending",
    badgeVariant: "secondary" as const,
    highlights: ["Verified profiles", "Interest matching", "Direct messaging"]
  },
  {
    icon: MessageSquare,
    title: "Expert Mentorship",
    description: "Get guidance from industry professionals and successful alumni to accelerate your career.",
    badge: "Premium",
    badgeVariant: "outline" as const,
    highlights: ["1-on-1 sessions", "Industry experts", "Career guidance"]
  },
  {
    icon: Trophy,
    title: "Gamified Experience",
    description: "Earn badges, climb leaderboards, and showcase your achievements in a competitive environment.",
    badge: "New",
    badgeVariant: "destructive" as const,
    highlights: ["Achievement system", "Peer recognition", "Skill validation"]
  }
];

const trustFeatures = [
  {
    icon: Shield,
    title: "College Verified",
    description: "Every user is verified through college email and mobile OTP"
  },
  {
    icon: UserCheck,
    title: "Trusted Community", 
    description: "Report system and moderation for safe interactions"
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Live pulse forums and instant event notifications"
  },
  {
    icon: Star,
    title: "Quality Events",
    description: "Curated events from verified organizers only"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From event discovery to mentorship, Elevate provides all the tools you need 
            to build meaningful connections and advance your career.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card-elevated p-8 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant={feature.badgeVariant} className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust & Security Features */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Built on Trust & Security
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your safety and privacy are our top priorities. Every interaction is secure and verified.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card-elevated p-6 text-center group">
                <CardContent className="p-0">
                  <div className="p-3 rounded-xl bg-verified/10 group-hover:bg-verified/20 transition-colors w-fit mx-auto mb-4">
                    <Icon className="h-6 w-6 text-verified" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}