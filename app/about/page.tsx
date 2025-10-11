import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Heart, Users, Code, Zap, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            About{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">CardGen</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
            We're on a mission to revolutionize digital networking by making professional business card creation
            accessible, beautiful, and completely free for everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                In today's digital world, networking shouldn't be limited by physical constraints. CardGen was born from
                the idea that everyone deserves access to professional, beautiful digital business cards without the
                barriers of cost, complexity, or design skills.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We believe in the power of open source software to democratize tools that were once exclusive to those
                with resources. By making CardGen completely free and open source, we're empowering individuals and
                businesses worldwide to create stunning digital presence.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Link href="/generator">Start Creating</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Users className="w-8 h-8" />, title: "10K+", subtitle: "Happy Users" },
                { icon: <Code className="w-8 h-8" />, title: "100%", subtitle: "Open Source" },
                { icon: <Zap className="w-8 h-8" />, title: "50+", subtitle: "Templates" },
                { icon: <Globe className="w-8 h-8" />, title: "24/7", subtitle: "Available" },
              ].map((stat, index) => (
                <Card key={index} className="p-6 text-center backdrop-blur-sm bg-card/50 border-border/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-500 mx-auto">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.title}</div>
                  <div className="text-sm text-muted-foreground">{stat.subtitle}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at CardGen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Open Source First",
                description:
                  "We believe in transparency, community collaboration, and giving back to the developer ecosystem.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "User-Centric Design",
                description:
                  "Every feature is designed with the user in mind, prioritizing simplicity and effectiveness.",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Innovation",
                description: "We constantly push the boundaries of what's possible in digital business card creation.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="p-8 backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-500">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <Github className="w-16 h-16 mx-auto mb-6 text-blue-500" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Built in the Open</h2>
          <p className="text-xl text-muted-foreground mb-8">
            CardGen is completely open source. Contribute, customize, or learn from our codebase. Together, we're
            building the future of digital networking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="backdrop-blur-sm bg-transparent">
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Link href="/community">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
