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
    organizer: "TechCorp India",
    date: "Mar 15, 2024",
    time: "10:00 AM",
    location: "Bangalore Tech Park",
    registrationStatus: "open" as const,
    isPaid: true,
    fee: 500,
    prizePool: "₹50,000",
    participants: 145,
    maxParticipants: 200,
    tags: ["AI/ML", "Technology", "Innovation"],
    verified: true,
    trending: true
  },
  {
    id: "2", 
    title: "Startup Pitch Competition - Showcase Your Ideas",
    type: "Competition",
    organizer: "Startup Hub",
    date: "Mar 20, 2024",
    time: "2:00 PM",
    location: "Mumbai Business Center",
    registrationStatus: "open" as const,
    isPaid: false,
    prizePool: "₹1,00,000",
    participants: 89,
    maxParticipants: 100,
    tags: ["Startup", "Pitch", "Business"],
    verified: true
  },
  {
    id: "3",
    title: "Web Development Workshop - React & Next.js",
    type: "Workshop",
    organizer: "Code Academy",
    date: "Mar 18, 2024",
    time: "11:00 AM",
    location: "Online",
    registrationStatus: "full" as const,
    isPaid: true,
    fee: 299,
    participants: 50,
    maxParticipants: 50,
    tags: ["Web Dev", "React", "Next.js"],
    verified: true
  },
  {
    id: "4",
    title: "Design Thinking & UX Research Masterclass",
    type: "Masterclass",
    organizer: "Design Studio",
    date: "Mar 22, 2024",
    time: "3:00 PM",
    location: "Delhi Design Center",
    registrationStatus: "closed" as const,
    isPaid: true,
    fee: 800,
    participants: 75,
    maxParticipants: 80,
    tags: ["Design", "UX", "Research"],
    verified: true
  }
];

const eventTypes = ["All", "Hackathon", "Workshop", "Competition", "Masterclass", "Networking"];
const locations = ["All", "Online", "Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad"];
const priceFilters = ["All", "Free", "Paid"];

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "All" || event.type === selectedType;
    const matchesLocation = selectedLocation === "All" || event.location.includes(selectedLocation);
    const matchesPrice = selectedPrice === "All" || 
                        (selectedPrice === "Free" && !event.isPaid) ||
                        (selectedPrice === "Paid" && event.isPaid);

    return matchesSearch && matchesType && matchesLocation && matchesPrice;
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
            
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
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

              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger>
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  {priceFilters.map(price => (
                    <SelectItem key={price} value={price}>{price}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => {
                setSelectedType("All");
                setSelectedLocation("All");
                setSelectedPrice("All");
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
              setSelectedLocation("All");
              setSelectedPrice("All");
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