import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryInfo from '~/lib/components/Common/SummaryInfo';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

const ContractDetails = () => {
  const {
    contractStartDate,
    contractEndDate,
    vendorStatusName,
    contractValue,
  } = useAppSelector((state) => state.vendor.vendorForm);

  const infoOne = [
    {
      label: 'Contract Start Date',
      value: contractStartDate
        ? dateFormatter(contractStartDate, 'DD / MM / YYYY', 'DD/MM/YYYY')
        : 'N/A',
    },
    {
      label: 'Contract End Date',
      value: contractEndDate
        ? dateFormatter(contractEndDate, 'DD / MM / YYYY', 'DD/MM/YYYY')
        : 'N/A',
    },
    {
      label: 'Contract Value',
      value: amountFormatter(contractValue ?? 0),
    },
    {
      label: 'Vendor Status',
      value: vendorStatusName,
    },
  ];
  return (
    <VStack width="full">
      <DetailHeader variant="primary">Contract Details</DetailHeader>
      <VStack width="full" spacing="20px">
        <SimpleGrid width="full" gap="20px" columns={2}>
          {infoOne.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default ContractDetails;
