"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  MessageCircle,
  Camera,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  Users,
  FileText,
  Phone,
  Mail,
  MapPin,
  Award,
  Target,
  Zap,
  Shield,
  Briefcase,
  Heart,
  Gift,
  Sparkles,
  Crown,
  Gem,
  Palette,
  Music,
  Video,
  Image,
  Edit,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Plus,
  Eye,
  AlertCircle,
  Bell,
  Bookmark,
  Archive,
  Trash2,
  Copy,
  ExternalLink,
  Maximize,
  Minimize,
  RotateCcw,
  Save,
  Send,
  Printer,
  Scissors,
  Layers,
  Grid,
  List,
  MoreHorizontal,
  Calculator,
} from "lucide-react"

export default function CustomerBudgetPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [totalBudget] = useState(500000)
  const [spentAmount] = useState(325000)

  const budgetCategories = [
    { name: "Venue", allocated: 200000, spent: 180000, color: "bg-blue-500" },
    { name: "Catering", allocated: 150000, spent: 120000, color: "bg-green-500" },
    { name: "Photography", allocated: 80000, spent: 75000, color: "bg-purple-500" },
    { name: "Decorations", allocated: 50000, spent: 30000, color: "bg-pink-500" },
    { name: "Music & DJ", allocated: 30000, spent: 0, color: "bg-orange-500" },
    { name: "Transportation", allocated: 20000, spent: 15000, color: "bg-teal-500" },
    { name: "Miscellaneous", allocated: 20000, spent: 5000, color: "bg-indigo-500" },
  ]

  const recentExpenses = [
    { item: "Venue Booking", amount: 180000, date: "2024-08-15", category: "Venue", status: "paid" },
    { item: "Photography Advance", amount: 40000, date: "2024-08-18", category: "Photography", status: "paid" },
    { item: "Catering Advance", amount: 60000, date: "2024-08-20", category: "Catering", status: "paid" },
    { item: "Decoration Consultation", amount: 5000, date: "2024-08-22", category: "Decorations", status: "paid" },
  ]

  const menuItems = [
    { label: "Dashboard", href: "/dashboard/customer", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Wedding Details", href: "/dashboard/customer/wedding", icon: <Heart className="w-4 h-4" /> },
    { label: "Budget", href: "/dashboard/customer/budget", icon: <DollarSign className="w-4 h-4" />, active: true },
    { label: "Vendors", href: "/dashboard/customer/vendors", icon: <Users className="w-4 h-4" /> },
    { label: "Guest List", href: "/dashboard/customer/guests", icon: <Users className="w-4 h-4" /> },
    { label: "Timeline", href: "/dashboard/customer/timeline", icon: <Calendar className="w-4 h-4" /> },
    { label: "Documents", href: "/dashboard/customer/documents", icon: <FileText className="w-4 h-4" /> },
    { label: "Messages", href: "/dashboard/customer/messages", icon: <MessageCircle className="w-4 h-4" /> },
  ]

  return (
    <DashboardLayout menuItems={menuItems} userRole="customer">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
            <p className="text-gray-600">Track and manage your wedding expenses</p>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalBudget.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Amount Spent</p>
                  <p className="text-2xl font-bold text-gray-900">₹{spentAmount.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Remaining</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(totalBudget - spentAmount).toLocaleString()}</p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="allocator">🧮 Auto-Allocator</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Overall Progress</span>
                      <span className="text-sm text-gray-600">
                        ₹{spentAmount.toLocaleString()} of ₹{totalBudget.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(spentAmount / totalBudget) * 100} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{Math.round((spentAmount / totalBudget) * 100)}% Used</span>
                      <span>{Math.round(((totalBudget - spentAmount) / totalBudget) * 100)}% Remaining</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {budgetCategories.slice(0, 5).map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          ₹{category.spent.toLocaleString()}/₹{category.allocated.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExpenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{expense.item}</h4>
                        <p className="text-sm text-gray-600">{expense.category} • {expense.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">₹{expense.amount.toLocaleString()}</p>
                        <Badge className="bg-green-100 text-green-800">{expense.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid gap-6">
              {budgetCategories.map((category, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">₹{category.spent.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">of ₹{category.allocated.toLocaleString()}</p>
                      </div>
                    </div>
                    <Progress value={(category.spent / category.allocated) * 100} className="h-2" />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>{Math.round((category.spent / category.allocated) * 100)}% used</span>
                      <span>₹{(category.allocated - category.spent).toLocaleString()} remaining</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Expenses</h2>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {recentExpenses.map((expense, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{expense.item}</h3>
                        <p className="text-gray-600">{expense.category}</p>
                        <p className="text-sm text-gray-500">{expense.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₹{expense.amount.toLocaleString()}</p>
                        <Badge className="bg-green-100 text-green-800">{expense.status}</Badge>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Algorithmic Budget Allocator Tab */}
          <TabsContent value="allocator" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-5">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-green-800">Algorithmic Budget Allocator</p>
                    <p className="text-sm text-green-700 mt-1">
                      Enter your total budget below, and our algorithm will automatically distribute it across all
                      categories based on regional averages for weddings in your city.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Total Wedding Budget (₹)</Label>
                    <Input type="number" placeholder="500000" defaultValue="500000" className="mt-1 text-lg font-bold" />
                  </div>
                  <div>
                    <Label>Wedding City</Label>
                    <Select defaultValue="mumbai">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="kolkata">Kolkata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Guest Count</Label>
                    <Input type="number" placeholder="250" defaultValue="250" className="mt-1" />
                  </div>
                  <div>
                    <Label>Wedding Style</Label>
                    <Select defaultValue="traditional">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traditional">Traditional Indian</SelectItem>
                        <SelectItem value="modern">Modern / Fusion</SelectItem>
                        <SelectItem value="destination">Destination Wedding</SelectItem>
                        <SelectItem value="intimate">Intimate (under 50 guests)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Calculator className="w-4 h-4 mr-2" />
                  Auto-Allocate Budget
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Suggested Allocation (₹5,00,000 total)</CardTitle>
                  <Badge className="bg-green-100 text-green-700">Mumbai Averages</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { category: "Venue & Catering", percentage: 40, amount: 200000, note: "Largest expense. Includes food & decoration." },
                  { category: "Photography & Videography", percentage: 12, amount: 60000, note: "Memories last forever." },
                  { category: "Bridal Attire & Jewellery", percentage: 10, amount: 50000, note: "Lehenga, accessories, jewellery." },
                  { category: "Decoration & Florals", percentage: 10, amount: 50000, note: "Mandap, stage, centerpieces." },
                  { category: "Music & Entertainment", percentage: 6, amount: 30000, note: "DJ, band, sangeet performances." },
                  { category: "Makeup & Beauty", percentage: 6, amount: 30000, note: "Bridal makeup, hair styling." },
                  { category: "Invitations & Stationery", percentage: 3, amount: 15000, note: "Cards, e-invites, favours." },
                  { category: "Transportation", percentage: 4, amount: 20000, note: "Baraat, bridal car, guest transport." },
                  { category: "Honeymoon Fund", percentage: 5, amount: 25000, note: "Starting your adventure together." },
                  { category: "Contingency Buffer", percentage: 4, amount: 20000, note: "Always keep 5% for surprises." },
                ].map((item) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">{item.category}</span>
                          <span className="font-bold text-gray-800">₹{item.amount.toLocaleString()} ({item.percentage}%)</span>
                        </div>
                        <p className="text-xs text-gray-400">{item.note}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${item.percentage * 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Recalculate
                  </Button>
                  <Button className="flex-1 bg-pink-500 text-white hover:bg-pink-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Apply This Budget
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Budget Management Tools</h2>
              <p className="text-gray-600">Tools to help you manage your wedding budget effectively</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* 20 Budget Tools */}
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-green-50">
                <DollarSign className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm font-medium">Budget Tracker</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-blue-50">
                <TrendingUp className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm font-medium">Expense Analytics</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-purple-50">
                <Target className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm font-medium">Budget Goals</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-orange-50">
                <Calculator className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm font-medium">Cost Calculator</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center hover:bg-red-50">
                <AlertCircle className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm font-medium">Budget Alerts</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
