import { Flex, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { Map } from 'pigeon-maps';
import CardHeader from '../Common/CardHeader';

const CompanyLocation = () => {
  const [isMobile] = useMediaQuery('(max-width: 992px)');
  return (
    <VStack
      height="full"
      alignItems="flex-start"
      bgColor="white"
      rounded="8px"
      position="relative"
      overflow="hidden"
    >
      <Flex width="full" zIndex={99} py="15px" px="10px">
        <CardHeader>Company's Location</CardHeader>
      </Flex>
      <Map
        //@ts-ignore
        height={isMobile ? 382 : '100%'}
        defaultCenter={[9.082, 8.6753]}
        defaultZoom={6}
        attribution={false}
      />
    </VStack>
  );
};

export default CompanyLocation;
