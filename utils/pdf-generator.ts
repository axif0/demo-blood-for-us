import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export interface HealthRecordData {
  id: string
  title: string
  date: string
  type: string
  format?: string
  details?: {
    [key: string]: string
  }
}

export const generateHealthRecordPDF = (record: HealthRecordData) => {
  const doc = new jsPDF()

  doc.setFontSize(20)
  doc.setTextColor(38, 70, 83)
  doc.text("Blood For Us", 105, 20, { align: "center" })

  doc.setFontSize(16)
  doc.text("Health Record", 105, 30, { align: "center" })

  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`Record: ${record.title}`, 20, 50)
  doc.text(`Date: ${record.date}`, 20, 60)
  doc.text(`Type: ${record.type}`, 20, 70)

  if (record.details && Object.keys(record.details).length > 0) {
    doc.text("Details:", 20, 90)

    const tableData = Object.entries(record.details).map(([key, value]) => [
      key,
      value,
    ])

    autoTable(doc, {
      startY: 100,
      head: [["Measurement", "Value"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [38, 70, 83] },
    })
  }

  const pageCount = (doc as any).internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    ;(doc as any).setPage(i)
    doc.setFontSize(10)
    doc.setTextColor(128, 128, 128)
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} - Blood For Us Health Record`,
      105,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    )
  }

  return doc
}
