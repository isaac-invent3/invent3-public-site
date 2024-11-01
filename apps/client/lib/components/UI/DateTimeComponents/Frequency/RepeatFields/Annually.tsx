import React from 'react';
import moment from 'moment';
import { HStack, SimpleGrid } from '@chakra-ui/react';

import { FrequencyInfo, Option } from '~/lib/interfaces/general.interfaces';
import SectionInfo from '../../../Form/FormSectionInfo';
import Button from '../../../Button';

const months: Option[] = Array.from({ length: 12 }, (_, i) => ({
  label: moment().month(i).format('MMM'),
  value: i + 1,
}));

interface AnnuallyProps {
  frequencyInfo: FrequencyInfo;
  setFrequencyInfo: React.Dispatch<React.SetStateAction<FrequencyInfo>>;
}
const Annually = (props: AnnuallyProps) => {
  const { frequencyInfo, setFrequencyInfo } = props;

  const handleClick = (item: Option) => {
    const isSelected = frequencyInfo.repeatIntervals.some(
      (option) => option === item.value
    );
    const newSelectedOptions = isSelected
      ? frequencyInfo.repeatIntervals.filter((option) => option !== item.value)
      : [...frequencyInfo.repeatIntervals, item.value];
    setFrequencyInfo((prev) => ({
      ...prev,
      repeatIntervals: newSelectedOptions,
    }));
  };

  return (
    <HStack width="full" spacing="29px" alignItems="flex-start" mb="32px">
      <SectionInfo
        title="On"
        info="Add name that users can likely search with"
        isRequired={false}
        maxWidth="130px"
      />
      <SimpleGrid
        columns={3}
        gap="12px"
        width="full"
        border="1px solid #BBBBBB80"
        bgColor="#F7F7F7"
        p={2}
        rounded="8px"
      >
        {months.map((month, index) => {
          const isSelected = frequencyInfo.repeatIntervals.some(
            (option) => option === month.value
          );
          return (
            <Button
              key={index}
              handleClick={() => handleClick(month)}
              variant={isSelected ? 'primary' : 'outline'}
              customStyles={{
                py: '10px',
                borderColor: isSelected ? 'none' : '#BBBBBB80',
                color: isSelected ? 'white' : 'black',
              }}
            >
              {month.label}
            </Button>
          );
        })}
      </SimpleGrid>
    </HStack>
  );
};

export default Annually;
