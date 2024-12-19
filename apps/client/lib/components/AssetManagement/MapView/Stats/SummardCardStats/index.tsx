import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SummaryCard from './SummaryCard';
import { InfoProps } from '~/lib/interfaces/asset/general.interface';

interface SummaryCardStatsProps {
  // eslint-disable-next-line no-unused-vars
  setCurrentInfo?: (value: string) => void;
  infoOneSwitchText: string;
  infoTwoSwitchText: string;
  isLoading: boolean;
  info: {
    infoOne: InfoProps;
    infoTwo: InfoProps;
  };
}
const SummaryCardStats = (props: SummaryCardStatsProps) => {
  const {
    setCurrentInfo,
    infoOneSwitchText,
    infoTwoSwitchText,
    isLoading,
    info,
  } = props;
  const [localCurrentInfo, setLocalCurrentInfo] = useState(infoOneSwitchText);

  const isFirstInfo = localCurrentInfo === infoOneSwitchText;

  return (
    <Flex
      width="full"
      height="full"
      bgColor="white"
      position="relative"
      rounded="8px"
    >
      <VStack
        width="full"
        height="full"
        spacing="8px"
        rounded="8px"
        p="8px"
        alignItems="flex-start"
        bgColor={isFirstInfo ? info.infoOne.bgColor : info.infoTwo.bgColor}
        position="relative"
      >
        <HStack
          spacing="4px"
          justifyContent="flex-end"
          position="absolute"
          right={0}
          mr="8px"
        >
          <Text
            color={
              isFirstInfo ? info.infoOne.textColor : info.infoTwo.textColor
            }
            fontSize="8px"
            lineHeight="9.5px"
          >
            {infoOneSwitchText}
          </Text>
          <Flex
            height="12px"
            width="16px"
            rounded="8px"
            bgColor={isFirstInfo ? 'neutral.300' : 'primary.500'}
            p="1px"
            alignItems="center"
            justifyContent={isFirstInfo ? 'flex-start' : 'flex-end'}
            cursor="pointer"
            onClick={() => {
              setLocalCurrentInfo(
                isFirstInfo ? infoTwoSwitchText : infoOneSwitchText
              );
              setCurrentInfo &&
                setCurrentInfo(
                  isFirstInfo ? infoTwoSwitchText : infoOneSwitchText
                );
            }}
          >
            <Box
              width="8px"
              height="8px"
              rounded="full"
              bgColor={isFirstInfo ? 'black' : 'secondary.pale.500'}
            />
          </Flex>
          <Text
            color={
              isFirstInfo ? info.infoOne.textColor : info.infoTwo.textColor
            }
            fontSize="8px"
            lineHeight="9.5px"
          >
            {infoTwoSwitchText}
          </Text>
        </HStack>
        <VStack alignItems="flex-start" pt="8px">
          {localCurrentInfo === infoOneSwitchText && (
            <SummaryCard info={info.infoOne} isLoading={isLoading} />
          )}
          {localCurrentInfo === infoTwoSwitchText && (
            <SummaryCard info={info.infoTwo} isLoading={isLoading} />
          )}
        </VStack>
      </VStack>
    </Flex>
  );
};

export default SummaryCardStats;
