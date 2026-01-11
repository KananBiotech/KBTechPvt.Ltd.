"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, ShoppingCart, Check } from "lucide-react"

const allProducts = [
  {
    id: 1,
    name: "AquaGrow Premium Feed",
    category: "feed",
    image: "/fish-feed-pellets-aquaculture-product.jpg",
    price: "₹1,200",
    unit: "per 25kg",
    rating: 4.8,
    reviews: 234,
    description: "High-protein floating feed designed for optimal growth and health of freshwater fish.",
    howItWorks:
      "Contains 32% protein with essential amino acids. Float on water surface for 2-3 hours allowing maximum feed consumption.",
    benefits: ["High protein content", "Improved FCR", "Enhanced color", "Better immunity"],
    usage: "Feed 2-3 times daily, 2-3% of body weight",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "BioShield Immunity Booster",
    category: "supplements",
    image: "/fish-medicine-supplement-bottle-aquaculture.jpg",
    price: "₹450",
    unit: "per 500ml",
    rating: 4.6,
    reviews: 156,
    description: "Natural immunity enhancer that strengthens fish resistance against common diseases.",
    howItWorks: "Blend of vitamins, minerals, and probiotics that boost natural immune response and gut health.",
    benefits: ["Enhanced immunity", "Stress reduction", "Better survival rate", "Improved growth"],
    usage: "Mix 5ml per kg of feed, use for 7-10 days",
    badge: "Popular",
  },
  {
    id: 3,
    name: "GillCare Treatment",
    category: "medicine",
    image: "/fish-medicine-treatment-bottle-professional.jpg",
    price: "₹680",
    unit: "per 1L",
    rating: 4.9,
    reviews: 312,
    description: "Effective treatment for bacterial gill infections and respiratory issues in fish.",
    howItWorks:
      "Active ingredients target bacterial pathogens while protecting healthy gill tissue. Shows results in 3-5 days.",
    benefits: ["Fast acting", "Safe for fish", "Broad spectrum", "No water discoloration"],
    usage: "Add 10ml per 100L of pond water",
    badge: "Recommended",
  },
  {
    id: 4,
    name: "PondClear Water Treatment",
    category: "water-care",
    image: "/pond-water-treatment-chemical-aquaculture.jpg",
    price: "₹320",
    unit: "per 5kg",
    rating: 4.7,
    reviews: 189,
    description: "Maintains optimal water quality by reducing ammonia, nitrite, and organic waste.",
    howItWorks:
      "Beneficial bacteria break down harmful compounds into safe byproducts, maintaining healthy water parameters.",
    benefits: ["Reduces ammonia", "Clear water", "Healthy ecosystem", "Cost effective"],
    usage: "Apply 100g per 1000 sq ft of pond area weekly",
    badge: null,
  },
  {
    id: 5,
    name: "FungoCure Anti-Fungal",
    category: "medicine",
    image: "/anti-fungal-fish-medicine-bottle.jpg",
    price: "₹520",
    unit: "per 500ml",
    rating: 4.5,
    reviews: 98,
    description: "Powerful anti-fungal treatment for saprolegniasis and other fungal infections.",
    howItWorks: "Penetrates fungal cell walls, eliminating infection while promoting tissue healing.",
    benefits: ["Kills fungus", "Heals tissue", "Prevents spread", "Safe concentration"],
    usage: "5ml per 50L water, treat for 5-7 days",
    badge: null,
  },
  {
    id: 6,
    name: "GrowMax Fingerling Feed",
    category: "feed",
    image: "/fingerling-fish-feed-small-pellets.jpg",
    price: "₹980",
    unit: "per 20kg",
    rating: 4.7,
    reviews: 145,
    description: "Specially formulated starter feed for fingerlings with micro-pellet size.",
    howItWorks: "Small pellet size perfect for young fish. High digestibility ensures maximum nutrient absorption.",
    benefits: ["High survival rate", "Fast growth", "Easy digestion", "Balanced nutrition"],
    usage: "Feed 4-5 times daily, 5% of body weight",
    badge: "New",
  },
  {
    id: 7,
    name: "ProBiotic Plus",
    category: "supplements",
    image: "/probiotic-supplement-for-fish.jpg",
    price: "₹380",
    unit: "per 1kg",
    rating: 4.4,
    reviews: 87,
    description: "Probiotic supplement for improved digestion and gut health in cultured fish.",
    howItWorks: "Live beneficial bacteria colonize the gut, improving nutrient absorption and disease resistance.",
    benefits: ["Better FCR", "Healthier gut", "Reduced mortality", "Water quality improvement"],
    usage: "Mix 5g per kg of feed",
    badge: null,
  },
  {
    id: 8,
    name: "OxyBoost Aerator Tablets",
    category: "water-care",
    image: "/oxygen-aerator-tablets-pond.jpg",
    price: "₹280",
    unit: "per 100 tablets",
    rating: 4.6,
    reviews: 203,
    description: "Emergency oxygen tablets for maintaining dissolved oxygen levels in ponds.",
    howItWorks:
      "Releases oxygen rapidly when dissolved in water, providing immediate relief during low oxygen conditions.",
    benefits: ["Instant oxygen", "Emergency use", "Easy application", "Long shelf life"],
    usage: "Use 2-3 tablets per 1000L during emergencies",
    badge: "Essential",
  },
]

const categories = [
  { id: "all", name: "All Products" },
  { id: "feed", name: "Fish Feed" },
  { id: "medicine", name: "Medicines" },
  { id: "supplements", name: "Supplements" },
  { id: "water-care", name: "Water Care" },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-white/80 max-w-2xl">
            Discover our complete range of fish health products, premium feed, and aquaculture supplies trusted by
            farmers nationwide.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="card-hover border-0 shadow-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.badge && <Badge className="absolute top-3 left-3 bg-primary">{product.badge}</Badge>}
              </div>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1 capitalize">
                  {product.category.replace("-", " ")}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-foreground">{product.price}</span>
                  <span className="text-sm text-muted-foreground">{product.unit}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your search.</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="grid md:grid-cols-2">
              <div className="relative">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full h-64 md:h-full object-cover"
                />
                {selectedProduct.badge && (
                  <Badge className="absolute top-4 left-4 bg-primary">{selectedProduct.badge}</Badge>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1 capitalize">
                      {selectedProduct.category.replace("-", " ")}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedProduct.name}</h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedProduct(null)}>
                    <span className="text-2xl">&times;</span>
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({selectedProduct.reviews} reviews)</span>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-foreground">{selectedProduct.price}</span>
                  <span className="text-muted-foreground">{selectedProduct.unit}</span>
                </div>

                <p className="text-muted-foreground mb-6">{selectedProduct.description}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How It Works</h4>
                    <p className="text-sm text-muted-foreground">{selectedProduct.howItWorks}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Benefits</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProduct.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-secondary" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Usage Instructions</h4>
                    <p className="text-sm text-muted-foreground">{selectedProduct.usage}</p>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Contact for Purchase
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
