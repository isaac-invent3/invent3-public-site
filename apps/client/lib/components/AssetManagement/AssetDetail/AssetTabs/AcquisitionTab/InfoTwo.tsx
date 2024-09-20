import { Flex, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '../../DetailSection';
import { AcquisitionInfo } from '~/lib/interfaces/asset.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

interface InfoTwoProps {
  isLoading: boolean;
  data: AcquisitionInfo;
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
    <Grid templateColumns="repeat(3, 1fr)" gap="100px" width="full">
      <GridItem colSpan={1} width="full">
        <Flex minW="full">
          <Skeleton isLoaded={!isLoading} width="full">
            <DetailSection
              details={details1}
              minWidth="103px"
              header="Warranty Details"
            />
          </Skeleton>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex width="max-content">
          <Skeleton isLoaded={!isLoading} width="full">
            <DetailSection
              details={details2}
              minWidth="151px"
              header="Depreciation Details"
            />
          </Skeleton>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default InfoTwo;
