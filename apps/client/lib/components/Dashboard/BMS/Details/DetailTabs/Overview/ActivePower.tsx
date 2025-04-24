import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import InfoCard from '../../../InfoCard';
import { useGetBMSEnergyConsumedByBMSCategoryQuery } from '~/lib/redux/services/dashboard/bms.services';
import { useParams } from 'next/navigation';
import _ from 'lodash';

interface ActivePowerProps {
  title?: string;
}
const ActivePower = ({ title }: ActivePowerProps) => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const [total, setTotal] = useState(0);
  const { data, isLoading } = useGetBMSEnergyConsumedByBMSCategoryQuery(
    { facilityId: id },
    { skip: !id }
  );
  const progress = (total / 100) * 100;
  const [sortedData, setSortedData] = useState<
    { energyConsumed: number; category: string }[]
  >([]);

  useEffect(() => {
    if (data?.data) {
      const totalEnergy = _.sumBy(data.data, 'energyConsumed');
      const sorted = _.orderBy(data.data, ['energyConsumed'], ['desc']);

      setTotal(totalEnergy);
      setSortedData(sorted);
    }
  }, [data]);

  const minOpacity = 0.2;
  const maxOpacity = 1;
  const opacityStep = (maxOpacity - minOpacity) / (sortedData.length - 1);

  return (
    <InfoCard
      title={title ?? 'Active Power'}
      containerStyle={{
        minH: { base: '342px', lg: 'full' },
        justifyContent: 'space-between',
      }}
    >
      <Stack
        width="full"
        direction={{ base: 'column', lg: 'row' }}
        justifyContent="center"
        alignItems={{ base: 'center', lg: 'flex-start' }}
        spacing={{ base: '24px', lg: '36px' }}
        mt="40px"
      >
        <VStack spacing="56px">
          <Flex
            width="144px"
            height="144px"
            rounded="full"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {/* Outer circle with neutral background */}
            <Box
              width="144px"
              height="144px"
              rounded="full"
              bg="#E0E0E0"
              position="absolute"
            />

            {/* Gradient progress ring */}
            <Box
              width="144px"
              height="144px"
              rounded="full"
              position="absolute"
              // bg={`conic-gradient(rgba(23, 161, 250, 0.5) ${progress}%, #E0E0E0 ${progress}%)`}
              bg={`conic-gradient(
              rgba(23, 161, 250, 0.6) 0%,
              rgba(23, 161, 250, 0.4) ${progress / 2}%,
              #0E2642 ${progress}%,
              #E0E0E0 ${progress}%
            )`}
            />

            {/* Inner circle to create ring appearance */}
            <Flex
              width="120px"
              height="120px"
              rounded="full"
              bg="#F2F1F1"
              zIndex={1}
              justifyContent="center"
              alignItems="center"
            >
              <VStack spacing="2px">
                <Text fontWeight={800} fontSize="36px" lineHeight="100%">
                  {total}
                </Text>
                <Text color="neutral.600">KWh</Text>
              </VStack>
            </Flex>
          </Flex>
          <VStack spacing="8px">
            <Text fontWeight={700} color="neutral.600">
              Most Usage
            </Text>
            <Text fontWeight={800} color="neutral.800" size="md">
              {sortedData?.[0]?.category ?? '-'}
            </Text>
          </VStack>
        </VStack>

        <VStack spacing="16px">
          {sortedData?.map((item, index) => {
            const opacity = maxOpacity - index * opacityStep;
            const width =
              (item.energyConsumed * 74) / (sortedData[0]?.energyConsumed ?? 1);
            return (
              <SimpleGrid
                columns={3}
                spacing="11px"
                key={index}
                alignItems="center"
              >
                {/* <HStack width="100px" bgColor="red"> */}
                <Text color="neutral.600" textAlign="right" whiteSpace="nowrap">
                  {item.category}
                </Text>
                {/* </HStack> */}
                <Box
                  key={item.category}
                  height="7px"
                  width={width}
                  bg="#000000"
                  opacity={opacity}
                />
                <Text color="neutral.600">{item.energyConsumed}KWh</Text>
              </SimpleGrid>
            );
          })}
        </VStack>
      </Stack>
    </InfoCard>
  );
};

export default ActivePower;
