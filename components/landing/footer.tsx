"use client"
import Link from "next/link"
import { Icons } from "../icons"
import { HTMLAttributes } from "react"

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  handleScroll: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => void
}
export function Footer({ handleScroll }: FooterProps) {
  return (
    <footer id="contact" className="w-full border-t bg-[#F9F9F9] py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#B83227]">Blood For Us</h3>
            <p className="text-sm text-[#777777]">
              Connecting blood donors with those in need across Bangladesh.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-[#264653] hover:text-[#B83227]">
                <Icons.facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-[#264653] hover:text-[#B83227]">
                <Icons.twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-[#264653] hover:text-[#B83227]">
                <Icons.instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#333333]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#features"
                  onClick={(e) => handleScroll(e, "features")}
                  className="text-[#777777] hover:text-[#B83227]"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  onClick={(e) => handleScroll(e, "how-it-works")}
                  className="text-[#777777] hover:text-[#B83227]"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  onClick={(e) => handleScroll(e, "testimonials")}
                  className="text-[#777777] hover:text-[#B83227]"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="text-[#777777] hover:text-[#B83227]"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#333333]">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-[#777777] hover:text-[#B83227]">
                  Blood Donation FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#777777] hover:text-[#B83227]">
                  Eligibility Criteria
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#777777] hover:text-[#B83227]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#777777] hover:text-[#B83227]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#333333]">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-[#777777]">
                <Icons.mail className="h-4 w-4 text-[#B83227]" />
                <span>support@ticketwala.ai</span>
              </li>
              <li className="flex items-center gap-2 text-[#777777]">
                <Icons.phone className="h-4 w-4 text-[#B83227]" />
                <div className="flex flex-col">
                  <span>+8801975053808</span>
                  <span>+8801950538846</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-[#777777]">
          <p>© {new Date().getFullYear()} Blood For Us. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
