import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Trophy, 
  User,
  Menu,
  X,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Events",
    href: "/events",
    icon: Calendar,
    description: "Discover amazing events"
  },
  {
    name: "Networking",
    href: "/networking", 
    icon: Users,
    description: "Connect with students"
  },
  {
    name: "Mentors",
    href: "/mentors",
    icon: MessageSquare,
    description: "Find expert guidance"
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
    description: "Student rankings"
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    description: "Your achievements"
  }
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 nav-item">
            <img 
              src="/lovable-uploads/cf3382d9-e303-4112-bbd2-043ec00d80d6.png" 
              alt="Elevate Logo" 
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl text-foreground">Elevate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 nav-item flex items-center space-x-2",
                    active
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-button)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" className="nav-item">
              <Shield className="h-4 w-4 mr-2" />
              Verified
            </Button>
            <Button className="btn-primary">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Verified Student
              </Button>
              <Button className="w-full btn-primary">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}