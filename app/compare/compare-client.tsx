"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Star,
  CheckCircle,
  X,
  Plus,
  Award,
  Phone,
  MessageSquare,
  ArrowRight,
  Search,
  Check,
  Minus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// ─── Vendor data ───────────────────────────────────────────────────────────────

const ALL_VENDORS = [
  {
    id: 1,
    name: "Rajesh Photography",
    category: "Photographers",
    city: "Mumbai",
    rating: 4.9,
    reviews: 245,
    priceMin: 50000,
    priceMax: 200000,
    priceDisplay: "₹50,000 – ₹2,00,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    premium: true,
    experience: "10+ years",
    teamsSize: "5 person team",
    responseTime: "< 1 hour",
    packages: ["Basic (₹50k)", "Standard (₹1L)", "Premium (₹2L)"],
    specialties: ["Candid Photography", "Pre-wedding Shoots", "Drone Aerial", "Same-day Edit"],
    highlights: [
      { label: "Availability", value: "check" },
      { label: "Video Portfolio", value: "check" },
      { label: "Albums Included", value: "check" },
      { label: "Drone Coverage", value: "check" },
      { label: "Pre-wedding Shoot", value: "check" },
      { label: "Destination Travel", value: "check" },
    ],
    badge: "Best Value",
    badgeColor: "from-green-500 to-emerald-500",
  },
  {
    id: 2,
    name: "Lens & Light Studio",
    category: "Photographers",
    city: "Delhi",
    rating: 4.7,
    reviews: 189,
    priceMin: 35000,
    priceMax: 150000,
    priceDisplay: "₹35,000 – ₹1,50,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    premium: false,
    experience: "7 years",
    teamsSize: "3 person team",
    responseTime: "< 3 hours",
    packages: ["Starter (₹35k)", "Classic (₹80k)", "Deluxe (₹1.5L)"],
    specialties: ["Traditional Ceremonies", "Reception Coverage", "Candid Moments"],
    highlights: [
      { label: "Availability", value: "check" },
      { label: "Video Portfolio", value: "check" },
      { label: "Albums Included", value: "minus" },
      { label: "Drone Coverage", value: "cross" },
      { label: "Pre-wedding Shoot", value: "check" },
      { label: "Destination Travel", value: "minus" },
    ],
    badge: null,
    badgeColor: "",
  },
  {
    id: 3,
    name: "Moments by Arjun",
    category: "Photographers",
    city: "Bangalore",
    rating: 4.8,
    reviews: 312,
    priceMin: 80000,
    priceMax: 350000,
    priceDisplay: "₹80,000 – ₹3,50,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    premium: true,
    experience: "14 years",
    teamsSize: "8 person team",
    responseTime: "< 30 minutes",
    packages: ["Silver (₹80k)", "Gold (₹1.5L)", "Platinum (₹3.5L)"],
    specialties: ["Celebrity Weddings", "Destination Shoots", "Cinematic Films", "International Travel"],
    highlights: [
      { label: "Availability", value: "check" },
      { label: "Video Portfolio", value: "check" },
      { label: "Albums Included", value: "check" },
      { label: "Drone Coverage", value: "check" },
      { label: "Pre-wedding Shoot", value: "check" },
      { label: "Destination Travel", value: "check" },
    ],
    badge: "Top Rated",
    badgeColor: "from-yellow-500 to-orange-500",
  },
  {
    id: 4,
    name: "Grand Palace Banquets",
    category: "Venues",
    city: "Delhi",
    rating: 4.8,
    reviews: 189,
    priceMin: 150000,
    priceMax: 500000,
    priceDisplay: "₹1,50,000 – ₹5,00,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    premium: false,
    experience: "20 years",
    teamsSize: "Full in-house team",
    responseTime: "< 2 hours",
    packages: ["Hall Only (₹1.5L)", "Hall + Catering (₹3L)", "All Inclusive (₹5L)"],
    specialties: ["AC Banquet Hall", "Parking", "In-house Catering", "Decoration"],
    highlights: [
      { label: "Capacity 500+", value: "check" },
      { label: "In-house Catering", value: "check" },
      { label: "Parking", value: "check" },
      { label: "Outdoor Area", value: "cross" },
      { label: "Stay Rooms", value: "minus" },
      { label: "Alcohol Permitted", value: "check" },
    ],
    badge: null,
    badgeColor: "",
  },
  {
    id: 5,
    name: "Glamour Makeup Studio",
    category: "Makeup Artists",
    city: "Mumbai",
    rating: 4.9,
    reviews: 178,
    priceMin: 25000,
    priceMax: 100000,
    priceDisplay: "₹25,000 – ₹1,00,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    premium: true,
    experience: "12 years",
    teamsSize: "2 makeup artists",
    responseTime: "< 1 hour",
    packages: ["Day Makeup (₹25k)", "Bridal (₹60k)", "Full Package (₹1L)"],
    specialties: ["Bridal Makeup", "Airbrush", "HD Makeup", "Hair Styling"],
    highlights: [
      { label: "Trial Session", value: "check" },
      { label: "Airbrush Makeup", value: "check" },
      { label: "Hair Included", value: "check" },
      { label: "Home Visit", value: "check" },
      { label: "Bridesmaid Makeup", value: "minus" },
      { label: "Touch-up Kit", value: "check" },
    ],
    badge: "Best Rated",
    badgeColor: "from-pink-500 to-rose-500",
  },
  {
    id: 6,
    name: "Floral Dreams Decorators",
    category: "Decorators",
    city: "Bangalore",
    rating: 4.7,
    reviews: 156,
    priceMin: 75000,
    priceMax: 300000,
    priceDisplay: "₹75,000 – ₹3,00,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    premium: true,
    experience: "8 years",
    teamsSize: "15 person team",
    responseTime: "< 4 hours",
    packages: ["Basic Floral (₹75k)", "Premium (₹1.5L)", "Luxury (₹3L)"],
    specialties: ["Floral Decor", "Stage Decoration", "Mandap Design", "Entrance Arches"],
    highlights: [
      { label: "Fresh Flowers", value: "check" },
      { label: "Stage Decor", value: "check" },
      { label: "Photo Booth", value: "check" },
      { label: "Lighting", value: "minus" },
      { label: "Mandap", value: "check" },
      { label: "Cleanup Included", value: "check" },
    ],
    badge: null,
    badgeColor: "",
  },
]

type Vendor = (typeof ALL_VENDORS)[0]

// ─── Highlight icon helper ─────────────────────────────────────────────────────

function HighlightIcon({ value }: { value: string }) {
  if (value === "check") return <Check className="w-5 h-5 text-green-500" />
  if (value === "cross") return <X className="w-5 h-5 text-red-400" />
  return <Minus className="w-5 h-5 text-gray-300" />
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CompareClient() {
  const [selected, setSelected] = useState<Vendor[]>([])
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")

  const categories = ["All", ...Array.from(new Set(ALL_VENDORS.map((v) => v.category)))]

  const filtered = ALL_VENDORS.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase())
    const matchesCat = categoryFilter === "All" || v.category === categoryFilter
    return matchesSearch && matchesCat
  })

  const isSelected = (v: Vendor) => selected.some((s) => s.id === v.id)
  const canAdd = selected.length < 3

  const toggleVendor = (v: Vendor) => {
    if (isSelected(v)) {
      setSelected((prev) => prev.filter((s) => s.id !== v.id))
    } else if (canAdd) {
      setSelected((prev) => [...prev, v])
    }
  }

  const removeVendor = (id: number) => setSelected((prev) => prev.filter((v) => v.id !== id))

  // Shared highlight labels (from first selected vendor or default)
  const highlightLabels =
    selected[0]?.highlights.map((h) => h.label) ||
    ["Availability", "Portfolio", "Packages", "Experience", "Travel", "Support"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">WeddingBazaar</span>
          </Link>
          <span className="hidden sm:block text-gray-400">|</span>
          <h1 className="hidden sm:block text-gray-700 font-medium">Compare Vendors</h1>
          <div className="ml-auto flex items-center gap-2">
            <Badge
              className={`${selected.length === 3 ? "bg-pink-100 text-pink-700" : "bg-gray-100 text-gray-600"} border-0`}
            >
              {selected.length}/3 selected
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ── Comparison table ── */}
        {selected.length >= 2 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Side-by-Side Comparison</h2>

            <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-100 bg-white">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="p-6 text-left text-sm font-semibold text-gray-500 w-48 bg-gray-50 rounded-tl-2xl">
                      Feature
                    </th>
                    {selected.map((v, i) => (
                      <th key={v.id} className="p-6 text-center relative">
                        {/* Best badge */}
                        {v.badge && (
                          <div className="absolute top-3 left-1/2 -translate-x-1/2">
                            <Badge
                              className={`bg-gradient-to-r ${v.badgeColor} text-white border-0 text-xs shadow-sm`}
                            >
                              {v.badge}
                            </Badge>
                          </div>
                        )}

                        <div className="relative w-20 h-20 mx-auto mb-3 mt-4 rounded-xl overflow-hidden ring-2 ring-pink-200">
                          <Image src={v.image} alt={v.name} fill className="object-cover" />
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">{v.name}</div>
                        <div className="text-xs text-gray-500 mb-1">
                          {v.category} · {v.city}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{v.rating}</span>
                          <span className="text-xs text-gray-400">({v.reviews})</span>
                        </div>
                        <button
                          onClick={() => removeVendor(v.id)}
                          className="absolute top-2 right-2 w-6 h-6 bg-gray-100 hover:bg-red-100 hover:text-red-500 rounded-full flex items-center justify-center transition-colors"
                          aria-label={`Remove ${v.name}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </th>
                    ))}
                    {selected.length < 3 && (
                      <th className="p-6 text-center text-gray-300">
                        <div className="w-20 h-20 mx-auto mb-3 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                          <Plus className="w-6 h-6" />
                        </div>
                        <div className="text-xs text-gray-400">Add vendor</div>
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {/* Price */}
                  <tr className="border-b border-gray-50 bg-pink-50/30">
                    <td className="p-4 pl-6 text-sm font-semibold text-gray-700 bg-gray-50">Price Range</td>
                    {selected.map((v) => (
                      <td key={v.id} className="p-4 text-center">
                        <span className="font-semibold text-gray-900 text-sm">{v.priceDisplay}</span>
                      </td>
                    ))}
                    {selected.length < 3 && <td />}
                  </tr>

                  {/* Rating */}
                  <tr className="border-b border-gray-50">
                    <td className="p-4 pl-6 text-sm font-medium text-gray-600 bg-gray-50">Rating</td>
                    {selected.map((v) => (
                      <td key={v.id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{v.rating}</span>
                          <span className="text-xs text-gray-400">/ 5.0</span>
                        </div>
                        <div className="text-xs text-gray-400">{v.reviews} reviews</div>
                      </td>
                    ))}
                    {selected.length < 3 && <td />}
                  </tr>

                  {/* Experience */}
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <td className="p-4 pl-6 text-sm font-medium text-gray-600 bg-gray-50">Experience</td>
                    {selected.map((v) => (
                      <td key={v.id} className="p-4 text-center text-sm text-gray-700">
                        {v.experience}
                      </td>
                    ))}
                    {selected.length < 3 && <td />}
                  </tr>

                  {/* Team */}
                  <tr className="border-b border-gray-50">
                    <td className="p-4 pl-6 text-sm font-medium text-gray-600 bg-gray-50">Team</td>
                    {selected.map((v) => (
                      <td key={v.id} className="p-4 text-center text-sm text-gray-700">
                        {v.teamsSize}
                      </td>
                    ))}
                    {selected.length < 3 && <td />}
                  </tr>

                  {/* Response time */}
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <td className="p-4 pl-6 text-sm font-medium text-gray-600 bg-gray-50">Response Time</td>
                    {selected.map((v) => (
                      <td key={v.id} className="p-4 text-center text-sm text-gray-700">
                        {v.responseTime}
                      </td>
                    ))}
                    {selected.length < 3 && <td />}
                  </tr>

                  {/* Packages */}
                  <tr className="border-b border-gray-50">
                    <td className="p-4 pl-6 text-sm font-medium text-gray-600 bg-gray-50">Packages</td>
                    {selected.map((v) => (
                      <td key={v.id} className="p-4 text-center">
                        <div className="space-y-1">
                          {v.packages.map((pkg) => (
                            <div key={pkg} className="text-xs bg-gray-100 rounded-lg px-2 py-1 inline-block mx-0.5">
                              {pkg}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                    {selected.length < 3 && <td />}
                  </tr>

                  {/* Verified */}
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <td className="p-4 pl-6 text-sm font-medium text-gray-600 bg-gray-50">Verified</td>
                    {selected.map((v) => (
                      <td key={v.id} className="p-4 text-center">
                        {v.verified ? (
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <span className="text-xs text-gray-400">Not verified</span>
                        )}
                      </td>
                    ))}
                    {selected.length < 3 && <td />}
                  </tr>

                  {/* Highlights */}
                  {highlightLabels.map((label, li) => (
                    <tr key={label} className={`border-b border-gray-50 ${li % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                      <td className="p-4 pl-6 text-sm font-medium text-gray-600 bg-gray-50">{label}</td>
                      {selected.map((v) => (
                        <td key={v.id} className="p-4 text-center">
                          <div className="flex justify-center">
                            <HighlightIcon value={v.highlights[li]?.value || "cross"} />
                          </div>
                        </td>
                      ))}
                      {selected.length < 3 && <td />}
                    </tr>
                  ))}

                  {/* Actions */}
                  <tr>
                    <td className="p-6 bg-gray-50 rounded-bl-2xl" />
                    {selected.map((v) => (
                      <td key={v.id} className="p-6 text-center">
                        <div className="space-y-2">
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                            asChild
                          >
                            <Link href={`/vendors/${v.id}`}>
                              View Profile
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" className="w-full text-xs">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </td>
                    ))}
                    {selected.length < 3 && <td />}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Vendor picker ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {selected.length === 0 ? "Select vendors to compare" : "Add more vendors"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {selected.length === 0
                  ? "Choose 2–3 vendors from the list below to compare them side-by-side"
                  : `${3 - selected.length} more slot${3 - selected.length !== 1 ? "s" : ""} available`}
              </p>
            </div>
            {selected.length >= 2 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelected([])}
                className="text-gray-500 hover:text-red-500 hover:border-red-200"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Search & category filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search vendors…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    categoryFilter === cat
                      ? "bg-pink-500 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Vendor grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((vendor) => {
              const sel = isSelected(vendor)
              const disabled = !sel && !canAdd
              return (
                <Card
                  key={vendor.id}
                  onClick={() => !disabled && toggleVendor(vendor)}
                  className={`group relative cursor-pointer transition-all duration-200 overflow-hidden border-2 ${
                    sel
                      ? "border-pink-500 shadow-lg ring-2 ring-pink-200"
                      : disabled
                      ? "border-gray-100 opacity-50 cursor-not-allowed"
                      : "border-gray-100 hover:border-pink-300 hover:shadow-md"
                  }`}
                >
                  {/* Selected overlay */}
                  {sel && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center shadow-md">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={vendor.image}
                      alt={vendor.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {vendor.verified && (
                        <Badge className="bg-green-500 text-white border-0 text-xs">
                          <Award className="w-3 h-3 mr-0.5" />
                          Verified
                        </Badge>
                      )}
                      {vendor.premium && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors text-sm">
                          {vendor.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {vendor.category} · {vendor.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0 ml-2">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{vendor.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-gray-900 mt-2">{vendor.priceDisplay}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-wrap gap-1">
                        {vendor.specialties.slice(0, 2).map((s) => (
                          <span key={s} className="text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        variant={sel ? "default" : "outline"}
                        className={`text-xs h-7 shrink-0 ml-2 ${
                          sel
                            ? "bg-pink-500 hover:bg-pink-600 text-white border-0"
                            : "border-pink-200 text-pink-600 hover:bg-pink-50"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!disabled) toggleVendor(vendor)
                        }}
                        disabled={disabled}
                      >
                        {sel ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3 mr-1" />
                            Compare
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No vendors found. Try adjusting your search.</p>
            </div>
          )}
        </div>

        {/* Sticky bottom bar when 2+ selected */}
        {selected.length >= 2 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex items-center justify-between z-40">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {selected.map((v) => (
                  <div key={v.id} className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white relative">
                    <Image src={v.image} alt={v.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">
                Comparing {selected.length} vendor{selected.length !== 1 ? "s" : ""}
              </span>
            </div>
            <Button
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              View Comparison
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {selected.length >= 2 && <div className="h-20" />}
      </div>
    </div>
  )
}
