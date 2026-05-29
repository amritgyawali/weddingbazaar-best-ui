"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  Flag,
  Users,
  Star,
  TrendingUp,
  BarChart3,
  DollarSign,
  Settings,
  Brain,
  FileText,
  Clock,
  Ban,
  UserCheck,
  AlertCircle,
  Bot,
  Lock,
  Fingerprint,
  Activity,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: <Activity className="w-4 h-4" /> },
  { label: "Users", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" /> },
  { label: "Vendors", href: "/dashboard/admin/vendors", icon: <Star className="w-4 h-4" /> },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Matchmaking", href: "/dashboard/admin/matchmaking", icon: <Brain className="w-4 h-4" /> },
  { label: "Monetization", href: "/dashboard/admin/monetization", icon: <DollarSign className="w-4 h-4" /> },
  {
    label: "Trust & Safety",
    href: "/dashboard/admin/trust-safety",
    icon: <Shield className="w-4 h-4" />,
    active: true,
  },
  { label: "Finance", href: "/dashboard/admin/finance", icon: <DollarSign className="w-4 h-4" /> },
  { label: "System", href: "/dashboard/admin/system", icon: <Settings className="w-4 h-4" /> },
]

const pendingVerifications = [
  {
    id: "V001",
    vendor: "Sunrise Photography",
    category: "Photographer",
    city: "Mumbai",
    submittedAt: "Nov 5, 2024",
    documents: ["Business License", "GST Certificate", "Insurance Policy"],
    status: "pending",
    riskLevel: "low",
  },
  {
    id: "V002",
    vendor: "Dream Events Co.",
    category: "Event Planner",
    city: "Delhi",
    submittedAt: "Nov 6, 2024",
    documents: ["Business License", "Insurance Policy"],
    status: "pending",
    riskLevel: "medium",
  },
  {
    id: "V003",
    vendor: "Royal Blooms Floristry",
    category: "Florist",
    city: "Bangalore",
    submittedAt: "Nov 4, 2024",
    documents: ["Business License", "GST Certificate"],
    status: "review",
    riskLevel: "low",
  },
  {
    id: "V004",
    vendor: "Quick Caterers",
    category: "Catering",
    city: "Pune",
    submittedAt: "Nov 7, 2024",
    documents: ["Business License"],
    status: "flagged",
    riskLevel: "high",
    flag: "Incomplete documentation — missing FSSAI license for catering",
  },
]

const spamAlerts = [
  {
    id: "S001",
    type: "Bot Inquiry",
    source: "IP: 192.168.47.23",
    target: "15 vendors",
    time: "2 hours ago",
    status: "blocked",
    severity: "high",
  },
  {
    id: "S002",
    type: "Fake Review",
    source: "User: user_48291",
    target: "Grand Palace Venue",
    time: "5 hours ago",
    status: "removed",
    severity: "medium",
  },
  {
    id: "S003",
    type: "Duplicate Account",
    source: "Email: vendor@fake.com",
    target: "N/A",
    time: "1 day ago",
    status: "suspended",
    severity: "medium",
  },
  {
    id: "S004",
    type: "Spam Inquiry",
    source: "User: john_doe_34",
    target: "8 vendors",
    time: "2 days ago",
    status: "blocked",
    severity: "low",
  },
]

function RiskBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  }
  return <Badge className={map[level] || map.low}>{level} risk</Badge>
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    review: "bg-blue-100 text-blue-700",
    approved: "bg-green-100 text-green-700",
    flagged: "bg-red-100 text-red-700",
    blocked: "bg-red-100 text-red-700",
    removed: "bg-gray-100 text-gray-700",
    suspended: "bg-orange-100 text-orange-700",
  }
  return <Badge className={map[status] || map.pending}>{status}</Badge>
}

export default function TrustSafetyPage() {
  const [activeTab, setActiveTab] = useState("verification")
  const [autoVerify, setAutoVerify] = useState(false)
  const [botFilter, setBotFilter] = useState(true)
  const [spamFilter, setSpamFilter] = useState(true)
  const [fakeReviewFilter, setFakeReviewFilter] = useState(true)

  return (
    <DashboardLayout menuItems={menuItems} userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trust, Safety & Fraud Vetting</h1>
            <p className="text-gray-600 mt-1">Vendor verification, fraud detection, and spam prevention</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button className="bg-gradient-to-r from-red-500 to-rose-500 text-white">
              <Shield className="w-4 h-4 mr-2" />
              Run Safety Scan
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Pending Verification", value: pendingVerifications.filter((v) => v.status === "pending").length, icon: <Clock className="w-5 h-5" />, color: "text-yellow-600", bg: "bg-yellow-100" },
            { label: "Verified Vendors", value: "1,284", icon: <UserCheck className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-100" },
            { label: "Spam Blocked (7d)", value: "47", icon: <Ban className="w-5 h-5" />, color: "text-red-600", bg: "bg-red-100" },
            { label: "Fraud Alerts", value: "3", icon: <AlertTriangle className="w-5 h-5" />, color: "text-orange-600", bg: "bg-orange-100" },
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="verification">🔍 Verification Queue</TabsTrigger>
            <TabsTrigger value="spam">🤖 Spam & Fraud</TabsTrigger>
            <TabsTrigger value="reviews">⭐ Review Integrity</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Safety Settings</TabsTrigger>
          </TabsList>

          {/* Verification Queue */}
          <TabsContent value="verification" className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search vendors..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {pendingVerifications.map((v) => (
                <Card key={v.id} className={v.status === "flagged" ? "border-red-200 bg-red-50" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold text-gray-800">{v.vendor}</p>
                            <StatusBadge status={v.status} />
                            <RiskBadge level={v.riskLevel} />
                          </div>
                          <p className="text-sm text-gray-500">{v.category} · {v.city}</p>
                          <p className="text-xs text-gray-400 mt-1">Submitted: {v.submittedAt}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {v.documents.map((doc) => (
                              <span
                                key={doc}
                                className="flex items-center space-x-1 bg-white border rounded px-2 py-0.5 text-xs text-gray-600"
                              >
                                <FileText className="w-3 h-3 text-green-500" />
                                <span>{doc}</span>
                              </span>
                            ))}
                          </div>
                          {v.flag && (
                            <div className="mt-2 flex items-start space-x-2 text-red-600">
                              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <p className="text-xs">{v.flag}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" className="bg-green-500 text-white hover:bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 border-red-200">
                          <XCircle className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Spam & Fraud */}
          <TabsContent value="spam" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {spamAlerts.map((alert) => (
                <Card key={alert.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            alert.severity === "high"
                              ? "bg-red-100"
                              : alert.severity === "medium"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <Bot
                            className={`w-5 h-5 ${
                              alert.severity === "high"
                                ? "text-red-600"
                                : alert.severity === "medium"
                                ? "text-yellow-600"
                                : "text-gray-500"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold text-sm">{alert.type}</p>
                            <StatusBadge status={alert.status} />
                            <Badge
                              className={
                                alert.severity === "high"
                                  ? "bg-red-100 text-red-700"
                                  : alert.severity === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            Source: {alert.source} → Target: {alert.target}
                          </p>
                          <p className="text-xs text-gray-400">{alert.time}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Flag className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Review Integrity */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Review Integrity Queue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    reviewer: "user_anon_291",
                    vendor: "Crystal Events",
                    rating: 5,
                    comment: "Absolutely amazing! Best in the business!",
                    verified: false,
                    flag: "Reviewer has no booking record with this vendor",
                    status: "flagged",
                  },
                  {
                    reviewer: "Priya S.",
                    vendor: "Capture Moments",
                    rating: 5,
                    comment: "Rahul was incredible on our wedding day. Highly recommend!",
                    verified: true,
                    flag: null,
                    status: "approved",
                  },
                  {
                    reviewer: "anonymous_user",
                    vendor: "Royal Palace Hotel",
                    rating: 1,
                    comment: "Worst experience ever. Total scam.",
                    verified: false,
                    flag: "Suspiciously negative review from new account with no history",
                    status: "pending",
                  },
                ].map((review, i) => (
                  <Card key={i} className={review.status === "flagged" ? "border-red-200 bg-red-50" : ""}>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-sm">{review.reviewer}</p>
                            <span>→</span>
                            <p className="text-sm text-gray-600">{review.vendor}</p>
                            <div className="flex">
                              {[...Array(5)].map((_, j) => (
                                <Star
                                  key={j}
                                  className={`w-3 h-3 ${j < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                                />
                              ))}
                            </div>
                            {review.verified ? (
                              <Badge className="bg-green-100 text-green-700 text-xs">✓ Verified</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-600 text-xs">Unverified</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 italic">"{review.comment}"</p>
                          {review.flag && (
                            <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>{review.flag}</span>
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-1 flex-shrink-0">
                          <Button size="sm" className="bg-green-500 text-white hover:bg-green-600 text-xs">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500 text-xs">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Settings */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Automated Safety Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  {
                    label: "Bot & Spam Filter",
                    desc: "Automatically detect and block bot-generated inquiries",
                    icon: <Bot className="w-4 h-4" />,
                    value: botFilter,
                    setter: setBotFilter,
                  },
                  {
                    label: "Fake Review Detection",
                    desc: "Use ML to flag suspicious reviews for human review",
                    icon: <Star className="w-4 h-4" />,
                    value: fakeReviewFilter,
                    setter: setFakeReviewFilter,
                  },
                  {
                    label: "Spam Inquiry Prevention",
                    desc: "Rate-limit couples to max 10 vendor inquiries per day",
                    icon: <Lock className="w-4 h-4" />,
                    value: spamFilter,
                    setter: setSpamFilter,
                  },
                  {
                    label: "Auto-Verify Low-Risk Vendors",
                    desc: "Auto-approve vendors with complete documentation & low risk score",
                    icon: <Fingerprint className="w-4 h-4" />,
                    value: autoVerify,
                    setter: setAutoVerify,
                  },
                ].map(({ label, desc, icon, value, setter }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                        {icon}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{label}</p>
                        <p className="text-xs text-gray-500">{desc}</p>
                      </div>
                    </div>
                    <Switch checked={value} onCheckedChange={setter} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Required Verification Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { doc: "Business License / Registration", required: true },
                  { doc: "GST Certificate", required: true },
                  { doc: "Liability Insurance Policy", required: false },
                  { doc: "ID Proof (Aadhar / PAN)", required: true },
                  { doc: "Bank Account Verification", required: true },
                  { doc: "FSSAI License (Caterers only)", required: false },
                ].map(({ doc, required }) => (
                  <div key={doc} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">{required ? "Required" : "Optional"}</span>
                      <Switch defaultChecked={required} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
