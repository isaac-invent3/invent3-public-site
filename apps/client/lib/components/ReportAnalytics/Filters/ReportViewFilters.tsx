import { HStack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { CalendarIcon, FilterIcon } from '../../CustomIcons';
import FilterButton from '../../UI/Filter/FilterButton';
import ScheduleReportDrawer from '../Drawers/ScheduleReportDrawer';
import ShareReportPopover from '../ReportView/ShareReportPopover';

interface ReportViewFiltersProps {
  activeFilter: 'general' | null;
  setActiveFilter: React.Dispatch<React.SetStateAction<'general' | null>>;
}
const ReportViewFilters = (props: ReportViewFiltersProps) => {
  const { activeFilter, setActiveFilter } = props;


    const {
      isOpen: isOpenSchedule,
      onOpen: onOpenSchedule,
      onClose: onCloseSchedule,
    } = useDisclosure();

  return (
    <HStack spacing="16px">
      <FilterButton
        chevron={false}
        icon={CalendarIcon}
        label="Schedule Report"
        handleClick={() => onOpenSchedule()}
        isActive={false}
      />

      <FilterButton
        icon={FilterIcon}
        label="Filters"
        handleClick={() =>
          setActiveFilter((prev) => (prev === 'general' ? null : 'general'))
        }
        isActive={activeFilter === 'general'}
      />

      <ShareReportPopover report={[]} />

      <ScheduleReportDrawer isOpen={isOpenSchedule} onClose={onCloseSchedule} />
    </HStack>
  );
};

export default ReportViewFilters;
