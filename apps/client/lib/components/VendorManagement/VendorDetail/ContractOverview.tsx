import {
  Grid,
  HStack,
  Icon,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import Detail from '../../UI/ContentDetails/Detail';

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
  const [isMobile] = useMediaQuery('(max-width: 480px)');

  return (
    <VStack width="full" spacing="16px">
      <HStack width="full" justifyContent="space-between">
        <Text size="md" fontWeight={700} color="primary.500">
          Contract Overview
        </Text>
        <Text as="a" color="#0366EF" size="md">
          Edit Contract
        </Text>
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
          label="Total Contract Value"
          value={amountFormatter(3000)}
          labelMinWidth="min-content"
          itemContainerStyle={{ direction: 'column' }}
        />

        {contractStartEndDate.map((item) => (
          <Detail
            label={item.label}
            labelMinWidth="min-content"
            itemContainerStyle={{ direction: 'column' }}
          >
            <Text color="neutral.800" size={{ base: 'base', md: 'lg' }}>
              {item.value}
            </Text>
          </Detail>
        ))}

        <Detail
          label="Uploaded Service Agreement"
          labelMinWidth="min-content"
          itemContainerStyle={{
            direction: 'column',
            marginLeft: { md: '-1em' },
          }}
        >
          <HStack spacing="8px">
            <Icon
              as={AiOutlineFilePdf}
              boxSize={{ base: '16px', md: '20px' }}
              color="black"
            />
            <Text color="#0366EF" size={{ base: 'base', md: 'lg' }}>
              Service Agreement
            </Text>
          </HStack>
        </Detail>
      </Grid>
    </VStack>
  );
};

export default ContractOverview;
