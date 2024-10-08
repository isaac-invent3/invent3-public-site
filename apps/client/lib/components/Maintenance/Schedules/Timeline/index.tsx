import React, { useState, useMemo } from 'react';
import moment from 'moment';
import {
  Calendar,
  View,
  Views,
  momentLocalizer,
  Event as EventType,
} from 'react-big-calendar';
import events from '~/lib/utils/MockData/events';
import { Flex, useDisclosure } from '@chakra-ui/react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';
import CustomToolbar from './CustomToolBar';
import Event from './Events';
import CustomDateHeader from './CustomDateHeader';
import EventDetailModal from './EventDetailModal';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';

const mLocalizer = momentLocalizer(moment);

const ScheduleTimeline = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.WEEK);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [eventDetail, setEventDetail] = useState<MaintenancePlan | null>(null);

  const { components, views } = useMemo(
    () => ({
      components: {
        toolbar: CustomToolbar,
      },
      defaultDate: new Date(),
      views: [Views.MONTH, Views.WEEK, Views.DAY],
    }),
    []
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

  const handleEventClick = (event: EventType) => {
    setEventDetail(event.resource);
    onOpen();
  };

  const handleCloseModal = () => {
    setEventDetail(null);
    onClose();
  };

  return (
    <Flex width="full" height="full" direction="column">
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
        onSelectEvent={handleEventClick}
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
      {eventDetail && (
        <EventDetailModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          data={eventDetail}
        />
      )}
    </Flex>
  );
};

export default ScheduleTimeline;
