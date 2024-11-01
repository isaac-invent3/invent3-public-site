import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Button from '../../Button';

interface MonthCardProps {
  selectedDays: number[];
  // eslint-disable-next-line no-unused-vars
  handleSelectDay: (day: number) => void;
}
const MonthCard = (props: MonthCardProps) => {
  const { selectedDays, handleSelectDay } = props;
  return (
    <SimpleGrid
      columns={7}
      rowGap="12px"
      columnGap="4px"
      width="full"
      border="1px solid #BBBBBB80"
      bgColor="#F7F7F7"
      py={2}
      px="4px"
      rounded="8px"
    >
      {Array(28)
        .fill('')
        .map((_, index) => {
          const isSelected = selectedDays.some(
            (option) => option === index + 1
          );
          return (
            <Button
              key={index}
              handleClick={() => handleSelectDay(index + 1)}
              variant={isSelected ? 'primary' : 'outline'}
              customStyles={{
                py: '10px',
                borderColor: isSelected ? 'none' : '#BBBBBB80',
                color: isSelected ? 'white' : 'black',
              }}
            >
              {index + 1}
            </Button>
          );
        })}
    </SimpleGrid>
  );
};

export default MonthCard;
