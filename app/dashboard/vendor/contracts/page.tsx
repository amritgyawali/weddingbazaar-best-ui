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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  FileText,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  MessageCircle,
  BarChart3,
  Eye,
  Plus,
  Edit,
  Download,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  PenTool,
  Shield,
  User,
  Briefcase,
  Settings,
  Copy,
  Trash2,
  ExternalLink,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", href: "/dashboard/vendor", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "Bookings", href: "/dashboard/vendor/bookings", icon: <Calendar className="w-4 h-4" /> },
  { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: <MessageCircle className="w-4 h-4" /> },
  { label: "Contracts", href: "/dashboard/vendor/contracts", icon: <FileText className="w-4 h-4" />, active: true },
  { label: "Calendar", href: "/dashboard/vendor/calendar", icon: <Calendar className="w-4 h-4" /> },
  { label: "Templates", href: "/dashboard/vendor/templates", icon: <Settings className="w-4 h-4" /> },
  { label: "Analytics", href: "/dashboard/vendor/analytics", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Payments", href: "/dashboard/vendor/payments", icon: <DollarSign className="w-4 h-4" /> },
  { label: "Reviews", href: "/dashboard/vendor/reviews", icon: <Star className="w-4 h-4" /> },
  { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: <Eye className="w-4 h-4" /> },
]

const contracts = [
  {
    id: "C001",
    client: "Priya Sharma & Rahul Gupta",
    event: "Wedding Photography",
    date: "Dec 15, 2024",
    amount: 95000,
    status: "signed",
    sentAt: "Oct 5, 2024",
    signedAt: "Oct 7, 2024",
  },
  {
    id: "C002",
    client: "Anjali & Vikram Mehta",
    event: "Pre-wedding Shoot",
    date: "Nov 20, 2024",
    amount: 45000,
    status: "awaiting_signature",
    sentAt: "Oct 12, 2024",
    signedAt: null,
  },
  {
    id: "C003",
    client: "Sneha Patel",
    event: "Wedding Photography + Reel",
    date: "Jan 8, 2025",
    amount: 125000,
    status: "draft",
    sentAt: null,
    signedAt: null,
  },
  {
    id: "C004",
    client: "Kavya & Arjun Nair",
    event: "Wedding Photography",
    date: "Feb 14, 2025",
    amount: 85000,
    status: "signed",
    sentAt: "Sep 28, 2024",
    signedAt: "Oct 1, 2024",
  },
]

const contractTemplates = [
  { id: 1, name: "Standard Wedding Photography", clauses: 12, lastUsed: "Oct 5, 2024" },
  { id: 2, name: "Pre-Wedding Shoot", clauses: 8, lastUsed: "Sep 15, 2024" },
  { id: 3, name: "Full Day Coverage + Reel", clauses: 15, lastUsed: "Oct 12, 2024" },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    signed: { label: "Signed", className: "bg-green-100 text-green-700" },
    awaiting_signature: { label: "Awaiting Signature", className: "bg-yellow-100 text-yellow-700" },
    draft: { label: "Draft", className: "bg-gray-100 text-gray-700" },
    expired: { label: "Expired", className: "bg-red-100 text-red-700" },
  }
  const s = map[status] || map.draft
  return <Badge className={s.className}>{s.label}</Badge>
}

export default function VendorContractsPage() {
  const [activeTab, setActiveTab] = useState("contracts")
  const [selectedContract, setSelectedContract] = useState<(typeof contracts)[0] | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const stats = {
    total: contracts.length,
    signed: contracts.filter((c) => c.status === "signed").length,
    pending: contracts.filter((c) => c.status === "awaiting_signature").length,
    totalValue: contracts.filter((c) => c.status === "signed").reduce((s, c) => s + c.amount, 0),
  }

  return (
    <DashboardLayout menuItems={menuItems} userRole="vendor">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Smart Contracts & E-Signatures</h1>
            <p className="text-gray-600 mt-1">Send legally binding contracts and collect digital signatures</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            onClick={() => setIsCreating(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Contract
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Contracts", value: stats.total, icon: <FileText className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Signed", value: stats.signed, icon: <CheckCircle className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-100" },
            { label: "Awaiting Signature", value: stats.pending, icon: <Clock className="w-5 h-5" />, color: "text-yellow-600", bg: "bg-yellow-100" },
            { label: "Signed Value", value: `₹${(stats.totalValue / 1000).toFixed(0)}K`, icon: <DollarSign className="w-5 h-5" />, color: "text-purple-600", bg: "bg-purple-100" },
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
            <TabsTrigger value="contracts">📄 All Contracts</TabsTrigger>
            <TabsTrigger value="templates">📋 Templates</TabsTrigger>
            <TabsTrigger value="create">✏️ Create Contract</TabsTrigger>
          </TabsList>

          {/* All Contracts */}
          <TabsContent value="contracts" className="space-y-4">
            <div className="space-y-3">
              {contracts.map((contract) => (
                <Card
                  key={contract.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedContract(contract)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{contract.client}</p>
                          <p className="text-sm text-gray-500">
                            {contract.event} · {contract.date}
                          </p>
                          <p className="text-xs text-gray-400">
                            {contract.sentAt ? `Sent: ${contract.sentAt}` : "Not sent yet"}
                            {contract.signedAt ? ` · Signed: ${contract.signedAt}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-bold text-gray-800">₹{contract.amount.toLocaleString()}</p>
                        <StatusBadge status={contract.status} />
                        <div className="flex space-x-2 justify-end">
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3" />
                          </Button>
                          {contract.status === "draft" && (
                            <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                              <Send className="w-3 h-3 mr-1" />
                              Send
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Reusable contract templates with your standard clauses</p>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                New Template
              </Button>
            </div>
            <div className="space-y-3">
              {contractTemplates.map((tmpl) => (
                <Card key={tmpl.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{tmpl.name}</p>
                        <p className="text-sm text-gray-500">{tmpl.clauses} clauses · Last used {tmpl.lastUsed}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create Contract */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Contract</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Client Name</Label>
                    <Input placeholder="e.g. Priya & Rahul Sharma" className="mt-1" />
                  </div>
                  <div>
                    <Label>Client Email</Label>
                    <Input placeholder="client@example.com" className="mt-1" />
                  </div>
                  <div>
                    <Label>Service Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding-photo">Wedding Photography</SelectItem>
                        <SelectItem value="pre-wedding">Pre-wedding Shoot</SelectItem>
                        <SelectItem value="full-coverage">Full Day Coverage + Reel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Event Date</Label>
                    <Input type="date" className="mt-1" />
                  </div>
                  <div>
                    <Label>Contract Value (₹)</Label>
                    <Input type="number" placeholder="95000" className="mt-1" />
                  </div>
                  <div>
                    <Label>Retainer (%)</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="30%" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25%</SelectItem>
                        <SelectItem value="30">30%</SelectItem>
                        <SelectItem value="50">50%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Use Template</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a template or start from scratch" />
                    </SelectTrigger>
                    <SelectContent>
                      {contractTemplates.map((t) => (
                        <SelectItem key={t.id} value={String(t.id)}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Special Terms & Conditions</Label>
                  <Textarea
                    placeholder="Add any special clauses or notes for this contract..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4 flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800 text-sm">Legally Binding E-Signature</p>
                    <p className="text-xs text-blue-600 mt-0.5">
                      Both parties will digitally sign the contract. Signatures are legally binding under the IT Act 2000.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Contract
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                  <Button className="flex-1 bg-blue-500 text-white hover:bg-blue-600">
                    <Send className="w-4 h-4 mr-2" />
                    Send for Signature
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
