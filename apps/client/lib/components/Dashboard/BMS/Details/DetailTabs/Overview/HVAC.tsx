import React from 'react';
import { Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import InfoCard from '../../../InfoCard';
import Image from 'next/image';

interface ItemDetailProps {
  icon: string;
  value: string;
  title: string;
}
const ItemDetail = (props: ItemDetailProps) => {
  const { icon, value, title } = props;
  return (
    <VStack spacing="8px">
      <Flex width="24px" height="24px" position="relative">
        <Image src={icon} fill alt="icon" />
      </Flex>
      <Text fontSize="28px" fontWeight={800} lineHeight="100%">
        {value}
      </Text>
      <Text color="neutral.600">{title}</Text>
    </VStack>
  );
};

const HVAC = () => {
  const content = [
    {
      title: 'Average Temperature',
      value: '22oC',
      icon: '/thermometer.png',
    },
    {
      title: 'Humidity Levels',
      value: '45%',
      icon: '/humidity.png',
    },
    {
      title: 'kWh / month',
      value: '30,000',
      icon: '/air-conditioner.png',
    },
  ];
  return (
    <InfoCard
      title="HVAC"
      containerStyle={{
        minH: { base: '342px', lg: 'full' },
        justifyContent: 'space-between',
      }}
    >
      <Stack
        width="full"
        direction="column"
        mt="19.5px"
        // spacing="84px"
        height="full"
        justifyContent="space-between"
      >
        <HStack spacing="17px">
          <Text
            fontSize="68px"
            lineHeight="100%"
            fontWeight={800}
            color="#00A129"
          >
            92%
          </Text>
          <Text color="neutral.800" fontWeight={800} size="md">
            Operational Efficiency
          </Text>
        </HStack>

        <Flex width="full" justifyContent="center">
          <HStack justifyContent={{ base: '18px', lg: '10px' }}>
            {content.map((item, index) => (
              <ItemDetail {...item} key={index} />
            ))}
          </HStack>
        </Flex>
      </Stack>
    </InfoCard>
  );
};

export default HVAC;
