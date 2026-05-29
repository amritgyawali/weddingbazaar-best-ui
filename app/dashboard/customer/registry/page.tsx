"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Gift,
  Heart,
  Star,
  Plus,
  ExternalLink,
  Calendar,
  Users,
  MessageCircle,
  Globe,
  Palette,
  DollarSign,
  ShoppingCart,
  Wallet,
  CreditCard,
  Copy,
  CheckCircle,
  Trash2,
  Edit,
  Share2,
  TrendingUp,
  Package,
  Tag,
} from "lucide-react"

const menuItems = [
  { label: "Overview", href: "/dashboard/customer", icon: <Heart className="w-4 h-4" /> },
  { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Calendar className="w-4 h-4" /> },
  { label: "Wedding Website", href: "/dashboard/customer/wedding-website", icon: <Globe className="w-4 h-4" /> },
  { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
  { label: "Budget", href: "/dashboard/customer/budget", icon: <Star className="w-4 h-4" /> },
  { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
  { label: "Registry & Gifts", href: "/dashboard/customer/registry", icon: <Gift className="w-4 h-4" />, active: true },
  { label: "Inspiration", href: "/dashboard/customer/inspiration", icon: <Palette className="w-4 h-4" /> },
  { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
  { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Star className="w-4 h-4" /> },
  { label: "Documents", href: "/dashboard/customer/documents", icon: <Star className="w-4 h-4" /> },
]

const registryItems = [
  {
    id: 1,
    name: "KitchenAid Stand Mixer",
    category: "Kitchen",
    price: 45000,
    priority: "high",
    purchased: false,
    store: "Amazon",
    image: "🍰",
    purchasedBy: null,
  },
  {
    id: 2,
    name: "Dyson Vacuum Cleaner",
    category: "Home",
    price: 38000,
    priority: "medium",
    purchased: true,
    store: "Flipkart",
    image: "🏠",
    purchasedBy: "Ananya Mehta",
  },
  {
    id: 3,
    name: "Bed & Bath Linen Set",
    category: "Bedroom",
    price: 12000,
    priority: "high",
    purchased: false,
    store: "IKEA",
    image: "🛏️",
    purchasedBy: null,
  },
  {
    id: 4,
    name: "Instant Pot 6Qt",
    category: "Kitchen",
    price: 8500,
    priority: "low",
    purchased: true,
    store: "Amazon",
    image: "🍲",
    purchasedBy: "Ravi Sharma",
  },
  {
    id: 5,
    name: "Smart TV 55\"",
    category: "Electronics",
    price: 55000,
    priority: "medium",
    purchased: false,
    store: "Amazon",
    image: "📺",
    purchasedBy: null,
  },
  {
    id: 6,
    name: "Coffee Machine",
    category: "Kitchen",
    price: 15000,
    priority: "low",
    purchased: false,
    store: "Nykaa",
    image: "☕",
    purchasedBy: null,
  },
]

const cashFunds = [
  {
    id: 1,
    name: "Honeymoon Fund",
    description: "Help us start our adventure together!",
    target: 150000,
    raised: 87500,
    contributors: 12,
    emoji: "✈️",
  },
  {
    id: 2,
    name: "New Home Fund",
    description: "Helping us feather our nest",
    target: 200000,
    raised: 45000,
    contributors: 6,
    emoji: "🏡",
  },
  {
    id: 3,
    name: "Date Night Fund",
    description: "Keep the romance alive!",
    target: 50000,
    raised: 22000,
    contributors: 8,
    emoji: "🍷",
  },
]

export default function RegistryPage() {
  const [activeTab, setActiveTab] = useState("registry")
  const [copied, setCopied] = useState(false)

  const totalItems = registryItems.length
  const purchasedItems = registryItems.filter((i) => i.purchased).length
  const totalValue = registryItems.reduce((s, i) => s + i.price, 0)
  const purchasedValue = registryItems.filter((i) => i.purchased).reduce((s, i) => s + i.price, 0)

  const handleCopy = () => {
    navigator.clipboard.writeText("https://priya-rahul.weddingbazaar.in/registry")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Registry & Gift Funds</h1>
            <p className="text-gray-600 mt-1">Manage your wish list and cash funds in one place</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleCopy}>
              {copied ? <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy Registry Link"}
            </Button>
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Items", value: totalItems, icon: <Package className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Purchased", value: purchasedItems, icon: <CheckCircle className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-100" },
            { label: "Registry Value", value: `₹${(totalValue / 1000).toFixed(0)}K`, icon: <Tag className="w-5 h-5" />, color: "text-purple-600", bg: "bg-purple-100" },
            { label: "Gifts Received", value: `₹${(purchasedValue / 1000).toFixed(0)}K`, icon: <Gift className="w-5 h-5" />, color: "text-pink-600", bg: "bg-pink-100" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full ${s.bg} ${s.color} flex items-center justify-center`}>
                  {s.icon}
                </div>
                <div>
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="registry">🎁 Gift Registry</TabsTrigger>
            <TabsTrigger value="cash">💰 Cash Funds</TabsTrigger>
            <TabsTrigger value="stores">🛒 Linked Stores</TabsTrigger>
          </TabsList>

          {/* Gift Registry */}
          <TabsContent value="registry" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="purchased">Purchased</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-500">
                {purchasedItems}/{totalItems} items purchased
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {registryItems.map((item) => (
                <Card key={item.id} className={item.purchased ? "opacity-70" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{item.image}</div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            item.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : item.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {item.priority}
                        </Badge>
                        {item.purchased && (
                          <Badge className="bg-green-100 text-green-700">Purchased</Badge>
                        )}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.category} · {item.store}</p>
                    <p className="text-lg font-bold text-pink-600 mt-2">₹{item.price.toLocaleString()}</p>
                    {item.purchasedBy && (
                      <p className="text-xs text-green-600 mt-1">Gift from: {item.purchasedBy}</p>
                    )}
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cash Funds */}
          <TabsContent value="cash" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Zero-fee cash funds — guests contribute directly</p>
              <Button size="sm" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <Plus className="w-4 h-4 mr-1" />
                New Fund
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cashFunds.map((fund) => (
                <Card key={fund.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{fund.emoji}</div>
                      <h3 className="font-bold text-gray-800">{fund.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{fund.description}</p>
                    </div>
                    <Progress value={(fund.raised / fund.target) * 100} className="mb-2" />
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-pink-600">₹{(fund.raised / 1000).toFixed(0)}K raised</span>
                      <span className="text-gray-500">of ₹{(fund.target / 1000).toFixed(0)}K</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">{fund.contributors} contributors</p>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add New Fund Card */}
              <Card className="border-dashed border-2 border-gray-200 hover:border-pink-300 cursor-pointer transition-colors">
                <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                  <Plus className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-gray-500 font-medium">Create New Fund</p>
                  <p className="text-xs text-gray-400 mt-1">Honeymoon, Home, Travel...</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-800">Zero Platform Fees</p>
                  <p className="text-sm text-green-600">100% of every contribution goes directly to you. No hidden charges.</p>
                </div>
                <Badge className="bg-green-100 text-green-700">0% Fee</Badge>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Linked Stores */}
          <TabsContent value="stores" className="space-y-4">
            <p className="text-sm text-gray-600">Connect your accounts to import wish lists automatically</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Amazon India", icon: "📦", connected: true, items: 8 },
                { name: "Flipkart", icon: "🛒", connected: true, items: 3 },
                { name: "IKEA", icon: "🏠", connected: false, items: 0 },
                { name: "Crate & Barrel", icon: "🍽️", connected: false, items: 0 },
                { name: "Nykaa", icon: "💄", connected: false, items: 0 },
                { name: "Myntra", icon: "👗", connected: false, items: 0 },
              ].map((store) => (
                <Card key={store.name}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{store.icon}</div>
                      <div>
                        <p className="font-medium">{store.name}</p>
                        {store.connected && (
                          <p className="text-xs text-green-600">{store.items} items imported</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant={store.connected ? "outline" : "default"}
                      size="sm"
                      className={store.connected ? "" : "bg-pink-500 text-white hover:bg-pink-600"}
                    >
                      {store.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Add from URL</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-3">Paste a product link from any store to add it to your registry</p>
                <div className="flex space-x-2">
                  <Input placeholder="https://amazon.in/product/..." className="flex-1" />
                  <Button className="bg-pink-500 text-white hover:bg-pink-600">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
