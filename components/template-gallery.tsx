"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Star, Download } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: string
  preview: string
  isPremium: boolean
  rating: number
  downloads: number
}

interface TemplateGalleryProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
}

export function TemplateGallery({ selectedTemplate, onSelectTemplate }: TemplateGalleryProps) {
  const templates: Template[] = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech professionals",
      category: "Professional",
      preview: "/modern-business-card.png",
      isPremium: false,
      rating: 4.8,
      downloads: 12500,
    },
    {
      id: "minimal",
      name: "Minimal Elegance",
      description: "Simple and elegant layout with focus on typography",
      category: "Minimal",
      preview: "/minimal-business-card.png",
      isPremium: false,
      rating: 4.9,
      downloads: 8900,
    },
    {
      id: "creative",
      name: "Creative Gradient",
      description: "Bold and artistic style with gradient backgrounds",
      category: "Creative",
      preview: "/creative-gradient-business-card.jpg",
      isPremium: false,
      rating: 4.7,
      downloads: 6700,
    },
    {
      id: "corporate",
      name: "Corporate Classic",
      description: "Traditional business look with professional styling",
      category: "Corporate",
      preview: "/corporate-business-card.jpg",
      isPremium: false,
      rating: 4.6,
      downloads: 15200,
    },
    {
      id: "tech",
      name: "Tech Innovator",
      description: "Futuristic design with geometric elements",
      category: "Technology",
      preview: "/tech-futuristic-business-card.jpg",
      isPremium: true,
      rating: 4.9,
      downloads: 3400,
    },
    {
      id: "artistic",
      name: "Artistic Flair",
      description: "Creative design with artistic elements and bold colors",
      category: "Creative",
      preview: "/artistic-business-card.jpg",
      isPremium: true,
      rating: 4.8,
      downloads: 2100,
    },
    {
      id: "luxury",
      name: "Luxury Gold",
      description: "Premium design with gold accents and elegant typography",
      category: "Luxury",
      preview: "/luxury-gold-business-card.jpg",
      isPremium: true,
      rating: 4.9,
      downloads: 1800,
    },
    {
      id: "startup",
      name: "Startup Vibes",
      description: "Dynamic design perfect for startups and entrepreneurs",
      category: "Startup",
      preview: "/startup-business-card.jpg",
      isPremium: false,
      rating: 4.7,
      downloads: 5600,
    },
  ]

  const categories = ["All", "Professional", "Creative", "Corporate", "Technology", "Luxury", "Startup", "Minimal"]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button key={category} variant="outline" size="sm" className="rounded-full bg-transparent">
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedTemplate === template.id
                ? "ring-2 ring-primary bg-accent/30"
                : "bg-card/50 border-border/50 hover:bg-card/80"
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={template.preview || "/placeholder.svg"}
                alt={template.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm text-white border-white/20"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                  {template.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">Premium</Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{template.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Download className="w-3 h-3" />
                  <span>{template.downloads.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
