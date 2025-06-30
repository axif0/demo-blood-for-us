"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealthRecordsSummary } from "@/components/dashboard/health-records-summary"
import { Upload, Download, Share2 } from "lucide-react"
import { ShareModal } from "@/components/dashboard/share-modal"
import {
  generateHealthRecordPDF,
  type HealthRecordData,
} from "@/utils/pdf-generator"
import { toast } from "@/components/ui/use-toast"

// Mock data for health records
const platformRecords = [
  {
    id: "rec-1",
    title: "Blood Donation Checkup",
    date: "Sep 15, 2024",
    type: "Platform",
    details: {
      Hemoglobin: "14.2 g/dL",
      "Blood Pressure": "120/80 mmHg",
      Pulse: "72 bpm",
    },
  },
  {
    id: "rec-2",
    title: "Blood Donation Checkup",
    date: "Apr 22, 2024",
    type: "Platform",
    details: {
      Hemoglobin: "13.8 g/dL",
      "Blood Pressure": "118/78 mmHg",
      Pulse: "75 bpm",
    },
  },
]

const uploadedRecords = [
  {
    id: "rec-3",
    title: "Complete Blood Count",
    date: "Jul 10, 2024",
    type: "User Uploaded",
    format: "PDF",
  },
  {
    id: "rec-4",
    title: "Annual Health Checkup",
    date: "Jan 05, 2024",
    type: "User Uploaded",
    format: "PDF",
  },
]

export default function HealthRecordsPage() {
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

      toast({
        title: "Download started",
        description: "Your health record PDF is being downloaded",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Download failed",
        description:
          "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleShare = (record: HealthRecordData) => {
    setSelectedRecord(record)
    setShareModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Health Records</h2>
          <p className="text-muted-foreground">
            View and manage your health records and medical documents
          </p>
        </div>
        <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white">
          <Upload className="mr-2 h-4 w-4" />
          Upload New Record
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="platform">Platform Generated</TabsTrigger>
          <TabsTrigger value="uploaded">User Uploaded</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Records</CardTitle>
              <CardDescription>
                All your health records and medical documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HealthRecordsSummary
                extended
                handleDownload={handleDownload}
                handleShare={handleShare}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platform" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Generated Records</CardTitle>
              <CardDescription>
                Health records generated during blood donations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {platformRecords.map((record) => (
                  <div key={record.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{record.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{record.date}</span>
                          <span>•</span>
                          <span>{record.type}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDownload(record)}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleShare(record)}
                        >
                          <Share2 className="h-4 w-4" />
                          <span className="sr-only">Share</span>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-2 rounded-md bg-[#F9F9F9] p-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        {record.details &&
                          Object.entries(record.details).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-xs font-medium">
                                {key}:{" "}
                              </span>
                              <span className="text-xs">{value}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploaded" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Uploaded Records</CardTitle>
              <CardDescription>
                Medical documents you've uploaded to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedRecords.map((record) => (
                  <div key={record.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{record.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{record.date}</span>
                          <span>•</span>
                          <span>{record.type}</span>
                          {record.format && (
                            <>
                              <span>•</span>
                              <span>{record.format}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDownload(record)}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleShare(record)}
                        >
                          <Share2 className="h-4 w-4" />
                          <span className="sr-only">Share</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedRecord && (
        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          title={selectedRecord.title}
          recordId={selectedRecord.id || "unknown"}
        />
      )}
    </div>
  )
}
