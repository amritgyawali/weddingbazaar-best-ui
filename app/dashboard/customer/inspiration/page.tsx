"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Heart,
  Sparkles,
  Image,
  Bookmark,
  Search,
  Filter,
  Plus,
  X,
  Star,
  Calendar,
  Users,
  MessageCircle,
  Globe,
  Gift,
  Palette,
  Tag,
  CheckCircle,
  ChevronRight,
  Brain,
  Zap,
} from "lucide-react"

const menuItems = [
  { label: "Overview", href: "/dashboard/customer", icon: <Heart className="w-4 h-4" /> },
  { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Calendar className="w-4 h-4" /> },
  { label: "Wedding Website", href: "/dashboard/customer/wedding-website", icon: <Globe className="w-4 h-4" /> },
  { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
  { label: "Budget", href: "/dashboard/customer/budget", icon: <Star className="w-4 h-4" /> },
  { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
  { label: "Registry & Gifts", href: "/dashboard/customer/registry", icon: <Gift className="w-4 h-4" /> },
  {
    label: "Inspiration",
    href: "/dashboard/customer/inspiration",
    icon: <Palette className="w-4 h-4" />,
    active: true,
  },
  { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
  { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Star className="w-4 h-4" /> },
  { label: "Documents", href: "/dashboard/customer/documents", icon: <Star className="w-4 h-4" /> },
]

const styleQuizQuestions = [
  {
    id: 1,
    question: "What's your dream wedding setting?",
    options: [
      { label: "Lush Garden / Forest", emoji: "🌿", style: "Boho" },
      { label: "Grand Ballroom", emoji: "✨", style: "Classic" },
      { label: "Beach at Sunset", emoji: "🌅", style: "Beach" },
      { label: "Industrial Loft", emoji: "🏭", style: "Modern" },
    ],
  },
  {
    id: 2,
    question: "Pick your colour palette",
    options: [
      { label: "Blush & Gold", emoji: "🌸", style: "Romantic" },
      { label: "Earth Tones", emoji: "🍂", style: "Boho" },
      { label: "White & Navy", emoji: "⚓", style: "Classic" },
      { label: "Dusty Blue & Sage", emoji: "🌿", style: "Garden" },
    ],
  },
  {
    id: 3,
    question: "Your floral vibe?",
    options: [
      { label: "Wildflowers & Greenery", emoji: "🌾", style: "Boho" },
      { label: "Roses & Peonies", emoji: "🌹", style: "Romantic" },
      { label: "Tropical & Bold", emoji: "🌺", style: "Tropical" },
      { label: "Minimal & Structural", emoji: "🌿", style: "Modern" },
    ],
  },
  {
    id: 4,
    question: "Your wedding dress silhouette?",
    options: [
      { label: "Ball Gown", emoji: "👸", style: "Classic" },
      { label: "Boho Flowy", emoji: "🌸", style: "Boho" },
      { label: "Sleek & Minimal", emoji: "✨", style: "Modern" },
      { label: "Lehenga / Traditional", emoji: "🥻", style: "Traditional" },
    ],
  },
]

const inspirationImages = [
  { id: 1, category: "Decor", style: "Boho", title: "Macramé Arch", emoji: "🌿", saved: true, tags: ["Boho", "Outdoor"] },
  { id: 2, category: "Florals", style: "Romantic", title: "Rose Cascade", emoji: "🌹", saved: true, tags: ["Romantic", "Floral"] },
  { id: 3, category: "Venue", style: "Classic", title: "Grand Ballroom", emoji: "✨", saved: false, tags: ["Classic", "Indoor"] },
  { id: 4, category: "Attire", style: "Modern", title: "Minimal Gown", emoji: "👗", saved: true, tags: ["Modern", "Bridal"] },
  { id: 5, category: "Cake", style: "Boho", title: "Naked Cake", emoji: "🎂", saved: false, tags: ["Boho", "Rustic"] },
  { id: 6, category: "Lighting", style: "Romantic", title: "String Lights", emoji: "💡", saved: true, tags: ["Romantic", "Evening"] },
  { id: 7, category: "Table", style: "Classic", title: "Formal Table Setup", emoji: "🍽️", saved: false, tags: ["Classic", "Elegant"] },
  { id: 8, category: "Photo", style: "Modern", title: "Silhouette Shot", emoji: "📷", saved: false, tags: ["Modern", "Photography"] },
  { id: 9, category: "Invites", style: "Boho", title: "Leaf-Print Suite", emoji: "📩", saved: true, tags: ["Boho", "Stationery"] },
]

const styleBreakdown = [
  { style: "Boho", percentage: 45, color: "bg-amber-400" },
  { style: "Romantic", percentage: 30, color: "bg-pink-400" },
  { style: "Classic", percentage: 15, color: "bg-indigo-400" },
  { style: "Modern", percentage: 10, color: "bg-gray-400" },
]

const vendorRecommendations = [
  { name: "Earthy Lens Photography", style: "Boho", match: 96, specialty: "Photographer", price: "₹80K–1.2L" },
  { name: "Wildflower Events", style: "Boho", match: 93, specialty: "Decorator", price: "₹1.5L–3L" },
  { name: "The Petal Studio", style: "Romantic", match: 88, specialty: "Florist", price: "₹40K–80K" },
]

export default function InspirationPage() {
  const [activeTab, setActiveTab] = useState("board")
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [quizComplete, setQuizComplete] = useState(false)
  const [savedItems, setSavedItems] = useState<number[]>(
    inspirationImages.filter((i) => i.saved).map((i) => i.id)
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  const categories = ["All", "Decor", "Florals", "Venue", "Attire", "Cake", "Lighting", "Table", "Photo", "Invites"]

  const filteredImages = inspirationImages.filter((img) => {
    const matchesSearch = img.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activeFilter === "All" || img.category === activeFilter
    return matchesSearch && matchesFilter
  })

  const handleQuizAnswer = (questionId: number, style: string) => {
    const newAnswers = { ...quizAnswers, [questionId]: style }
    setQuizAnswers(newAnswers)
    if (quizStep < styleQuizQuestions.length - 1) {
      setQuizStep((s) => s + 1)
    } else {
      setQuizComplete(true)
    }
  }

  const toggleSave = (id: number) => {
    setSavedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inspiration Boards & Style Quiz</h1>
            <p className="text-gray-600 mt-1">Save ideas and let AI discover your wedding style</p>
          </div>
          <Button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Board
          </Button>
        </div>

        {/* AI Style Profile */}
        {quizComplete && (
          <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-pink-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="font-bold text-gray-800">Your Style Profile: Boho-Romantic</p>
                    <Badge className="bg-pink-100 text-pink-700">AI Generated</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Based on your saved images and quiz answers, your style is primarily <strong>Boho (45%)</strong> with a
                    touch of <strong>Romantic (30%)</strong>. We've matched you with vendors who excel in this aesthetic.
                  </p>
                  <div className="space-y-2">
                    {styleBreakdown.map((s) => (
                      <div key={s.style} className="flex items-center space-x-3">
                        <span className="text-xs text-gray-600 w-20">{s.style}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className={`${s.color} h-2 rounded-full`} style={{ width: `${s.percentage}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-700 w-8">{s.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="board">📌 Inspiration Board</TabsTrigger>
            <TabsTrigger value="quiz">🎯 Style Quiz</TabsTrigger>
            <TabsTrigger value="matches">✨ Vendor Matches</TabsTrigger>
          </TabsList>

          {/* Inspiration Board */}
          <TabsContent value="board" className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search your board..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      activeFilter === cat
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((img) => (
                <Card key={img.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center relative">
                    <span className="text-5xl">{img.emoji}</span>
                    <button
                      onClick={() => toggleSave(img.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${savedItems.includes(img.id) ? "text-pink-500 fill-pink-500" : "text-gray-400"}`}
                      />
                    </button>
                    <div className="absolute bottom-2 left-2 flex space-x-1">
                      {img.tags.map((tag) => (
                        <span key={tag} className="bg-white bg-opacity-90 text-xs px-1.5 py-0.5 rounded text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium text-gray-700">{img.title}</p>
                    <p className="text-xs text-gray-400">{img.category}</p>
                  </CardContent>
                </Card>
              ))}

              {/* Add Image Card */}
              <Card className="overflow-hidden border-dashed border-2 border-gray-200 hover:border-pink-300 cursor-pointer transition-colors">
                <div className="aspect-square flex flex-col items-center justify-center text-gray-400">
                  <Plus className="w-8 h-8 mb-1" />
                  <p className="text-xs">Add Image</p>
                </div>
              </Card>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
              <span>{savedItems.length} saved items</span>
              <Button variant="outline" size="sm">
                <Zap className="w-3 h-3 mr-1" />
                Analyze My Style
              </Button>
            </div>
          </TabsContent>

          {/* Style Quiz */}
          <TabsContent value="quiz" className="space-y-6">
            {!quizComplete ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle>
                      Question {quizStep + 1} of {styleQuizQuestions.length}
                    </CardTitle>
                    <Badge className="bg-pink-100 text-pink-700">Style Quiz</Badge>
                  </div>
                  <Progress value={((quizStep + 1) / styleQuizQuestions.length) * 100} />
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    {styleQuizQuestions[quizStep].question}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {styleQuizQuestions[quizStep].options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleQuizAnswer(styleQuizQuestions[quizStep].id, opt.style)}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all text-left group"
                      >
                        <div className="text-3xl mb-2">{opt.emoji}</div>
                        <p className="font-medium text-gray-700 group-hover:text-pink-600">{opt.label}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Style: Boho-Romantic</h3>
                  <p className="text-gray-600 mb-6">
                    Your answers reveal a love for natural, earthy elegance with a touch of romance. We've found vendors
                    who specialise in exactly this aesthetic!
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {styleBreakdown.map((s) => (
                      <div key={s.style} className="bg-gray-50 rounded-lg p-3 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{s.style}</span>
                          <span className="text-sm text-gray-500">{s.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div className={`${s.color} h-1.5 rounded-full`} style={{ width: `${s.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setQuizStep(0)
                        setQuizAnswers({})
                        setQuizComplete(false)
                      }}
                    >
                      Retake Quiz
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                      onClick={() => setActiveTab("matches")}
                    >
                      See Matched Vendors
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Vendor Matches */}
          <TabsContent value="matches" className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-pink-500" />
              <p className="text-sm text-gray-600">
                AI-matched vendors based on your <strong>Boho-Romantic</strong> style profile
              </p>
            </div>

            <div className="space-y-4">
              {vendorRecommendations.map((vendor, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full flex items-center justify-center text-2xl">
                        📷
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{vendor.name}</p>
                        <p className="text-sm text-gray-500">{vendor.specialty} · {vendor.price}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-amber-100 text-amber-700 text-xs">{vendor.style}</Badge>
                          <span className="text-xs text-gray-400">Style match</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{vendor.match}%</p>
                      <p className="text-xs text-gray-400">match score</p>
                      <Button size="sm" className="mt-2 bg-pink-500 text-white hover:bg-pink-600">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-pink-50 border-pink-200">
              <CardContent className="p-4 text-center">
                <Sparkles className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                <p className="font-medium text-gray-800">Complete your style quiz to unlock more matches</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setActiveTab("quiz")}
                >
                  Take Style Quiz
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
