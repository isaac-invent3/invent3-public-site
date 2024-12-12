/* eslint-disable no-unused-vars */
import { HStack, Icon, Text } from '@chakra-ui/react';
import moment from 'moment';
import { View } from 'react-big-calendar';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '~/lib/components/CustomIcons';
import { Button } from '@repo/ui/components';
import { getDisplayDate } from '~/lib/utils/helperFunctions';

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
  onView: (newView: View) => void;
  view: View;
}
const CustomToolbar = (props: CustomToolbarProps) => {
  const { date, onNavigate, onView, view } = props;
  const monthYear = moment(date).format('MMM YYYY');

  const { displayDate } = getDisplayDate(date, view as 'day');

  const todayButtonStyle = { bgColor: '#B4BFCA4D', color: 'primary.500' };

  return (
    <HStack justify="space-between" width="full" mb="14px">
      <HStack spacing="16px">
        <Text
          color="black"
          fontWeight={800}
          fontSize="20px"
          lineHeight="23.76px"
        >
          {monthYear}
        </Text>
        <Button
          customStyles={{
            width: '71px',
            height: '33px',
            bgColor: '#B4BFCA4D',
            color: 'primary.500',
            _hover: todayButtonStyle,
            _focus: todayButtonStyle,
            _active: todayButtonStyle,
          }}
          handleClick={() => onNavigate('TODAY')}
        >
          Today
        </Button>
      </HStack>
      <HStack spacing="12px">
        <HStack bgColor="white" rounded="8px" padding="4px" height="38px">
          {['day', 'week', 'month'].map((item, index) => (
            <Button
              customStyles={{
                textTransform: 'capitalize',
                bgColor: view === item ? 'primary.500' : 'white',
                color: view === item ? 'secondary.pale.500' : 'neutral.800',
                _hover: {
                  bgColor: view === item ? 'primary.500' : 'white',
                  color: view === item ? 'secondary.pale.500' : 'neutral.800',
                },
                _focus: {
                  bgColor: view === item ? 'primary.500' : 'white',
                  color: view === item ? 'secondary.pale.500' : 'neutral.800',
                },
                _active: {
                  bgColor: view === item ? 'primary.500' : 'white',
                  color: view === item ? 'secondary.pale.500' : 'neutral.800',
                },
              }}
              key={index}
              handleClick={() => onView(item as View)}
            >
              {item}
            </Button>
          ))}
        </HStack>
        <HStack
          height="38px"
          border="1px solid #B4BFCA80"
          rounded="4px"
          padding="6px"
          spacing="16px"
        >
          <Icon
            as={ChevronLeftIcon}
            boxSize="16px"
            color="black"
            mb="6px"
            cursor="pointer"
            onClick={() => onNavigate('PREV')}
          />
          <Text color="black" fontWeight={800}>
            {displayDate}
          </Text>
          <Icon
            as={ChevronRightIcon}
            boxSize="16px"
            color="black"
            mb="4px"
            cursor="pointer"
            onClick={() => onNavigate('NEXT')}
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default CustomToolbar;
