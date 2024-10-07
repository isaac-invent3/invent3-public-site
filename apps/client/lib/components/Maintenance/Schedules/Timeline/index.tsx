import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { Calendar, View, Views, momentLocalizer } from 'react-big-calendar';
import events from '~/lib/utils/MockData/events';
import { Flex } from '@chakra-ui/react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';
import CustomToolbar from './CustomToolBar';

const mLocalizer = momentLocalizer(moment);

const ScheduleTimeline = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.WEEK);

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
        components={{
          ...components,
          toolbar: (props) => (
            <CustomToolbar
              {...props}
              date={date}
              onNavigate={handleNavigate}
              onView={handleViewChange}
              view={view}
            />
          ),
        }}
        formats={{
          dayHeaderFormat: 'dddd DD',
        }}
        style={{ height: '100%', width: '100%' }}
        toolbar={true}
      />
    </Flex>
  );
};

export default ScheduleTimeline;
