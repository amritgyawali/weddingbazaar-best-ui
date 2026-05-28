"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  DollarSign,
  Crown,
  Star,
  TrendingUp,
  Users,
  BarChart3,
  Settings,
  Shield,
  Brain,
  CheckCircle,
  Edit,
  ArrowUp,
  ArrowDown,
  Zap,
  Activity,
  CreditCard,
  Package,
  Award,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: <Activity className="w-4 h-4" /> },
  { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" /> },
  { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Star className="w-4 h-4" /> },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Matchmaking", href: "/dashboard/admin/matchmaking", icon: <Brain className="w-4 h-4" /> },
  { label: "Monetization", href: "/dashboard/admin/monetization", icon: <DollarSign className="w-4 h-4" />, active: true },
  { label: "Trust & Safety", href: "/dashboard/admin/trust-safety", icon: <Shield className="w-4 h-4" /> },
  { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" /> },
  { label: "System", href: "/dashboard/admin/system", icon: <Settings className="w-4 h-4" /> },
]

const tiers = [
  {
    id: "free",
    name: "Free Listing",
    price: 0,
    searchPosition: "Bottom",
    features: ["Basic profile", "5 photos", "No analytics", "No lead tracking"],
    vendorCount: 3420,
    color: "bg-gray-100 text-gray-700",
    badgeColor: "bg-gray-100 text-gray-700",
    active: true,
  },
  {
    id: "starter",
    name: "Starter",
    price: 1999,
    searchPosition: "Middle",
    features: ["Enhanced profile", "20 photos", "Basic analytics", "Inquiry tracking", "Verified badge"],
    vendorCount: 892,
    color: "bg-blue-100 text-blue-700",
    badgeColor: "bg-blue-100 text-blue-700",
    active: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 4999,
    searchPosition: "Top 50%",
    features: ["Full profile", "Unlimited photos", "Full analytics", "Auto-responders", "Contracts & e-sign", "Priority support"],
    vendorCount: 341,
    color: "bg-purple-100 text-purple-700",
    badgeColor: "bg-purple-100 text-purple-700",
    active: true,
  },
  {
    id: "featured",
    name: "Featured",
    price: 9999,
    searchPosition: "Top 10 (Sponsored)",
    features: ["Everything in Pro", "Featured placement", "Homepage showcase", "Social media boost", "Dedicated account manager"],
    vendorCount: 87,
    color: "bg-yellow-100 text-yellow-700",
    badgeColor: "bg-yellow-100 text-yellow-700",
    active: true,
  },
]

const revenueBreakdown = [
  { source: "Featured Subscriptions", amount: 869913, percentage: 52 },
  { source: "Pro Subscriptions", amount: 1704659, percentage: 32 },
  { source: "Starter Subscriptions", amount: 1783208, percentage: 10 },
  { source: "Transaction Commissions (5%)", amount: 892341, percentage: 6 },
]

export default function AdminMonetizationPage() {
  const [activeTab, setActiveTab] = useState("tiers")
  const [commissionRate, setCommissionRate] = useState("5")

  const totalMRR = tiers.reduce((sum, t) => sum + t.price * t.vendorCount, 0)

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tiered Monetization Engine</h1>
            <p className="text-gray-600 mt-1">Manage subscription tiers, search hierarchy, and billing logic</p>
          </div>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <Edit className="w-4 h-4 mr-2" />
            Edit Pricing
          </Button>
        </div>

        {/* MRR Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total MRR", value: `₹${(totalMRR / 100000).toFixed(1)}L`, icon: <DollarSign className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-100", trend: "+18%" },
            { label: "Paying Vendors", value: tiers.slice(1).reduce((s, t) => s + t.vendorCount, 0), icon: <Crown className="w-5 h-5" />, color: "text-yellow-600", bg: "bg-yellow-100", trend: "+24%" },
            { label: "Featured Spots", value: tiers.find((t) => t.id === "featured")?.vendorCount, icon: <Star className="w-5 h-5" />, color: "text-orange-600", bg: "bg-orange-100", trend: "+7" },
            { label: "Avg. Revenue/Vendor", value: "₹3,280", icon: <TrendingUp className="w-5 h-5" />, color: "text-purple-600", bg: "bg-purple-100", trend: "+12%" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full ${s.bg} ${s.color} flex items-center justify-center`}>
                  {s.icon}
                </div>
                <div>
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-xs text-green-500 font-medium">{s.trend} this month</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tiers">💎 Subscription Tiers</TabsTrigger>
            <TabsTrigger value="search">🔍 Search Hierarchy</TabsTrigger>
            <TabsTrigger value="revenue">💰 Revenue Breakdown</TabsTrigger>
          </TabsList>

          {/* Subscription Tiers */}
          <TabsContent value="tiers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tiers.map((tier) => (
                <Card key={tier.id} className={`border-2 ${tier.id === "featured" ? "border-yellow-400" : "border-gray-200"}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {tier.id === "featured" && <Crown className="w-5 h-5 text-yellow-500" />}
                        {tier.id === "pro" && <Award className="w-5 h-5 text-purple-500" />}
                        <CardTitle className="text-base">{tier.name}</CardTitle>
                        <Badge className={tier.badgeColor}>{tier.vendorCount} vendors</Badge>
                      </div>
                      <Switch checked={tier.active} />
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      {tier.price === 0 ? "Free" : `₹${tier.price.toLocaleString()}/mo`}
                    </p>
                    <p className="text-xs text-gray-500">Search position: {tier.searchPosition}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{f}</span>
                        </li>
                      ))}
                    </ul>
                    {tier.price > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-gray-500">Monthly Revenue</p>
                        <p className="font-bold text-gray-800">₹{(tier.price * tier.vendorCount).toLocaleString()}</p>
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit Tier
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Commission Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Label>Transaction Commission Rate (%)</Label>
                    <p className="text-xs text-gray-500 mt-0.5">Applied on every booking made through the platform</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(e.target.value)}
                      className="w-20 text-center"
                    />
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Free tier commission</p>
                    <p className="font-bold text-gray-800">{commissionRate}% per booking</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Pro/Featured commission</p>
                    <p className="font-bold text-gray-800">{Math.max(0, Number(commissionRate) - 2)}% per booking</p>
                  </div>
                </div>
                <Button size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Save Commission Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search Hierarchy */}
          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Result Ordering Logic</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  This defines how vendors appear in search results. Higher tiers appear first.
                </p>

                <div className="space-y-3">
                  {[
                    { rank: 1, tier: "Featured", label: "Paid Featured ($500+/mo)", color: "bg-yellow-400", slots: "Top 10 results" },
                    { rank: 2, tier: "Pro", label: "Pro subscribers", color: "bg-purple-400", slots: "Results 11–50" },
                    { rank: 3, tier: "Starter", label: "Starter subscribers", color: "bg-blue-400", slots: "Results 51–150" },
                    { rank: 4, tier: "Free", label: "Free listings (rated highest first)", color: "bg-gray-300", slots: "Results 151+" },
                  ].map((item) => (
                    <div key={item.rank} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {item.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.slots}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-sm">Randomize Featured Within Tier</p>
                    <p className="text-xs text-gray-500">Rotate featured vendors daily to ensure fairness</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Breakdown */}
          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {revenueBreakdown.map((item) => (
                  <div key={item.source}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.source}</span>
                      <span className="font-semibold">₹{(item.amount / 100000).toFixed(1)}L ({item.percentage}%)</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "This Month", value: `₹${(totalMRR / 100000).toFixed(1)}L`, trend: "+18%" },
                { label: "Last Month", value: "₹42.3L", trend: "" },
                { label: "Annual Run Rate", value: `₹${((totalMRR * 12) / 10000000).toFixed(1)}Cr`, trend: "" },
              ].map((s) => (
                <Card key={s.label}>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                    {s.trend && <p className="text-xs text-green-500 font-medium">{s.trend}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
