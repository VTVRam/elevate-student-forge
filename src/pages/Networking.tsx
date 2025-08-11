import { useState } from "react";
import { Search, Filter, Users, MapPin, GraduationCap, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/layout/Navigation";
import StudentCard from "@/components/networking/StudentCard";

// Mock data for students
const mockStudents = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "",
    college: "IIT Delhi",
    year: "3rd Year",
    course: "Computer Science",
    location: "Delhi, India",
    bio: "Passionate about AI/ML and building scalable web applications. Currently working on a healthcare startup project.",
    skills: ["React", "Python", "Machine Learning", "Node.js", "AWS"],
    achievements: 12,
    connections: 245,
    rating: 4.8,
    badges: [
      { name: "Top Performer", color: "#C6FF00" },
      { name: "Event Winner", color: "#007BFF" }
    ],
    projects: 8,
    verified: true,
    online: true
  },
  {
    id: "2",
    name: "Arjun Patel",
    avatar: "",
    college: "BITS Pilani",
    year: "2nd Year", 
    course: "Electrical Engineering",
    location: "Rajasthan, India",
    bio: "Robotics enthusiast and IoT developer. Love building hardware solutions for real-world problems.",
    skills: ["Arduino", "IoT", "C++", "Python", "Embedded Systems"],
    achievements: 8,
    connections: 156,
    rating: 4.6,
    badges: [
      { name: "Innovator", color: "#FF6B35" },
      { name: "Tech Leader", color: "#007BFF" }
    ],
    projects: 5,
    verified: true,
    online: false
  },
  {
    id: "3",
    name: "Sneha Reddy",
    avatar: "",
    college: "NIT Warangal",
    year: "4th Year",
    course: "Information Technology",
    location: "Hyderabad, India", 
    bio: "Full-stack developer with a passion for creating user-friendly applications. Intern at a fintech startup.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Docker"],
    achievements: 15,
    connections: 312,
    rating: 4.9,
    badges: [
      { name: "Full Stack Pro", color: "#C6FF00" },
      { name: "Mentor", color: "#28A745" }
    ],
    projects: 12,
    verified: true,
    online: true
  },
  {
    id: "4",
    name: "Vikash Kumar",
    avatar: "",
    college: "VIT Vellore",
    year: "1st Year",
    course: "Data Science",
    location: "Tamil Nadu, India",
    bio: "Data science newbie eager to learn and contribute. Interested in sports analytics and business intelligence.",
    skills: ["Python", "SQL", "Excel", "Statistics", "Tableau"],
    achievements: 3,
    connections: 89,
    rating: 4.3,
    badges: [
      { name: "Rising Star", color: "#FFC107" }
    ],
    projects: 2,
    verified: true,
    online: true
  },
  {
    id: "5",
    name: "Ananya Singh",
    avatar: "",
    college: "IIIT Bangalore",
    year: "3rd Year",
    course: "Computer Science",
    location: "Bangalore, India",
    bio: "Mobile app developer and UI/UX designer. Building the next generation of mobile experiences.",
    skills: ["Flutter", "Dart", "UI/UX", "Figma", "Firebase"],
    achievements: 10,
    connections: 198,
    rating: 4.7,
    badges: [
      { name: "Design Expert", color: "#E91E63" },
      { name: "App Builder", color: "#007BFF" }
    ],
    projects: 7,
    verified: true,
    online: false
  },
  {
    id: "6",
    name: "Rohit Gupta",
    avatar: "",
    college: "DTU Delhi",
    year: "2nd Year",
    course: "Mechanical Engineering",
    location: "Delhi, India",
    bio: "Mechanical engineer exploring the intersection of hardware and software. Passionate about sustainable technology.",
    skills: ["SolidWorks", "Python", "3D Printing", "CAD", "Automation"],
    achievements: 6,
    connections: 134,
    rating: 4.4,
    badges: [
      { name: "3D Expert", color: "#9C27B0" }
    ],
    projects: 4,
    verified: true,
    online: true
  }
];

const colleges = ["All", "IIT Delhi", "BITS Pilani", "NIT Warangal", "VIT Vellore", "IIIT Bangalore", "DTU Delhi"];
const years = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year"];
const courses = ["All", "Computer Science", "Information Technology", "Data Science", "Electrical Engineering", "Mechanical Engineering"];
const locations = ["All", "Delhi", "Bangalore", "Hyderabad", "Mumbai", "Pune", "Chennai"];

export default function Networking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCollege = selectedCollege === "All" || student.college.includes(selectedCollege);
    const matchesYear = selectedYear === "All" || student.year === selectedYear;
    const matchesCourse = selectedCourse === "All" || student.course.includes(selectedCourse);
    const matchesLocation = selectedLocation === "All" || student.location.includes(selectedLocation);

    return matchesSearch && matchesCollege && matchesYear && matchesCourse && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Student{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Networking
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with talented students across India. Build your professional network and collaborate on exciting projects.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search students, colleges, skills..."
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
              <h3 className="font-semibold text-foreground">Filter Students</h3>
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
            
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
              <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                <SelectTrigger>
                  <SelectValue placeholder="College" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map(college => (
                    <SelectItem key={college} value={college}>{college}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => {
                setSelectedCollege("All");
                setSelectedYear("All");
                setSelectedCourse("All");
                setSelectedLocation("All");
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
              {filteredStudents.length} Students Found
            </h2>
            <p className="text-muted-foreground">
              Connect with verified students from top colleges
            </p>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className="text-success">
              <Users className="w-3 h-3 mr-1" />
              {filteredStudents.filter(s => s.online).length} Online
            </Badge>
            <Badge variant="outline" className="text-verified">
              <Star className="w-3 h-3 mr-1" />
              {filteredStudents.filter(s => s.verified).length} Verified
            </Badge>
          </div>
        </div>

        {/* Student Communities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Student Communities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  name: "AI Generalists",
                  members: 1240,
                  description: "Discussions on AI trends, research, and applications",
                  color: "bg-primary/10 text-primary border-primary/20"
                },
                {
                  name: "ML Engineers",
                  members: 890,
                  description: "Machine Learning engineering practices and tools",
                  color: "bg-accent/10 text-accent border-accent/20"
                },
                {
                  name: "Young Visionaries",
                  members: 650,
                  description: "Entrepreneurs and innovators shaping the future",
                  color: "bg-success/10 text-success border-success/20"
                }
              ].map((community) => (
                <Card key={community.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={community.color}>
                        {community.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{community.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{community.members} members</span>
                      <Button size="sm" variant="outline">Join</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No students found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria to find more students.
            </p>
            <Button onClick={() => {
              setSelectedCollege("All");
              setSelectedYear("All");
              setSelectedCourse("All");
              setSelectedLocation("All");
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