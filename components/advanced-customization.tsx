"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type, Layout, Sparkles } from "lucide-react";

interface CustomizationProps {
  cardData: any;
  onUpdateCardData: (field: string, value: any) => void;
}

const CONFIGS = {
  fontFamilies: [
    { name: "Inter", value: "font-sans", preview: "Modern & Clean" },
    {
      name: "Playfair Display",
      value: "font-serif",
      preview: "Elegant & Classic",
    },
    {
      name: "JetBrains Mono",
      value: "font-mono",
      preview: "Technical & Modern",
    },
    { name: "Poppins", value: "font-poppins", preview: "Friendly & Rounded" },
    {
      name: "Roboto",
      value: "font-roboto",
      preview: "Professional & Readable",
    },
  ],
  gradientPresets: [
    {
      name: "Ocean",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      name: "Sunset",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      name: "Forest",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      name: "Aurora",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
    {
      name: "Cosmic",
      gradient: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
    },
  ],
  shadowPresets: [
    { name: "None", value: "shadow-none" },
    { name: "Subtle", value: "shadow-sm" },
    { name: "Medium", value: "shadow-md" },
    { name: "Large", value: "shadow-lg" },
    { name: "Extra Large", value: "shadow-xl" },
    { name: "Glow", value: "shadow-2xl shadow-primary/25" },
  ],
  cardWidths: [
    { value: "small", label: "Small (320px)" },
    { value: "medium", label: "Medium (400px)" },
    { value: "large", label: "Large (480px)" },
    { value: "full", label: "Full Width" },
  ],
  aspectRatios: [
    { value: "auto", label: "Auto" },
    { value: "square", label: "Square (1:1)" },
    { value: "portrait", label: "Portrait (3:4)" },
    { value: "landscape", label: "Landscape (4:3)" },
    { value: "business", label: "Business Card (1.75:1)" },
  ],
} as const;

interface CustomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

function CustomSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: CustomSliderProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
      <div className="text-xs text-muted-foreground text-center">
        {value}
        {unit}
      </div>
    </div>
  );
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function CustomSelect({ label, value, onChange, options }: CustomSelectProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function AdvancedCustomization({
  cardData,
  onUpdateCardData,
}: CustomizationProps) {
  const [activeTab, setActiveTab] = useState("colors");

  const handleUpdate = useCallback(
    (field: string, value: any) => {
      onUpdateCardData(field, value);
    },
    [onUpdateCardData]
  );

  const getDefault = useCallback(
    (key: string, defaultValue: any) => {
      return cardData[key] ?? defaultValue;
    },
    [cardData]
  );

  return (
    <Card className="p-6 backdrop-blur-sm bg-card/50 border-border/50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {[
            { value: "colors", label: "Colors", icon: Palette },
            { value: "typography", label: "Typography", icon: Type },
            { value: "layout", label: "Layout", icon: Layout },
            { value: "effects", label: "Effects", icon: Sparkles },
          ].map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="colors" className="space-y-6 mt-6">
          <div className="space-y-4">
            <Label>Gradient Backgrounds</Label>
            <div className="grid grid-cols-5 gap-3">
              {CONFIGS.gradientPresets.map((preset) => (
                <button
                  key={preset.name}
                  className={`flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all ${
                    cardData.backgroundGradient === preset.gradient
                      ? "border-primary bg-primary/10"
                      : "border-border/50 hover:bg-accent/50"
                  }`}
                  onClick={() =>
                    handleUpdate("backgroundGradient", preset.gradient)
                  }
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ background: preset.gradient }}
                  />
                  <span className="text-xs font-medium">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomSlider
              label="Primary Opacity"
              value={getDefault("primaryOpacity", 100)}
              onChange={(v) => handleUpdate("primaryOpacity", v)}
              min={0}
              max={100}
              step={5}
              unit="%"
            />
            <CustomSlider
              label="Background Blur"
              value={getDefault("backgroundBlur", 0)}
              onChange={(v) => handleUpdate("backgroundBlur", v)}
              min={0}
              max={20}
              step={1}
              unit="px"
            />
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6 mt-6">
          <div className="space-y-4">
            <Label>Font Family</Label>
            <div className="grid gap-3">
              {CONFIGS.fontFamilies.map((font) => (
                <Card
                  key={font.value}
                  className={`p-4 cursor-pointer transition-all ${
                    cardData.fontFamily === font.value
                      ? "ring-2 ring-primary bg-accent/30"
                      : "bg-card/50 border-border/50 hover:bg-accent/50"
                  }`}
                  onClick={() => handleUpdate("fontFamily", font.value)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{font.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {font.preview}
                      </p>
                    </div>
                    <div className={`text-lg ${font.value}`}>Aa</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomSlider
              label="Name Font Size"
              value={getDefault("nameFontSize", 24)}
              onChange={(v) => handleUpdate("nameFontSize", v)}
              min={16}
              max={48}
              step={2}
              unit="px"
            />
            <CustomSlider
              label="Title Font Size"
              value={getDefault("titleFontSize", 16)}
              onChange={(v) => handleUpdate("titleFontSize", v)}
              min={12}
              max={24}
              step={1}
              unit="px"
            />
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <CustomSelect
              label="Card Width"
              value={getDefault("cardWidth", "medium")}
              onChange={(v) => handleUpdate("cardWidth", v)}
              options={CONFIGS.cardWidths}
            />
            <CustomSelect
              label="Aspect Ratio"
              value={getDefault("aspectRatio", "auto")}
              onChange={(v) => handleUpdate("aspectRatio", v)}
              options={CONFIGS.aspectRatios}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <CustomSlider
              label="Padding"
              value={getDefault("padding", 24)}
              onChange={(v) => handleUpdate("padding", v)}
              min={8}
              max={48}
              step={4}
              unit="px"
            />
            <CustomSlider
              label="Border Radius"
              value={getDefault("borderRadius", 12)}
              onChange={(v) => handleUpdate("borderRadius", v)}
              min={0}
              max={32}
              step={2}
              unit="px"
            />
            <CustomSlider
              label="Border Width"
              value={getDefault("borderWidth", 0)}
              onChange={(v) => handleUpdate("borderWidth", v)}
              min={0}
              max={8}
              step={1}
              unit="px"
            />
          </div>
        </TabsContent>

        <TabsContent value="effects" className="space-y-6 mt-6">
          <div className="space-y-4">
            <Label>Shadow Style</Label>
            <div className="grid grid-cols-3 gap-3">
              {CONFIGS.shadowPresets.map((shadow) => (
                <Card
                  key={shadow.name}
                  className={`p-4 cursor-pointer transition-all ${
                    cardData.shadowStyle === shadow.value
                      ? "ring-2 ring-primary bg-accent/30"
                      : "bg-card/50 border-border/50 hover:bg-accent/50"
                  }`}
                  onClick={() => handleUpdate("shadowStyle", shadow.value)}
                >
                  <div className="text-center">
                    <div
                      className={`w-8 h-8 bg-primary/20 rounded mx-auto mb-2 ${shadow.value}`}
                    />
                    <span className="text-sm font-medium">{shadow.name}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomSlider
              label="Hover Scale"
              value={getDefault("hoverScale", 105)}
              onChange={(v) => handleUpdate("hoverScale", v)}
              min={100}
              max={110}
              step={1}
              unit="%"
            />
            <CustomSlider
              label="Animation Duration"
              value={getDefault("animationDuration", 300)}
              onChange={(v) => handleUpdate("animationDuration", v)}
              min={100}
              max={1000}
              step={50}
              unit="ms"
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
