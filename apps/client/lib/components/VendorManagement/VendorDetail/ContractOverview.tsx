import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';
import Detail from '../../UI/ContentDetails/Detail';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import { AiOutlineFilePdf } from 'react-icons/ai';

const ContractOverview = () => {
  const contractStartEndDate = [
    {
      label: 'Start Date',
      value: dateFormatter(new Date(), 'Do MMM, YYYY'),
    },
    {
      label: 'Expiry Date',
      value: dateFormatter(new Date(), 'Do MMM, YYYY'),
    },
  ];
  return (
    <VStack width="full" spacing="16px">
      <HStack width="full" justifyContent="space-between">
        <Text size="md" fontWeight={700} color="primary.500">
          Contract Overview
        </Text>
        <Button customStyles={{ height: '35px', width: 'max-content' }}>
          Edit Contract
        </Button>
      </HStack>
      <HStack
        width="full"
        px="16px"
        py="22px"
        borderWidth="0.7px"
        borderColor="#BBBBBBB2"
        rounded="8px"
        spacing="64px"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <HStack spacing="24px" alignItems="flex-start">
          <Detail
            label="Total Contract Value"
            value={amountFormatter(3000)}
            labelMinWidth="min-content"
            itemContainerStyle={{ direction: 'column' }}
          />
          <Detail
            label="Uploaded Service Agreement"
            labelMinWidth="min-content"
            itemContainerStyle={{ direction: 'column' }}
          >
            <HStack spacing="16px">
              <Icon as={AiOutlineFilePdf} boxSize="34px" color="black" />
              <Text color="neutral.800" size="lg">
                Service Agreement
              </Text>
            </HStack>
          </Detail>
        </HStack>
        <HStack spacing="24px">
          {contractStartEndDate.map((item) => (
            <Detail
              label={item.label}
              labelMinWidth="min-content"
              itemContainerStyle={{ direction: 'column' }}
            >
              <Text color="neutral.800" size="lg">
                {item.value}
              </Text>
            </Detail>
          ))}
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ContractOverview;
