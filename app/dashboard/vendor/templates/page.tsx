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
  Mail,
  Zap,
  Plus,
  Edit,
  Trash2,
  Copy,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  MessageCircle,
  BarChart3,
  Eye,
  FileText,
  Settings,
  CheckCircle,
  Clock,
  Send,
  Play,
  Pause,
  AlertCircle,
  FileImage,
  Users,
  ArrowRight,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", href: "/dashboard/vendor", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "Bookings", href: "/dashboard/vendor/bookings", icon: <Calendar className="w-4 h-4" /> },
  { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: <MessageCircle className="w-4 h-4" /> },
  { label: "Contracts", href: "/dashboard/vendor/contracts", icon: <FileText className="w-4 h-4" /> },
  { label: "Calendar", href: "/dashboard/vendor/calendar", icon: <Calendar className="w-4 h-4" /> },
  { label: "Templates", href: "/dashboard/vendor/templates", icon: <Settings className="w-4 h-4" />, active: true },
  { label: "Analytics", href: "/dashboard/vendor/analytics", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Payments", href: "/dashboard/vendor/payments", icon: <DollarSign className="w-4 h-4" /> },
  { label: "Reviews", href: "/dashboard/vendor/reviews", icon: <Star className="w-4 h-4" /> },
  { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: <Eye className="w-4 h-4" /> },
]

const autoResponders = [
  {
    id: 1,
    name: "New Inquiry Auto-Reply",
    trigger: "When a new inquiry is received",
    status: "active",
    sentCount: 89,
    openRate: 78,
  },
  {
    id: 2,
    name: "Pricing PDF Sender",
    trigger: "Immediately after inquiry form submission",
    status: "active",
    sentCount: 89,
    openRate: 65,
  },
  {
    id: 3,
    name: "Follow-up (3 days no response)",
    trigger: "3 days after inquiry, if no reply",
    status: "active",
    sentCount: 34,
    openRate: 52,
  },
  {
    id: 4,
    name: "Booking Confirmation",
    trigger: "When contract is signed",
    status: "active",
    sentCount: 24,
    openRate: 95,
  },
  {
    id: 5,
    name: "Payment Reminder",
    trigger: "3 days before payment due date",
    status: "paused",
    sentCount: 18,
    openRate: 88,
  },
  {
    id: 6,
    name: "Post-Wedding Thank You",
    trigger: "2 days after event date",
    status: "paused",
    sentCount: 12,
    openRate: 72,
  },
]

const messageTemplates = [
  {
    id: 1,
    name: "Initial Inquiry Response",
    category: "Inquiry",
    subject: "Thank you for your inquiry – Capture Moments",
    preview: "Hi [Client Name], Thank you so much for reaching out! We'd love to be part of your special day...",
    usedCount: 89,
  },
  {
    id: 2,
    name: "Pricing Package Details",
    category: "Pricing",
    subject: "Our Photography Packages – Capture Moments",
    preview: "Hi [Client Name], As requested, here are our photography packages for your consideration...",
    usedCount: 67,
  },
  {
    id: 3,
    name: "Meeting Request",
    category: "Meeting",
    subject: "Let's schedule a call – Capture Moments",
    preview: "Hi [Client Name], We'd love to learn more about your wedding vision! Would you be available for a quick call...",
    usedCount: 45,
  },
  {
    id: 4,
    name: "Booking Confirmation",
    category: "Booking",
    subject: "You're booked! 🎉 – Capture Moments",
    preview: "Hi [Client Name], We are so thrilled to confirm that we will be capturing your wedding day...",
    usedCount: 24,
  },
  {
    id: 5,
    name: "Review Request",
    category: "Review",
    subject: "Share your experience – Capture Moments",
    preview: "Hi [Client Name], It was an absolute honour to photograph your wedding! We'd truly appreciate a review...",
    usedCount: 20,
  },
]

export default function VendorTemplatesPage() {
  const [activeTab, setActiveTab] = useState("autoresponders")
  const [responders, setResponders] = useState(autoResponders)
  const [editingTemplate, setEditingTemplate] = useState<(typeof messageTemplates)[0] | null>(null)

  const toggleResponder = (id: number) => {
    setResponders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === "active" ? "paused" : "active" } : r))
    )
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="vendor">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Auto-Responders & Template Library</h1>
            <p className="text-gray-600 mt-1">Automate responses and manage reusable message templates</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Automations", value: responders.filter((r) => r.status === "active").length, icon: <Zap className="w-5 h-5" />, color: "text-yellow-600", bg: "bg-yellow-100" },
            { label: "Emails Sent", value: "247", icon: <Send className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Avg. Open Rate", value: "73%", icon: <Eye className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-100" },
            { label: "Templates", value: messageTemplates.length, icon: <FileText className="w-5 h-5" />, color: "text-purple-600", bg: "bg-purple-100" },
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
            <TabsTrigger value="autoresponders">⚡ Auto-Responders</TabsTrigger>
            <TabsTrigger value="templates">📝 Message Templates</TabsTrigger>
            <TabsTrigger value="create">✏️ Create New</TabsTrigger>
          </TabsList>

          {/* Auto-Responders */}
          <TabsContent value="autoresponders" className="space-y-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3 flex items-center space-x-3">
                <Zap className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-blue-700">
                  Auto-responders run automatically based on triggers. You can pause any at any time.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {responders.map((r) => (
                <Card key={r.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            r.status === "active" ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Zap className={`w-5 h-5 ${r.status === "active" ? "text-green-600" : "text-gray-400"}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{r.name}</p>
                          <p className="text-sm text-gray-500 flex items-center space-x-1">
                            <ArrowRight className="w-3 h-3" />
                            <span>{r.trigger}</span>
                          </p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-xs text-gray-400">{r.sentCount} sent</span>
                            <span className="text-xs text-gray-400">{r.openRate}% open rate</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={r.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>
                          {r.status === "active" ? "Active" : "Paused"}
                        </Badge>
                        <Switch
                          checked={r.status === "active"}
                          onCheckedChange={() => toggleResponder(r.id)}
                        />
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Message Templates */}
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {messageTemplates.map((tmpl) => (
                <Card key={tmpl.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold text-gray-800">{tmpl.name}</p>
                            <Badge className="bg-purple-100 text-purple-700 text-xs">{tmpl.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">{tmpl.subject}</p>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">{tmpl.preview}</p>
                          <p className="text-xs text-gray-400 mt-1">Used {tmpl.usedCount} times</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingTemplate(tmpl)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-3 h-3 mr-1" />
                          Use
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create New */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Template or Auto-Responder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Template Name</Label>
                    <Input placeholder="e.g. Initial Inquiry Response" className="mt-1" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inquiry">Inquiry</SelectItem>
                        <SelectItem value="pricing">Pricing</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="booking">Booking</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Email Subject</Label>
                  <Input placeholder="e.g. Thank you for your inquiry – [Your Business Name]" className="mt-1" />
                </div>

                <div>
                  <Label>Message Body</Label>
                  <Textarea
                    placeholder={`Hi [Client Name],\n\nThank you for reaching out! ...\n\nAvailable variables: [Client Name], [Event Date], [Venue], [Package Name], [Your Name]`}
                    className="mt-1 font-mono text-sm"
                    rows={8}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Use variables like [Client Name], [Event Date], [Venue] which will be auto-filled when sent.
                  </p>
                </div>

                <div>
                  <Label>Attachments</Label>
                  <div className="mt-1 border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-blue-300 transition-colors">
                    <FileImage className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-500">Attach pricing PDF or brochure</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Enable as Auto-Responder</p>
                      <p className="text-xs text-gray-500">Automatically send this template based on a trigger</p>
                    </div>
                    <Switch />
                  </div>
                  <div>
                    <Label className="text-xs">Trigger Event</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inquiry">New inquiry received</SelectItem>
                        <SelectItem value="form">Inquiry form submitted</SelectItem>
                        <SelectItem value="no-reply-3d">3 days without reply</SelectItem>
                        <SelectItem value="contract-signed">Contract signed</SelectItem>
                        <SelectItem value="payment-due">3 days before payment due</SelectItem>
                        <SelectItem value="post-event">2 days after event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">Save as Draft</Button>
                  <Button className="flex-1 bg-blue-500 text-white hover:bg-blue-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save Template
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
