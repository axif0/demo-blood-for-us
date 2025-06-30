"use client"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { StatsSection } from "@/components/landing/stats-section"
import { LeaderboardSection } from "@/components/landing/leaderboard-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { useRouter } from "next/navigation"
import HospitalSection from "@/components/landing/hospital-section"

export default function Home() {
  const router = useRouter()
  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault()

    const targetElement = document.getElementById(id)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      router.push(`/#${id}`)
    }
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header handleScroll={handleScroll} />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <HospitalSection />
        <LeaderboardSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
      <Footer handleScroll={handleScroll} />
    </div>
  )
}
