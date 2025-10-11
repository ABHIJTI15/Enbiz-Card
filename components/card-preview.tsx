import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Globe, Linkedin, Twitter, Instagram } from "lucide-react"

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

interface CardPreviewProps {
  cardData: CardData
}

export function CardPreview({ cardData }: CardPreviewProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const cardStyle = {
    background: cardData.backgroundGradient || cardData.backgroundColor,
    color: cardData.textColor,
    padding: `${cardData.padding}px`,
    borderRadius: `${cardData.borderRadius}px`,
    borderWidth: `${cardData.borderWidth}px`,
    borderColor: cardData.primaryColor,
    borderStyle: cardData.borderWidth > 0 ? "solid" : "none",
    transform: `scale(${cardData.hoverScale / 100})`,
    transition: `all ${cardData.animationDuration}ms ease`,
    backdropFilter: cardData.backgroundBlur > 0 ? `blur(${cardData.backgroundBlur}px)` : "none",
    width: cardData.cardWidth === "small" ? "280px" : cardData.cardWidth === "large" ? "400px" : "320px",
    aspectRatio: cardData.aspectRatio === "square" ? "1/1" : cardData.aspectRatio === "wide" ? "16/9" : "auto",
  }

  const nameStyle = {
    fontSize: `${cardData.nameFontSize}px`,
    fontFamily:
      cardData.fontFamily === "font-serif" ? "serif" : cardData.fontFamily === "font-mono" ? "monospace" : "sans-serif",
  }

  const titleStyle = {
    fontSize: `${cardData.titleFontSize}px`,
    fontFamily:
      cardData.fontFamily === "font-serif" ? "serif" : cardData.fontFamily === "font-mono" ? "monospace" : "sans-serif",
  }

  const primaryColorWithOpacity = `${cardData.primaryColor}${Math.round(cardData.primaryOpacity * 2.55)
    .toString(16)
    .padStart(2, "0")}`

  const renderModernTemplate = () => (
    <Card
      className={`w-full max-w-md mx-auto shadow-lg transition-all duration-300 hover:shadow-xl ${cardData.shadowStyle}`}
      style={cardStyle}
    >
      <div className="flex items-start space-x-4 mb-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md"
          style={{ backgroundColor: primaryColorWithOpacity }}
        >
          {getInitials(cardData.name)}
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-1" style={{ ...nameStyle, color: cardData.textColor }}>
            {cardData.name}
          </h3>
          <p className="opacity-80 mb-1" style={titleStyle}>
            {cardData.title}
          </p>
          {cardData.company && <p className="text-sm opacity-70">{cardData.company}</p>}
        </div>
      </div>

      {cardData.bio && (
        <p className="text-sm opacity-80 mb-4 leading-relaxed" style={{ color: cardData.textColor }}>
          {cardData.bio}
        </p>
      )}

      <div className="space-y-3">
        {cardData.email && (
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 opacity-70" style={{ color: cardData.primaryColor }} />
            <span className="text-sm">{cardData.email}</span>
          </div>
        )}
        {cardData.phone && (
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 opacity-70" style={{ color: cardData.primaryColor }} />
            <span className="text-sm">{cardData.phone}</span>
          </div>
        )}
        {cardData.website && (
          <div className="flex items-center space-x-3">
            <Globe className="w-4 h-4 opacity-70" style={{ color: cardData.primaryColor }} />
            <span className="text-sm">{cardData.website}</span>
          </div>
        )}
      </div>

      {(cardData.linkedin || cardData.twitter || cardData.instagram) && (
        <div className="flex space-x-3 mt-4 pt-4 border-t border-current/10">
          {cardData.linkedin && (
            <Button variant="ghost" size="sm" className="p-2">
              <Linkedin className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            </Button>
          )}
          {cardData.twitter && (
            <Button variant="ghost" size="sm" className="p-2">
              <Twitter className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            </Button>
          )}
          {cardData.instagram && (
            <Button variant="ghost" size="sm" className="p-2">
              <Instagram className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            </Button>
          )}
        </div>
      )}
    </Card>
  )

  const renderMinimalTemplate = () => (
    <Card
      className="w-full max-w-md mx-auto p-8 shadow-lg transition-all duration-300 hover:shadow-xl text-center"
      style={{ background: cardData.backgroundColor, color: cardData.textColor }}
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-md"
        style={{ background: cardData.primaryColor }}
      >
        {getInitials(cardData.name)}
      </div>
      <h3 className="text-2xl font-bold mb-2" style={{ color: cardData.textColor }}>
        {cardData.name}
      </h3>
      <p className="text-sm opacity-80 mb-1">{cardData.title}</p>
      {cardData.company && <p className="text-sm opacity-70 mb-4">{cardData.company}</p>}

      {cardData.bio && (
        <p className="text-sm opacity-80 mb-6 leading-relaxed" style={{ color: cardData.textColor }}>
          {cardData.bio}
        </p>
      )}

      <div className="space-y-2 text-sm">
        {cardData.email && <div>{cardData.email}</div>}
        {cardData.phone && <div>{cardData.phone}</div>}
        {cardData.website && <div>{cardData.website}</div>}
      </div>

      {(cardData.linkedin || cardData.twitter || cardData.instagram) && (
        <div className="flex justify-center space-x-3 mt-6">
          {cardData.linkedin && (
            <Button variant="ghost" size="sm" className="p-2">
              <Linkedin className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            </Button>
          )}
          {cardData.twitter && (
            <Button variant="ghost" size="sm" className="p-2">
              <Twitter className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            </Button>
          )}
          {cardData.instagram && (
            <Button variant="ghost" size="sm" className="p-2">
              <Instagram className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            </Button>
          )}
        </div>
      )}
    </Card>
  )

  const renderCreativeTemplate = () => (
    <Card
      className="w-full max-w-md mx-auto shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden"
      style={{ background: cardData.backgroundColor }}
    >
      <div
        className="h-24 relative"
        style={{
          background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.primaryColor}dd)`,
        }}
      >
        <div className="absolute -bottom-8 left-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg border-4"
            style={{ background: cardData.primaryColor, borderColor: cardData.backgroundColor }}
          >
            {getInitials(cardData.name)}
          </div>
        </div>
      </div>
      <div className="p-6 pt-12">
        <h3 className="text-xl font-bold mb-1" style={{ ...nameStyle, color: cardData.textColor }}>
          {cardData.name}
        </h3>
        <p className="text-sm opacity-80 mb-1" style={titleStyle}>
          {cardData.title}
        </p>
        {cardData.company && <p className="text-sm opacity-70 mb-4">{cardData.company}</p>}

        {cardData.bio && (
          <p className="text-sm opacity-80 mb-4 leading-relaxed" style={{ color: cardData.textColor }}>
            {cardData.bio}
          </p>
        )}

        <div className="grid grid-cols-1 gap-2 text-sm">
          {cardData.email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-3 h-3" style={{ color: cardData.primaryColor }} />
              <span>{cardData.email}</span>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3" style={{ color: cardData.primaryColor }} />
              <span>{cardData.phone}</span>
            </div>
          )}
          {cardData.website && (
            <div className="flex items-center space-x-2">
              <Globe className="w-3 h-3" style={{ color: cardData.primaryColor }} />
              <span>{cardData.website}</span>
            </div>
          )}
        </div>

        {(cardData.linkedin || cardData.twitter || cardData.instagram) && (
          <div className="flex space-x-2 mt-4">
            {cardData.linkedin && (
              <Button variant="ghost" size="sm" className="p-2">
                <Linkedin className="w-4 h-4" style={{ color: cardData.primaryColor }} />
              </Button>
            )}
            {cardData.twitter && (
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" style={{ color: cardData.primaryColor }} />
              </Button>
            )}
            {cardData.instagram && (
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-4 h-4" style={{ color: cardData.primaryColor }} />
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  )

  const renderCorporateTemplate = () => (
    <Card
      className="w-full max-w-md mx-auto p-6 shadow-lg transition-all duration-300 hover:shadow-xl border-l-4"
      style={{
        background: cardData.backgroundColor,
        color: cardData.textColor,
        borderLeftColor: cardData.primaryColor,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1" style={{ ...nameStyle, color: cardData.textColor }}>
            {cardData.name}
          </h3>
          <p className="text-sm font-medium mb-1" style={{ color: primaryColorWithOpacity }}>
            {cardData.title}
          </p>
          {cardData.company && <p className="text-sm opacity-70">{cardData.company}</p>}
        </div>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ background: primaryColorWithOpacity }}
        >
          {getInitials(cardData.name)}
        </div>
      </div>

      {cardData.bio && (
        <p className="text-sm opacity-80 mb-4 leading-relaxed" style={{ color: cardData.textColor }}>
          {cardData.bio}
        </p>
      )}

      <div className="space-y-2 text-sm">
        {cardData.email && (
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            <span>{cardData.email}</span>
          </div>
        )}
        {cardData.phone && (
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            <span>{cardData.phone}</span>
          </div>
        )}
        {cardData.website && (
          <div className="flex items-center space-x-3">
            <Globe className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            <span>{cardData.website}</span>
          </div>
        )}
      </div>

      {(cardData.linkedin || cardData.twitter || cardData.instagram) && (
        <div className="flex space-x-2 mt-4 pt-4 border-t border-current/10">
          {cardData.linkedin && (
            <Button variant="ghost" size="sm" className="p-2">
              <Linkedin className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            </Button>
          )}
          {cardData.twitter && (
            <Button variant="ghost" size="sm" className="p-2">
              <Twitter className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            </Button>
          )}
          {cardData.instagram && (
            <Button variant="ghost" size="sm" className="p-2">
              <Instagram className="w-4 h-4" style={{ color: cardData.primaryColor }} />
            </Button>
          )}
        </div>
      )}
    </Card>
  )

  const renderTemplate = () => {
    switch (cardData.template) {
      case "minimal":
        return renderMinimalTemplate()
      case "creative":
        return renderCreativeTemplate()
      case "corporate":
        return renderCorporateTemplate()
      default:
        return renderModernTemplate()
    }
  }

  return <div className="w-full">{renderTemplate()}</div>
}
