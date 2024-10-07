/* eslint-disable no-unused-vars */
import { HStack, Text } from '@chakra-ui/react';
import moment from 'moment';
import { View } from 'react-big-calendar';
import Button from '~/lib/components/UI/Button';

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
  onView: (newView: View) => void;
  view: View;
}
const CustomToolbar = (props: CustomToolbarProps) => {
  const { date, onNavigate, onView, view } = props;
  const monthYear = moment(date).format('MMM YYYY');

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
    </HStack>
  );
};

export default CustomToolbar;
