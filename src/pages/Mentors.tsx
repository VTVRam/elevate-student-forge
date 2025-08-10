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
    avatar: "",
    title: "Senior Software Engineer",
    company: "Google India",
    industry: "Technology",
    location: "Bangalore, India",
    bio: "10+ years in software development with expertise in scalable systems. Passionate about mentoring the next generation of developers.",
    specialties: ["System Design", "Career Guidance", "Interview Prep", "Leadership"],
    rating: 4.9,
    reviewCount: 127,
    experience: "10+ years",
    availability: "available" as const,
    services: [
      { type: "video" as const, price: 2500, duration: "45 min" },
      { type: "call" as const, price: 1500, duration: "30 min" },
      { type: "chat" as const, price: 800, duration: "1 hour" }
    ],
    verified: true,
    alumniOf: "IIT Bombay",
    responseTime: "< 2 hours"
  },
  {
    id: "2",
    name: "Priya Agarwal",
    avatar: "",
    title: "Product Manager",
    company: "Microsoft",
    industry: "Technology",
    location: "Hyderabad, India",
    bio: "Product strategy expert with experience launching products used by millions. Love helping students break into product management.",
    specialties: ["Product Strategy", "PM Interviews", "Market Research", "User Experience"],
    rating: 4.8,
    reviewCount: 89,
    experience: "8+ years",
    availability: "busy" as const,
    services: [
      { type: "video" as const, price: 3000, duration: "60 min" },
      { type: "call" as const, price: 2000, duration: "45 min" }
    ],
    verified: true,
    alumniOf: "IIT Delhi",
    responseTime: "< 4 hours"
  },
  {
    id: "3",
    name: "Amit Sharma",
    avatar: "",
    title: "Co-Founder & CTO",
    company: "TechStartup India",
    industry: "Startup",
    location: "Mumbai, India",
    bio: "Serial entrepreneur with 2 successful exits. Currently building in the fintech space. Happy to share startup insights.",
    specialties: ["Entrepreneurship", "Startup Strategy", "Tech Leadership", "Fundraising"],
    rating: 4.7,
    reviewCount: 156,
    experience: "12+ years",
    availability: "available" as const,
    services: [
      { type: "video" as const, price: 4000, duration: "60 min" },
      { type: "call" as const, price: 2500, duration: "45 min" },
      { type: "chat" as const, price: 1000, duration: "1 hour" }
    ],
    verified: true,
    responseTime: "< 6 hours"
  },
  {
    id: "4",
    name: "Sneha Jain",
    avatar: "",
    title: "Data Science Manager",
    company: "Amazon",
    industry: "Technology",
    location: "Bangalore, India",
    bio: "ML expert with published research papers. Transitioned from academia to industry and love helping others do the same.",
    specialties: ["Data Science", "Machine Learning", "Career Transition", "Research"],
    rating: 4.9,
    reviewCount: 203,
    experience: "9+ years",
    availability: "available" as const,
    services: [
      { type: "video" as const, price: 2800, duration: "50 min" },
      { type: "call" as const, price: 1800, duration: "35 min" }
    ],
    verified: true,
    alumniOf: "IISc Bangalore",
    responseTime: "< 3 hours"
  },
  {
    id: "5",
    name: "Vikram Singh",
    avatar: "",
    title: "Investment Banking VP",
    company: "Goldman Sachs",
    industry: "Finance",
    location: "Mumbai, India",
    bio: "Finance professional with expertise in investment banking and corporate finance. Mentor for finance career aspirants.",
    specialties: ["Investment Banking", "Corporate Finance", "Financial Modeling", "Career Prep"],
    rating: 4.6,
    reviewCount: 67,
    experience: "7+ years",
    availability: "offline" as const,
    services: [
      { type: "video" as const, price: 3500, duration: "60 min" },
      { type: "call" as const, price: 2200, duration: "45 min" }
    ],
    verified: true,
    alumniOf: "IIM Ahmedabad",
    responseTime: "< 8 hours"
  },
  {
    id: "6",
    name: "Kavya Reddy",
    avatar: "",
    title: "UX Design Lead",
    company: "Flipkart",
    industry: "Technology",
    location: "Bangalore, India",
    bio: "Design thinking expert with a passion for creating user-centered products. Mentoring aspiring designers for 5+ years.",
    specialties: ["UX Design", "Design Thinking", "Portfolio Review", "Design Systems"],
    rating: 4.8,
    reviewCount: 94,
    experience: "6+ years",
    availability: "available" as const,
    services: [
      { type: "video" as const, price: 2200, duration: "45 min" },
      { type: "call" as const, price: 1400, duration: "30 min" },
      { type: "chat" as const, price: 700, duration: "1 hour" }
    ],
    verified: true,
    alumniOf: "NID Ahmedabad",
    responseTime: "< 2 hours"
  }
];

const industries = ["All", "Technology", "Startup", "Finance", "Design", "Consulting", "Healthcare"];
const companies = ["All", "Google", "Microsoft", "Amazon", "Goldman Sachs", "Flipkart", "Startups"];
const specialties = ["All", "Career Guidance", "Interview Prep", "System Design", "Product Strategy", "Entrepreneurship"];
const availability = ["All", "Available", "Busy", "Offline"];
const colleges = ["All", "IIT Alumni", "IIM Alumni", "NIT Alumni", "Other"];

export default function Mentors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesIndustry = selectedIndustry === "All" || mentor.industry === selectedIndustry;
    const matchesCompany = selectedCompany === "All" || mentor.company.includes(selectedCompany);
    const matchesSpecialty = selectedSpecialty === "All" || mentor.specialties.includes(selectedSpecialty);
    const matchesAvailability = selectedAvailability === "All" || 
                               (selectedAvailability === "Available" && mentor.availability === "available") ||
                               (selectedAvailability === "Busy" && mentor.availability === "busy") ||
                               (selectedAvailability === "Offline" && mentor.availability === "offline");
    const matchesCollege = selectedCollege === "All" || 
                          (selectedCollege === "IIT Alumni" && mentor.alumniOf?.includes("IIT")) ||
                          (selectedCollege === "IIM Alumni" && mentor.alumniOf?.includes("IIM")) ||
                          (selectedCollege === "NIT Alumni" && mentor.alumniOf?.includes("NIT")) ||
                          (selectedCollege === "Other" && (!mentor.alumniOf || (!mentor.alumniOf.includes("IIT") && !mentor.alumniOf.includes("IIM") && !mentor.alumniOf.includes("NIT"))));

    return matchesSearch && matchesIndustry && matchesCompany && matchesSpecialty && matchesAvailability && matchesCollege;
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
            
            <div className={`grid grid-cols-1 md:grid-cols-6 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map(company => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  {availability.map(avail => (
                    <SelectItem key={avail} value={avail}>{avail}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                <SelectTrigger>
                  <SelectValue placeholder="Alumni" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map(college => (
                    <SelectItem key={college} value={college}>{college}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => {
                setSelectedIndustry("All");
                setSelectedCompany("All");
                setSelectedSpecialty("All");
                setSelectedAvailability("All");
                setSelectedCollege("All");
                setSearchQuery("");
              }}>
                Clear Filters
              </Button>
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
              setSelectedCompany("All");
              setSelectedSpecialty("All");
              setSelectedAvailability("All");
              setSelectedCollege("All");
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