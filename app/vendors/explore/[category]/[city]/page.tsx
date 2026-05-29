import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, DollarSign, CheckCircle } from "lucide-react"

interface Props {
  params: Promise<{ category: string; city: string }>
}

// Normalise URL slug → readable label
function toLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

// Dynamically generate metadata for each city/category combination
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, city } = await params
  const categoryLabel = toLabel(category)
  const cityLabel = toLabel(city)
  return {
    title: `Top 10 Wedding ${categoryLabel} in ${cityLabel} | WeddingBazaar`,
    description: `Find the best wedding ${categoryLabel.toLowerCase()} in ${cityLabel}. Compare prices, reviews, and availability. Book directly on WeddingBazaar — India's #1 wedding platform.`,
    openGraph: {
      title: `Top 10 Wedding ${categoryLabel} in ${cityLabel} | WeddingBazaar`,
      description: `Discover top-rated wedding ${categoryLabel.toLowerCase()} in ${cityLabel}. Real reviews, transparent pricing, and instant availability.`,
      type: "website",
    },
  }
}

// Mock vendor data generator
function getMockVendors(category: string, city: string) {
  const categoryLabel = toLabel(category)
  const cityLabel = toLabel(city)
  return [
    {
      id: 1,
      name: `${cityLabel} ${categoryLabel} Studio`,
      rating: 4.9,
      reviews: 127,
      price: "₹80K – ₹1.5L",
      verified: true,
      featured: true,
      tags: ["Boho", "Classic"],
      location: cityLabel,
    },
    {
      id: 2,
      name: `Royal ${categoryLabel} – ${cityLabel}`,
      rating: 4.8,
      reviews: 98,
      price: "₹60K – ₹1.2L",
      verified: true,
      featured: false,
      tags: ["Traditional", "Modern"],
      location: cityLabel,
    },
    {
      id: 3,
      name: `Moments by Reema`,
      rating: 4.7,
      reviews: 84,
      price: "₹50K – ₹90K",
      verified: true,
      featured: false,
      tags: ["Romantic", "Garden"],
      location: cityLabel,
    },
    {
      id: 4,
      name: `${categoryLabel} by Arya`,
      rating: 4.8,
      reviews: 63,
      price: "₹70K – ₹1.1L",
      verified: true,
      featured: false,
      tags: ["Modern", "Minimal"],
      location: cityLabel,
    },
    {
      id: 5,
      name: `Elite ${categoryLabel} ${cityLabel}`,
      rating: 4.6,
      reviews: 51,
      price: "₹45K – ₹80K",
      verified: false,
      featured: false,
      tags: ["Classic"],
      location: cityLabel,
    },
  ]
}

export default async function CategoryCityPage({ params }: Props) {
  const { category, city } = await params
  const categoryLabel = toLabel(category)
  const cityLabel = toLabel(city)
  const vendors = getMockVendors(category, city)

  const relatedCities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Hyderabad"].filter(
    (c) => c.toLowerCase() !== cityLabel.toLowerCase()
  )
  const relatedCategories = [
    "photographers",
    "venues",
    "decorators",
    "caterers",
    "makeup-artists",
  ].filter((c) => c !== category)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm opacity-80 mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            {" → "}
            <Link href={`/vendors/${category}`} className="hover:underline">{categoryLabel}</Link>
            {" → "}
            <span>{cityLabel}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Top 10 Wedding {categoryLabel} in {cityLabel}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Find and compare the best wedding {categoryLabel.toLowerCase()} in {cityLabel}. Real reviews from
            verified couples. Transparent pricing. Book instantly.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge className="bg-white text-pink-600">{vendors.length}+ Vendors</Badge>
            <Badge className="bg-white text-pink-600">Verified Reviews</Badge>
            <Badge className="bg-white text-pink-600">Instant Enquiry</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Vendor Grid */}
        <div className="space-y-4 mb-12">
          {vendors.map((vendor, index) => (
            <Card key={vendor.id} className={`hover:shadow-md transition-shadow ${vendor.featured ? "border-yellow-400 border-2" : ""}`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-700"
                          : index === 1
                          ? "bg-gray-200 text-gray-700"
                          : index === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      #{index + 1}
                    </div>

                    {/* Avatar placeholder */}
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-200 to-rose-200 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">
                      📷
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <h2 className="font-bold text-gray-800 text-lg">{vendor.name}</h2>
                        {vendor.featured && <Badge className="bg-yellow-100 text-yellow-700 text-xs">⭐ Featured</Badge>}
                        {vendor.verified && (
                          <span className="flex items-center text-xs text-green-600">
                            <CheckCircle className="w-3 h-3 mr-0.5" /> Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-semibold text-sm">{vendor.rating}</span>
                          <span className="text-xs text-gray-400">({vendor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{vendor.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {vendor.tags.map((tag) => (
                          <span key={tag} className="bg-pink-50 text-pink-600 text-xs px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-gray-700">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="font-semibold">{vendor.price}</span>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Link href={`/vendors/${vendor.id}`}>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </Link>
                      <Button size="sm" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Buying Guide */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              How to Choose the Best Wedding {categoryLabel} in {cityLabel}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: "1",
                  title: "Check Reviews",
                  desc: "Only verified couples can leave reviews on WeddingBazaar. Look for recent reviews and consistent ratings.",
                },
                {
                  step: "2",
                  title: "Compare Packages",
                  desc: "Request quotes from at least 3 vendors. Compare what's included — hours, deliverables, and payment terms.",
                },
                {
                  step: "3",
                  title: "Book Early",
                  desc: `Top ${categoryLabel.toLowerCase()} in ${cityLabel} book 9–12 months in advance. Secure your date with a signed contract.`,
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Internal Links - SEO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-700 mb-3">
              {categoryLabel} in Other Cities
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedCities.map((c) => (
                <Link
                  key={c}
                  href={`/vendors/${category}/${c.toLowerCase()}`}
                  className="text-sm bg-white border rounded-full px-3 py-1 text-pink-600 hover:bg-pink-50 transition-colors"
                >
                  {categoryLabel} in {c}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-3">
              Other Vendors in {cityLabel}
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/vendors/${cat}/${city}`}
                  className="text-sm bg-white border rounded-full px-3 py-1 text-pink-600 hover:bg-pink-50 transition-colors"
                >
                  {toLabel(cat)} in {cityLabel}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
