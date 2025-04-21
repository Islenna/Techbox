import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { EventLogEntry } from "@/components/types"

export function generateCPRReport(
  
  name: string,
  weight: number,
  startTime: string,
  endTime: string,
  eventLog: EventLogEntry[]
) {
  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text("CPR Report", 14, 20)

  doc.setFontSize(12)
  doc.text(`Patient: ${name}`, 14, 30)
  doc.text(`Weight: ${weight} kg`, 14, 37)
  doc.text(`Start Time: ${startTime}`, 14, 44)
  doc.text(`End Time: ${endTime}`, 14, 51)

  const tableData = eventLog.map((entry) => [
    entry.time,
    entry.realTime,
    entry.label,
  ])

  autoTable(doc, {
    startY: 60,
    head: [["CPR Time", "Clock Time", "Event"]],
    body: tableData,
  })

  doc.save(`CPR_Report_${name}_${startTime.replace(/[: ]/g, "-")}.pdf`)
}
