"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Calendar,
  Star,
  Download,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  ChevronDown,
  Heart,
  Users,
  Award,
  Clock,
  ArrowRight,
  Play,
  CheckCircle,
  X,
  Sparkles,
  Camera,
  Building2,
  Palette,
  UtensilsCrossed,
  Gem,
  Music,
  Shirt,
} from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const SearchBarClient = dynamic(() => import("@/components/search-bar-client"), { ssr: false })

const STATS = {
  couples: "75K+",
  vendors: "25K+",
  cities: "150+",
  rating: "4.9",
  businessGenerated: "₹150+ Crores",
}

const PARTICLES = [
  { left: "5%", top: "15%", size: "4px", delay: "0s", duration: "4s" },
  { left: "15%", top: "70%", size: "3px", delay: "1s", duration: "5s" },
  { left: "30%", top: "25%", size: "5px", delay: "2s", duration: "4.5s" },
  { left: "50%", top: "80%", size: "3px", delay: "0.5s", duration: "5.5s" },
  { left: "70%", top: "20%", size: "4px", delay: "1.5s", duration: "4s" },
  { left: "85%", top: "60%", size: "3px", delay: "2.5s", duration: "5s" },
  { left: "92%", top: "30%", size: "5px", delay: "0.8s", duration: "4.8s" },
  { left: "40%", top: "50%", size: "3px", delay: "1.2s", duration: "5.2s" },
]

export default function EnhancedWeddingBazaarHomePage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/vendors?category=${categoryName.toLowerCase().replace(" ", "-")}`)
  }

  const categories = [
    { name: "Photographers", count: "2.5k+", icon: <Camera className="w-6 h-6" />, color: "from-violet-500 to-purple-600", bgLight: "bg-violet-50" },
    { name: "Venues", count: "1.8k+", icon: <Building2 className="w-6 h-6" />, color: "from-blue-500 to-indigo-600", bgLight: "bg-blue-50" },
    { name: "Decorators", count: "3.2k+", icon: <Palette className="w-6 h-6" />, color: "from-emerald-500 to-teal-600", bgLight: "bg-emerald-50" },
    { name: "Catering", count: "2.1k+", icon: <UtensilsCrossed className="w-6 h-6" />, color: "from-orange-500 to-red-500", bgLight: "bg-orange-50" },
    { name: "Makeup Artists", count: "1.9k+", icon: <Sparkles className="w-6 h-6" />, color: "from-pink-500 to-rose-600", bgLight: "bg-pink-50" },
    { name: "Jewellery", count: "2.3k+", icon: <Gem className="w-6 h-6" />, color: "from-amber-500 to-yellow-600", bgLight: "bg-amber-50" },
    { name: "DJ & Music", count: "900+", icon: <Music className="w-6 h-6" />, color: "from-indigo-500 to-blue-600", bgLight: "bg-indigo-50" },
    { name: "Bridal Wear", count: "2.8k+", icon: <Shirt className="w-6 h-6" />, color: "from-rose-500 to-pink-600", bgLight: "bg-rose-50" },
  ]

  const features = [
    {
      title: "AI-Powered Matching",
      description: "Our smart algorithm finds vendors that perfectly match your style, budget, and vision",
      icon: <Sparkles className="w-7 h-7" />,
      color: "from-violet-500 to-purple-600",
      stats: "98% Match Rate",
    },
    {
      title: "Verified & Trusted",
      description: "Every vendor undergoes rigorous verification with authentic reviews from real couples",
      icon: <CheckCircle className="w-7 h-7" />,
      color: "from-emerald-500 to-teal-600",
      stats: "25k+ Verified",
    },
    {
      title: "Best Price Guarantee",
      description: "Compare quotes instantly and unlock exclusive deals you won't find anywhere else",
      icon: <Award className="w-7 h-7" />,
      color: "from-amber-500 to-orange-600",
      stats: "Save up to 40%",
    },
    {
      title: "Dedicated Planner",
      description: "Get a personal wedding consultant who guides you through every step of your journey",
      icon: <Heart className="w-7 h-7" />,
      color: "from-pink-500 to-rose-600",
      stats: "24/7 Support",
    },
  ]

  const testimonials = [
    {
      name: "Priya & Rahul",
      location: "Mumbai",
      text: "WeddingBazaar completely transformed how we planned our wedding. The AI recommendations were incredibly accurate — we found our dream photographer in minutes!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      wedding_date: "Mar 2026",
    },
    {
      name: "Anjali & Vikram",
      location: "Delhi",
      text: "The platform's vendor comparison tool saved us both time and money. We got premium services at the best prices. Truly a game-changer for modern couples!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      wedding_date: "Jan 2026",
    },
    {
      name: "Sneha & Arjun",
      location: "Bangalore",
      text: "From venue booking to the final goodbye — WeddingBazaar was with us at every step. The personalized dashboard and planning tools are unmatched!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
      wedding_date: "Feb 2026",
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Modern Header with Glass Effect */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_2px_40px_rgba(0,0,0,0.06)] border-b border-gray-100/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25 group-hover:shadow-pink-500/40 transition-all duration-300 group-hover:scale-105">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Wedding<span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Bazaar</span>
                </span>
              </Link>
            </div>

            <nav className="hidden lg:block">
              <div className="flex items-center space-x-1">
                {[
                  { name: "Home", href: "/" },
                  { name: "Vendors", href: "/vendors" },
                  { name: "Style Quiz", href: "/recommendations" },
                  { name: "Real Weddings", href: "/real-weddings" },
                  { name: "Blog", href: "/blog" },
                  { name: "E-Invites", href: "/e-invites" },
                ].map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-pink-50 hover:text-pink-600 ${
                      index === 0
                        ? "text-pink-600 bg-pink-50"
                        : isScrolled
                        ? "text-gray-600"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className={`hidden sm:inline-flex rounded-full font-medium transition-all duration-300 ${
                  isScrolled ? "text-gray-600 hover:text-pink-600 hover:bg-pink-50" : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => router.push("/auth/login")}
              >
                Log in
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full px-6 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105"
                onClick={() => router.push("/auth/signup")}
              >
                Get Started
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`lg:hidden rounded-full ${isScrolled ? "text-gray-700" : "text-white"}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-white/95 backdrop-blur-2xl border-t border-gray-100`}
        >
          <div className="px-6 py-6 space-y-2">
            {[
              { name: "Home", href: "/" },
              { name: "Vendors", href: "/vendors" },
              { name: "Style Quiz", href: "/recommendations" },
              { name: "Real Weddings", href: "/real-weddings" },
              { name: "Blog", href: "/blog" },
              { name: "E-Invites", href: "/e-invites" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section — Modern Cinematic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{ backgroundImage: "url('/hero-couple.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-pink-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/30 animate-float"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        {/* Decorative Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-float-delay" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="space-y-8">
            {/* Pill Badge */}
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-white/90 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                India&apos;s #1 Wedding Platform — Trusted by 75,000+ Couples
              </span>
            </div>

            {/* Main Heading */}
            <div className="animate-fade-in-up-delay-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight">
                Your Dream Wedding
                <span className="block mt-2 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Starts Here
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="animate-fade-in-up-delay-2">
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
                Discover 25,000+ verified vendors, get AI-powered recommendations, and plan every detail of your perfect celebration
              </p>
            </div>

            {/* Search Bar */}
            <div className="animate-fade-in-up-delay-3 max-w-4xl mx-auto pt-4">
              <SearchBarClient />
            </div>

            {/* Hero Stats */}
            <div className="animate-fade-in-up-delay-3 pt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {[
                  { number: STATS.couples, label: "Happy Couples" },
                  { number: STATS.vendors, label: "Verified Vendors" },
                  { number: STATS.cities, label: "Cities" },
                  { number: STATS.rating, label: "Average Rating", suffix: "★" },
                ].map((stat, index) => (
                  <div key={index} className="glass rounded-2xl px-4 py-5 text-center hover:bg-white/15 transition-all duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {stat.number}{stat.suffix && <span className="text-yellow-300">{stat.suffix}</span>}
                    </div>
                    <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-9 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/60 rounded-full animate-shimmer" />
          </div>
        </div>
      </section>

      {/* Vendor Categories — Modern Grid */}
      <section id="categories" data-animate className="py-28 bg-gradient-to-b from-gray-50/80 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-sm font-semibold mb-6">
              <Search className="w-3.5 h-3.5" />
              Explore Categories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Wedding Vendors
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Handpicked professionals across every category to bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className={`relative p-6 md:p-8 rounded-3xl border border-gray-100 ${category.bgLight} hover:border-transparent hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}>
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl`} />

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-white text-lg mb-1.5 transition-colors duration-500">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-white/80 font-medium transition-colors duration-500">
                      {category.count} vendors
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-gray-200 text-gray-700 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50 px-8 font-semibold transition-all duration-300"
              onClick={() => router.push("/vendors")}
            >
              View All Categories
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why WeddingBazaar — Bento Grid Style */}
      <section id="features" data-animate className="py-28 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-pink-50 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-50 to-transparent rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold mb-6">
              <Award className="w-3.5 h-3.5" />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
              The Smarter Way to{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Plan Your Wedding
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Experience cutting-edge tools and personalized service that makes planning effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 md:p-10 rounded-3xl border border-gray-100 bg-white hover:border-transparent hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                <div className="relative flex flex-col md:flex-row md:items-start gap-6">
                  <div className={`w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-900">
                        {feature.title}
                      </h3>
                      <Badge className={`bg-gradient-to-r ${feature.color} text-white border-0 text-xs font-semibold shadow-sm`}>
                        {feature.stats}
                      </Badge>
                    </div>
                    <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors — Masonry-style Grid */}
      <section id="vendors" data-animate className="py-28 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
              <Star className="w-3.5 h-3.5" />
              Featured Vendors
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
              Top-Rated Wedding{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Professionals
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Award-winning vendors who have crafted thousands of unforgettable celebrations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-pink-100/30 transform hover:-translate-y-1 ${
                  index === 0 || index === 5 ? "md:row-span-2" : ""
                }`}
                onClick={() => router.push(`/vendors/${index + 1}`)}
              >
                <div className={`relative overflow-hidden ${index === 0 || index === 5 ? "aspect-[3/4]" : "aspect-square"}`}>
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt={`Vendor ${index + 1}`}
                    width={400}
                    height={index === 0 || index === 5 ? 600 : 400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm">Premium Vendor</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-white/90">4.9 (200+ reviews)</span>
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full px-10 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 font-semibold"
              onClick={() => router.push("/vendors")}
            >
              Explore All Vendors
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-gray-200 text-gray-700 hover:border-pink-200 hover:text-pink-600 hover:bg-pink-50 px-10 font-semibold transition-all duration-300"
              onClick={() => router.push("/compare")}
            >
              Compare Vendors
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials — Modern Card Design */}
      <section id="testimonials" data-animate className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.04),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-semibold mb-6">
              <Heart className="w-3.5 h-3.5" />
              Love Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
              Couples Who Found{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Their Perfect Match
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Real stories from real couples who created their dream weddings with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl border border-gray-100 bg-white hover:border-pink-100 hover:shadow-2xl hover:shadow-pink-50 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => router.push("/real-weddings")}
              >
                {/* Decorative quote mark */}
                <div className="absolute top-6 right-8 text-6xl font-serif text-pink-100 leading-none select-none">
                  &ldquo;
                </div>

                <div className="relative">
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-gray-600 mb-8 leading-relaxed text-[15px]">
                    {testimonial.text}
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 ring-2 ring-pink-100">
                      <AvatarImage src={testimonial.image || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-rose-600 text-white text-sm font-bold">
                        {testimonial.name.split(" & ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location} • {testimonial.wedding_date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture — Elegant Form */}
      <section id="cta-form" data-animate className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNiIvPjwvc3ZnPg==')] opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
              Get Personalized Recommendations
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Share your vision and let our AI match you with the perfect vendors for your special day
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/10 p-8 md:p-12 border border-white/50">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                router.push("/recommendations")
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Your Name</label>
                  <Input
                    placeholder="Enter your name"
                    className="h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200/50 bg-gray-50/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Partner&apos;s Name</label>
                  <Input
                    placeholder="Enter partner's name"
                    className="h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200/50 bg-gray-50/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                  <Input
                    placeholder="+91 XXXXX XXXXX"
                    className="h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200/50 bg-gray-50/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200/50 bg-gray-50/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Wedding City</label>
                  <Input
                    placeholder="Where's the celebration?"
                    className="h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200/50 bg-gray-50/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Wedding Date</label>
                  <Input
                    type="date"
                    className="h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200/50 bg-gray-50/50"
                    required
                  />
                </div>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full px-12 py-4 text-base font-bold shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
                >
                  Get My Recommendations
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-gray-400 mt-4 flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  Your information is secure and will never be shared
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Mobile App Section — Clean & Modern */}
      <section id="app" data-animate className="py-28 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-8 border border-white/10">
                <Download className="w-3.5 h-3.5" />
                Download the App
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                Your Wedding Planner,
                <span className="block text-pink-400 mt-1">In Your Pocket</span>
              </h2>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
                Plan on the go with our award-winning app. Chat with vendors, manage budgets, track tasks, and share ideas — all from your phone.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Real-time vendor chat & instant notifications",
                  "Smart budget tracker with expense categories",
                  "Collaborative planning with your partner",
                  "Offline access to your complete wedding checklist",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.open("https://apps.apple.com", "_blank")}
                  className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg group"
                >
                  <Download className="w-7 h-7 text-gray-900" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Download on the</div>
                    <div className="text-base font-bold text-gray-900 -mt-0.5">App Store</div>
                  </div>
                </button>
                <button
                  onClick={() => window.open("https://play.google.com", "_blank")}
                  className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg group"
                >
                  <Download className="w-7 h-7 text-gray-900" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Get it on</div>
                    <div className="text-base font-bold text-gray-900 -mt-0.5">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { emoji: "📱", title: "Mobile First", desc: "Native experience on iOS & Android", color: "from-pink-500/20 to-rose-500/20" },
                  { emoji: "💬", title: "Live Chat", desc: "Instant vendor communication", color: "from-blue-500/20 to-indigo-500/20" },
                  { emoji: "📊", title: "Smart Analytics", desc: "Track every wedding detail", color: "from-purple-500/20 to-violet-500/20" },
                  { emoji: "✅", title: "Task Manager", desc: "Never miss an important step", color: "from-emerald-500/20 to-teal-500/20" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-7 rounded-3xl border border-white/10 bg-gradient-to-br ${item.color} backdrop-blur-sm hover:border-white/20 hover:scale-105 transition-all duration-500`}
                  >
                    <div className="text-4xl mb-4">{item.emoji}</div>
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section — Minimal & Impactful */}
      <section id="stats" data-animate className="py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-semibold mb-6">
              <Users className="w-3.5 h-3.5" />
              Our Impact
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                stat: STATS.couples.replace("K+", ",000+"),
                label: "Happy Couples",
                description: "Found their dream vendors and created magical wedding celebrations",
                icon: <Heart className="w-7 h-7" />,
                color: "from-pink-500 to-rose-600",
              },
              {
                stat: STATS.vendors.replace("K+", ",000+"),
                label: "Verified Vendors",
                description: "Thoroughly vetted professionals delivering exceptional service",
                icon: <Users className="w-7 h-7" />,
                color: "from-blue-500 to-indigo-600",
              },
              {
                stat: STATS.cities,
                label: "Cities Covered",
                description: "Local vendors who understand regional traditions and culture",
                icon: <MapPin className="w-7 h-7" />,
                color: "from-emerald-500 to-teal-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group text-center p-10 rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-gray-100/50 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-500`}>
                  {item.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{item.stat}</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{item.label}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-8 py-5 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{STATS.businessGenerated}</div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-700">Business Generated</p>
                <p className="text-xs text-gray-400">For our vendor partners this month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold mb-8 shadow-lg shadow-pink-500/20">
            <Sparkles className="w-4 h-4" />
            Start Your Journey Today
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
            Ready to Create Your
            <span className="block bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent mt-1">
              Dream Wedding?
            </span>
          </h2>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join {STATS.couples.replace("K+", ",000+")} couples who have planned their perfect celebration with WeddingBazaar. Your fairytale begins with a single click.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full px-12 py-5 text-base font-bold shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 animate-glow"
              onClick={() => router.push("/planning-tool")}
            >
              Start Planning Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-gray-200 text-gray-700 hover:border-pink-200 hover:text-pink-600 hover:bg-pink-50 px-10 py-5 text-base font-semibold transition-all duration-300"
              onClick={() => window.open("https://www.youtube.com/watch?v=demo", "_blank")}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch How It Works
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>24/7 Expert Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.05),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-4">
              <Link href="/" className="flex items-center gap-2.5 mb-6 group">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">
                  Wedding<span className="text-pink-400">Bazaar</span>
                </span>
              </Link>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-sm text-sm">
                India&apos;s largest and most trusted wedding planning platform. Connecting couples with verified vendors to create unforgettable celebrations since 2020.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, url: "https://facebook.com" },
                  { Icon: Twitter, url: "https://twitter.com" },
                  { Icon: Instagram, url: "https://instagram.com" },
                  { Icon: Youtube, url: "https://youtube.com" },
                ].map(({ Icon, url }, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(url, "_blank")}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 group"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-2">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-300">Company</h4>
              <ul className="space-y-3.5">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Press", href: "/press" },
                  { name: "Contact", href: "/contact" },
                  { name: "Blog", href: "/blog" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-300">Services</h4>
              <ul className="space-y-3.5">
                {[
                  { name: "Find Vendors", href: "/vendors" },
                  { name: "Compare Vendors", href: "/compare" },
                  { name: "Style Quiz", href: "/recommendations" },
                  { name: "Real Weddings", href: "/real-weddings" },
                  { name: "Wedding Planning", href: "/planning-tool" },
                  { name: "E-Invites", href: "/e-invites" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-300">Get the App</h4>
              <p className="text-sm text-gray-400 mb-5">Plan your wedding on the go with our mobile app.</p>
              <div className="space-y-3">
                <button
                  onClick={() => window.open("https://apps.apple.com", "_blank")}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <Download className="w-5 h-5 text-gray-300" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500">Download on the</div>
                    <div className="text-sm font-semibold text-white">App Store</div>
                  </div>
                </button>
                <button
                  onClick={() => window.open("https://play.google.com", "_blank")}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <Download className="w-5 h-5 text-gray-300" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500">Get it on</div>
                    <div className="text-sm font-semibold text-white">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} WeddingBazaar. All rights reserved. Made with ❤️ in India
              </p>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-gray-500 hover:text-pink-400 transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-500 hover:text-pink-400 transition-colors">
                  Terms
                </Link>
                <Link href="/cookies" className="text-gray-500 hover:text-pink-400 transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
