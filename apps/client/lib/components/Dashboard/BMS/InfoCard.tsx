import { HStack, StackProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DropDown from '../Common/DropDown';
import { timeRangeOptions } from '~/lib/utils/constants';
import { Option } from '@repo/interfaces';

interface InfoCardProps {
  title: string;
  setSelectedTimeRange?: React.Dispatch<React.SetStateAction<Option | null>>;
  selectedTimeRange?: Option | null;
  extraHeader?: React.ReactNode;
  children: React.ReactNode;
  headerContainerStyle?: StackProps;
  containerStyle?: StackProps;
  options?: Option[];
}

const InfoCard = (props: InfoCardProps) => {
  const {
    title,
    extraHeader,
    selectedTimeRange,
    setSelectedTimeRange,
    children,
    headerContainerStyle,
    containerStyle,
    options,
  } = props;
  return (
    <VStack
      width="full"
      rounded="8px"
      bgColor="neutral.200"
      spacing={0}
      p="16px"
      height="full"
      {...containerStyle}
    >
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <VStack alignItems="flex-start" spacing="8px" {...headerContainerStyle}>
          <Text color="neutral.800" fontWeight={800} size="lg">
            {title}
          </Text>
          {extraHeader}
        </VStack>
        {setSelectedTimeRange && selectedTimeRange && (
          <DropDown
            options={options ?? timeRangeOptions}
            label="Timeline"
            handleClick={(option) => setSelectedTimeRange(option)}
            selectedOptions={selectedTimeRange}
            width="110px"
            containerStyles={{ bgColor: 'neutral.300', rounded: '8px' }}
            labelStyles={{ bgColor: 'neutral.300', color: 'black' }}
            selectedOptionStyles={{ color: 'black' }}
          />
        )}
      </HStack>
      {children}
    </VStack>
  );
};

export default InfoCard;
