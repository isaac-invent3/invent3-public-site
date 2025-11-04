import { HStack, Icon, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import PageHeader from '../../UI/PageHeader';
import { Button } from '@repo/ui/components';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DownloadIcon } from '../../CustomIcons';

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);

      const page = document.querySelector('#lifecycle-page') as HTMLElement;
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
      pdf.save('Lifecycle_Comparison.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
      width="full"
      justifyContent="space-between"
      direction={{ base: 'column', sm: 'row' }}
      spacing="16px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader id="page-heading">
        Cross-Facility Lifecycle Comparison
      </PageHeader>

      <HStack spacing="16px" className="no-pdf">
        <Button
          customStyles={{ width: 'max-content', height: '38px' }}
          variant="secondary"
        >
          Schedule Comparison
        </Button>
        <Button
          customStyles={{
            minH: '36px',
            py: '6px',
            px: '8px',
            pr: '24px',
            width: '94px',
            justifyContent: 'flex-start',
          }}
          handleClick={handleDownloadPDF}
          loadingText="Exporting..."
          isLoading={isLoading}
        >
          <Icon as={DownloadIcon} boxSize="18px" mr="8px" />
          Export
        </Button>
      </HStack>
    </Stack>
  );
};

export default Header;
