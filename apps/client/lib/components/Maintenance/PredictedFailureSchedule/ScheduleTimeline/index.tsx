// ~/lib/components/Maintenance/ScheduleTimeline/index.tsx
import moment from 'moment';
import CalendarView from '~/lib/components/Common/CalenderView';
import CustomDateHeader from '~/lib/components/Common/CalenderView/CustomDateHeader';
import CustomToolbar from '~/lib/components/Common/CalenderView/CustomToolBar';
import Event from './Events';
import { Event as EventType } from 'react-big-calendar';

// Mock calendar events
const mockEvents: EventType[] = [
  {
    title: 'Generator Maintenance',
    start: moment().startOf('day').add(9, 'hours').toDate(),
    end: moment().startOf('day').add(11, 'hours').toDate(),
    allDay: false,
    resource: {
      prediction: 'Pump-12 Critical Alert',
      risk: 'low',
    },
  },
  {
    title: 'AC Servicing',
    start: moment().startOf('day').add(14, 'hours').toDate(),
    end: moment().startOf('day').add(16, 'hours').toDate(),
    allDay: false,
    resource: {
      prediction: 'Elevator-02 Maintenance',
      risk: 'medium',
    },
  },
  {
    title: 'Monthly Inspection',
    start: moment().add(2, 'days').toDate(),
    end: moment().add(2, 'days').add(2, 'hours').toDate(),
    allDay: false,
    resource: {
      prediction: 'Pump-04 Preventive Task',
      risk: 'high',
    },
  },
];

const ScheduleTimeline = ({
  setSelectedEvent,
}: {
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventType | undefined>>;
}) => {
  // Mock fetch function (imitates API)
  const fetchEvents = async ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => {
    console.log('Fetching events for:', startDate, 'to', endDate);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockEvents;
  };

  const handleDateRangeChange = (start: string, end: string) => {
    console.log('Current visible date range:', start, end);
  };

  return (
    <CalendarView
      fetchEvents={fetchEvents}
      CustomToolbar={CustomToolbar}
      CustomDateHeader={CustomDateHeader}
      CustomEvent={Event}
      onDateRangeChange={handleDateRangeChange}
      customEventProps={{
        setSelectedEvent,
      }}
    />
  );
};

export default ScheduleTimeline;
