import { MessageSquare, MapPin, Star, Users, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    avatar?: string;
    college: string;
    year: string;
    course: string;
    location: string;
    bio: string;
    skills: string[];
    achievements: number;
    connections: number;
    rating: number;
    badges: Array<{
      name: string;
      color: string;
    }>;
    projects: number;
    verified: boolean;
    online: boolean;
  };
}

export default function StudentCard({ student }: StudentCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="card-elevated group">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
            {student.online && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card pulse-new"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {student.name}
              </h3>
              {student.verified && (
                <Badge className="verified-badge text-xs">Verified</Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-1">
              {student.course} • {student.year}
            </p>
            
            <p className="text-sm text-muted-foreground mb-2">
              {student.college}
            </p>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1" />
              {student.location}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-premium" />
            <span className="text-sm font-medium">{student.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {student.bio}
        </p>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {student.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {student.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{student.skills.length - 3} more
            </Badge>
          )}
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {student.badges.slice(0, 2).map((badge, index) => (
            <Badge key={index} className="text-xs" style={{ backgroundColor: badge.color }}>
              {badge.name}
            </Badge>
          ))}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
          <div className="text-center">
            <div className="font-semibold text-foreground">{student.achievements}</div>
            <div className="text-xs text-muted-foreground">Achievements</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-foreground">{student.connections}</div>
            <div className="text-xs text-muted-foreground">Connections</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-foreground">{student.projects}</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 btn-primary">
            <Users className="w-4 h-4 mr-2" />
            Connect
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