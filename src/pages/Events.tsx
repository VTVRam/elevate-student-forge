import { useState } from "react";
import { Search, Filter, Calendar, MapPin, DollarSign, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EventCard from "@/components/events/EventCard";

// Mock data for events
const mockEvents = [
  {
    id: "1",
    title: "AI/ML Hackathon 2024 - Build the Future",
    type: "Hackathon",
    organizer: "IIT Bombay",
    date: "Mar 15, 2024",
    time: "10:00 AM",
    location: "Bangalore Tech Park",
    registrationStatus: "open" as const,
    isPaid: true,
    fee: 500,
    prizePool: "₹50,000",
    participants: 145,
    maxParticipants: 200,
    domain: "AI / ML",
    format: "In-Person",
    difficulty: "Intermediate",
    rewards: ["Internship Opportunities", "Certificates"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    verified: true,
    trending: true,
    tags: ["AI", "Machine Learning", "Innovation", "Tech"]
  },
  {
    id: "2", 
    title: "Startup Pitch Competition - Showcase Your Ideas",
    type: "Entrepreneurship Event",
    organizer: "Startup Hub Delhi",
    date: "Mar 20, 2024",
    time: "2:00 PM",
    location: "Mumbai Business Center",
    registrationStatus: "open" as const,
    isPaid: false,
    prizePool: "₹1,00,000",
    participants: 89,
    maxParticipants: 100,
    domain: "FinTech",
    format: "Hybrid",
    difficulty: "Beginner-Friendly",
    rewards: ["Job Offers", "Certificates", "Swag/Merchandise"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    verified: true,
    tags: ["Startup", "Pitch", "Entrepreneurship", "FinTech"]
  },
  {
    id: "3",
    title: "Web Development Workshop - React & Next.js",
    type: "Workshop",
    organizer: "Code Academy",
    date: "Mar 18, 2024",
    time: "11:00 AM",
    location: "Online",
    registrationStatus: "ending_soon" as const,
    isPaid: true,
    fee: 299,
    participants: 50,
    maxParticipants: 50,
    domain: "Web Development",
    format: "Online/Virtual",
    difficulty: "Intermediate",
    rewards: ["Certificates"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    verified: true,
    tags: ["React", "Next.js", "Web Dev", "Frontend"]
  },
  {
    id: "4",
    title: "Design Thinking & UX Research Masterclass",
    type: "Workshop",
    organizer: "Design Studio",
    date: "Mar 22, 2024",
    time: "3:00 PM",
    location: "Delhi Design Center",
    registrationStatus: "closed" as const,
    isPaid: true,
    fee: 800,
    participants: 75,
    maxParticipants: 80,
    domain: "UI/UX Design",
    format: "In-Person",
    difficulty: "Advanced",
    rewards: ["Certificates", "Portfolio Review"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    verified: true,
    tags: ["UX", "Design Thinking", "Research", "Portfolio"]
  },
  {
    id: "5",
    title: "Mobile App Development Challenge",
    type: "Hackathon",
    organizer: "Google Developer Groups",
    date: "Mar 25, 2024",
    time: "9:00 AM",
    location: "Hyderabad Tech Hub",
    registrationStatus: "open" as const,
    isPaid: false,
    prizePool: "₹75,000",
    participants: 120,
    maxParticipants: 150,
    domain: "App Development",
    format: "In-Person",
    difficulty: "Intermediate",
    rewards: ["Internship Opportunities", "Job Offers", "Swag/Merchandise"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    verified: true,
    tags: ["Mobile", "App Development", "Android", "iOS"]
  },
  {
    id: "6",
    title: "Cultural Fest 2024 - Expressions Unlimited",
    type: "Cultural Fest",
    organizer: "NIT Trichy",
    date: "Apr 2, 2024",
    time: "6:00 PM",
    location: "NIT Trichy Campus",
    registrationStatus: "open" as const,
    isPaid: true,
    fee: 150,
    prizePool: "₹25,000",
    participants: 300,
    maxParticipants: 500,
    domain: "Cultural",
    format: "In-Person",
    difficulty: "Beginner-Friendly",
    rewards: ["Certificates", "Swag/Merchandise"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    verified: true,
    tags: ["Cultural", "Music", "Dance", "Arts"]
  },
  {
    id: "7",
    title: "Data Science & Analytics Summit",
    type: "Talk/Seminar",
    organizer: "Microsoft India",
    date: "Mar 28, 2024",
    time: "2:00 PM",
    location: "Online",
    registrationStatus: "open" as const,
    isPaid: false,
    participants: 250,
    maxParticipants: 1000,
    domain: "Data Science",
    format: "Online/Virtual",
    difficulty: "Intermediate",
    rewards: ["Certificates", "Internship Opportunities"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    verified: true,
    tags: ["Data Science", "Analytics", "Python", "Machine Learning"]
  },
  {
    id: "8",
    title: "Gaming Championship - Code & Conquer",
    type: "Sports Event",
    organizer: "Gaming Society BITS",
    date: "Apr 5, 2024",
    time: "10:00 AM",
    location: "BITS Pilani",
    registrationStatus: "open" as const,
    isPaid: true,
    fee: 200,
    prizePool: "₹30,000",
    participants: 64,
    maxParticipants: 128,
    domain: "Gaming",
    format: "In-Person",
    difficulty: "Advanced",
    rewards: ["Swag/Merchandise", "Certificates"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    verified: true,
    tags: ["Gaming", "Esports", "Competition", "Strategy"]
  },
  {
    id: "9",
    title: "FinTech Innovation Webinar",
    type: "Webinar",
    organizer: "Razorpay",
    date: "Mar 30, 2024",
    time: "4:00 PM",
    location: "Online",
    registrationStatus: "open" as const,
    isPaid: false,
    participants: 180,
    maxParticipants: 500,
    domain: "FinTech",
    format: "Online/Virtual",
    difficulty: "Beginner-Friendly",
    rewards: ["Certificates", "Internship Opportunities"],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    verified: true,
    tags: ["FinTech", "Innovation", "Payments", "Technology"]
  },
  {
    id: "10",
    title: "Blockchain & Crypto Workshop",
    type: "Workshop",
    organizer: "IIT Delhi",
    date: "Apr 8, 2024",
    time: "11:00 AM",
    location: "IIT Delhi Campus",
    registrationStatus: "open" as const,
    isPaid: true,
    fee: 400,
    prizePool: "₹15,000",
    participants: 40,
    maxParticipants: 60,
    domain: "FinTech",
    format: "In-Person",
    difficulty: "Advanced",
    rewards: ["Certificates", "Portfolio Review"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    verified: true,
    tags: ["Blockchain", "Cryptocurrency", "Web3", "Technology"]
  }
];

const eventTypes = ["All", "Hackathon", "Workshop", "Entrepreneurship Event", "Cultural Fest", "Sports Event", "Webinar", "Talk/Seminar"];
const registrationStatuses = ["All", "Registration Open", "Registration Ending Soon", "Registration Closed"];
const priceFilters = ["All", "Free", "Paid"];
const domains = ["All", "AI / ML", "Web Development", "App Development", "FinTech", "Data Science", "UI/UX Design", "Gaming", "Cultural"];
const formats = ["All", "In-Person", "Online/Virtual", "Hybrid"];
const difficulties = ["All", "Beginner-Friendly", "Intermediate", "Advanced"];
const prizeRanges = ["All", "₹0 - ₹10,000", "₹10,000 - ₹50,000", "₹50,000+"];
const rewards = ["All", "Internship Opportunities", "Job Offers", "Certificates", "Swag/Merchandise", "Portfolio Review"];

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRegistrationStatus, setSelectedRegistrationStatus] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedPrizeRange, setSelectedPrizeRange] = useState("All");
  const [selectedReward, setSelectedReward] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.domain?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "All" || event.type === selectedType;
    const matchesRegistrationStatus = selectedRegistrationStatus === "All" || 
                                     (selectedRegistrationStatus === "Registration Open" && event.registrationStatus === "open") ||
                                     (selectedRegistrationStatus === "Registration Ending Soon" && event.registrationStatus === "ending_soon") ||
                                     (selectedRegistrationStatus === "Registration Closed" && event.registrationStatus === "closed");
    const matchesPrice = selectedPrice === "All" || 
                        (selectedPrice === "Free" && !event.isPaid) ||
                        (selectedPrice === "Paid" && event.isPaid);
    const matchesDomain = selectedDomain === "All" || event.domain === selectedDomain;
    const matchesFormat = selectedFormat === "All" || event.format === selectedFormat;
    const matchesDifficulty = selectedDifficulty === "All" || event.difficulty === selectedDifficulty;
    const matchesPrizeRange = selectedPrizeRange === "All" || 
                             (selectedPrizeRange === "₹0 - ₹10,000" && event.prizePool && parseInt(event.prizePool.replace(/[₹,]/g, '')) <= 10000) ||
                             (selectedPrizeRange === "₹10,000 - ₹50,000" && event.prizePool && parseInt(event.prizePool.replace(/[₹,]/g, '')) > 10000 && parseInt(event.prizePool.replace(/[₹,]/g, '')) <= 50000) ||
                             (selectedPrizeRange === "₹50,000+" && event.prizePool && parseInt(event.prizePool.replace(/[₹,]/g, '')) > 50000);
    const matchesReward = selectedReward === "All" || event.rewards?.includes(selectedReward);

    return matchesSearch && matchesType && matchesRegistrationStatus && matchesPrice && matchesDomain && matchesFormat && matchesDifficulty && matchesPrizeRange && matchesReward;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Discover Amazing{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find hackathons, workshops, competitions and networking events tailored to your interests
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search events, organizers, or topics..."
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
              <h3 className="font-semibold text-foreground">Filter Events</h3>
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
              {/* Core Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type of Event" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedRegistrationStatus} onValueChange={setSelectedRegistrationStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Registration Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {registrationStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Cost" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceFilters.map(price => (
                      <SelectItem key={price} value={price}>{price}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Domain/Focus" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map(domain => (
                      <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Advanced Filters */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select value={selectedPrizeRange} onValueChange={setSelectedPrizeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Prize Pool" />
                  </SelectTrigger>
                  <SelectContent>
                    {prizeRanges.map(range => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedReward} onValueChange={setSelectedReward}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rewards Offered" />
                  </SelectTrigger>
                  <SelectContent>
                    {rewards.map(reward => (
                      <SelectItem key={reward} value={reward}>{reward}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map(format => (
                      <SelectItem key={format} value={format}>{format}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => {
                  setSelectedType("All");
                  setSelectedRegistrationStatus("All");
                  setSelectedPrice("All");
                  setSelectedDomain("All");
                  setSelectedFormat("All");
                  setSelectedDifficulty("All");
                  setSelectedPrizeRange("All");
                  setSelectedReward("All");
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
              {filteredEvents.length} Events Found
            </h2>
            <p className="text-muted-foreground">
              Showing events matching your criteria
            </p>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className="text-success">
              <Calendar className="w-3 h-3 mr-1" />
              {filteredEvents.filter(e => e.registrationStatus === "open").length} Open
            </Badge>
            <Badge variant="outline" className="text-accent">
              <Trophy className="w-3 h-3 mr-1" />
              {filteredEvents.filter(e => e.prizePool).length} With Prizes
            </Badge>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or check back later for new events.
            </p>
            <Button onClick={() => {
              setSelectedType("All");
              setSelectedRegistrationStatus("All");
              setSelectedPrice("All");
              setSelectedDomain("All");
              setSelectedFormat("All");
              setSelectedDifficulty("All");
              setSelectedPrizeRange("All");
              setSelectedReward("All");
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