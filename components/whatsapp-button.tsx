"use client"

import { useState } from "react"
import { MessageCircle, X, Phone, ExternalLink } from "lucide-react"

const WHATSAPP_NUMBER = "919999999999" // Replace with actual number
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'm planning my wedding and would like help finding vendors on WeddingBazaar."
)

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip card */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-green-500 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">WeddingBazaar Support</p>
                <p className="text-green-100 text-xs">Typically replies within minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat"
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="bg-green-50 rounded-xl p-3 mb-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                👋 Hello! Need help planning your wedding? Chat with our wedding experts now!
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-between bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </button>
              <button
                onClick={() => window.open(`tel:+${WHATSAPP_NUMBER}`, "_self")}
                className="w-full flex items-center justify-between border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </div>
                <span className="text-xs text-gray-400">+91-99999-99999</span>
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-3">
              Available Mon–Sun, 9 AM – 9 PM IST
            </p>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with us on WhatsApp"
        className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
          </>
        )}
      </button>
    </div>
  )
}
