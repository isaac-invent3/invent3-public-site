import { SimpleGrid } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';

interface MonthCardProps {
  selectedDays: number[];
  // eslint-disable-next-line no-unused-vars
  handleSelectDay: (day: number) => void;
}
const MonthCard = (props: MonthCardProps) => {
  const { selectedDays, handleSelectDay } = props;
  return (
    <SimpleGrid
      columns={{base:5, md:7}}
      rowGap="12px"
      columnGap="4px"
      width="full"
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
                py: 0,
                px: 0,
                borderColor: isSelected ? 'none' : '#BBBBBB80',
                color: isSelected ? 'white' : 'black',
                width: '40px',
                height: '40px',
                lineHeight: '0px',
              }}
            >
              {index + 1}
            </Button>
            // <Box width="32px" height="32px" bgColor="Red" />
          );
        })}
    </SimpleGrid>
  );
};

export default MonthCard;
