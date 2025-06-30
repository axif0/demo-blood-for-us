"use client"

import Link from "next/link"
import { HTMLAttributes, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  handleScroll: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => void
}
export function Header({ handleScroll }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src="/logo.png?height=32&width=32"
              alt="Blood For Us Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-[#B83227]">Blood For Us</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            onClick={(e) => handleScroll(e, "features")}
            className="text-sm font-medium hover:text-[#B83227]"
          >
            Features
          </Link>
          <Link
            href="#leaderboard"
            onClick={(e) => handleScroll(e, "leaderboard")}
            className="text-sm font-medium hover:text-[#B83227] duration-100"
          >
            Top Donors
          </Link>
          <Link
            href="#testimonials"
            onClick={(e) => handleScroll(e, "testimonials")}
            className="text-sm font-medium hover:text-[#B83227]"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className="text-sm font-medium hover:text-[#B83227]"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button
            className="bg-[#B83227] hover:bg-[#a12a22] text-white"
            asChild
          >
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-white">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-[#B83227]"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-[#B83227]"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-[#B83227]"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-[#B83227]"
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                className="w-full bg-[#B83227] hover:bg-[#a12a22] text-white"
                asChild
              >
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
