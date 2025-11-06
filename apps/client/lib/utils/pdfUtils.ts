import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DownloadPDFOptions {
  /** The HTML element ID to capture */
  elementId: string;
  /** The name of the saved PDF */
  fileName?: string;
  /** Optional selectors to hide temporarily (e.g. '.no-pdf') */
  excludeSelectors?: string[];
  /** Background color for the PDF */
  backgroundColor?: string;
  /** Page orientation: portrait | landscape */
  orientation?: 'portrait' | 'landscape';
  /** Page format */
  format?: 'a4' | 'a3' | 'letter';
  /** Optional heading ID to adjust spacing */
  headingId?: string;
}

/**
 * Captures a DOM element as a PDF using html2canvas and jsPDF.
 */
export async function downloadPageAsPDF({
  elementId,
  fileName = 'Document.pdf',
  excludeSelectors = ['.no-pdf'],
  backgroundColor = '#D9D9D9',
  orientation = 'portrait',
  format = 'a4',
  headingId,
}: DownloadPDFOptions): Promise<void> {
  const page = document.getElementById(elementId);
  if (!page) throw new Error(`Element with ID '${elementId}' not found.`);

  const headingElement = headingId
    ? document.getElementById(headingId)
    : undefined;

  // Hide non-essential elements
  const hiddenElements: HTMLElement[] = [];
  excludeSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      const element = el as HTMLElement;
      if (element.style.display !== 'none') {
        hiddenElements.push(element);
        element.style.display = 'none';
      }
    });
  });

  // Store original styles
  const original = {
    bg: page.style.backgroundColor,
    padding: page.style.padding,
    overflow: page.style.overflow,
    headingMargin: headingElement?.style.marginBottom,
  };

  // Apply PDF-friendly styles
  page.style.backgroundColor = backgroundColor;
  page.style.padding = '24px';
  page.style.overflow = 'visible';
  if (headingElement) headingElement.style.marginBottom = '32px';

  try {
    // Capture canvas
    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
      backgroundColor,
    });

    // Restore hidden and original styles
    hiddenElements.forEach((el) => (el.style.display = ''));
    page.style.backgroundColor = original.bg;
    page.style.padding = original.padding;
    page.style.overflow = original.overflow;
    if (headingElement)
      headingElement.style.marginBottom = original.headingMargin ?? '';

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation,
      unit: 'pt',
      format,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Optional background fill
    pdf.setFillColor(backgroundColor);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  } finally {
    // Restore hidden elements if anything failed early
    hiddenElements.forEach((el) => (el.style.display = ''));
  }
}
