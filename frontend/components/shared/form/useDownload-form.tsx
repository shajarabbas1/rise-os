'use client';

import { useCallback } from 'react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export function usePDFExport(formRef, fileName = 'form.pdf') {
  const handleDownloadPDF = useCallback(async () => {
    const element = formRef.current;
    if (!element) {
      console.error('Form reference is not available');
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Improve quality
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');

      // Initialize jsPDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      const imgWidth = 595.28;
      const pageHeight = 841.89;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download the PDF
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }, [formRef, fileName]);

  return { handleDownloadPDF };
}
