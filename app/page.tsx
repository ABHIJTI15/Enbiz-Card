"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles, Zap, Share2, Download, QrCode, Palette } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Open Source • Modern • Professional</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              The complete platform to{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                build digital cards
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
              Create stunning, professional digital business cards with live preview, multiple templates, and instant
              sharing. No signup required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generator">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 text-lg px-8 py-6"
                >
                  Create Your Card Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 backdrop-blur-sm bg-transparent">
                View Examples
              </Button>
            </div>
          </div>

          {/* Animated Card Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
            <Card className="relative backdrop-blur-md bg-card/50 border-border/50 p-8 transform hover:scale-105 transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">JD</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">John Doe</h3>
                  <p className="text-muted-foreground mb-4">Senior Product Designer</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Creating beautiful digital experiences with a focus on user-centered design and innovation.
                  </p>
                  <div className="flex space-x-4">
                    <Button size="sm" variant="outline">
                      Connect
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-muted/50 rounded-2xl flex items-center justify-center border border-border/50">
                    <QrCode className="w-16 h-16 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Cards Created" },
              { number: "50+", label: "Templates" },
              { number: "99%", label: "Uptime" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Everything you need to create{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                professional cards
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced features that make card creation effortless and sharing seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Live Preview",
                description: "See your changes in real-time as you build your card with instant updates.",
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Multiple Templates",
                description: "Choose from 50+ professionally designed templates for every industry.",
              },
              {
                icon: <QrCode className="w-8 h-8" />,
                title: "QR Code Generation",
                description: "Instantly generate QR codes for easy sharing and networking.",
              },
              {
                icon: <Download className="w-8 h-8" />,
                title: "Multiple Export Formats",
                description: "Export as vCard, PNG, PDF, or get a shareable URL.",
              },
              {
                icon: <Share2 className="w-8 h-8" />,
                title: "Easy Sharing",
                description: "Share your card via link, QR code, or social media platforms.",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Open Source",
                description: "Fully open source and customizable for your specific needs.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to create your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              digital business card?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who trust CardGen for their digital networking needs.
          </p>
          <Link href="/generator">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 text-lg px-8 py-6"
            >
              Start Building Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CardGen</span>
              </div>
              <p className="text-muted-foreground">
                The modern way to create and share professional digital business cards.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/generator" className="hover:text-foreground transition-colors">
                    Generator
                  </Link>
                </li>
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <a href="https://github.com" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CardGen. Open source and built with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
