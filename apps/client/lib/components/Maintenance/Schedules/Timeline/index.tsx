import React, { useState, useMemo, useEffect } from 'react';
import moment from 'moment';
import {
  Calendar,
  View,
  Views,
  momentLocalizer,
  Event as EventType,
} from 'react-big-calendar';
import { Flex } from '@chakra-ui/react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';
import CustomToolbar from './CustomToolBar';
import Event from './Events';
import CustomDateHeader from './CustomDateHeader';
import {
  useGetMaintenanceScheduleAggregateQuery,
  useGetMaintenanceSchedulesWithSingleAggregateCountsByAreaQuery,
} from '~/lib/redux/services/maintenance/schedule.services';
import {
  getDisplayDate,
  transformToCalendarEvents,
} from '~/lib/utils/helperFunctions';
import { AREA_ENUM } from '~/lib/utils/constants';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateScheduleInfo } from '~/lib/redux/slices/MaintenanceSlice';

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
  const {
    data: singleAggregateCountData,
    isLoading: isLoadingSingle,
    isFetching: isFetchingSingle,
  } = useGetMaintenanceSchedulesWithSingleAggregateCountsByAreaQuery({
    id: isProperState ? selectedState.value : selectedCountry?.value,
    areaType: isProperState ? AREA_ENUM.state : AREA_ENUM.country,
    startDate,
    endDate,
  });
  const { data, isLoading, isFetching } =
    useGetMaintenanceScheduleAggregateQuery({
      id: isProperState ? selectedState.value : selectedCountry?.value,
      areaType: isProperState ? AREA_ENUM.state : AREA_ENUM.country,
      startDate,
      endDate,
    });

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

  useEffect(() => {
    if (data?.data?.items) {
      setEventData(transformToCalendarEvents(data?.data?.items));
    }
    if (singleAggregateCountData?.data?.items) {
      setEventData(
        transformToCalendarEvents(singleAggregateCountData?.data?.items)
      );
    }
  }, [data, singleAggregateCountData]);

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      pointerEvents={
        isFetching || isLoading || isLoadingSingle || isFetchingSingle
          ? 'none'
          : 'initial'
      }
      opacity={
        isLoading || isFetching || isLoadingSingle || isFetchingSingle ? 0.7 : 1
      }
    >
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
