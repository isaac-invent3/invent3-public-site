import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BackButton, Button, GenericDrawer } from '@repo/ui/components';
import React from 'react';
import Detail from '~/lib/components/Profile/Detail';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { ThirdPartyIntegration } from '~/lib/interfaces/integration.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

interface ThirdPartyDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: ThirdPartyIntegration;
}

const ThirdPartyDetailDrawer = (props: ThirdPartyDetailDrawerProps) => {
  const { isOpen, onClose, data } = props;

  const detailOne = [
    {
      label: 'Inegration Name',
      value: data?.integrationName ?? 'N/A',
    },
    {
      label: 'Inegration Type',
      value: data?.integrationTypeName ?? 'N/A',
    },
    {
      label: 'Authentication',
      value: data?.authenticationMethodName ?? 'N/A',
    },
  ];

  const detailTwo = [
    {
      label: 'Last Sync Date',
      value: data?.lastSyncDate ?? 'N/A',
    },
    {
      label: '',
      value: '',
    },
    {
      label: 'Sync Frequency',
      value: data?.syncFrequencyName ?? 'N/A',
    },
  ];

  const detailThree = [
    {
      label: 'API Endpoint',
      value: data?.endpoint ?? 'N/A',
    },
  ];

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="548px">
      <DrawerHeader p={0} m={0}>
        <HStack
          pt="16px"
          pb="40px"
          px={{ base: '24px', lg: '32px' }}
          width="full"
          justifyContent="space-between"
        >
          <BackButton handleClick={onClose} />
        </HStack>
      </DrawerHeader>
      <DrawerBody p={0} px={{ base: '24px', lg: '32px' }}>
        <VStack width="full" alignItems="flex-start" spacing="56px">
          <VStack alignItems="flex-start" spacing="32px" width="full">
            <Heading
              size={{ base: 'lg', lg: 'xl' }}
              color="primary.500"
              fontWeight={800}
            >
              Third Party Integration
            </Heading>
            <HStack
              width="full"
              bgColor="#EBEBEB"
              rounded="8px"
              spacing="24px"
              pr="8px"
            >
              <Flex bgColor="#01B5F00D" width="100px" height="100px" />
              <VStack alignItems="flex-start" spacing="8px" py="10px">
                <Heading
                  size={{ base: 'lg', lg: 'xl' }}
                  color="primary.500"
                  fontWeight={800}
                >
                  {data?.integrationName}
                </Heading>
                <HStack spacing="16px">
                  <Text color="neutral.600" fontWeight={700}>
                    Connection Status:
                  </Text>
                  <GenericStatusBox text="Connected" colorCode="#07CC3B" />
                </HStack>
              </VStack>
            </HStack>
          </VStack>

          <VStack spacing="32px" width="full">
            <SimpleGrid columns={{ base: 2, md: 3 }} gap="24px" width="full">
              {detailOne.map((item, index) => (
                <Detail
                  {...item}
                  key={index}
                  labelStyle={{ fontWeight: 700 }}
                  valueStyle={{ size: 'lg', fontWeight: 700 }}
                />
              ))}
            </SimpleGrid>
            <SimpleGrid columns={{ base: 2, lg: 3 }} gap="24px" width="full">
              {detailTwo.map((item, index) => (
                <Detail
                  {...item}
                  key={index}
                  labelStyle={{ fontWeight: 700 }}
                  valueStyle={{ size: 'lg', fontWeight: 700 }}
                />
              ))}
            </SimpleGrid>
            <SimpleGrid columns={{ base: 2, lg: 3 }} gap="24px" width="full">
              {detailThree.map((item, index) => (
                <Detail
                  {...item}
                  key={index}
                  labelStyle={{ fontWeight: 700 }}
                  valueStyle={{ size: 'lg', fontWeight: 700 }}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </VStack>
      </DrawerBody>
      <DrawerFooter pb="32px">
        <HStack spacing="16px" width="full">
          <Button variant="secondary">Disconnect Integration</Button>
          <Button variant="outline">Edit Connection</Button>
          <Button variant="primary">Sync Now</Button>
        </HStack>
      </DrawerFooter>
    </GenericDrawer>
  );
};

export default ThirdPartyDetailDrawer;
