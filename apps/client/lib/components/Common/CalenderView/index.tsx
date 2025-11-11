// ~/lib/components/Common/CalendarView.tsx
import { Flex } from '@chakra-ui/react';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Event as EventType,
  View,
  Views,
  momentLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';

const mLocalizer = momentLocalizer(moment);

interface CalendarViewProps {
  fetchEvents: (params: {
    startDate: string;
    endDate: string;
  }) => Promise<EventType[]>;
  CustomToolbar?: React.ComponentType<any>;
  CustomDateHeader?: React.ComponentType<{ label: string }>;
  CustomEvent?: React.ComponentType<any>;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
  customEventProps?: Record<string, any>;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  fetchEvents,
  CustomToolbar,
  CustomDateHeader,
  CustomEvent,
  onDateRangeChange,
  customEventProps,
}) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.WEEK);
  const [events, setEvents] = useState<EventType[]>([]);

  // Calculate start and end date for the current view
  const getDisplayDate = (date: Date, view: View) => {
    const startDate = moment(date)
      .startOf(view as any)
      .toISOString();
    const endDate = moment(date)
      .endOf(view as any)
      .toISOString();
    return { startDate, endDate };
  };

  const { startDate, endDate } = getDisplayDate(date, view);

  // Update parent when date range changes
  useEffect(() => {
    if (onDateRangeChange) onDateRangeChange(startDate, endDate);
  }, [startDate, endDate]);

  // Fetch events whenever the date or view changes
  useEffect(() => {
    let isMounted = true;
    const loadEvents = async () => {
      const data = await fetchEvents({ startDate, endDate });
      if (isMounted) setEvents(data);
    };
    loadEvents();
    return () => {
      isMounted = false;
    };
  }, [startDate, endDate]);

  // Memoized calendar configuration
  const { components, views } = useMemo(
    () => ({
      components: {
        toolbar: CustomToolbar,
      },
      views: [Views.MONTH, Views.WEEK, Views.DAY],
    }),
    [CustomToolbar]
  );

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    let newDate;
    if (action === 'TODAY') {
      newDate = new Date();
    } else {
      newDate = moment(date)
        .add(action === 'NEXT' ? 1 : -1, view as any)
        .toDate();
    }
    setDate(newDate);
  };

  return (
    <Flex width="full" height="full" direction="column" overflow="scroll">
      <Calendar
        date={date}
        localizer={mLocalizer}
        events={events}
        view={view}
        views={views}
        onNavigate={setDate}
        onView={setView}
        timeslots={1}
        step={60}
        components={{
          ...components,
          week: {
            header: (props) =>
              CustomDateHeader ? (
                <CustomDateHeader label={props.label} />
              ) : null,
          },
          toolbar: (props) =>
            CustomToolbar ? (
              <CustomToolbar
                {...props}
                date={date}
                onNavigate={handleNavigate}
                onView={setView}
                view={view}
              />
            ) : (
              props.label
            ),
          event: (props) =>
            CustomEvent ? (
              <CustomEvent {...props} {...customEventProps} />
            ) : null,
        }}
        formats={{
          dayFormat: (date, culture) =>
            mLocalizer.format(date, 'dddd DD', culture),
          timeGutterFormat: (date, culture) =>
            mLocalizer.format(date, 'hA', culture),
        }}
        style={{ height: '100%', width: '100%' }}
      />
    </Flex>
  );
};

export default CalendarView;
