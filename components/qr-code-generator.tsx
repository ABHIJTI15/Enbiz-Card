"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Copy, Share2, QrCode, Link, Smartphone, Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QRCodeGeneratorProps {
  cardData: any
  cardUrl?: string
}

export function QRCodeGenerator({ cardData, cardUrl = "https://cardgen.app/card/123" }: QRCodeGeneratorProps) {
  const [qrType, setQrType] = useState("url")
  const [qrSize, setQrSize] = useState(200)
  const [qrColor, setQrColor] = useState("#000000")
  const [qrBgColor, setQrBgColor] = useState("#ffffff")
  const [qrData, setQrData] = useState(cardUrl)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  // Generate vCard data
  const generateVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${cardData.name}`,
      `TITLE:${cardData.title}`,
      `ORG:${cardData.company}`,
      `EMAIL:${cardData.email}`,
      `TEL:${cardData.phone}`,
      `URL:${cardData.website}`,
      `NOTE:${cardData.bio}`,
      "END:VCARD",
    ].join("\n")
    return vcard
  }

  // Generate QR code data based on type
  const getQRData = () => {
    switch (qrType) {
      case "vcard":
        return generateVCard()
      case "email":
        return `mailto:${cardData.email}?subject=Let's connect&body=Hi ${cardData.name}, I'd like to connect with you.`
      case "phone":
        return `tel:${cardData.phone}`
      case "sms":
        return `sms:${cardData.phone}?body=Hi ${cardData.name}, I got your contact from your digital business card.`
      case "whatsapp":
        return `https://wa.me/${cardData.phone.replace(/[^\d]/g, "")}?text=Hi ${cardData.name}, I'd like to connect with you.`
      case "linkedin":
        return `https://linkedin.com/in/${cardData.linkedin}`
      case "twitter":
        return `https://twitter.com/${cardData.twitter}`
      default:
        return cardUrl
    }
  }

  // Simple QR code generator (in a real app, you'd use a library like qrcode)
  const generateQRCode = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = qrSize
    canvas.height = qrSize

    // Clear canvas
    ctx.fillStyle = qrBgColor
    ctx.fillRect(0, 0, qrSize, qrSize)

    // Generate a simple pattern (in production, use a proper QR library)
    const data = getQRData()
    const moduleSize = qrSize / 25

    ctx.fillStyle = qrColor

    // Create a simple pattern based on data hash
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash + data.charCodeAt(i)) & 0xffffffff
    }

    // Generate pattern
    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        const seed = (hash + row * 25 + col) % 1000
        if (seed % 3 === 0) {
          ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
        }
      }
    }

    // Add corner squares (QR code markers)
    const markerSize = moduleSize * 7
    const positions = [
      [0, 0],
      [18 * moduleSize, 0],
      [0, 18 * moduleSize],
    ]

    positions.forEach(([x, y]) => {
      // Outer square
      ctx.fillStyle = qrColor
      ctx.fillRect(x, y, markerSize, markerSize)

      // Inner white square
      ctx.fillStyle = qrBgColor
      ctx.fillRect(x + moduleSize, y + moduleSize, markerSize - 2 * moduleSize, markerSize - 2 * moduleSize)

      // Center square
      ctx.fillStyle = qrColor
      ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, markerSize - 4 * moduleSize, markerSize - 4 * moduleSize)
    })
  }

  useEffect(() => {
    generateQRCode()
  }, [qrType, qrSize, qrColor, qrBgColor, cardData])

  useEffect(() => {
    setQrData(getQRData())
  }, [qrType, cardData])

  const downloadQRCode = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = `qr-code-${cardData.name.replace(/\s+/g, "-").toLowerCase()}.png`
    link.href = canvas.toDataURL()
    link.click()

    toast({
      title: "QR Code Downloaded",
      description: "Your QR code has been saved to your device.",
    })
  }

  const copyQRData = async () => {
    try {
      await navigator.clipboard.writeText(qrData)
      toast({
        title: "Copied to Clipboard",
        description: "QR code data has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const shareQRCode = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return

        const file = new File([blob], `qr-code-${cardData.name}.png`, { type: "image/png" })

        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${cardData.name}'s Digital Business Card`,
            text: `Connect with ${cardData.name}`,
            files: [file],
          })
        } else {
          // Fallback: copy to clipboard
          await copyQRData()
        }
      })
    } catch (err) {
      toast({
        title: "Share Failed",
        description: "Unable to share QR code. Please try downloading instead.",
        variant: "destructive",
      })
    }
  }

  const qrTypes = [
    { value: "url", label: "Card URL", icon: <Link className="w-4 h-4" /> },
    { value: "vcard", label: "vCard Contact", icon: <Smartphone className="w-4 h-4" /> },
    { value: "email", label: "Email", icon: <Mail className="w-4 h-4" /> },
    { value: "phone", label: "Phone Call", icon: <Phone className="w-4 h-4" /> },
    { value: "sms", label: "SMS", icon: <Smartphone className="w-4 h-4" /> },
    { value: "whatsapp", label: "WhatsApp", icon: <Smartphone className="w-4 h-4" /> },
    { value: "linkedin", label: "LinkedIn", icon: <Link className="w-4 h-4" /> },
    { value: "twitter", label: "Twitter", icon: <Link className="w-4 h-4" /> },
  ]

  return (
    <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            QR Code Generator
          </h3>
          <Badge variant="secondary">Interactive</Badge>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <div className="space-y-2">
              <Label>QR Code Type</Label>
              <Select value={qrType} onValueChange={setQrType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {qrTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="border border-border/50 rounded-lg shadow-sm"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center pb-4">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary" onClick={downloadQRCode}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={shareQRCode}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>QR Code Data</Label>
              <div className="flex space-x-2">
                <Input value={qrData} readOnly className="font-mono text-sm" />
                <Button variant="outline" size="sm" onClick={copyQRData}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Size</Label>
                <Select value={qrSize.toString()} onValueChange={(value) => setQrSize(Number.parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="150">Small (150px)</SelectItem>
                    <SelectItem value="200">Medium (200px)</SelectItem>
                    <SelectItem value="300">Large (300px)</SelectItem>
                    <SelectItem value="400">Extra Large (400px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Format</Label>
                <Select defaultValue="png">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                    <SelectItem value="svg">SVG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Foreground Color</Label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-12 h-10 p-1 rounded"
                  />
                  <Input
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex space-x-2">
                  <Input
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="w-12 h-10 p-1 rounded"
                  />
                  <Input
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-2">
          <Button onClick={downloadQRCode} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
          <Button variant="outline" onClick={shareQRCode}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
