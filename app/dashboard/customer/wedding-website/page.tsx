"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Globe,
  Edit,
  Eye,
  Share2,
  Settings,
  Image,
  Type,
  Layout,
  Palette,
  Plus,
  Trash2,
  Move,
  Save,
  ExternalLink,
  Copy,
  CheckCircle,
  Calendar,
  MapPin,
  Heart,
  Camera,
  Music,
  Users,
  MessageCircle,
  Star,
  Sparkles,
  Link,
  Download,
  Upload,
  Layers,
  Grid,
} from "lucide-react"

const menuItems = [
  { label: "Overview", href: "/dashboard/customer", icon: <Heart className="w-4 h-4" /> },
  { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Calendar className="w-4 h-4" /> },
  {
    label: "Wedding Website",
    href: "/dashboard/customer/wedding-website",
    icon: <Globe className="w-4 h-4" />,
    active: true,
  },
  { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
  { label: "Budget", href: "/dashboard/customer/budget", icon: <Star className="w-4 h-4" /> },
  { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
  { label: "Registry", href: "/dashboard/customer/registry", icon: <Star className="w-4 h-4" /> },
  { label: "Inspiration", href: "/dashboard/customer/inspiration", icon: <Palette className="w-4 h-4" /> },
  { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
  { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Star className="w-4 h-4" /> },
  { label: "Documents", href: "/dashboard/customer/documents", icon: <Star className="w-4 h-4" /> },
]

const themes = [
  { id: "romantic", name: "Romantic", color: "from-pink-400 to-rose-400", preview: "bg-pink-50" },
  { id: "modern", name: "Modern", color: "from-gray-700 to-gray-900", preview: "bg-gray-50" },
  { id: "boho", name: "Boho", color: "from-amber-400 to-orange-400", preview: "bg-amber-50" },
  { id: "classic", name: "Classic", color: "from-indigo-500 to-purple-500", preview: "bg-indigo-50" },
  { id: "garden", name: "Garden", color: "from-green-400 to-emerald-500", preview: "bg-green-50" },
  { id: "beach", name: "Beach", color: "from-sky-400 to-cyan-500", preview: "bg-sky-50" },
]

const blocks = [
  { id: "hero", icon: <Image className="w-4 h-4" />, label: "Hero Section" },
  { id: "story", icon: <Type className="w-4 h-4" />, label: "Our Story" },
  { id: "details", icon: <Calendar className="w-4 h-4" />, label: "Event Details" },
  { id: "gallery", icon: <Camera className="w-4 h-4" />, label: "Photo Gallery" },
  { id: "rsvp", icon: <Users className="w-4 h-4" />, label: "RSVP Form" },
  { id: "travel", icon: <MapPin className="w-4 h-4" />, label: "Travel & Stay" },
  { id: "registry", icon: <Star className="w-4 h-4" />, label: "Registry Links" },
  { id: "music", icon: <Music className="w-4 h-4" />, label: "Song Requests" },
]

export default function WeddingWebsitePage() {
  const [activeTab, setActiveTab] = useState("builder")
  const [selectedTheme, setSelectedTheme] = useState("romantic")
  const [isPublished, setIsPublished] = useState(true)
  const [customDomain, setCustomDomain] = useState("")
  const [websiteUrl] = useState("priya-rahul.weddingbazaar.in")
  const [copied, setCopied] = useState(false)
  const [activeBlocks, setActiveBlocks] = useState([
    "hero",
    "story",
    "details",
    "gallery",
    "rsvp",
  ])

  const [weddingInfo, setWeddingInfo] = useState({
    brideName: "Priya Sharma",
    groomName: "Rahul Gupta",
    weddingDate: "December 15, 2024",
    venue: "Royal Palace Hotel, Mumbai",
    welcomeMessage: "Join us as we celebrate our love story and begin our forever together.",
  })

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://${websiteUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleBlock = (blockId: string) => {
    setActiveBlocks((prev) =>
      prev.includes(blockId) ? prev.filter((b) => b !== blockId) : [...prev, blockId]
    )
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wedding Website Builder</h1>
            <p className="text-gray-600 mt-1">Create your personalized wedding website with drag-and-drop tools</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className={isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
              {isPublished ? "● Live" : "● Draft"}
            </Badge>
            <Button variant="outline" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </Button>
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save & Publish</span>
            </Button>
          </div>
        </div>

        {/* URL Bar */}
        <Card className="border-pink-200 bg-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-pink-600" />
              <span className="text-sm text-gray-600">Your website URL:</span>
              <code className="bg-white px-3 py-1 rounded border text-pink-700 font-mono text-sm flex-1">
                https://{websiteUrl}
              </code>
              <Button variant="outline" size="sm" onClick={handleCopyUrl} className="flex items-center space-x-1">
                {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="builder">🔧 Builder</TabsTrigger>
            <TabsTrigger value="theme">🎨 Theme</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
            <TabsTrigger value="stats">📊 Stats</TabsTrigger>
          </TabsList>

          {/* Builder Tab */}
          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Block Palette */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <Layers className="w-4 h-4" />
                      <span>Page Sections</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {blocks.map((block) => (
                      <div
                        key={block.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          activeBlocks.includes(block.id)
                            ? "bg-pink-50 border-pink-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                        onClick={() => toggleBlock(block.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={activeBlocks.includes(block.id) ? "text-pink-600" : "text-gray-400"}>
                            {block.icon}
                          </span>
                          <span className="text-sm font-medium">{block.label}</span>
                        </div>
                        <Switch
                          checked={activeBlocks.includes(block.id)}
                          onCheckedChange={() => toggleBlock(block.id)}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-gray-700">Wedding Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-500">Bride's Name</Label>
                      <Input
                        value={weddingInfo.brideName}
                        onChange={(e) => setWeddingInfo((p) => ({ ...p, brideName: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Groom's Name</Label>
                      <Input
                        value={weddingInfo.groomName}
                        onChange={(e) => setWeddingInfo((p) => ({ ...p, groomName: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Wedding Date</Label>
                      <Input
                        value={weddingInfo.weddingDate}
                        onChange={(e) => setWeddingInfo((p) => ({ ...p, weddingDate: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Venue</Label>
                      <Input
                        value={weddingInfo.venue}
                        onChange={(e) => setWeddingInfo((p) => ({ ...p, venue: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Welcome Message</Label>
                      <Textarea
                        value={weddingInfo.welcomeMessage}
                        onChange={(e) => setWeddingInfo((p) => ({ ...p, welcomeMessage: e.target.value }))}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Live Preview */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gray-100 py-2 px-4 flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-gray-500 font-mono">https://{websiteUrl}</span>
                    <Grid className="w-4 h-4 text-gray-400" />
                  </CardHeader>
                  <CardContent className="p-0 overflow-auto max-h-[600px]">
                    {/* Hero Section Preview */}
                    {activeBlocks.includes("hero") && (
                      <div className={`bg-gradient-to-br ${themes.find((t) => t.id === selectedTheme)?.color} p-12 text-white text-center`}>
                        <div className="text-5xl mb-4">💍</div>
                        <h1 className="text-4xl font-bold mb-2">
                          {weddingInfo.brideName} & {weddingInfo.groomName}
                        </h1>
                        <p className="text-lg opacity-90">{weddingInfo.weddingDate}</p>
                        <p className="text-sm opacity-75 mt-1">{weddingInfo.venue}</p>
                        <p className="mt-4 opacity-80 max-w-md mx-auto">{weddingInfo.welcomeMessage}</p>
                        <Button className="mt-6 bg-white text-pink-600 hover:bg-pink-50">RSVP Now</Button>
                      </div>
                    )}

                    {/* Story Section Preview */}
                    {activeBlocks.includes("story") && (
                      <div className="p-8 bg-white text-center border-b">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Story</h2>
                        <p className="text-gray-600 max-w-lg mx-auto">
                          We met at a coffee shop in Bandra in 2019, and the rest, as they say, is history...
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          {["How We Met", "The Proposal", "Forever After"].map((item) => (
                            <div key={item} className="bg-pink-50 rounded-lg p-4">
                              <div className="text-2xl mb-2">❤️</div>
                              <p className="text-sm font-medium text-gray-700">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Event Details Preview */}
                    {activeBlocks.includes("details") && (
                      <div className="p-8 bg-gray-50 border-b">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Event Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="font-semibold text-pink-600">🕯️ Ceremony</p>
                            <p className="text-sm text-gray-600 mt-1">10:00 AM</p>
                            <p className="text-sm text-gray-500">Sacred Heart Church</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="font-semibold text-pink-600">🎉 Reception</p>
                            <p className="text-sm text-gray-600 mt-1">7:00 PM</p>
                            <p className="text-sm text-gray-500">{weddingInfo.venue}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* RSVP Form Preview */}
                    {activeBlocks.includes("rsvp") && (
                      <div className="p-8 bg-white border-b text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">RSVP</h2>
                        <p className="text-gray-600 mb-4 text-sm">Kindly respond by November 15, 2024</p>
                        <div className="max-w-sm mx-auto space-y-3">
                          <Input placeholder="Your Full Name" />
                          <Input placeholder="Email Address" />
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Will you attend?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Joyfully Accept</SelectItem>
                              <SelectItem value="no">Regretfully Decline</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                            Send RSVP
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Gallery Preview */}
                    {activeBlocks.includes("gallery") && (
                      <div className="p-8 bg-gray-50 border-b">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Photos</h2>
                        <div className="grid grid-cols-3 gap-2">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="aspect-square bg-gradient-to-br from-pink-200 to-rose-200 rounded-lg flex items-center justify-center"
                            >
                              <Camera className="w-6 h-6 text-pink-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Theme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                        selectedTheme === theme.id ? "border-pink-500 shadow-lg scale-105" : "border-gray-200"
                      }`}
                    >
                      <div className={`bg-gradient-to-br ${theme.color} h-24 flex items-center justify-center`}>
                        <span className="text-white text-2xl">💍</span>
                      </div>
                      <div className={`${theme.preview} p-3 text-center`}>
                        <p className="font-semibold text-sm text-gray-700">{theme.name}</p>
                        {selectedTheme === theme.id && (
                          <Badge className="mt-1 bg-pink-100 text-pink-700 text-xs">Active</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Font Pairing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Playfair + Lato", preview: "Aa" },
                    { name: "Cormorant + Open Sans", preview: "Aa" },
                    { name: "Great Vibes + Montserrat", preview: "Aa" },
                  ].map((font) => (
                    <div key={font.name} className="border rounded-lg p-4 cursor-pointer hover:border-pink-400 text-center">
                      <p className="text-2xl font-serif">{font.preview}</p>
                      <p className="text-xs text-gray-500 mt-1">{font.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Published</p>
                    <p className="text-sm text-gray-500">Make your website visible to guests</p>
                  </div>
                  <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Password Protected</p>
                    <p className="text-sm text-gray-500">Require a password to view your site</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">RSVP Open</p>
                    <p className="text-sm text-gray-500">Allow guests to submit RSVPs</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="pt-4 border-t">
                  <Label className="font-medium">Custom Domain</Label>
                  <p className="text-sm text-gray-500 mb-2">Connect your own domain (e.g., priya-rahul.com)</p>
                  <div className="flex space-x-2">
                    <Input
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      placeholder="yourwedding.com"
                    />
                    <Button variant="outline">
                      <Link className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Label className="font-medium">Export Website</Label>
                  <p className="text-sm text-gray-500 mb-2">Download your website as a ZIP file</p>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export as ZIP
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Share Your Website</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "WhatsApp", icon: "💬", color: "bg-green-500" },
                  { label: "Email Invitation", icon: "📧", color: "bg-blue-500" },
                  { label: "QR Code", icon: "📱", color: "bg-purple-500" },
                ].map((item) => (
                  <Button key={item.label} variant="outline" className="w-full justify-start space-x-3">
                    <span className={`w-6 h-6 rounded text-white flex items-center justify-center text-xs ${item.color}`}>
                      {item.icon}
                    </span>
                    <span>Share via {item.label}</span>
                    <Share2 className="w-4 h-4 ml-auto" />
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Visits", value: "1,248", icon: "👁️", color: "text-blue-600" },
                { label: "RSVPs Received", value: "184", icon: "✉️", color: "text-green-600" },
                { label: "Attending", value: "162", icon: "✅", color: "text-pink-600" },
                { label: "Declining", value: "22", icon: "❌", color: "text-red-600" },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent RSVP Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Ananya & Vikram Mehta", status: "Attending", guests: 2, meal: "Veg" },
                    { name: "Pooja Nair", status: "Attending", guests: 1, meal: "Non-Veg" },
                    { name: "Suresh & Family", status: "Attending", guests: 4, meal: "Veg" },
                    { name: "Kavya Iyer", status: "Declined", guests: 0, meal: "-" },
                  ].map((rsvp, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{rsvp.name}</p>
                        <p className="text-xs text-gray-500">
                          {rsvp.guests} guest(s) · {rsvp.meal}
                        </p>
                      </div>
                      <Badge
                        className={
                          rsvp.status === "Attending"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {rsvp.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
