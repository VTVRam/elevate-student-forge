import { useState } from "react";
import { Search, Filter, Users, Star, Calendar, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/layout/Navigation";
import MentorCard from "@/components/mentors/MentorCard";

// Mock data for mentors
const mockMentors = [
  {
    id: "1",
    name: "Rajesh Kumar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    title: "Senior Software Engineer",
    company: "Google India",
    industry: "AI / ML",
    startupStage: "Series A+",
    location: "Bangalore, India",
    bio: "10+ years in software development with expertise in scalable systems. Passionate about mentoring the next generation of developers.",
    specialties: ["System Design", "Career Guidance", "Interview Prep", "Leadership"],
    rating: 4.9,
    reviewCount: 127,
    experience: "10+ years",
    availability: "available" as const,
    services: [
      { type: "video" as const, price: 300, duration: "45 min" },
      { type: "call" as const, price: 200, duration: "30 min" },
      { type: "chat" as const, price: 100, duration: "1 hour" }
    ],
    verified: true,
    alumniOf: "IIT Bombay",
    responseTime: "< 2 hours",
    collaborationMode: ["Open to Internships", "Remote Collaboration"],
    internshipOpportunity: "Summer 2024 - ML Engineering Intern at Google"
  },
  {
    id: "2",
    name: "Priya Agarwal",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    title: "Product Manager",
    company: "Microsoft",
    industry: "FinTech",
    startupStage: "Early Revenue",
    location: "Hyderabad, India",
    bio: "Product strategy expert with experience launching products used by millions. Love helping students break into product management.",
    specialties: ["Product Strategy", "PM Interviews", "Market Research", "User Experience"],
    rating: 4.8,
    reviewCount: 89,
    experience: "8+ years",
    availability: "busy" as const,
    services: [
      { type: "video" as const, price: 450, duration: "60 min" },
      { type: "call" as const, price: 250, duration: "45 min" }
    ],
    verified: true,
    alumniOf: "IIT Delhi",
    responseTime: "< 4 hours",
    collaborationMode: ["Paid Project / Freelance"],
    internshipOpportunity: "Product Management Internship - Microsoft Teams"
  },
  {
    id: "3",
    name: "Amit Sharma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    title: "Co-Founder & CTO",
    company: "TechStartup India",
    industry: "FinTech",
    startupStage: "Seed Funded",
    location: "Mumbai, India",
    bio: "Serial entrepreneur with 2 successful exits. Currently building in the fintech space. Happy to share startup insights.",
    specialties: ["Entrepreneurship", "Startup Strategy", "Tech Leadership", "Fundraising"],
    rating: 4.7,
    reviewCount: 156,
    experience: "12+ years",
    availability: "available" as const,
    services: [
      { type: "video" as const, price: 500, duration: "60 min" },
      { type: "call" as const, price: 350, duration: "45 min" },
      { type: "chat" as const, price: 150, duration: "1 hour" }
    ],
    verified: true,
    responseTime: "< 6 hours",
    collaborationMode: ["Co-Founder Search", "Open to Internships"],
    internshipOpportunity: "CTO Internship - FinTech Startup Mumbai"
  },
  {
    id: "4",
    name: "Sneha Jain",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    title: "Data Science Manager",
    company: "Amazon",
    industry: "AI / ML",
    startupStage: "Series A+",
    location: "Bangalore, India",
    bio: "ML expert with published research papers. Transitioned from academia to industry and love helping others do the same.",
    specialties: ["Data Science", "Machine Learning", "Career Transition", "Research"],
    rating: 4.9,
    reviewCount: 203,
    experience: "9+ years",
    availability: "available" as const,
    services: [
      { type: "video" as const, price: 400, duration: "50 min" },
      { type: "call" as const, price: 250, duration: "35 min" }
    ],
    verified: true,
    alumniOf: "IISc Bangalore",
    responseTime: "< 3 hours",
    collaborationMode: ["Open to Internships", "Remote Collaboration"],
    internshipOpportunity: "Data Science Summer Intern - Amazon ML"
  },
  {
    id: "5",
    name: "Vikram Singh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    title: "Investment Banking VP",
    company: "Goldman Sachs",
    industry: "FinTech",
    startupStage: "Series A+",
    location: "Mumbai, India",
    bio: "Finance professional with expertise in investment banking and corporate finance. Mentor for finance career aspirants.",
    specialties: ["Investment Banking", "Corporate Finance", "Financial Modeling", "Career Prep"],
    rating: 4.6,
    reviewCount: 67,
    experience: "7+ years",
    availability: "offline" as const,
    services: [
      { type: "video" as const, price: 100, duration: "60 min" },
      { type: "call" as const, price: 100, duration: "45 min" }
    ],
    verified: true,
    alumniOf: "IIM Ahmedabad",
    responseTime: "< 8 hours",
    collaborationMode: ["Paid Project / Freelance"],
    internshipOpportunity: "Investment Banking Summer Analyst - Goldman Sachs"
  },
  {
    id: "6",
    name: "Kavya Reddy",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    title: "UX Design Lead",
    company: "Flipkart",
    industry: "E-Commerce",
    startupStage: "Series A+",
    location: "Bangalore, India",
    bio: "Design thinking expert with a passion for creating user-centered products. Mentoring aspiring designers for 5+ years.",
    specialties: ["UX Design", "Design Thinking", "Portfolio Review", "Design Systems"],
    rating: 4.8,
    reviewCount: 94,
    experience: "6+ years",
    availability: "available" as const,
    services: [
      { type: "video" as const, price: 300, duration: "45 min" },
      { type: "call" as const, price: 200, duration: "30 min" },
      { type: "chat" as const, price: 100, duration: "1 hour" }
    ],
    verified: true,
    alumniOf: "NID Ahmedabad",
    responseTime: "< 2 hours",
    collaborationMode: ["Open to Internships", "Remote Collaboration"],
    internshipOpportunity: "UX Design Intern - Flipkart Design Team"
  }
];

const industries = ["All", "AI / ML", "Web Development", "App Development", "Sustainability", "FinTech", "E-Commerce", "Hardware / IoT", "Gaming", "HealthTech / MedTech"];
const startupStages = ["All", "Idea Stage", "MVP Built", "Early Revenue", "Seed Funded", "Series A+"];
const colleges = ["All", "IIT Alumni", "IIM Alumni", "NIT Alumni", "Other"];
const availability = ["All", "Available", "Busy", "Offline"];
const collaborationModes = ["All", "Open to Internships", "Remote Collaboration", "Paid Project / Freelance", "Co-Founder Search"];
const skills = ["All", "Frontend Dev", "Backend Dev", "UI/UX Design", "Content Writing", "Marketing", "Sales", "Finance"];
const founderTypes = ["All", "First-Time Founder", "Serial Entrepreneur", "Student Founder"];
const verificationStatus = ["All", "Verified by Elevate", "High-rated by students", "Trending / Popular Founders"];

export default function Mentors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStartupStage, setSelectedStartupStage] = useState("All");
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [selectedCollaborationMode, setSelectedCollaborationMode] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedFounderType, setSelectedFounderType] = useState("All");
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesIndustry = selectedIndustry === "All" || mentor.industry === selectedIndustry;
    const matchesStartupStage = selectedStartupStage === "All" || mentor.startupStage === selectedStartupStage;
    const matchesCollege = selectedCollege === "All" || 
                          (selectedCollege === "IIT Alumni" && mentor.alumniOf?.includes("IIT")) ||
                          (selectedCollege === "IIM Alumni" && mentor.alumniOf?.includes("IIM")) ||
                          (selectedCollege === "NIT Alumni" && mentor.alumniOf?.includes("NIT")) ||
                          (selectedCollege === "Other" && (!mentor.alumniOf || (!mentor.alumniOf.includes("IIT") && !mentor.alumniOf.includes("IIM") && !mentor.alumniOf.includes("NIT"))));
    const matchesAvailability = selectedAvailability === "All" || 
                               (selectedAvailability === "Available" && mentor.availability === "available") ||
                               (selectedAvailability === "Busy" && mentor.availability === "busy") ||
                               (selectedAvailability === "Offline" && mentor.availability === "offline");
    const matchesCollaborationMode = selectedCollaborationMode === "All" || mentor.collaborationMode?.includes(selectedCollaborationMode);
    const matchesSkill = selectedSkill === "All" || mentor.specialties.some(specialty => specialty.toLowerCase().includes(selectedSkill.toLowerCase()));
    const matchesFounderType = selectedFounderType === "All"; // This would need to be added to mentor data
    const matchesVerificationStatus = selectedVerificationStatus === "All" || 
                                     (selectedVerificationStatus === "Verified by Elevate" && mentor.verified) ||
                                     (selectedVerificationStatus === "High-rated by students" && mentor.rating >= 4.8);

    return matchesSearch && matchesIndustry && matchesStartupStage && matchesCollege && matchesAvailability && matchesCollaborationMode && matchesSkill && matchesFounderType && matchesVerificationStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Expert{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Mentors
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get personalized guidance from industry professionals and successful alumni. 
              Accelerate your career with expert mentorship.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search mentors, companies, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-card border-border"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Filter Mentors</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <div className={`space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              {/* Core Filters Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Domain / Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStartupStage} onValueChange={setSelectedStartupStage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Stage of Startup" />
                  </SelectTrigger>
                  <SelectContent>
                    {startupStages.map(stage => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                  <SelectTrigger>
                    <SelectValue placeholder="College Alumni" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map(college => (
                      <SelectItem key={college} value={college}>{college}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mentorship Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {availability.map(avail => (
                      <SelectItem key={avail} value={avail}>{avail}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Core Filters Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select value={selectedCollaborationMode} onValueChange={setSelectedCollaborationMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Collaboration Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {collaborationModes.map(mode => (
                      <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Skills Required" />
                  </SelectTrigger>
                  <SelectContent>
                    {skills.map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedFounderType} onValueChange={setSelectedFounderType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Founder Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {founderTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedVerificationStatus} onValueChange={setSelectedVerificationStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Verified / Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    {verificationStatus.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => {
                  setSelectedIndustry("All");
                  setSelectedStartupStage("All");
                  setSelectedCollege("All");
                  setSelectedAvailability("All");
                  setSelectedCollaborationMode("All");
                  setSelectedSkill("All");
                  setSelectedFounderType("All");
                  setSelectedVerificationStatus("All");
                  setSearchQuery("");
                }}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {filteredMentors.length} Mentors Found
            </h2>
            <p className="text-muted-foreground">
              Connect with verified industry professionals
            </p>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className="text-success">
              <Users className="w-3 h-3 mr-1" />
              {filteredMentors.filter(m => m.availability === "available").length} Available
            </Badge>
            <Badge variant="outline" className="text-verified">
              <Shield className="w-3 h-3 mr-1" />
              {filteredMentors.filter(m => m.verified).length} Verified
            </Badge>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No mentors found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria to find more mentors.
            </p>
            <Button onClick={() => {
              setSelectedIndustry("All");
              setSelectedStartupStage("All");
              setSelectedCollege("All");
              setSelectedAvailability("All");
              setSelectedCollaborationMode("All");
              setSelectedSkill("All");
              setSelectedFounderType("All");
              setSelectedVerificationStatus("All");
              setSearchQuery("");
            }}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}