import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export async function exportToPDF(elementId: string, filename: string = 'notes.pdf') {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    try {
        // Generate PNG using html-to-image which handles modern CSS (like oklab/oklch) better
        const imgData = await toPng(element, {
            cacheBust: true,
            pixelRatio: 2, // Higher resolution
            backgroundColor: '#ffffff' // Ensure white background for the PDF
        });

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Page height in mm
        const pageHeight = pdf.internal.pageSize.getHeight();
        let heightLeft = pdfHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;

        // Add subsequent pages
        while (heightLeft >= 0) {
            position = heightLeft - pdfHeight; // Negative position to slide image up
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(filename);
    } catch (error) {
        console.error('PDF generation failed', error);
    }
}
