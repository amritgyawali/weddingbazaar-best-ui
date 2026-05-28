"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  Star,
  CheckCircle,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Palette,
  Camera,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// ─── Quiz data ────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: "style",
    icon: <Palette className="w-6 h-6" />,
    title: "What's your wedding vibe?",
    subtitle: "Pick the aesthetic that feels most like you",
    type: "single" as const,
    options: [
      { value: "royal", label: "Royal & Grand", emoji: "👑", desc: "Opulent décor, palatial venues, regal everything" },
      { value: "romantic", label: "Romantic & Dreamy", emoji: "🌸", desc: "Soft florals, pastel palettes, fairy-lights" },
      { value: "boho", label: "Bohemian & Rustic", emoji: "🌿", desc: "Macramé, earthy tones, outdoor settings" },
      { value: "modern", label: "Modern & Minimalist", emoji: "✨", desc: "Clean lines, monochrome, contemporary venues" },
      { value: "traditional", label: "Classic & Traditional", emoji: "🪔", desc: "Rich colours, traditional rituals, heritage venues" },
      { value: "destination", label: "Destination Wedding", emoji: "🏝️", desc: "Beach, hills, or abroad — somewhere magical" },
    ],
  },
  {
    id: "budget",
    icon: <DollarSign className="w-6 h-6" />,
    title: "What's your wedding budget?",
    subtitle: "This helps us suggest vendors in the right range",
    type: "single" as const,
    options: [
      { value: "budget_5", label: "Under ₹5 Lakhs", emoji: "💚", desc: "Intimate, thoughtful, beautifully curated" },
      { value: "budget_10", label: "₹5 – 10 Lakhs", emoji: "💛", desc: "Great vendors, meaningful celebrations" },
      { value: "budget_25", label: "₹10 – 25 Lakhs", emoji: "🧡", desc: "Premium vendors, stunning setups" },
      { value: "budget_50", label: "₹25 – 50 Lakhs", emoji: "❤️", desc: "Luxury experience, top-tier professionals" },
      { value: "budget_50plus", label: "₹50 Lakhs+", emoji: "💎", desc: "No compromise, absolute best in class" },
    ],
  },
  {
    id: "guests",
    icon: <Users className="w-6 h-6" />,
    title: "How many guests are you expecting?",
    subtitle: "Guest count affects venue and catering choices",
    type: "single" as const,
    options: [
      { value: "intimate", label: "Under 50", emoji: "🤍", desc: "Intimate micro-wedding or elopement" },
      { value: "small", label: "50 – 150", emoji: "💕", desc: "Small wedding with close family & friends" },
      { value: "medium", label: "150 – 300", emoji: "💞", desc: "Mid-size celebration" },
      { value: "large", label: "300 – 500", emoji: "🎊", desc: "Traditional large gathering" },
      { value: "grand", label: "500+", emoji: "🎆", desc: "Grand celebration, big venue needed" },
    ],
  },
  {
    id: "city",
    icon: <MapPin className="w-6 h-6" />,
    title: "Where is your wedding city?",
    subtitle: "We'll show vendors near you",
    type: "city" as const,
    options: [],
  },
  {
    id: "date",
    icon: <Calendar className="w-6 h-6" />,
    title: "When is your big day?",
    subtitle: "Helps us check vendor availability",
    type: "date" as const,
    options: [],
  },
  {
    id: "priorities",
    icon: <Camera className="w-6 h-6" />,
    title: "Which vendor categories matter most?",
    subtitle: "Select up to 3 – we'll prioritise finding the best for you",
    type: "multi" as const,
    options: [
      { value: "photography", label: "Photography", emoji: "📸", desc: "Capture every moment" },
      { value: "venue", label: "Venue", emoji: "🏛️", desc: "Your dream setting" },
      { value: "decoration", label: "Decoration", emoji: "🌺", desc: "Bring the vision to life" },
      { value: "catering", label: "Catering", emoji: "🍽️", desc: "Delight every guest" },
      { value: "makeup", label: "Bridal Makeup", emoji: "💄", desc: "Look absolutely stunning" },
      { value: "mehendi", label: "Mehendi Artist", emoji: "🎭", desc: "Beautiful henna art" },
      { value: "music", label: "DJ / Music", emoji: "🎵", desc: "Keep the dance floor alive" },
      { value: "bridal_wear", label: "Bridal Wear", emoji: "👗", desc: "The perfect outfit" },
    ],
  },
]

// ─── Recommendation scoring ────────────────────────────────────────────────────

const MOCK_VENDORS = [
  {
    id: 1,
    name: "Rajesh Photography",
    category: "photographers",
    city: "Mumbai",
    rating: 4.9,
    reviews: 245,
    price: "₹50,000 – ₹2,00,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    tags: ["royal", "romantic", "modern"],
    matchScore: 98,
    matchReason: "Matches your romantic style & budget",
  },
  {
    id: 2,
    name: "Grand Palace Banquets",
    category: "venues",
    city: "Delhi",
    rating: 4.8,
    reviews: 189,
    price: "₹1,50,000 – ₹5,00,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    tags: ["royal", "traditional", "grand"],
    matchScore: 95,
    matchReason: "Perfect for large royal weddings",
  },
  {
    id: 3,
    name: "Floral Dreams Decorators",
    category: "decorators",
    city: "Bangalore",
    rating: 4.7,
    reviews: 156,
    price: "₹75,000 – ₹3,00,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    tags: ["romantic", "boho", "destination"],
    matchScore: 93,
    matchReason: "Specialises in your preferred aesthetic",
  },
  {
    id: 4,
    name: "Spice Garden Catering",
    category: "catering",
    city: "Chennai",
    rating: 4.6,
    reviews: 203,
    price: "₹800 – ₹2,500 per plate",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    tags: ["traditional", "modern", "grand"],
    matchScore: 91,
    matchReason: "Multi-cuisine, fits your guest count",
  },
  {
    id: 5,
    name: "Glamour Makeup Studio",
    category: "makeup",
    city: "Mumbai",
    rating: 4.9,
    reviews: 178,
    price: "₹25,000 – ₹1,00,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    tags: ["royal", "romantic", "modern"],
    matchScore: 97,
    matchReason: "Celebrity bridal artist, your style match",
  },
  {
    id: 6,
    name: "Henna Art by Priya",
    category: "mehendi",
    city: "Jaipur",
    rating: 4.8,
    reviews: 134,
    price: "₹15,000 – ₹50,000",
    image: "/placeholder.svg?height=300&width=400",
    verified: true,
    tags: ["traditional", "royal", "romantic"],
    matchScore: 94,
    matchReason: "Award-winning intricate designs",
  },
]

// ─── Component ─────────────────────────────────────────────────────────────────

export default function RecommendationsClient() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [cityInput, setCityInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [showResults, setShowResults] = useState(false)

  const step = STEPS[currentStep]
  const progress = ((currentStep + (showResults ? 1 : 0)) / STEPS.length) * 100

  const handleSingleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.id]: value }))
  }

  const handleMultiSelect = (value: string) => {
    setAnswers((prev) => {
      const current = (prev[step.id] as string[]) || []
      if (current.includes(value)) {
        return { ...prev, [step.id]: current.filter((v) => v !== value) }
      }
      if (current.length >= 3) return prev
      return { ...prev, [step.id]: [...current, value] }
    })
  }

  const canProceed = () => {
    if (step.type === "single") return !!answers[step.id]
    if (step.type === "multi") return ((answers[step.id] as string[]) || []).length > 0
    if (step.type === "city") return cityInput.trim().length > 0
    if (step.type === "date") return dateInput.length > 0
    return false
  }

  const handleNext = () => {
    if (step.type === "city") setAnswers((prev) => ({ ...prev, city: cityInput }))
    if (step.type === "date") setAnswers((prev) => ({ ...prev, date: dateInput }))

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (showResults) {
      setShowResults(false)
    } else {
      setCurrentStep((s) => s - 1)
    }
  }

  // Filter & score vendors based on answers
  const recommendations = MOCK_VENDORS.filter((v) => {
    const style = answers.style as string
    if (style && !v.tags.includes(style)) return false
    const priorities = (answers.priorities as string[]) || []
    if (priorities.length > 0 && !priorities.includes(v.category)) return false
    return true
  })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6)

  const allRecommendations = recommendations.length > 0 ? recommendations : MOCK_VENDORS.slice(0, 6)

  // ── Results view ─────────────────────────────────────────────────────────────
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        {/* Header */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-lg">WeddingBazaar</span>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Your Personalised Recommendations
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Based on your{" "}
              <span className="font-semibold text-pink-600 capitalize">
                {(answers.style as string)?.replace("_", " ") || "dream"}
              </span>{" "}
              wedding style and preferences, here are the vendors we think you'll love.
            </p>

            {/* Quiz summary chips */}
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {answers.style && (
                <Badge className="bg-pink-100 text-pink-700 border-pink-200 capitalize">
                  🎨 {(answers.style as string).replace("_", " ")}
                </Badge>
              )}
              {answers.budget && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  💰 {STEPS[1].options.find((o) => o.value === answers.budget)?.label}
                </Badge>
              )}
              {answers.guests && (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  👥 {STEPS[2].options.find((o) => o.value === answers.guests)?.label} guests
                </Badge>
              )}
              {answers.city && (
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                  📍 {answers.city as string}
                </Badge>
              )}
            </div>
          </div>

          {/* Vendor cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {allRecommendations.map((vendor) => (
              <Card
                key={vendor.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={vendor.image}
                    alt={vendor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Match score badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 shadow-md">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {vendor.matchScore}% Match
                    </Badge>
                  </div>
                  {vendor.verified && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white border-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors text-lg">
                        {vendor.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {vendor.category} • {vendor.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{vendor.rating}</span>
                      <span className="text-xs text-gray-400">({vendor.reviews})</span>
                    </div>
                  </div>

                  {/* Why matched */}
                  <p className="text-xs text-pink-600 font-medium bg-pink-50 rounded-lg px-3 py-1.5 mb-3">
                    ✨ {vendor.matchReason}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">{vendor.price}</p>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                      asChild
                    >
                      <Link href={`/vendors/${vendor.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="text-center space-y-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 shadow-lg"
              asChild
            >
              <Link href="/vendors">
                Explore All Vendors
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <div>
              <button
                onClick={handleBack}
                className="text-sm text-gray-500 hover:text-pink-600 transition-colors underline"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz view ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">WeddingBazaar</span>
          </Link>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {STEPS.length}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          {/* Progress bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-2 bg-pink-100 [&>div]:bg-gradient-to-r [&>div]:from-pink-500 [&>div]:to-rose-500" />
          </div>

          {/* Step card */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              {/* Step icon + title */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white shrink-0">
                  {step.icon}
                </div>
                <Badge className="bg-pink-100 text-pink-700 border-pink-200 text-xs">
                  Question {currentStep + 1}
                </Badge>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-2">{step.title}</h2>
              <p className="text-gray-500 mb-8">{step.subtitle}</p>

              {/* Options */}
              {step.type === "single" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.options.map((option) => {
                    const selected = answers[step.id] === option.value
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSingleSelect(option.value)}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          selected
                            ? "border-pink-500 bg-pink-50 shadow-md"
                            : "border-gray-100 bg-white hover:border-pink-200 hover:bg-pink-50/50"
                        }`}
                      >
                        <span className="text-2xl shrink-0">{option.emoji}</span>
                        <div>
                          <div className={`font-semibold ${selected ? "text-pink-700" : "text-gray-900"}`}>
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">{option.desc}</div>
                        </div>
                        {selected && <CheckCircle className="w-5 h-5 text-pink-500 ml-auto shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              )}

              {step.type === "multi" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.options.map((option) => {
                      const selected = ((answers[step.id] as string[]) || []).includes(option.value)
                      const atLimit = ((answers[step.id] as string[]) || []).length >= 3
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleMultiSelect(option.value)}
                          disabled={!selected && atLimit}
                          className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                            selected
                              ? "border-pink-500 bg-pink-50 shadow-md"
                              : "border-gray-100 bg-white hover:border-pink-200 hover:bg-pink-50/50"
                          }`}
                        >
                          <span className="text-2xl shrink-0">{option.emoji}</span>
                          <div>
                            <div className={`font-semibold ${selected ? "text-pink-700" : "text-gray-900"}`}>
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">{option.desc}</div>
                          </div>
                          {selected && <CheckCircle className="w-5 h-5 text-pink-500 ml-auto shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    {((answers[step.id] as string[]) || []).length}/3 selected
                  </p>
                </>
              )}

              {step.type === "city" && (
                <div className="max-w-sm">
                  <Input
                    placeholder="e.g. Mumbai, Delhi, Bangalore…"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    className="h-12 text-base border-pink-200 focus:ring-pink-300"
                    autoFocus
                    list="city-suggestions"
                    onKeyDown={(e) => e.key === "Enter" && canProceed() && handleNext()}
                  />
                  <datalist id="city-suggestions">
                    {["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Jaipur", "Lucknow", "Ahmedabad", "Surat", "Chandigarh"].map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              )}

              {step.type === "date" && (
                <div className="max-w-sm">
                  <Input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="h-12 text-base border-pink-200 focus:ring-pink-300"
                  />
                  <p className="text-xs text-gray-400 mt-2">Don't have a date yet? You can skip this.</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <div className="flex items-center gap-3">
                  {step.type === "date" && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setAnswers((prev) => ({ ...prev, date: "" }))
                        setCurrentStep((s) => s + 1)
                      }}
                      className="text-gray-400 hover:text-gray-600 text-sm"
                    >
                      Skip
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 shadow-md disabled:opacity-50"
                  >
                    {currentStep === STEPS.length - 1 ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        See My Matches
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step dots */}
          <div className="flex justify-center gap-2 mt-6">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? "w-8 bg-pink-500"
                    : i < currentStep
                    ? "w-3 bg-pink-300"
                    : "w-3 bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
