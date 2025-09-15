import { Flex, Grid, GridItem, SimpleGrid, Skeleton } from '@chakra-ui/react';
import DetailSection from '../../../DetailSection';
import VendorDetails from './VendorDetails';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import { AcquisitionInfo } from '~/lib/interfaces/asset/general.interface';

interface InfoOneProps {
  isLoading: boolean;
  data: AcquisitionInfo | undefined;
}
const InfoOne = (props: InfoOneProps) => {
  const { isLoading, data } = props;

  const details = [
    {
      label: 'Acquisition Date:',
      value: data?.acquisitionDate
        ? dateFormatter(data?.acquisitionDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: 'Purchase Price:',
      value: data?.initialValue ? amountFormatter(data?.initialValue) : 'N/A',
    },
    {
      label: 'Resale Value:',
      value: data?.resalevalue ? amountFormatter(data?.resalevalue) : 'N/A',
    },
    {
      label: 'Scrap Value:',
      value: data?.scrapvalue ? amountFormatter(data?.scrapvalue) : 'N/A',
    },
    {
      label: 'Condition:',
      value: data?.conditionName ?? 'N/A',
    },
  ];

  const details2 = [
    {
      label: 'Start Date:',
      value: data?.warrantyStartDate
        ? dateFormatter(data?.warrantyStartDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: 'End Date:',
      value: data?.warrantyEndDate
        ? dateFormatter(data?.warrantyEndDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: 'Warranty Terms:',
      value: data?.warrantyDetails ?? 'N/A',
    },
  ];
  return (
    <SimpleGrid width="full" gap="24px" columns={{ base: 1, lg: 2 }}>
      <Flex width={{ base: 'full' }}>
        <Skeleton isLoaded={!isLoading} width="full">
          <DetailSection
            details={details}
            labelMinWidth="151px"
            header="Warranty Details"
          />
        </Skeleton>
      </Flex>
      <Flex width={{ base: 'full' }}>
        <Skeleton isLoaded={!isLoading} width="full">
          <DetailSection
            details={details2}
            labelMinWidth="151px"
            header="Warranty Details"
          />
        </Skeleton>
      </Flex>
    </SimpleGrid>
  );
};

export default InfoOne;
