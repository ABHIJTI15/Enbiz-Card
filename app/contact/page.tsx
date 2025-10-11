"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageCircle, Github, Send, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
            Have questions, suggestions, or need help? We'd love to hear from you. Reach out through any of the channels
            below.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email Support",
                description: "Get help with technical issues or general questions",
                contact: "support@cardgen.dev",
                action: "Send Email",
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Community Chat",
                description: "Join our Discord for real-time discussions",
                contact: "discord.gg/cardgen",
                action: "Join Discord",
              },
              {
                icon: <Github className="w-8 h-8" />,
                title: "GitHub Issues",
                description: "Report bugs or request features",
                contact: "github.com/cardgen/issues",
                action: "Open Issue",
              },
            ].map((method, index) => (
              <Card
                key={index}
                className="p-6 backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-500 mx-auto">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                <p className="text-muted-foreground mb-4">{method.description}</p>
                <p className="text-sm font-mono text-blue-500 mb-4">{method.contact}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  {method.action}
                </Button>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you as soon as possible. For urgent technical issues,
                please use GitHub issues.
              </p>

              <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your question or feedback..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Other Information</h2>

              <div className="space-y-6">
                <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-blue-500">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Response Time</h3>
                      <p className="text-muted-foreground text-sm">
                        We typically respond to emails within 24-48 hours. For faster responses, try our Discord
                        community.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-blue-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Open Source Project</h3>
                      <p className="text-muted-foreground text-sm">
                        CardGen is a community-driven open source project. We're distributed globally and work
                        asynchronously.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-blue-500">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Contributing</h3>
                      <p className="text-muted-foreground text-sm">
                        Interested in contributing? Check out our GitHub repository for contribution guidelines and open
                        issues.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions about CardGen</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Is CardGen really free?",
                answer:
                  "Yes! CardGen is completely free and open source. You can use it without any limitations or hidden costs.",
              },
              {
                question: "Do I need to create an account?",
                answer:
                  "No account required! You can create and download your digital business cards immediately without signing up.",
              },
              {
                question: "Can I use my own branding?",
                answer:
                  "You can customize colors, fonts, layouts, and add your own logo to match your brand perfectly.",
              },
              {
                question: "What export formats are supported?",
                answer:
                  "We support PNG, JPG, PDF, SVG, vCard, and JSON formats. You can also get a shareable URL for your card.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
                <h3 className="font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
