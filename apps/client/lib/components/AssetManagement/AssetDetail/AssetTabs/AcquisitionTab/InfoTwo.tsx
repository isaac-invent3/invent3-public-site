import { Flex, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import DetailSection from '../../DetailSection';
import { AcquisitionInfo } from '~/lib/interfaces/asset/general.interface';
import { dateFormatter } from '~/lib/utils/Formatters';
import VendorDetails from './InfoOne/VendorDetails';

interface InfoTwoProps {
  isLoading: boolean;
  data: AcquisitionInfo | undefined;
}
const InfoTwo = (props: InfoTwoProps) => {
  const { isLoading, data } = props;
  const details1 = [
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

  const details2 = [
    {
      label: 'Depreciation Start Date:',
      value: data?.depreciationDate
        ? dateFormatter(data?.depreciationDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: 'Depreciation Method:',
      value: data?.depreciationMethod ?? 'N/A',
    },
    {
      label: 'Depreciation Rate:',
      value: data?.depreciationRate ?? 'N/A',
    },
  ];

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
      gap={{ base: '24px', md: '66px' }}
      width="full"
    >
      <GridItem colSpan={{ base: 2, md: 1 }} width="full">
        <Flex width="full">
          <Skeleton isLoaded={!isLoading} width="full">
            <DetailSection
              details={details1}
              labelMinWidth="103px"
              header="Warranty Details"
            />
          </Skeleton>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex width={{ base: 'full', md: 'max-content' }}>
          <Skeleton isLoaded={!isLoading} width="full">
            <DetailSection
              details={details2}
              labelMinWidth="151px"
              header="Depreciation Details"
            />
          </Skeleton>
        </Flex>
      </GridItem>
      <GridItem colSpan={2} minW="full">
        <Skeleton
          isLoaded={!isLoading}
          width="full"
          rounded="8px"
          height="full"
          display={{ base: 'flex', md: 'none' }}
        >
          <VendorDetails data={data} />
        </Skeleton>
      </GridItem>
    </Grid>
  );
};

export default InfoTwo;
