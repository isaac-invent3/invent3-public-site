import { HStack, Icon, Progress, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';
import Detail from '../../UI/ContentDetails/Detail';
import { StarIcon } from '../../CustomIcons';

const PerformanceMetrics = () => {
  const info2 = [
    {
      label: 'Issue Resolution Time',
      value: '4 Days/Week',
    },
    {
      label: 'Contract Violations',
      value: '200',
    },
  ];
  return (
    <VStack width="full" spacing="16px">
      <HStack width="full" justifyContent="space-between">
        <Text size="md" fontWeight={700} color="primary.500">
          Performance Metrics
        </Text>
        <Button customStyles={{ height: '35px', width: 'max-content' }}>
          Rate Vendor
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
            label="Service Quality"
            labelMinWidth="min-content"
            itemContainerStyle={{ direction: 'column' }}
          >
            <HStack spacing="8px">
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <Icon
                    as={StarIcon}
                    boxSize="16px"
                    key={index}
                    color={index < 4 ? '#EABC30' : '#EAE9E9'}
                  />
                ))}
            </HStack>
          </Detail>
          <Detail
            label="Complaince Rate"
            labelMinWidth="min-content"
            itemContainerStyle={{ direction: 'column' }}
          >
            <HStack spacing="4px">
              <Text color="black">40%</Text>
              <Progress
                colorScheme="green"
                size="xs"
                value={20}
                rounded="full"
                width="121px"
                sx={{
                  '& > div': {
                    backgroundColor: 'primary.500',
                  },
                }}
              />
            </HStack>
          </Detail>
        </HStack>
        <HStack spacing="24px">
          {info2.map((item) => (
            <Detail
              label={item.label}
              value={item.value}
              labelMinWidth="min-content"
              itemContainerStyle={{ direction: 'column' }}
              valueStyle={{ size: 'lg' }}
            />
          ))}
        </HStack>
      </HStack>
    </VStack>
  );
};

export default PerformanceMetrics;
