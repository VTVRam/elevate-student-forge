import { MapPin, Star, Calendar, Video, Phone, MessageSquare, ExternalLink, Shield } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    avatar?: string;
    title: string;
    company: string;
    industry: string;
    location: string;
    bio: string;
    specialties: string[];
    rating: number;
    reviewCount: number;
    experience: string;
    availability: "available" | "busy" | "offline";
    services: Array<{
      type: "call" | "video" | "chat";
      price: number;
      duration: string;
    }>;
    verified: boolean;
    alumniOf?: string;
    responseTime: string;
  };
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvailabilityBadge = () => {
    switch (mentor.availability) {
      case "available":
        return <Badge className="bg-success text-success-foreground">Available</Badge>;
      case "busy":
        return <Badge variant="secondary">Busy</Badge>;
      case "offline":
        return <Badge variant="outline">Offline</Badge>;
      default:
        return null;
    }
  };

  const getAvailabilityColor = () => {
    switch (mentor.availability) {
      case "available":
        return "border-l-success";
      case "busy":
        return "border-l-accent";
      case "offline":
        return "border-l-muted";
      default:
        return "border-l-border";
    }
  };

  return (
    <Card className={`card-elevated border-l-4 ${getAvailabilityColor()} group`}>
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentor.avatar} alt={mentor.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(mentor.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {mentor.name}
              </h3>
              {mentor.verified && (
                <Badge className="verified-badge text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            
            <p className="font-medium text-sm text-foreground mb-1">
              {mentor.title}
            </p>
            
            <p className="text-sm text-muted-foreground mb-1">
              {mentor.company}
            </p>
            
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="w-3 h-3 mr-1" />
              {mentor.location}
            </div>
            
            {mentor.alumniOf && (
              <p className="text-xs text-accent font-medium">
                Alumni: {mentor.alumniOf}
              </p>
            )}
          </div>
          
          <div className="text-right">
            {getAvailabilityBadge()}
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 fill-current text-premium mr-1" />
              <span className="text-sm font-medium">{mentor.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">
                ({mentor.reviewCount})
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {mentor.bio}
        </p>
        
        {/* Industry & Experience */}
        <div className="flex items-center gap-4 text-sm">
          <Badge variant="outline">{mentor.industry}</Badge>
          <span className="text-muted-foreground">{mentor.experience} experience</span>
        </div>
        
        {/* Specialties */}
        <div className="flex flex-wrap gap-1">
          {mentor.specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {mentor.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{mentor.specialties.length - 3} more
            </Badge>
          )}
        </div>
        
        {/* Services */}
        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-sm font-medium text-foreground">Services Available:</h4>
          {mentor.services.map((service, index) => {
            const Icon = service.type === "video" ? Video : service.type === "call" ? Phone : MessageSquare;
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-2 text-primary" />
                  <span className="capitalize">{service.type} Call</span>
                  <span className="text-muted-foreground ml-1">({service.duration})</span>
                </div>
                <span className="font-medium text-foreground">₹{service.price}</span>
              </div>
            );
          })}
        </div>
        
        {/* Response Time */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Response time:</span>
          <span className="font-medium text-success">{mentor.responseTime}</span>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 btn-primary" 
            disabled={mentor.availability === "offline"}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Session
          </Button>
          <Button variant="outline" size="sm" className="nav-item">
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="nav-item">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}