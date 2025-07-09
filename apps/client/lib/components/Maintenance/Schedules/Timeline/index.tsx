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
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { scheduleInstanceApi } from '~/lib/redux/services/maintenance/scheduleInstance.services';
import { updateScheduleInfo } from '~/lib/redux/slices/MaintenanceSlice';
import { AREA_ENUM } from '~/lib/utils/constants';
import {
  getDisplayDate,
  transformToCalendarEvents,
} from '~/lib/utils/helperFunctions';
import CustomDateHeader from './CustomDateHeader';
import CustomToolbar from './CustomToolBar';
import Event from './Events';
import './style.css';
('~/lib/redux/services/maintenance/schedule.services');

const mLocalizer = momentLocalizer(moment);

const ScheduleTimeline = () => {
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.maintenance.scheduleInfo
  );
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.WEEK);
  const [eventData, setEventData] = useState<EventType[]>([]);
  const { startDate, endDate } = getDisplayDate(date, view);
  const isProperState = selectedState?.label && selectedState?.label !== 'All';

  useEffect(() => {
    if (date) {
      const { startDate, endDate } = getDisplayDate(date, view);
      dispatch(
        updateScheduleInfo({
          timelineStartDate: startDate,
          timelineEndDate: endDate,
        })
      );
    }
  }, [date]);

  const { components, views, events } = useMemo(
    () => ({
      components: {
        toolbar: CustomToolbar,
      },
      defaultDate: new Date(),
      events: eventData,
      views: [Views.MONTH, Views.WEEK, Views.DAY],
    }),
    [eventData]
  );

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    let newDate;
    if (action === 'TODAY') {
      newDate = new Date(); // Navigate to today's date
    } else {
      newDate = moment(date)
        .add(action === 'NEXT' ? 1 : -1, view as 'day')
        .toDate();
    }
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const fetchInstanceAggregate = async (): Promise<EventType[]> => {
    let hasNextPage = true;
    let allEvents: EventType[] = [];
    let pageNumber = 1;

    while (hasNextPage && selectedCountry) {
      const result = await dispatch(
        scheduleInstanceApi.endpoints.getMaintenanceScheduleInstanceAggregate.initiate(
          {
            areaId: isProperState
              ? (selectedState.value as number)
              : (selectedCountry.value as number),
            areaType: isProperState ? AREA_ENUM.state : AREA_ENUM.country,
            startDate,
            endDate,
            pageNumber,
            pageSize: 50,
          }
        )
      );

      if (result.data?.data?.items) {
        allEvents = [
          ...allEvents,
          ...transformToCalendarEvents(result.data?.data.items as any[]),
        ];
      }
      hasNextPage = result.data?.data.hasNextPage ?? false;
      pageNumber += 1;
    }

    return allEvents;
  };

  const fetchInstancesWithSingleAggregateCount = async (): Promise<
    EventType[]
  > => {
    let hasNextPage = true;
    let allEvents: EventType[] = [];
    let pageNumber = 1;

    while (hasNextPage && selectedCountry) {
      const result = await dispatch(
        scheduleInstanceApi.endpoints.getMaintenanceScheduleInstancesWithSingleAggregateCountsByArea.initiate(
          {
            areaId: isProperState
              ? (selectedState.value as number)
              : (selectedCountry.value as number),
            areaType: isProperState ? AREA_ENUM.state : AREA_ENUM.country,
            startDate,
            endDate,
            pageNumber,
            pageSize: 50,
          }
        )
      );

      if (result.data?.data?.items) {
        allEvents = [
          ...allEvents,
          ...transformToCalendarEvents(result.data?.data.items as any[]),
        ];
      }
      hasNextPage = result.data?.data.hasNextPage ?? false;
      pageNumber += 1;
    }

    return allEvents;
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setEventData([]); // Clear existing data before fetching new

      const [singleAggregateEvents, aggregateEvents] = await Promise.all([
        fetchInstancesWithSingleAggregateCount(),
        fetchInstanceAggregate(),
      ]);

      if (isMounted) {
        setEventData([...singleAggregateEvents, ...aggregateEvents]);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [isProperState, startDate, endDate, selectedState, selectedCountry]);

  return (
    <Flex width="full" height="full" direction="column" overflow="scroll">
      <Calendar
        date={date}
        events={events}
        localizer={mLocalizer}
        views={views}
        view={view}
        onNavigate={setDate}
        onView={handleViewChange}
        timeslots={1}
        step={60}
        components={{
          ...components,
          week: {
            header: (props) => <CustomDateHeader label={props.label} />,
          },
          toolbar: (props) => (
            <CustomToolbar
              {...props}
              date={date}
              onNavigate={handleNavigate}
              onView={handleViewChange}
              view={view}
            />
          ),
          event: Event,
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

export default ScheduleTimeline;
