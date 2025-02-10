import { Grid, HStack, Icon, Progress, Text, VStack } from '@chakra-ui/react';
import { StarIcon } from '../../CustomIcons';
import Detail from '../../UI/ContentDetails/Detail';

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

        <HStack display={{ base: 'none', md: 'flex' }}>
          <Text as="a" color="#0366EF" size="md">
            Rate Vendor
          </Text>
          <Text> |</Text>
          <Text as="a" color="#0366EF" size="md">
            View Detailed Performance
          </Text>
        </HStack>
      </HStack>

      <Grid
        width="full"
        px={{ base: '10px', md: '16px' }}
        py="22px"
        borderWidth="0.7px"
        borderColor="#BBBBBBB2"
        rounded="8px"
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        justifyContent={{ md: 'space-between' }}
        alignItems="center"
        gap={{ base: '12px', md: '24px' }}
      >
        <Detail
          label="Service Quality"
          labelMinWidth="min-content"
          itemContainerStyle={{ direction: 'column' }}
        >
          <HStack spacing={{ base: '4px', md: '8px' }}>
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
              width={{ base: '70px', md: '121px' }}
              sx={{
                '& > div': {
                  backgroundColor: 'primary.500',
                },
              }}
            />
          </HStack>
        </Detail>
        {info2.map((item) => (
          <Detail
            label={item.label}
            value={item.value}
            labelMinWidth="min-content"
            itemContainerStyle={{ direction: 'column' }}
            valueStyle={{ size: { base: 'base', md: 'lg' } }}
          />
        ))}
      </Grid>
    </VStack>
  );
};

export default PerformanceMetrics;
