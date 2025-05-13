"use client"

import { useId, useState } from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue.js" },
  { value: "react", label: "React" },
  { value: "ember", label: "Ember.js" },
  { value: "gatsby", label: "Gatsby" },
  { value: "eleventy", label: "Eleventy" },
  { value: "solid", label: "SolidJS" },
  { value: "preact", label: "Preact" },
  { value: "qwik", label: "Qwik" },
  { value: "alpine", label: "Alpine.js" },
  { value: "lit", label: "Lit" },
  { value: "meteor", label: "Meteor" },
  { value: "backbone", label: "Backbone.js" },
  { value: "jquery", label: "jQuery" },
  { value: "polymer", label: "Polymer" },
  { value: "aurelia", label: "Aurelia" },
  { value: "mithril", label: "Mithril" },
  { value: "marko", label: "Marko" },
  { value: "stimulus", label: "Stimulus" },
  { value: "hyperapp", label: "Hyperapp" },
  { value: "inferno", label: "Inferno" },
  { value: "riot", label: "Riot.js" },
  { value: "dojo", label: "Dojo" },
  { value: "knockout", label: "Knockout" },
  { value: "cycle", label: "Cycle.js" },
  { value: "choo", label: "Choo" },
  { value: "ractive", label: "Ractive" },
  { value: "stencil", label: "Stencil" },
  { value: "apprun", label: "AppRun" },
  { value: "dio", label: "DIO" },
  { value: "bobril", label: "Bobril" },
  { value: "crank", label: "Crank.js" },
  { value: "omi", label: "Omi" },
  { value: "quasar", label: "Quasar" },
  { value: "ionic", label: "Ionic" },
  { value: "capacitor", label: "Capacitor" },
  { value: "cordova", label: "Cordova" },
  { value: "nativescript", label: "NativeScript" },
  { value: "flutter", label: "Flutter" },
  { value: "xamarin", label: "Xamarin" },
  { value: "unity", label: "Unity" },
  { value: "godot", label: "Godot" },
  { value: "unreal", label: "Unreal Engine" },
  { value: "phaser", label: "Phaser" },
  { value: "pixi", label: "PixiJS" },
  { value: "babylon", label: "Babylon.js" },
  { value: "three", label: "Three.js" },
  { value: "d3", label: "D3.js" },
  { value: "chart", label: "Chart.js" },
  { value: "plotly", label: "Plotly" },
  { value: "highcharts", label: "Highcharts" },
  { value: "echarts", label: "ECharts" },
  { value: "leaflet", label: "Leaflet" },
  { value: "mapbox", label: "Mapbox" },
  { value: "cesium", label: "Cesium" },
  { value: "openlayers", label: "OpenLayers" },
  { value: "tensorflow", label: "TensorFlow.js" },
  { value: "brain", label: "Brain.js" },
  { value: "ml5", label: "ml5.js" },
  { value: "tone", label: "Tone.js" },
  { value: "howler", label: "Howler.js" },
  { value: "anime", label: "Anime.js" },
  { value: "gsap", label: "GSAP" },
  { value: "motion", label: "Motion One" },
  { value: "popmotion", label: "Popmotion" },
  { value: "velocity", label: "Velocity.js" },
  { value: "mo", label: "Mo.js" },
  { value: "vivus", label: "Vivus" },
  { value: "lottie", label: "Lottie" },
  { value: "scrollreveal", label: "ScrollReveal" },
  { value: "aos", label: "AOS" },
  { value: "parallax", label: "Parallax.js" },
  { value: "rellax", label: "Rellax" },
  { value: "impress", label: "Impress.js" },
  { value: "reveal", label: "Reveal.js" },
  { value: "deck", label: "Deck.js" },
  { value: "pdf", label: "PDF.js" },
  { value: "pdfkit", label: "PDFKit" },
  { value: "jspdf", label: "jsPDF" },
  { value: "fabric", label: "Fabric.js" },
  { value: "konva", label: "Konva" },
  { value: "paper", label: "Paper.js" },
  { value: "p5", label: "p5.js" },
  { value: "processing", label: "Processing.js" },
  { value: "raphael", label: "Raphael" },
  { value: "snap", label: "Snap.svg" },
  { value: "two", label: "Two.js" },
  { value: "zdog", label: "Zdog" },
  { value: "matter", label: "Matter.js" },
  { value: "box2d", label: "Box2D.js" },
  { value: "cannon", label: "Cannon.js" },
  { value: "ammo", label: "Ammo.js" },
  { value: "oimo", label: "Oimo.js" },
  { value: "physijs", label: "Physijs" },
]

interface SelectWithSearchProps {
  value?: string
  onChange?: (value: string) => void
}

export function SelectWithSearch({ value: externalValue, onChange }: SelectWithSearchProps) {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [internalValue, setInternalValue] = useState<string>(externalValue || "")

  // Use external value if provided
  const value = externalValue !== undefined ? externalValue : internalValue

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    setInternalValue(newValue)
    onChange?.(newValue)
    setOpen(false)
  }

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-white hover:bg-white border-neutral-200 w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] dark:bg-neutral-950 dark:hover:bg-neutral-950 dark:border-neutral-800"
          >
            <span className={cn("truncate", !value && "text-neutral-500 dark:text-neutral-400")}>
              {value ? frameworks.find((framework) => framework.value === value)?.label : "Select framework"}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-neutral-500/80 shrink-0 dark:text-neutral-400/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-neutral-200 w-full min-w-[var(--radix-popper-anchor-width)] p-0 dark:border-neutral-800"
          align="start"
          side="bottom"
          sideOffset={4}
          avoidCollisions={false}
          style={{ zIndex: 1000 }}
        >
          <Command>
            <CommandInput className="focus-visible:outline-none" placeholder="Search framework..." />
            <CommandList className="max-h-[200px] overflow-auto">
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem key={framework.value} value={framework.value} onSelect={handleSelect}>
                    {framework.label}
                    {value === framework.value && <CheckIcon size={16} className="ml-auto" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
