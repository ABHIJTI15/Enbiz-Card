"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Type, Layout, Sparkles } from "lucide-react"

interface CustomizationProps {
  cardData: any
  onUpdateCardData: (field: string, value: any) => void
}

export function AdvancedCustomization({ cardData, onUpdateCardData }: CustomizationProps) {
  const [activeTab, setActiveTab] = useState("colors")

  const fontFamilies = [
    { name: "Inter", value: "font-sans", preview: "Modern & Clean" },
    { name: "Playfair Display", value: "font-serif", preview: "Elegant & Classic" },
    { name: "JetBrains Mono", value: "font-mono", preview: "Technical & Modern" },
    { name: "Poppins", value: "font-poppins", preview: "Friendly & Rounded" },
    { name: "Roboto", value: "font-roboto", preview: "Professional & Readable" },
  ]

  const gradientPresets = [
    { name: "Ocean", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "Sunset", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { name: "Forest", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { name: "Aurora", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
    { name: "Cosmic", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  ]

  const shadowPresets = [
    { name: "None", value: "shadow-none" },
    { name: "Subtle", value: "shadow-sm" },
    { name: "Medium", value: "shadow-md" },
    { name: "Large", value: "shadow-lg" },
    { name: "Extra Large", value: "shadow-xl" },
    { name: "Glow", value: "shadow-2xl shadow-primary/25" },
  ]

  return (
    <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="effects" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Effects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6 mt-6">
          <div className="space-y-4">
            <Label>Gradient Backgrounds</Label>
            <div className="grid grid-cols-5 gap-3">
              {gradientPresets.map((preset) => (
                <button
                  key={preset.name}
                  className="flex flex-col items-center space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors"
                  onClick={() => onUpdateCardData("backgroundGradient", preset.gradient)}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ background: preset.gradient }}
                  ></div>
                  <span className="text-xs font-medium">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Color Opacity</Label>
              <Slider
                value={[cardData.primaryOpacity || 100]}
                onValueChange={(value) => onUpdateCardData("primaryOpacity", value[0])}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-center">{cardData.primaryOpacity || 100}%</div>
            </div>
            <div className="space-y-2">
              <Label>Background Blur</Label>
              <Slider
                value={[cardData.backgroundBlur || 0]}
                onValueChange={(value) => onUpdateCardData("backgroundBlur", value[0])}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-center">{cardData.backgroundBlur || 0}px</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6 mt-6">
          <div className="space-y-4">
            <Label>Font Family</Label>
            <div className="grid gap-3">
              {fontFamilies.map((font) => (
                <Card
                  key={font.value}
                  className={`p-4 cursor-pointer transition-all hover:bg-accent/50 ${
                    cardData.fontFamily === font.value
                      ? "ring-2 ring-primary bg-accent/30"
                      : "bg-card/50 border-border/50"
                  }`}
                  onClick={() => onUpdateCardData("fontFamily", font.value)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{font.name}</h4>
                      <p className="text-sm text-muted-foreground">{font.preview}</p>
                    </div>
                    <div className={`text-lg ${font.value}`}>Aa</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name Font Size</Label>
              <Slider
                value={[cardData.nameFontSize || 24]}
                onValueChange={(value) => onUpdateCardData("nameFontSize", value[0])}
                min={16}
                max={48}
                step={2}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-center">{cardData.nameFontSize || 24}px</div>
            </div>
            <div className="space-y-2">
              <Label>Title Font Size</Label>
              <Slider
                value={[cardData.titleFontSize || 16]}
                onValueChange={(value) => onUpdateCardData("titleFontSize", value[0])}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-center">{cardData.titleFontSize || 16}px</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Card Width</Label>
              <Select
                value={cardData.cardWidth || "medium"}
                onValueChange={(value) => onUpdateCardData("cardWidth", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (320px)</SelectItem>
                  <SelectItem value="medium">Medium (400px)</SelectItem>
                  <SelectItem value="large">Large (480px)</SelectItem>
                  <SelectItem value="full">Full Width</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Card Aspect Ratio</Label>
              <Select
                value={cardData.aspectRatio || "auto"}
                onValueChange={(value) => onUpdateCardData("aspectRatio", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="square">Square (1:1)</SelectItem>
                  <SelectItem value="portrait">Portrait (3:4)</SelectItem>
                  <SelectItem value="landscape">Landscape (4:3)</SelectItem>
                  <SelectItem value="business">Business Card (1.75:1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Padding</Label>
              <Slider
                value={[cardData.padding || 24]}
                onValueChange={(value) => onUpdateCardData("padding", value[0])}
                min={8}
                max={48}
                step={4}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-center">{cardData.padding || 24}px</div>
            </div>
            <div className="space-y-2">
              <Label>Border Radius</Label>
              <Slider
                value={[cardData.borderRadius || 12]}
                onValueChange={(value) => onUpdateCardData("borderRadius", value[0])}
                min={0}
                max={32}
                step={2}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-center">{cardData.borderRadius || 12}px</div>
            </div>
            <div className="space-y-2">
              <Label>Border Width</Label>
              <Slider
                value={[cardData.borderWidth || 0]}
                onValueChange={(value) => onUpdateCardData("borderWidth", value[0])}
                min={0}
                max={8}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-center">{cardData.borderWidth || 0}px</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="effects" className="space-y-6 mt-6">
          <div className="space-y-4">
            <Label>Shadow Style</Label>
            <div className="grid grid-cols-3 gap-3">
              {shadowPresets.map((shadow) => (
                <Card
                  key={shadow.name}
                  className={`p-4 cursor-pointer transition-all hover:bg-accent/50 ${
                    cardData.shadowStyle === shadow.value
                      ? "ring-2 ring-primary bg-accent/30"
                      : "bg-card/50 border-border/50"
                  }`}
                  onClick={() => onUpdateCardData("shadowStyle", shadow.value)}
                >
                  <div className="text-center">
                    <div className={`w-8 h-8 bg-primary/20 rounded mx-auto mb-2 ${shadow.value}`}></div>
                    <span className="text-sm font-medium">{shadow.name}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Hover Scale</Label>
              <Slider
                value={[cardData.hoverScale || 105]}
                onValueChange={(value) => onUpdateCardData("hoverScale", value[0])}
                min={100}
                max={110}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-center">{cardData.hoverScale || 105}%</div>
            </div>
            <div className="space-y-2">
              <Label>Animation Duration</Label>
              <Slider
                value={[cardData.animationDuration || 300]}
                onValueChange={(value) => onUpdateCardData("animationDuration", value[0])}
                min={100}
                max={1000}
                step={50}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-center">{cardData.animationDuration || 300}ms</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
