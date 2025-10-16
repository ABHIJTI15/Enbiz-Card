"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  Share2,
  QrCode,
  Edit3,
  Palette,
  Moon,
  Sun,
  Layout,
} from "lucide-react"
import Link from "next/link"
import { CardPreview } from "@/components/card-preview"
import { AdvancedCustomization } from "@/components/advanced-customization"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { ExportOptions } from "@/components/export-options"
import { TemplateGallery } from "@/components/template-gallery"
import { DragDropEditor } from "@/components/drag-drop-editor"

interface CardData {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
  bio: string
  linkedin: string
  twitter: string
  instagram: string
  template: string
  primaryColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
  nameFontSize: number
  titleFontSize: number
  padding: number
  borderRadius: number
  borderWidth: number
  shadowStyle: string
  hoverScale: number
  animationDuration: number
  primaryOpacity: number
  backgroundBlur: number
  backgroundGradient: string
  cardWidth: string
  aspectRatio: string
}

interface CardElement {
  id: string
  type: "name" | "title" | "company" | "email" | "phone" | "website" | "bio" | "social" | "avatar" | "qr"
  label: string
  visible: boolean
  order: number
}

interface Template {
  id: string
  preview: string
}

export default function GeneratorPage() {
  const [isDark, setIsDark] = useState(true)
  const [activeTab, setActiveTab] = useState("edit")
  const [cardData, setCardData] = useState<CardData>({
    name: "John Doe",
    title: "Senior Product Designer",
    company: "Tech Innovations Inc.",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    website: "johndoe.design",
    bio: "Passionate about creating beautiful digital experiences that solve real problems and delight users.",
    linkedin: "johndoe",
    twitter: "johndoe",
    instagram: "johndoe.design",
    template: "modern",
    primaryColor: "#3b82f6",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    fontFamily: "font-sans",
    nameFontSize: 24,
    titleFontSize: 16,
    padding: 24,
    borderRadius: 12,
    borderWidth: 0,
    shadowStyle: "shadow-lg",
    hoverScale: 105,
    animationDuration: 300,
    primaryOpacity: 100,
    backgroundBlur: 0,
    backgroundGradient: "",
    cardWidth: "medium",
    aspectRatio: "auto",
  })

  const [cardElements, setCardElements] = useState<CardElement[]>([
    { id: "avatar", type: "avatar", label: "Profile Picture", visible: true, order: 0 },
    { id: "name", type: "name", label: "Full Name", visible: true, order: 1 },
    { id: "title", type: "title", label: "Job Title", visible: true, order: 2 },
    { id: "company", type: "company", label: "Company", visible: true, order: 3 },
    { id: "bio", type: "bio", label: "Bio", visible: true, order: 4 },
    { id: "email", type: "email", label: "Email", visible: true, order: 5 },
    { id: "phone", type: "phone", label: "Phone", visible: true, order: 6 },
    { id: "website", type: "website", label: "Website", visible: true, order: 7 },
    { id: "social", type: "social", label: "Social Media", visible: true, order: 8 },
    { id: "qr", type: "qr", label: "QR Code", visible: true, order: 9 },
  ])

  const templates: Template[] = [
    { id: "modern", preview: "/modern-business-card.png" },
    { id: "minimal", preview: "/minimal-business-card.png" },
    { id: "creative", preview: "/creative-gradient-business-card.jpg" },
    { id: "corporate", preview: "/corporate-business-card.jpg" },
    { id: "tech", preview: "/tech-futuristic-business-card.jpg" },
    { id: "artistic", preview: "/artistic-business-card.jpg" },
    { id: "luxury", preview: "/luxury-gold-business-card.jpg" },
    { id: "startup", preview: "/startup-business-card.jpg" },
  ]

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newTheme = !prev
      document.documentElement.classList.toggle("dark", newTheme)
      return newTheme
    })
  }, [])

  const updateCardData = useCallback((field: keyof CardData, value: string | number) => {
    setCardData((prev) => {
      let validatedValue = value
      if (field === "name" || field === "title") {
        validatedValue = (value as string).trim() || prev[field]
      }
      const newData = { ...prev, [field]: validatedValue }
      return newData
    })
  }, [])

  useEffect(() => {
    console.log("cardData updated:", cardData)
  }, [cardData])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark" : ""}`}>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <h1 className="text-xl font-semibold hidden sm:block">Card Generator</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex bg-transparent"
                onClick={() => alert("Share functionality coming soon!")}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                onClick={() => alert("Export functionality coming soon!")}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <section className="space-y-6">
            <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="edit" className="flex items-center gap-1 text-xs cursor-pointer">
                    <Edit3 className="w-3 h-3" />
                    <span className="hidden sm:inline">Content</span>
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex items-center gap-1 text-xs cursor-pointer">
                    <Layout className="w-3 h-3" />
                    <span className="hidden sm:inline">Templates</span>
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="flex items-center gap-1 text-xs cursor-pointer">
                    <Layout className="w-3 h-3" />
                    <span className="hidden sm:inline">Layout</span>
                  </TabsTrigger>
                  <TabsTrigger value="design" className="flex items-center gap-1 text-xs cursor-pointer">
                    <Palette className="w-3 h-3" />
                    <span className="hidden sm:inline">Design</span>
                  </TabsTrigger>
                  <TabsTrigger value="qr" className="flex items-center gap-1 text-xs cursor-pointer">
                    <QrCode className="w-3 h-3" />
                    <span className="hidden sm:inline">QR</span>
                  </TabsTrigger>
                  <TabsTrigger value="export" className="flex items-center gap-1 text-xs cursor-pointer">
                    <Download className="w-3 h-3" />
                    <span className="hidden sm:inline">Export</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={cardData.name}
                        onChange={(e) => updateCardData("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                        aria-required="true"
                        className="cursor-text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title *</Label>
                      <Input
                        id="title"
                        value={cardData.title}
                        onChange={(e) => updateCardData("title", e.target.value)}
                        placeholder="Your job title"
                        required
                        aria-required="true"
                        className="cursor-text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={cardData.company}
                      onChange={(e) => updateCardData("company", e.target.value)}
                      placeholder="Company name"
                      className="cursor-text"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={cardData.bio}
                      onChange={(e) => updateCardData("bio", e.target.value)}
                      placeholder="Brief description about yourself"
                      rows={3}
                      className="cursor-text"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={cardData.email}
                        onChange={(e) => updateCardData("email", e.target.value)}
                        placeholder="your@email.com"
                        className="cursor-text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={cardData.phone}
                        onChange={(e) => updateCardData("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="cursor-text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={cardData.website}
                      onChange={(e) => updateCardData("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="cursor-text"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Social Media</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-sm text-muted-foreground">
                          LinkedIn
                        </Label>
                        <Input
                          id="linkedin"
                          value={cardData.linkedin}
                          onChange={(e) => updateCardData("linkedin", e.target.value)}
                          placeholder="username"
                          className="cursor-text"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter" className="text-sm text-muted-foreground">
                          Twitter
                        </Label>
                        <Input
                          id="twitter"
                          value={cardData.twitter}
                          onChange={(e) => updateCardData("twitter", e.target.value)}
                          placeholder="@username"
                          className="cursor-text"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instagram" className="text-sm text-muted-foreground">
                          Instagram
                        </Label>
                        <Input
                          id="instagram"
                          value={cardData.instagram}
                          onChange={(e) => updateCardData("instagram", e.target.value)}
                          placeholder="username"
                          className="cursor-text"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="templates" className="mt-6">
                  <TemplateGallery
                    selectedTemplate={cardData.template}
                    onSelectTemplate={(templateId) => updateCardData("template", templateId)}
                  />
                </TabsContent>

                <TabsContent value="layout" className="mt-6">
                  <DragDropEditor elements={cardElements} onUpdateElements={setCardElements} />
                </TabsContent>

                <TabsContent value="design" className="mt-6">
                  <AdvancedCustomization
                    cardData={cardData}
                    onUpdateCardData={updateCardData}
                  />
                </TabsContent>

                <TabsContent value="qr" className="mt-6">
                  <QRCodeGenerator cardData={cardData} />
                </TabsContent>

                <TabsContent value="export" className="mt-6">
                  <ExportOptions cardData={cardData} />
                </TabsContent>
              </Tabs>
            </Card>
          </section>

          <section className="lg:block">
            <div className="sticky top-24">
              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Live Preview</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("qr")}>
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Code
                  </Button>
                </div>
                <CardPreview cardData={cardData} templates={templates} />
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}