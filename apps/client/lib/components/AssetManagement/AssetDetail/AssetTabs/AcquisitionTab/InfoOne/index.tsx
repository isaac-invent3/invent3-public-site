import { Flex, Grid, GridItem, Skeleton } from '@chakra-ui/react';
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
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
      gap={{ base: '24px', md: '66px' }}
      width="full"
    >
      <GridItem colSpan={1} width="full">
        <Flex width={{ base: 'full', md: 'max-content' }} whiteSpace="nowrap">
          <Skeleton isLoaded={!isLoading} width="full">
            <DetailSection labelMinWidth="105px" details={details} />
          </Skeleton>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Skeleton
          isLoaded={!isLoading}
          width="full"
          rounded="8px"
          height="full"
          display={{ base: 'none', md: 'flex' }}
        >
          <VendorDetails data={data} />
        </Skeleton>
      </GridItem>
    </Grid>
  );
};

export default InfoOne;
