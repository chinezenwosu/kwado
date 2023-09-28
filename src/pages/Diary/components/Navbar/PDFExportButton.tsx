import React from 'react'
import { useParams } from 'react-router-dom'
import { pdfExporter } from 'quill-to-pdf'
import { saveAs } from 'file-saver'

const PDFExportButton = ({ className, editor }) => {
  const { id } = useParams()

  const exportAsPDF = async () => {
    if (editor) {
      const delta = editor.getContents()
      const pdfAsBlob = await pdfExporter.generatePdf(delta)
      saveAs(pdfAsBlob, `dominics-${id}-${Date.now()}.pdf`)
    }
  }

  return (
    <button className={className} onClick={exportAsPDF}>
      Export PDF
    </button>
  )
}

export default PDFExportButton
