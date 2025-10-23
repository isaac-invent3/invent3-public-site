import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BackButton, Button } from '@repo/ui/components';
import Summary from './Summary';
import CostBreakdownTable from './CostBreakdownTable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ReviewProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const Review = (props: ReviewProps) => {
  const { activeStep, setActiveStep } = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);

      const page = document.querySelector(
        '#lifecycle-simulation-review'
      ) as HTMLElement;
      if (!page) return;

      const headingElement = document.getElementById('page-heading');
      const hiddenElements = document.querySelectorAll('.no-pdf');

      // Hide only non-essential UI elements
      hiddenElements.forEach(
        (el) => ((el as HTMLElement).style.display = 'none')
      );

      // Store original styles
      const originalBg = page.style.backgroundColor;
      const originalPadding = page.style.padding;
      const originalOverflow = page.style.overflow;
      const originalHeadingMargin = headingElement?.style.marginBottom;

      // Apply PDF-friendly styles
      page.style.backgroundColor = '#D9D9D9'; // Light gray background
      page.style.padding = '24px';
      page.style.overflow = 'visible'; // Ensure full table renders
      if (headingElement) headingElement.style.marginBottom = '32px';

      // Capture the page
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
        backgroundColor: '#D9D9D9',
      });

      // Restore styles
      hiddenElements.forEach((el) => ((el as HTMLElement).style.display = ''));
      page.style.backgroundColor = originalBg;
      page.style.padding = originalPadding;
      page.style.overflow = originalOverflow;
      if (headingElement)
        headingElement.style.marginBottom = originalHeadingMargin ?? '';

      // Convert to PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Optional: background in PDF
      pdf.setFillColor('#D9D9D9');
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Add the captured image
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Lifecycle_Simulation.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack
      width="full"
      height="full"
      alignItems="flex-start"
      justifyContent="space-between"
      display={activeStep === 4 ? 'flex' : 'none'}
      px={{ lg: 8 }}
      id="lifecycle-simulation-review"
    >
      <VStack width="full" spacing={{ base: 4, lg: 8 }} alignItems="flex-start">
        <Summary />
        <CostBreakdownTable />
      </VStack>
      <HStack width="full" justifyContent="space-between" className=".no-pdf">
        <BackButton
          handleClick={() => setActiveStep(3)}
          variant="secondary"
          customStyles={{
            height: '50px',
            width: '96px',
            justifyContent: 'center',
          }}
        />
        <Button
          customStyles={{ width: '177px' }}
          handleClick={handleDownloadPDF}
        >
          Export Lifecycle Plan
        </Button>
      </HStack>
    </VStack>
  );
};

export default Review;
