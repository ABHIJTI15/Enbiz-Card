import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, MessageCircle, Users, Heart, Star, GitFork, ExternalLink } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Join the{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">CardGen</span>{" "}
            Community
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
            Connect with developers, designers, and professionals who are building the future of digital networking.
            Contribute, learn, and grow together.
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-8 h-8" />, number: "5K+", label: "Community Members" },
              { icon: <Star className="w-8 h-8" />, number: "2.5K", label: "GitHub Stars" },
              { icon: <GitFork className="w-8 h-8" />, number: "400+", label: "Forks" },
              { icon: <Heart className="w-8 h-8" />, number: "50+", label: "Contributors" },
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center backdrop-blur-sm bg-card/50 border-border/50">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-500 mx-auto">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Contribute */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ways to Contribute</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              There are many ways to get involved and help make CardGen better for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Github className="w-8 h-8" />,
                title: "Code Contributions",
                description:
                  "Help us build new features, fix bugs, and improve the codebase. All skill levels welcome!",
                action: "View Issues",
                link: "#",
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Bug Reports & Ideas",
                description: "Found a bug or have a feature idea? Let us know through GitHub issues or discussions.",
                action: "Report Bug",
                link: "#",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Support",
                description: "Help other users by answering questions and sharing your knowledge in our community.",
                action: "Join Discord",
                link: "#",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Template Design",
                description:
                  "Create beautiful templates that others can use. Share your design skills with the community.",
                action: "Submit Template",
                link: "#",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Documentation",
                description: "Help improve our documentation, write tutorials, or create guides for new users.",
                action: "Edit Docs",
                link: "#",
              },
              {
                icon: <ExternalLink className="w-8 h-8" />,
                title: "Spread the Word",
                description: "Share CardGen with your network, write blog posts, or create content about the project.",
                action: "Share Now",
                link: "#",
              },
            ].map((way, index) => (
              <Card
                key={index}
                className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-500">
                  {way.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{way.title}</h3>
                <p className="text-muted-foreground mb-4">{way.description}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  {way.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Community Guidelines</h2>
            <p className="text-xl text-muted-foreground">
              Our community is built on respect, collaboration, and shared learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Be Respectful",
                description:
                  "Treat all community members with respect and kindness. We welcome people of all backgrounds and experience levels.",
              },
              {
                title: "Help Others Learn",
                description: "Share your knowledge and help newcomers. Remember, we were all beginners once.",
              },
              {
                title: "Stay On Topic",
                description:
                  "Keep discussions relevant to CardGen and digital business cards. Off-topic conversations should move to appropriate channels.",
              },
              {
                title: "Give Credit",
                description:
                  "When sharing code, designs, or ideas from others, always give proper attribution and credit.",
              },
            ].map((guideline, index) => (
              <Card key={index} className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
                <h3 className="text-lg font-semibold mb-3">{guideline.title}</h3>
                <p className="text-muted-foreground">{guideline.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with like-minded individuals and help shape the future of digital networking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
            <Button variant="outline" size="lg" className="backdrop-blur-sm bg-transparent">
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Discord
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
