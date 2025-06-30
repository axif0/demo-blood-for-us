"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Copy,
  Facebook,
  MessageCircle,
  Share2,
  TextIcon as Telegram,
  X,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "../icons"

interface ShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  recordId: string
}

export function ShareModal({
  open,
  onOpenChange,
  title,
  recordId,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  // Generate a shareable link
  const shareableLink = `${window.location.origin}/dashboard/health-records/health-report/${recordId}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink)
    setCopied(true)
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard",
    })
    setTimeout(() => setCopied(false), 1000)
  }

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Health Record: ${title}`,
          text: `Check out my health record: ${title}`,
          url: shareableLink,
        })
        toast({
          title: "Shared successfully",
          description: "Your health record has been shared",
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }

  const shareViaPlatform = (platform: string) => {
    let url = ""

    const message = `Check out my health record: ${title} ${shareableLink}`

    switch (platform) {
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          message
        )}`
        break

      case "telegram":
        url = `https://t.me/share?url=${encodeURIComponent(
          shareableLink
        )}&text=${encodeURIComponent(`Check out my health record: ${title}`)}`
        break

      case "facebook":
        url = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
          shareableLink
        )}&app_id=${
          process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
        }&redirect_uri=${encodeURIComponent(
          "http://localhost:3002/dashboard/health-records"
        )}`
        break

      case "twitter":
        url = `https://twitter.com/messages/compose?text=${encodeURIComponent(
          message
        )}`
        break

      default:
        break
    }

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Health Record</DialogTitle>
          <DialogDescription>
            Share your "{title}" health record with others
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Input readOnly value={shareableLink} className="w-full" />
          </div>
          {copied ? (
            <Button
              variant={"outline"}
              size="sm"
              className="px-3 bg-green-200 hover:bg-white"
            >
              <span className="sr-only">Copied</span>

              <Icons.check className="h-4 w-4 text-green-600" strokeWidth={4} />
            </Button>
          ) : (
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={copyToClipboard}
            >
              <span className="sr-only">Copy</span>

              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="mt-4">
          <h4 className="mb-3 text-sm font-medium">Share via</h4>
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center gap-1 p-3 h-auto"
              onClick={() => shareViaPlatform("whatsapp")}
            >
              <MessageCircle className="h-5 w-5 text-green-600" />
              <span className="text-xs">WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center gap-1 p-3 h-auto"
              onClick={() => shareViaPlatform("telegram")}
            >
              <Telegram className="h-5 w-5 text-blue-500" />
              <span className="text-xs">Telegram</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center gap-1 p-3 h-auto"
              onClick={() => shareViaPlatform("facebook")}
            >
              <Facebook className="h-5 w-5 text-blue-600" />
              <span className="text-xs">Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center gap-1 p-3 h-auto"
              onClick={() => shareViaPlatform("twitter")}
            >
              <X className="h-5 w-5" />
              <span className="text-xs">Twitter</span>
            </Button>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          {"share" in navigator && (
            <Button
              type="button"
              variant="secondary"
              className="mt-2"
              onClick={shareViaWebShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share via device
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
