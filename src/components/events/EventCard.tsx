import { Calendar, MapPin, Users, DollarSign, Trophy, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    type: string;
    organizer: string;
    date: string;
    time: string;
    location: string;
    registrationStatus: "open" | "closed" | "full";
    isPaid: boolean;
    fee?: number;
    prizePool?: string;
    participants: number;
    maxParticipants: number;
    tags: string[];
    verified: boolean;
    trending?: boolean;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const getStatusBadge = () => {
    switch (event.registrationStatus) {
      case "open":
        return <Badge className="bg-success text-success-foreground">Registration Open</Badge>;
      case "closed":
        return <Badge variant="destructive">Registration Closed</Badge>;
      case "full":
        return <Badge variant="secondary">Full</Badge>;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (event.registrationStatus) {
      case "open":
        return "border-l-success";
      case "closed":
        return "border-l-destructive";
      case "full":
        return "border-l-muted";
      default:
        return "border-l-border";
    }
  };

  return (
    <Card className={`card-elevated border-l-4 ${getStatusColor()} group`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {event.type}
              </Badge>
              {event.verified && (
                <Badge className="verified-badge text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              {event.trending && (
                <Badge variant="destructive" className="text-xs pulse-new">
                  Trending
                </Badge>
              )}
            </div>
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              by {event.organizer}
            </p>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            {event.date} at {event.time}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            {event.location}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            {event.participants} / {event.maxParticipants} participants
          </div>
          
          {event.isPaid && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4 mr-2 text-accent" />
              Registration Fee: ₹{event.fee}
            </div>
          )}
          
          {event.prizePool && (
            <div className="flex items-center text-sm text-success">
              <Trophy className="w-4 h-4 mr-2" />
              Prize Pool: {event.prizePool}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 btn-primary" 
            disabled={event.registrationStatus !== "open"}
          >
            {event.registrationStatus === "open" ? "Register Now" : "View Details"}
          </Button>
          <Button variant="outline" size="sm" className="nav-item">
            <Clock className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}