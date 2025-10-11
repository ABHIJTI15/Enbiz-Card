"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, Share2, Link, FileImage, FileText, Smartphone, Mail, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportOptionsProps {
  cardData: any
  cardUrl?: string
}

export function ExportOptions({ cardData, cardUrl = "https://cardgen.app/card/123" }: ExportOptionsProps) {
  const [exportFormat, setExportFormat] = useState("png")
  const [exportSize, setExportSize] = useState("medium")
  const [exportQuality, setExportQuality] = useState("high")
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Generate vCard data
  const generateVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${cardData.name}`,
      `N:${cardData.name.split(" ").reverse().join(";")}`,
      `TITLE:${cardData.title}`,
      `ORG:${cardData.company}`,
      `EMAIL:${cardData.email}`,
      `TEL:${cardData.phone}`,
      `URL:${cardData.website}`,
      `NOTE:${cardData.bio}`,
      ...(cardData.linkedin ? [`X-SOCIALPROFILE;TYPE=linkedin:https://linkedin.com/in/${cardData.linkedin}`] : []),
      ...(cardData.twitter ? [`X-SOCIALPROFILE;TYPE=twitter:https://twitter.com/${cardData.twitter}`] : []),
      ...(cardData.instagram ? [`X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/${cardData.instagram}`] : []),
      "END:VCARD",
    ].join("\r\n")
    return vcard
  }

  // Generate JSON data
  const generateJSON = () => {
    return JSON.stringify(
      {
        name: cardData.name,
        title: cardData.title,
        company: cardData.company,
        email: cardData.email,
        phone: cardData.phone,
        website: cardData.website,
        bio: cardData.bio,
        social: {
          linkedin: cardData.linkedin,
          twitter: cardData.twitter,
          instagram: cardData.instagram,
        },
        design: {
          template: cardData.template,
          primaryColor: cardData.primaryColor,
          backgroundColor: cardData.backgroundColor,
          textColor: cardData.textColor,
        },
        url: cardUrl,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    )
  }

  // Simulate export process
  const simulateExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      setExportProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setIsExporting(false)
    setExportProgress(0)
  }

  const exportAsImage = async () => {
    await simulateExport()

    // In a real implementation, you would use html2canvas or similar
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set canvas size based on export size
    const sizes = {
      small: { width: 400, height: 240 },
      medium: { width: 600, height: 360 },
      large: { width: 800, height: 480 },
      xl: { width: 1200, height: 720 },
    }

    const size = sizes[exportSize as keyof typeof sizes] || sizes.medium
    canvas.width = size.width
    canvas.height = size.height

    // Create a simple card representation
    ctx.fillStyle = cardData.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add border radius effect
    ctx.beginPath()
    ctx.roundRect(20, 20, canvas.width - 40, canvas.height - 40, 12)
    ctx.fillStyle = cardData.backgroundColor
    ctx.fill()
    ctx.strokeStyle = cardData.primaryColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Add text content
    ctx.fillStyle = cardData.textColor
    ctx.font = "bold 24px Arial"
    ctx.fillText(cardData.name, 40, 80)

    ctx.font = "16px Arial"
    ctx.fillText(cardData.title, 40, 110)
    ctx.fillText(cardData.company, 40, 135)

    ctx.font = "14px Arial"
    ctx.fillText(cardData.email, 40, 170)
    ctx.fillText(cardData.phone, 40, 190)

    // Download the image
    const link = document.createElement("a")
    link.download = `${cardData.name.replace(/\s+/g, "-").toLowerCase()}-business-card.${exportFormat}`
    link.href = canvas.toDataURL(`image/${exportFormat}`, exportQuality === "high" ? 0.9 : 0.7)
    link.click()

    toast({
      title: "Card Exported",
      description: `Your business card has been exported as ${exportFormat.toUpperCase()}.`,
    })
  }

  const exportAsVCard = () => {
    const vcard = generateVCard()
    const blob = new Blob([vcard], { type: "text/vcard" })
    const link = document.createElement("a")
    link.download = `${cardData.name.replace(/\s+/g, "-").toLowerCase()}.vcf`
    link.href = URL.createObjectURL(blob)
    link.click()

    toast({
      title: "vCard Exported",
      description: "Your contact information has been exported as a vCard file.",
    })
  }

  const exportAsJSON = () => {
    const json = generateJSON()
    const blob = new Blob([json], { type: "application/json" })
    const link = document.createElement("a")
    link.download = `${cardData.name.replace(/\s+/g, "-").toLowerCase()}-card-data.json`
    link.href = URL.createObjectURL(blob)
    link.click()

    toast({
      title: "JSON Exported",
      description: "Your card data has been exported as a JSON file.",
    })
  }

  const copyShareableLink = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl)
      toast({
        title: "Link Copied",
        description: "Shareable link has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      })
    }
  }

  const shareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData.name}'s Digital Business Card`,
          text: `Connect with ${cardData.name} - ${cardData.title} at ${cardData.company}`,
          url: cardUrl,
        })
      } catch (err) {
        // Fallback to copying link
        await copyShareableLink()
      }
    } else {
      await copyShareableLink()
    }
  }

  const exportFormats = [
    {
      value: "png",
      label: "PNG Image",
      icon: <FileImage className="w-4 h-4" />,
      description: "High quality with transparency",
    },
    { value: "jpg", label: "JPG Image", icon: <FileImage className="w-4 h-4" />, description: "Smaller file size" },
    { value: "pdf", label: "PDF Document", icon: <FileText className="w-4 h-4" />, description: "Print-ready format" },
    {
      value: "svg",
      label: "SVG Vector",
      icon: <FileImage className="w-4 h-4" />,
      description: "Scalable vector graphics",
    },
  ]

  const exportSizes = [
    { value: "small", label: "Small", dimensions: "400×240" },
    { value: "medium", label: "Medium", dimensions: "600×360" },
    { value: "large", label: "Large", dimensions: "800×480" },
    { value: "xl", label: "Extra Large", dimensions: "1200×720" },
  ]

  return (
    <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export & Share
          </h3>
          <Badge variant="secondary">Multiple Formats</Badge>
        </div>

        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export">Export Files</TabsTrigger>
            <TabsTrigger value="share">Share & Link</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-6">
            <div className="space-y-4">
              <Label>Export Format</Label>
              <div className="grid grid-cols-1 gap-3">
                {exportFormats.map((format) => (
                  <Card
                    key={format.value}
                    className={`p-4 cursor-pointer transition-all hover:bg-accent/50 ${
                      exportFormat === format.value ? "ring-2 ring-primary bg-accent/30" : "bg-card/50 border-border/50"
                    }`}
                    onClick={() => setExportFormat(format.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {format.icon}
                        <div>
                          <h4 className="font-medium">{format.label}</h4>
                          <p className="text-sm text-muted-foreground">{format.description}</p>
                        </div>
                      </div>
                      {exportFormat === format.value && (
                        <Badge variant="default" className="bg-primary">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {exportFormat !== "pdf" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Export Size</Label>
                  <Select value={exportSize} onValueChange={setExportSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {exportSizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label} ({size.dimensions})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quality</Label>
                  <Select value={exportQuality} onValueChange={setExportQuality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Quality</SelectItem>
                      <SelectItem value="medium">Medium Quality</SelectItem>
                      <SelectItem value="low">Low Quality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {isExporting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Exporting...</span>
                  <span>{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} className="w-full" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button onClick={exportAsImage} disabled={isExporting} className="flex-1">
                <FileImage className="w-4 h-4 mr-2" />
                Export Image
              </Button>
              <Button onClick={exportAsVCard} variant="outline" disabled={isExporting}>
                <Smartphone className="w-4 h-4 mr-2" />
                Export vCard
              </Button>
              <Button onClick={exportAsJSON} variant="outline" disabled={isExporting}>
                <FileText className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="share" className="space-y-6">
            <div className="space-y-4">
              <Label>Shareable Link</Label>
              <div className="flex space-x-2">
                <div className="flex-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-center space-x-2">
                    <Link className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono">{cardUrl}</span>
                  </div>
                </div>
                <Button variant="outline" onClick={copyShareableLink}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Quick Share</h4>
                    <p className="text-sm text-muted-foreground">Share via native sharing</p>
                  </div>
                </div>
                <Button onClick={shareCard} className="w-full bg-blue-500 hover:bg-blue-600">
                  Share Card
                </Button>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Share</h4>
                    <p className="text-sm text-muted-foreground">Send via email</p>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    window.open(
                      `mailto:?subject=${encodeURIComponent(`${cardData.name}'s Digital Business Card`)}&body=${encodeURIComponent(`Check out ${cardData.name}'s digital business card: ${cardUrl}`)}`,
                    )
                  }
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  Send Email
                </Button>
              </Card>
            </div>

            <div className="space-y-3">
              <Label>Social Media Sharing</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${cardData.name}'s digital business card`)}&url=${encodeURIComponent(cardUrl)}`,
                    )
                  }
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cardUrl)}`)
                  }
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}`)
                  }
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(`Check out ${cardData.name}'s digital business card: ${cardUrl}`)}`,
                    )
                  }
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  WhatsApp
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
