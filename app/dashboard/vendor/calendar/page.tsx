"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Star,
  TrendingUp,
  MessageCircle,
  BarChart3,
  Eye,
  FileText,
  Settings,
  CheckCircle,
  X,
  Clock,
  Plus,
  RefreshCw,
  Apple,
  Globe,
  AlertCircle,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", href: "/dashboard/vendor", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "Bookings", href: "/dashboard/vendor/bookings", icon: <Calendar className="w-4 h-4" /> },
  { label: "Inquiries", href: "/dashboard/vendor/inquiries", icon: <MessageCircle className="w-4 h-4" /> },
  { label: "Contracts", href: "/dashboard/vendor/contracts", icon: <FileText className="w-4 h-4" /> },
  { label: "Calendar", href: "/dashboard/vendor/calendar", icon: <Calendar className="w-4 h-4" />, active: true },
  { label: "Templates", href: "/dashboard/vendor/templates", icon: <Settings className="w-4 h-4" /> },
  { label: "Analytics", href: "/dashboard/vendor/analytics", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Payments", href: "/dashboard/vendor/payments", icon: <DollarSign className="w-4 h-4" /> },
  { label: "Reviews", href: "/dashboard/vendor/reviews", icon: <Star className="w-4 h-4" /> },
  { label: "Portfolio", href: "/dashboard/vendor/portfolio", icon: <Eye className="w-4 h-4" /> },
]

// Mock booked dates for December 2024
const bookedDates: Record<string, { client: string; type: string; color: string }> = {
  "2024-12-05": { client: "Anjali & Vikram", type: "Wedding", color: "bg-pink-400" },
  "2024-12-07": { client: "Sneha Patel", type: "Pre-wedding", color: "bg-purple-400" },
  "2024-12-12": { client: "Kavya & Arjun", type: "Engagement", color: "bg-blue-400" },
  "2024-12-15": { client: "Priya & Rahul", type: "Wedding", color: "bg-pink-400" },
  "2024-12-20": { client: "Meera & Suresh", type: "Wedding", color: "bg-pink-400" },
  "2024-12-22": { client: "Pooja Nair", type: "Pre-wedding", color: "bg-purple-400" },
  "2024-12-28": { client: "Divya & Rohit", type: "Wedding", color: "bg-pink-400" },
}

const blockedDates = ["2024-12-10", "2024-12-11", "2024-12-25", "2024-12-26"]

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function VendorCalendarPage() {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [activeTab, setActiveTab] = useState("calendar")
  const [googleSync, setGoogleSync] = useState(true)
  const [appleSync, setAppleSync] = useState(false)
  const [autoBlock, setAutoBlock] = useState(true)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const formatDate = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

  const upcomingEvents = Object.entries(bookedDates)
    .filter(([d]) => new Date(d) >= today)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 5)

  return (
    <DashboardLayout menuItems={menuItems} userRole="vendor">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Availability Calendar</h1>
            <p className="text-gray-600 mt-1">Sync with Google & Apple calendars. Auto-block booked dates.</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Now
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Block Dates
            </Button>
          </div>
        </div>

        {/* Sync status banner */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-sm text-green-700">
              <strong>Google Calendar synced</strong> — Last synced 5 minutes ago. Booked dates are automatically blocked.
            </p>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar">📅 Calendar View</TabsTrigger>
            <TabsTrigger value="sync">🔗 Calendar Sync</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
          </TabsList>

          {/* Calendar View */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" onClick={prevMonth}>
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <h2 className="text-lg font-bold">
                        {MONTHS[viewMonth]} {viewYear}
                      </h2>
                      <Button variant="ghost" size="sm" onClick={nextMonth}>
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {DAYS.map((d) => (
                        <div key={d} className="text-center text-xs font-semibold text-gray-500 py-1">
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty cells for first day offset */}
                      {[...Array(firstDay)].map((_, i) => (
                        <div key={`empty-${i}`} className="h-10" />
                      ))}
                      {/* Day cells */}
                      {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1
                        const dateStr = formatDate(day)
                        const booking = bookedDates[dateStr]
                        const isBlocked = blockedDates.includes(dateStr)
                        const isToday =
                          day === today.getDate() &&
                          viewMonth === today.getMonth() &&
                          viewYear === today.getFullYear()

                        return (
                          <div
                            key={day}
                            className={`h-10 rounded-lg flex flex-col items-center justify-center text-xs cursor-pointer transition-colors relative
                              ${isToday ? "ring-2 ring-pink-500" : ""}
                              ${booking ? `${booking.color} text-white` : ""}
                              ${isBlocked ? "bg-gray-200 text-gray-400" : ""}
                              ${!booking && !isBlocked ? "hover:bg-gray-100" : ""}
                            `}
                          >
                            <span className="font-medium">{day}</span>
                            {booking && <span className="text-[8px] leading-none opacity-90 truncate w-full text-center px-0.5">{booking.type}</span>}
                            {isBlocked && <X className="w-3 h-3" />}
                          </div>
                        )
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t text-xs">
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded bg-pink-400" />
                        <span>Wedding</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded bg-purple-400" />
                        <span>Pre-wedding</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded bg-blue-400" />
                        <span>Engagement</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded bg-gray-300" />
                        <span>Blocked</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Events */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingEvents.map(([date, event]) => (
                      <div key={date} className="flex items-start space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-full min-h-[40px] rounded-full ${event.color}`} />
                        <div>
                          <p className="text-sm font-medium">{event.client}</p>
                          <p className="text-xs text-gray-500">{event.type}</p>
                          <p className="text-xs text-gray-400">{new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                        </div>
                      </div>
                    ))}
                    {upcomingEvents.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-4">No upcoming events</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">Month Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { label: "Booked Days", value: Object.keys(bookedDates).length, color: "text-pink-600" },
                      { label: "Blocked Days", value: blockedDates.length, color: "text-gray-600" },
                      { label: "Available Days", value: daysInMonth - Object.keys(bookedDates).length - blockedDates.length, color: "text-green-600" },
                    ].map((s) => (
                      <div key={s.label} className="flex justify-between">
                        <span className="text-sm text-gray-600">{s.label}</span>
                        <span className={`font-semibold ${s.color}`}>{s.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Sync Tab */}
          <TabsContent value="sync" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Google Calendar */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Google Calendar</p>
                        <p className="text-xs text-green-600">Connected · studio@example.com</p>
                      </div>
                    </div>
                    <Switch checked={googleSync} onCheckedChange={setGoogleSync} />
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Bookings auto-synced to Google</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Personal events block availability</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">Last synced: 5 min ago</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Sync Now
                  </Button>
                </CardContent>
              </Card>

              {/* Apple Calendar */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Apple className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <p className="font-semibold">Apple Calendar</p>
                        <p className="text-xs text-gray-400">Not connected</p>
                      </div>
                    </div>
                    <Switch checked={appleSync} onCheckedChange={setAppleSync} />
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    Sync your bookings with Apple Calendar on your iPhone and Mac.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Connect Apple Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Subscribe via iCal URL</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-3">
                  Use this URL to subscribe your bookings calendar in any calendar app.
                </p>
                <div className="flex space-x-2">
                  <code className="bg-gray-50 border rounded px-3 py-2 text-xs flex-1 text-gray-700">
                    webcal://weddingbazaar.in/ical/vendor/capture-moments
                  </code>
                  <Button variant="outline" size="sm">Copy</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Availability Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-block on Contract Signed</p>
                    <p className="text-sm text-gray-500">Automatically remove booked date from search results</p>
                  </div>
                  <Switch checked={autoBlock} onCheckedChange={setAutoBlock} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Buffer Days</p>
                    <p className="text-sm text-gray-500">Block day before and after each booking</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Availability on Profile</p>
                    <p className="text-sm text-gray-500">Let couples see your available dates while browsing</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Advance Booking Notice</p>
                    <p className="text-sm text-gray-500">Minimum days required before an event</p>
                  </div>
                  <select className="border rounded px-3 py-1.5 text-sm">
                    <option>7 days</option>
                    <option>14 days</option>
                    <option>30 days</option>
                    <option>60 days</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 text-sm">Visibility Warning</p>
                  <p className="text-xs text-amber-600 mt-0.5">
                    When a date is booked, you will automatically be hidden from search results for that date.
                    This prevents double-bookings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
