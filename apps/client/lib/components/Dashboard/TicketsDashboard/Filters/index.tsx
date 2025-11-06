import { HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React, { useState } from 'react';
import CategoryFilter from '~/lib/components/AssetManagement/Filters/FilterComponents/CategoryFilter';
import { Option } from '~/lib/interfaces/general.interfaces';
import DateRangeFilter from '~/lib/components/Common/FilterComponents/DateRangeFilter';
import FacilityFilter from '~/lib/components/Common/FilterComponents/FacilityFilter';
import { DownloadIcon } from '~/lib/components/CustomIcons';
import TicketTypeFilter from '~/lib/components/TicketManagement/TableActions/Filters/TicketTypeFilter';
import { GenericFilter } from '~/lib/interfaces/dashboard.interfaces';
import { downloadPageAsPDF } from '~/lib/utils/pdfUtils';

interface FiltersProps {
  filters: GenericFilter;
  onChange: (
    key: keyof GenericFilter,
    value: Option[],
    singleSelect?: boolean
  ) => void;
  onApply: () => void;
  onReset: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onChange,
  onApply,
  onReset,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);
      await downloadPageAsPDF({
        elementId: 'tickets-dashboard',
        fileName: 'Ticket Dashboard.pdf',
        excludeSelectors: ['.no-pdf'],
        headingId: 'page-heading',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
      alignItems="flex-start"
      className="no-pdf"
    >
      <Stack
        width={{ base: 'full', lg: 'max-content' }}
        alignItems="flex-start"
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: '16px' }}
        bgColor="white"
        py={2}
        px={4}
        rounded="8px"
        className=".no-pdf"
      >
        <HStack spacing="7px" flexWrap="wrap">
          <FacilityFilter
            handleSelectedOption={(val: Option) =>
              onChange('facilities', [val])
            }
            selectedOptions={filters?.facilities.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
          />
          <CategoryFilter
            label="Asset Category"
            handleSelectedOption={(val: Option) =>
              onChange('assetCategories', [val])
            }
            selectedOptions={filters?.assetCategories.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
            hasBorder
          />
          <TicketTypeFilter
            label="Ticket Type"
            handleSelectedOption={(val: Option) =>
              onChange('ticketTypes', [val])
            }
            selectedOptions={filters?.assetCategories.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
            // hasBorder
          />
          <DateRangeFilter
            handleSelectedOption={(val: Option) =>
              onChange('datePeriod', [val], true)
            }
            selectedOptions={filters?.datePeriod.map((item) => ({
              label: item.toString(),
              value: item,
            }))}
          />
        </HStack>

        <HStack spacing="16px">
          <Button
            customStyles={{ width: '110px', height: '36px' }}
            handleClick={onApply}
          >
            Apply Filter
          </Button>
          <Text
            as="button"
            color="blue.500"
            whiteSpace="nowrap"
            onClick={onReset}
          >
            Reset Filter
          </Text>
        </HStack>
      </Stack>
      <Button
        customStyles={{
          minH: '36px',
          py: '6px',
          px: '8px',
          pr: '24px',
          width: '177px',
        }}
        handleClick={handleDownloadPDF}
        loadingText="Exporting..."
        isLoading={isLoading}
      >
        <Icon as={DownloadIcon} boxSize="18px" mr="8px" />
        Export
      </Button>
    </Stack>
  );
};

export default Filters;
