"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Calendar, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchBarClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [weddingDate, setWeddingDate] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && searchParams) {
      const query = searchParams.get("query") || ""
      const city = searchParams.get("city") || ""
      const date = searchParams.get("date") || ""
      
      setSearchQuery(query)
      setSelectedCity(city)
      setWeddingDate(date)
    }
  }, [mounted, searchParams])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("query", searchQuery)
    if (selectedCity) params.set("city", selectedCity)
    if (weddingDate) params.set("date", weddingDate)

    router.push(`/vendors?${params.toString()}`)
  }

  return (
    <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 overflow-hidden">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative group">
            <Input
              placeholder="Search vendors, venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 border-0 bg-gray-50 focus:bg-white transition-all duration-300 text-lg"
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-hover:text-pink-500 transition-colors" />
          </div>
          <div className="relative group">
            <Input
              placeholder="Select City"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="pl-12 h-14 border-0 bg-gray-50 focus:bg-white transition-all duration-300 text-lg"
            />
            <MapPin className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-hover:text-pink-500 transition-colors" />
            <ChevronDown className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
          </div>
          <div className="relative group">
            <Input
              type="date"
              placeholder="Wedding Date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="pl-12 h-14 border-0 bg-gray-50 focus:bg-white transition-all duration-300 text-lg"
            />
            <Calendar className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-hover:text-pink-500 transition-colors" />
          </div>
          <Button
            className="h-14 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={handleSearch}
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <span className="text-sm text-gray-600">Popular searches:</span>
          {["Photographers Mumbai", "Banquet Halls Delhi", "Mehendi Artists"].map((tag) => (
            <Button
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-pink-100 transition-colors"
              onClick={() => {
                setSearchQuery(tag)
                handleSearch()
              }}
            >
              {tag}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}