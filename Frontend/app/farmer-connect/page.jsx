"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Fish,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ShoppingBag,
  Tag,
  Clock,
  CheckCircle,
  Star,
  Search,
  Filter,
  Send,
} from "lucide-react"

const fishListings = [
  {
    id: 1,
    type: "sell",
    farmerName: "Rajesh Kumar",
    location: "Andhra Pradesh",
    fishType: "Rohu",
    quantity: "500 kg",
    price: "₹180/kg",
    date: "2 hours ago",
    description: "Fresh Rohu fish, average weight 1.2kg. Ready for immediate pickup.",
    phone: "+91 98765 43210",
    verified: true,
    rating: 4.8,
  },
  {
    id: 2,
    type: "sell",
    farmerName: "Suresh Patel",
    location: "Gujarat",
    fishType: "Catla",
    quantity: "800 kg",
    price: "₹200/kg",
    date: "5 hours ago",
    description: "Premium quality Catla, farm raised. Weight range 1-1.5kg per fish.",
    phone: "+91 98765 43211",
    verified: true,
    rating: 4.6,
  },
  {
    id: 3,
    type: "buy",
    farmerName: "Fresh Foods Pvt Ltd",
    location: "Tamil Nadu",
    fishType: "Tilapia",
    quantity: "2000 kg",
    price: "₹150-170/kg",
    date: "1 day ago",
    description: "Looking for bulk Tilapia supply. Regular requirement. Prefer local farmers.",
    phone: "+91 98765 43212",
    verified: true,
    rating: 4.9,
  },
  {
    id: 4,
    type: "sell",
    farmerName: "Mahesh Reddy",
    location: "Telangana",
    fishType: "Pangasius",
    quantity: "1200 kg",
    price: "₹120/kg",
    date: "1 day ago",
    description: "Farm fresh Pangasius. Great for processing. Consistent quality available weekly.",
    phone: "+91 98765 43213",
    verified: false,
    rating: 4.4,
  },
  {
    id: 5,
    type: "buy",
    farmerName: "SeaFresh Exports",
    location: "Kerala",
    fishType: "All IMC",
    quantity: "5000 kg",
    price: "Market Rate",
    date: "2 days ago",
    description: "Buying all Indian Major Carps for export. Premium prices for quality fish.",
    phone: "+91 98765 43214",
    verified: true,
    rating: 4.7,
  },
]

const consultants = [
  {
    id: 1,
    name: "Dr. Arun Sharma",
    specialization: "Fish Disease Management",
    experience: "15 years",
    location: "Chennai",
    rating: 4.9,
    consultations: 500,
    available: true,
    languages: ["English", "Hindi", "Tamil"],
  },
  {
    id: 2,
    name: "Dr. Priya Nair",
    specialization: "Aquaculture Nutrition",
    experience: "12 years",
    location: "Kochi",
    rating: 4.8,
    consultations: 380,
    available: true,
    languages: ["English", "Malayalam", "Hindi"],
  },
  {
    id: 3,
    name: "Dr. Vikram Singh",
    specialization: "Pond Management",
    experience: "20 years",
    location: "Bhubaneswar",
    rating: 4.7,
    consultations: 650,
    available: false,
    languages: ["English", "Hindi", "Odia"],
  },
]

export default function FarmerConnectPage() {
  const [activeTab, setActiveTab] = useState("marketplace")
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showContactForm, setShowContactForm] = useState(false)
  const [selectedListing, setSelectedListing] = useState(null)

  const filteredListings = fishListings.filter((listing) => {
    const matchesType = filterType === "all" || listing.type === filterType
    const matchesSearch =
      listing.fishType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Farmer Connect</h1>
          </div>
          <p className="text-white/80 max-w-2xl">
            Connect with buyers and sellers, find consultation services, and grow your aquaculture business with our
            farmer community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="marketplace" className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Fish Marketplace
            </TabsTrigger>
            <TabsTrigger value="consult" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Expert Consultation
            </TabsTrigger>
            <TabsTrigger value="post" className="gap-2">
              <Tag className="w-4 h-4" />
              Post Listing
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Phone className="w-4 h-4" />
              Contact Us
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by fish type, location, or farmer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Listings</SelectItem>
                    <SelectItem value="sell">Selling</SelectItem>
                    <SelectItem value="buy">Buying</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="border-0 shadow-md card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge
                          variant={listing.type === "sell" ? "default" : "secondary"}
                          className={listing.type === "sell" ? "bg-emerald-500" : "bg-amber-500"}
                        >
                          {listing.type === "sell" ? "Selling" : "Buying"}
                        </Badge>
                        <CardTitle className="mt-2 text-lg">{listing.fishType}</CardTitle>
                      </div>
                      {listing.verified && (
                        <div className="flex items-center gap-1 text-emerald-500">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-xs">Verified</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Fish className="w-4 h-4 text-muted-foreground" />
                      <span>Quantity: {listing.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-primary">{listing.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{listing.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>

                    <div className="pt-3 border-t border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">{listing.farmerName.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium">{listing.farmerName}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs text-muted-foreground">{listing.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {listing.date}
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        size="sm"
                        onClick={() => {
                          setSelectedListing(listing)
                          setShowContactForm(true)
                        }}
                      >
                        <Phone className="mr-2 w-4 h-4" />
                        Contact {listing.type === "sell" ? "Seller" : "Buyer"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <Fish className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No listings found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="consult">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.map((consultant) => (
                <Card key={consultant.id} className="border-0 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-primary">{consultant.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{consultant.name}</h3>
                        <p className="text-sm text-muted-foreground">{consultant.specialization}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={consultant.available ? "default" : "secondary"} className="text-xs">
                            {consultant.available ? "Available" : "Busy"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Experience</span>
                        <span className="font-medium">{consultant.experience}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium">{consultant.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Consultations</span>
                        <span className="font-medium">{consultant.consultations}+</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rating</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{consultant.rating}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Languages</span>
                        <span className="font-medium text-right">{consultant.languages.join(", ")}</span>
                      </div>
                    </div>

                    <Button className="w-full" disabled={!consultant.available}>
                      <MessageSquare className="mr-2 w-4 h-4" />
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="post">
            <Card className="border-0 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Post a Listing</CardTitle>
                <CardDescription>Create a new buy or sell listing for fish</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Listing Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sell">I want to Sell</SelectItem>
                          <SelectItem value="buy">I want to Buy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Fish Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fish" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rohu">Rohu</SelectItem>
                          <SelectItem value="catla">Catla</SelectItem>
                          <SelectItem value="mrigal">Mrigal</SelectItem>
                          <SelectItem value="tilapia">Tilapia</SelectItem>
                          <SelectItem value="pangasius">Pangasius</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Quantity (kg)</Label>
                      <Input placeholder="e.g., 500" />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (₹/kg)</Label>
                      <Input placeholder="e.g., 180" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="City, State" />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Provide details about fish quality, weight range, availability, etc." />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Contact Name</Label>
                      <Input placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Tag className="mr-2 w-4 h-4" />
                    Post Listing
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>Have questions? We'd love to hear from you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="product">Product Information</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="partnership">Business Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Message</Label>
                      <Textarea placeholder="Your message..." className="min-h-32" />
                    </div>
                    <Button className="w-full" size="lg">
                      <Send className="mr-2 w-4 h-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Office Address</div>
                          <div className="text-sm text-muted-foreground">
                            123 Aqua Business Park
                            <br />
                            Chennai, Tamil Nadu 600001
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Phone</div>
                          <div className="text-sm text-muted-foreground">
                            +91 98765 43210
                            <br />
                            +91 98765 43211
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Email</div>
                          <div className="text-sm text-muted-foreground">
                            info@kananbiotech.com
                            <br />
                            support@kananbiotech.com
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Business Hours</div>
                          <div className="text-sm text-muted-foreground">
                            Mon - Sat: 9:00 AM - 6:00 PM
                            <br />
                            Sunday: Closed
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-primary text-primary-foreground">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">24/7 Emergency Support</h3>
                    <p className="text-sm text-white/80 mb-4">
                      For urgent fish health emergencies, our support team is available round the clock.
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      <span className="font-bold text-lg">1800-123-4567</span>
                      <Badge className="bg-white/20 text-white">Toll Free</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {showContactForm && selectedListing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Contact {selectedListing.farmerName}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowContactForm(false)}>
                  <span className="text-2xl">&times;</span>
                </Button>
              </div>
              <CardDescription>
                {selectedListing.type === "sell" ? "Selling" : "Buying"} {selectedListing.fishType} -{" "}
                {selectedListing.quantity}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="font-medium">{selectedListing.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{selectedListing.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Your Message</Label>
                <Textarea placeholder={`Hi, I'm interested in your ${selectedListing.fishType} listing...`} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setShowContactForm(false)}>
                  Cancel
                </Button>
                <Button>
                  <Send className="mr-2 w-4 h-4" />
                  Send Inquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </main>
  )
}
