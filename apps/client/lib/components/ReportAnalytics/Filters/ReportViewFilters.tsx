import { HStack, useDisclosure } from '@chakra-ui/react';
import { FilterButton } from '@repo/ui/components';
import React from 'react';
import { Report } from '~/lib/interfaces/report.interfaces';
import { CalendarIcon, FilterIcon } from '../../CustomIcons';
import ScheduleReportDrawer from '../Drawers/ScheduleReportDrawer';
import ShareReportPopover from '../ReportView/ShareReportPopover';

interface ReportViewFiltersProps {
  activeFilter: 'general' | null;
  setActiveFilter: React.Dispatch<React.SetStateAction<'general' | null>>;
  report: Report;
}
const ReportViewFilters = (props: ReportViewFiltersProps) => {
  const { activeFilter, setActiveFilter, report } = props;

  const {
    isOpen: isOpenSchedule,
    onOpen: onOpenSchedule,
    onClose: onCloseSchedule,
  } = useDisclosure();

  return (
    <HStack spacing="16px" flexWrap="wrap">
      <FilterButton
        chevron={false}
        icon={CalendarIcon}
        label="Schedule Report"
        handleClick={() => onOpenSchedule()}
        isActive={false}
      />

      {/* <FilterButton
        icon={FilterIcon}
        label="Filters"
        handleClick={() =>
          setActiveFilter((prev) => (prev === 'general' ? null : 'general'))
        }
        isActive={activeFilter === 'general'}
      /> */}

      <ShareReportPopover reportId={report.reportId} />

      <ScheduleReportDrawer
        isOpen={isOpenSchedule}
        onClose={onCloseSchedule}
        reportId={report.reportId}
      />
    </HStack>
  );
};

export default ReportViewFilters;
