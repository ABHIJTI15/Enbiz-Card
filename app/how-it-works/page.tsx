import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Edit3, Eye, Share2, Download, QrCode, Palette } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            How{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">CardGen</span>{" "}
            Works
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
            Creating professional digital business cards has never been easier. Follow these simple steps to get your
            card ready in minutes.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Link href="/generator">
              Try It Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Edit3 className="w-8 h-8" />,
                title: "Enter Your Information",
                description:
                  "Fill in your personal and professional details including name, title, company, contact information, and social media links.",
                features: ["Personal details", "Contact information", "Social media links", "Professional bio"],
              },
              {
                step: "02",
                icon: <Palette className="w-8 h-8" />,
                title: "Choose & Customize",
                description:
                  "Select from 50+ professional templates and customize colors, fonts, layouts, and styling to match your brand.",
                features: ["50+ templates", "Custom colors", "Typography options", "Layout controls"],
              },
              {
                step: "03",
                icon: <Share2 className="w-8 h-8" />,
                title: "Export & Share",
                description:
                  "Download your card in multiple formats or share instantly via QR code, link, or social media platforms.",
                features: ["Multiple formats", "QR code generation", "Instant sharing", "Social media ready"],
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="p-8 backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300 relative"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step.step}
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-500">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to create professional digital business cards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Eye className="w-8 h-8" />,
                title: "Live Preview",
                description:
                  "See your changes in real-time as you build your card with instant updates and responsive preview.",
              },
              {
                icon: <QrCode className="w-8 h-8" />,
                title: "QR Code Generation",
                description: "Automatically generate QR codes for easy sharing and networking at events and meetings.",
              },
              {
                icon: <Download className="w-8 h-8" />,
                title: "Multiple Export Formats",
                description: "Export as vCard, PNG, PDF, SVG, or get a shareable URL for maximum compatibility.",
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Advanced Customization",
                description:
                  "Fine-tune every aspect of your card with advanced color, typography, and layout controls.",
              },
              {
                icon: <Share2 className="w-8 h-8" />,
                title: "Instant Sharing",
                description: "Share your card via link, QR code, email, or directly to social media platforms.",
              },
              {
                icon: <Edit3 className="w-8 h-8" />,
                title: "Drag & Drop Editor",
                description: "Intuitive drag-and-drop interface for rearranging elements and customizing layouts.",
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Create your professional digital business card in just a few minutes. No signup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Link href="/generator">
                Create Your Card
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="backdrop-blur-sm bg-transparent">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
