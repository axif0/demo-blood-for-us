"use client"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import Leaderboard from "@/components/leaderboard"
import { useRouter } from "next/navigation"

export default function LeaderboardPage() {
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
    <div>
      <Header handleScroll={handleScroll} />
      <Leaderboard />
      <Footer handleScroll={handleScroll} />
    </div>
  )
}
