"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Brain,
  Zap,
  TrendingUp,
  Users,
  Star,
  Target,
  Sliders,
  BarChart3,
  Settings,
  Shield,
  DollarSign,
  CheckCircle,
  RefreshCw,
  Eye,
  ArrowRight,
  Sparkles,
  Activity,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: <Activity className="w-4 h-4" /> },
  { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" /> },
  { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Star className="w-4 h-4" /> },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Matchmaking", href: "/dashboard/admin/matchmaking", icon: <Brain className="w-4 h-4" />, active: true },
  { label: "Monetization", href: "/dashboard/admin/monetization", icon: <DollarSign className="w-4 h-4" /> },
  { label: "Trust & Safety", href: "/dashboard/admin/trust-safety", icon: <Shield className="w-4 h-4" /> },
  { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" /> },
  { label: "System", href: "/dashboard/admin/system", icon: <Settings className="w-4 h-4" /> },
]

const matchPairs = [
  {
    couple: "Priya & Rahul",
    budget: "₹3-5L",
    style: "Traditional",
    location: "Mumbai",
    vendor: "Royal Frames Studio",
    category: "Photographer",
    matchScore: 96,
    conversionProb: "87%",
    styleMatch: "Boho",
  },
  {
    couple: "Anjali & Vikram",
    budget: "₹1-2L",
    style: "Modern",
    location: "Delhi",
    vendor: "Crystal Events",
    category: "Decorator",
    matchScore: 91,
    conversionProb: "79%",
    styleMatch: "Modern",
  },
  {
    couple: "Meera & Suresh",
    budget: "₹5-8L",
    style: "Classic",
    location: "Bangalore",
    vendor: "Grand Occasions",
    category: "Venue",
    matchScore: 88,
    conversionProb: "74%",
    styleMatch: "Classic",
  },
  {
    couple: "Divya & Rohit",
    budget: "₹2-3L",
    style: "Boho",
    location: "Pune",
    vendor: "Earthy Lens Photography",
    category: "Photographer",
    matchScore: 94,
    conversionProb: "82%",
    styleMatch: "Boho",
  },
]

export default function AdminMatchmakingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [budgetWeight, setBudgetWeight] = useState([40])
  const [styleWeight, setStyleWeight] = useState([30])
  const [locationWeight, setLocationWeight] = useState([20])
  const [ratingWeight, setRatingWeight] = useState([10])
  const [enableAI, setEnableAI] = useState(true)
  const [liveMatching, setLiveMatching] = useState(true)

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Algorithmic Matchmaking Engine</h1>
            <p className="text-gray-600 mt-1">Configure how couples are matched with vendors</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Recalculate
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <Zap className="w-4 h-4 mr-2" />
              Run Matching
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Couples", value: "2,847", icon: <Users className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Matched Pairs", value: "18,432", icon: <Brain className="w-5 h-5" />, color: "text-purple-600", bg: "bg-purple-100" },
            { label: "Avg. Match Score", value: "87%", icon: <Target className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-100" },
            { label: "Conversion Rate", value: "34%", icon: <TrendingUp className="w-5 h-5" />, color: "text-pink-600", bg: "bg-pink-100" },
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
            <TabsTrigger value="overview">🎯 Live Matches</TabsTrigger>
            <TabsTrigger value="algorithm">⚙️ Algorithm Config</TabsTrigger>
            <TabsTrigger value="performance">📊 Performance</TabsTrigger>
          </TabsList>

          {/* Live Matches */}
          <TabsContent value="overview" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">Live matching active — updating every 15 minutes</span>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="photo">Photography</SelectItem>
                  <SelectItem value="venue">Venue</SelectItem>
                  <SelectItem value="decor">Decor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {matchPairs.map((pair, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 text-center">
                            <div className="text-2xl font-bold text-purple-600">{pair.matchScore}</div>
                            <div className="text-xs text-gray-400">score</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-center">
                            <p className="font-semibold text-sm text-gray-800">{pair.couple}</p>
                            <p className="text-xs text-gray-500">{pair.budget} · {pair.style} · {pair.location}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-purple-400" />
                          <div className="text-center">
                            <p className="font-semibold text-sm text-gray-800">{pair.vendor}</p>
                            <p className="text-xs text-gray-500">{pair.category}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge className="bg-purple-100 text-purple-700">{pair.styleMatch} Match</Badge>
                        <p className="text-xs text-gray-500">Conv. probability: {pair.conversionProb}</p>
                        <div className="flex space-x-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" className="bg-purple-500 text-white hover:bg-purple-600">
                            Boost
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={pair.matchScore} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Algorithm Config */}
          <TabsContent value="algorithm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <span>Matching Algorithm Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium">AI-Powered Matching</p>
                    <p className="text-sm text-gray-500">Use machine learning to improve match scores over time</p>
                  </div>
                  <Switch checked={enableAI} onCheckedChange={setEnableAI} />
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Live Matching</p>
                    <p className="text-sm text-gray-500">Continuously update recommendations for active couples</p>
                  </div>
                  <Switch checked={liveMatching} onCheckedChange={setLiveMatching} />
                </div>

                <div className="space-y-5 pt-2">
                  <p className="font-medium text-gray-700">Matching Weight Factors</p>
                  <p className="text-sm text-gray-500">
                    Adjust how much each factor influences the match score. Total should equal 100%.
                  </p>

                  {[
                    { label: "Budget Compatibility", value: budgetWeight, setter: setBudgetWeight, color: "text-green-600" },
                    { label: "Style / Aesthetic Match", value: styleWeight, setter: setStyleWeight, color: "text-pink-600" },
                    { label: "Location Proximity", value: locationWeight, setter: setLocationWeight, color: "text-blue-600" },
                    { label: "Vendor Rating", value: ratingWeight, setter: setRatingWeight, color: "text-yellow-600" },
                  ].map(({ label, value, setter, color }) => (
                    <div key={label} className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-sm">{label}</Label>
                        <span className={`text-sm font-bold ${color}`}>{value[0]}%</span>
                      </div>
                      <Slider
                        value={value}
                        onValueChange={setter}
                        min={0}
                        max={100}
                        step={5}
                      />
                    </div>
                  ))}

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">Total Weight</span>
                    <span className={`font-bold ${
                      budgetWeight[0] + styleWeight[0] + locationWeight[0] + ratingWeight[0] === 100
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                      {budgetWeight[0] + styleWeight[0] + locationWeight[0] + ratingWeight[0]}%
                      {budgetWeight[0] + styleWeight[0] + locationWeight[0] + ratingWeight[0] === 100
                        ? " ✓"
                        : " (should be 100%)"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t">
                  <p className="font-medium text-gray-700">Historical Conversion Boost</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Boost vendors with high conversion rates for similar couples</p>
                      <p className="text-xs text-gray-400">Vendors who booked couples with similar budgets/styles rank higher</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Algorithm Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Conversion by Style Match</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { style: "Boho", rate: 41, color: "bg-amber-400" },
                    { style: "Romantic", rate: 38, color: "bg-pink-400" },
                    { style: "Classic", rate: 35, color: "bg-indigo-400" },
                    { style: "Modern", rate: 29, color: "bg-gray-400" },
                    { style: "Traditional", rate: 44, color: "bg-orange-400" },
                  ].map((s) => (
                    <div key={s.style}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{s.style}</span>
                        <span className="font-medium">{s.rate}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className={`${s.color} h-2 rounded-full`} style={{ width: `${s.rate * 2}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Match Score Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { range: "90–100 (Excellent)", count: 1847, color: "bg-green-400" },
                    { range: "80–89 (Good)", count: 4231, color: "bg-blue-400" },
                    { range: "70–79 (Fair)", count: 7893, color: "bg-yellow-400" },
                    { range: "60–69 (Low)", count: 3219, color: "bg-orange-400" },
                    { range: "<60 (Poor)", count: 1242, color: "bg-red-400" },
                  ].map((d) => (
                    <div key={d.range}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-xs">{d.range}</span>
                        <span className="font-medium text-xs">{d.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`${d.color} h-2 rounded-full`}
                          style={{ width: `${(d.count / 18432) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
