"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Download, Share2, Upload } from "lucide-react"
import {
  generateHealthRecordPDF,
  HealthRecordData,
} from "@/utils/pdf-generator"
import { ShareModal } from "./share-modal"
import { useState } from "react"
import { toast } from "react-toastify"

type HealthRecordsSummaryProps = {
  extended?: boolean
}

export function HealthRecordsSummary({
  extended = false,
}: HealthRecordsSummaryProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<HealthRecordData | null>(
    null
  )

  const handleDownload = async (record: HealthRecordData) => {
    try {
      const pdf = generateHealthRecordPDF(record)

      const safeTitle = record.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "")

      await pdf.save(`health-record-${safeTitle}.pdf`)

      toast(
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-medium">Download started</h3>
          <p>Your health record PDF is being downloaded</p>
        </div>
      )
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast(
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-medium">Download failed</h3>
          <p>There was an error generating your PDF. Please try again.</p>
        </div>
      )
    }
  }

  const handleShare = (record: HealthRecordData) => {
    setSelectedRecord(record)
    setShareModalOpen(true)
  }
  const healthRecords = [
    {
      id: "hr-001",
      title: "Blood Donation Checkup",
      date: "Sep 15, 2024",
      type: "Platform",
      details: {
        hemoglobin: "14.2 g/dL",
        bloodPressure: "120/80 mmHg",
        pulse: "72 bpm",
      },
    },
    {
      id: "hr-002",
      title: "Complete Blood Count",
      date: "Jul 10, 2024",
      type: "User Uploaded",
      fileType: "PDF",
    },
    {
      id: "hr-003",
      title: "Blood Donation Checkup",
      date: "Apr 22, 2024",
      type: "Platform",
      details: {
        hemoglobin: "13.8 g/dL",
        bloodPressure: "118/78 mmHg",
        pulse: "75 bpm",
      },
    },
    {
      id: "hr-004",
      title: "Annual Health Checkup",
      date: "Jan 05, 2024",
      type: "User Uploaded",
      fileType: "PDF",
    },
  ]

  const displayRecords = extended ? healthRecords : healthRecords.slice(0, 2)

  return (
    <div className="space-y-4">
      {!extended && (
        <div className="flex gap-2">
          <Button
            className="w-full bg-[#264653] hover:bg-[#1e3a45] text-white"
            size="sm"
          >
            <FileText className="mr-2 h-4 w-4" />
            Platform Records
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload Record
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {displayRecords.map((record) => (
          <div key={record.id} className="rounded-lg border p-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{record.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{record.date}</span>
                  <span>•</span>
                  <span>{record.type}</span>
                  {record.fileType && <span>• {record.fileType}</span>}
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(record)}
                  className="h-8 w-8"
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare(record)}
                  className="h-8 w-8"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>

            {record.details && extended && (
              <div className="mt-2 rounded-md bg-[#F9F9F9] p-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(record.details).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-xs font-medium capitalize">
                        {key}:{" "}
                      </span>
                      <span className="text-xs">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedRecord && (
        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          title={selectedRecord.title}
          recordId={selectedRecord.id || "unknown"}
        />
      )}
      {extended && (
        <div className="flex gap-2">
          <Button className="w-full bg-[#264653] hover:bg-[#1e3a45] text-white">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Record
          </Button>
        </div>
      )}

      {!extended && (
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/health-records">View All Records</Link>
        </Button>
      )}
    </div>
  )
}
