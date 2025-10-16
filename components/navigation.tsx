"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, Star, ExternalLink, Share2 } from "lucide-react"

// ✅ Import react-share components correctly
import {
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookShareButton,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
} from "react-share"

// ✅ Share Modal Component
function ShareModal({
  isOpen,
  onClose,
  shareUrl,
  shareTitle = "Check out this awesome card from CardGen!",
}: {
  isOpen: boolean
  onClose: () => void
  shareUrl: string
  shareTitle?: string
}) {
  if (!isOpen) return null

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    alert("Link copied to clipboard! 📋")
    onClose()
  }

  const handleInstagramShare = () => {
    const igUrl = `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`
    window.open(igUrl, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full mx-4 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl font-bold">Share Your Card 🚀</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* ✅ Grid of Share Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <WhatsappIcon size={48} round className="hover:scale-105 transition-transform" />
          </WhatsappShareButton>

          <LinkedinShareButton url={shareUrl} title={shareTitle}>
            <LinkedinIcon size={48} round className="hover:scale-105 transition-transform" />
          </LinkedinShareButton>

          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <TwitterIcon size={48} round className="hover:scale-105 transition-transform" />
          </TwitterShareButton>

          <FacebookShareButton url={shareUrl} quote={shareTitle}>
            <FacebookIcon size={48} round className="hover:scale-105 transition-transform" />
          </FacebookShareButton>

          {/* ✅ Instagram (custom) */}
          <button
            onClick={handleInstagramShare}
            className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 hover:scale-105 transition-all"
          >
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.953-4-4.362s1.791-4.362 4-4.362 4 1.953 4 4.362-1.791 4.362-4 4.362zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441c0-.796-.645-1.441-1.441-1.441z" />
            </svg>
            <span className="text-xs text-white mt-1">IG</span>
          </button>

          <div></div>
        </div>

        {/* ✅ Copy Link Button */}
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Copy Link
        </Button>
      </div>
    </div>
  )
}

// ✅ Main Navigation Component
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "https://your-cardgen-site.com/generator"
  const shareTitle = "Check out this awesome card from CardGen! 🔥"

  const handleExportClick = () => {
    window.open("https://github.com/yourusername/cardgen", "_blank")
  }

  const toggleShareModal = () => setShareModalOpen(!shareModalOpen)

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ✅ Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/placeholder-logo.svg"
                  alt="CardGen logo"
                  width={32}
                  height={32}
                  priority
                  className="h-8 w-8"
                />
                <span className="text-white font-semibold text-lg">CardGen</span>
              </Link>
            </div>

            {/* ✅ Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[
                  ["Home", "/"],
                  ["Generator", "/generator"],
                  ["About", "/about"],
                  ["How It Works", "/how-it-works"],
                  ["Community", "/community"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* ✅ Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportClick}
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-all"
              >
                <Github className="w-4 h-4 mr-2" />
                <Star className="w-4 h-4 mr-1" />
                Export
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>

              <Button
                onClick={toggleShareModal}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white border-gray-600 hover:bg-gray-800"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>

              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <Link href="/generator">Create Card</Link>
              </Button>
            </div>

            {/* ✅ Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md">
              {[
                ["Home", "/"],
                ["Generator", "/generator"],
                ["About", "/about"],
                ["How It Works", "/how-it-works"],
                ["Community", "/community"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {label}
                </Link>
              ))}

              {/* Export & Share (Mobile) */}
              <div className="pt-2 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportClick}
                  className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Github className="w-4 h-4 mr-2" />
                  <Star className="w-4 h-4 mr-1" />
                  Export to GitHub
                </Button>

                <Button
                  onClick={toggleShareModal}
                  variant="ghost"
                  size="sm"
                  className="w-full text-gray-300 hover:text-white border-gray-600 hover:bg-gray-800"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Card
                </Button>
              </div>

              <div className="pt-4 pb-3 border-t border-gray-700">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/generator">Create Card</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ✅ Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shareUrl={shareUrl}
        shareTitle={shareTitle}
      />
    </>
  )
}
