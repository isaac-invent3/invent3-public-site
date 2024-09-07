import { Grid, GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import Info from './Info';

interface GeneralProps {
  assetFormDetails: AssetFormDetails;
}
const General = ({ assetFormDetails }: GeneralProps) => {
  const {
    name,
    assetCode,
    category,
    subCategory,
    make,
    model,
    serialNo,
    weight,
    width,
    height,
    depth,
    owner,
    department,
    assignedTo,
    responsibleFor,
  } = assetFormDetails;

  const row1 = [
    {
      label: 'Asset Name',
      value: name,
    },
    {
      label: 'Asset Code',
      value: assetCode,
    },
  ];

  const row2 = [
    {
      label: 'Category',
      value: category,
    },
    {
      label: 'Sub-category',
      value: subCategory,
    },
  ];

  const row3 = [
    {
      label: 'Make',
      value: make,
    },
    {
      label: 'Model',
      value: model,
    },
    {
      label: 'Serial Number',
      value: serialNo,
    },
  ];

  const row4 = [
    {
      label: 'Weight',
      value: weight,
    },
    {
      label: 'Width',
      value: width,
    },
    {
      label: 'Height',
      value: height,
    },
    {
      label: 'Depth',
      value: depth,
    },
  ];

  const row5 = [
    {
      label: 'Owner',
      value: owner,
    },
    {
      label: 'Department',
      value: department,
    },
    {
      label: 'Assigned to',
      value: assignedTo,
    },
    {
      label: 'Responsible for',
      value: responsibleFor,
    },
  ];

  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">General</DetailHeader>
      <VStack width="full" spacing="24px" alignItems="flex-start">
        {/* Row 1  */}
        <SimpleGrid columns={2} width="full">
          {row1.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
        {/* Row 2  */}
        <Grid templateColumns="repeat(4, 1fr)" width="full">
          <GridItem colSpan={2} width="full">
            <HStack width="full" spacing="16px" alignItems="flex-start">
              {row2.map((item) => (
                <Info {...item} key={item.label} />
              ))}
            </HStack>
          </GridItem>
        </Grid>
        {/* Row 3  */}
        <Grid templateColumns="repeat(4, 1fr)" width="full">
          <GridItem colSpan={2} width="full">
            <HStack width="full" spacing="16px" alignItems="flex-start">
              {row3.slice(0, 2).map((item) => (
                <Info {...item} key={item.label} />
              ))}
            </HStack>
          </GridItem>
          <GridItem colSpan={2} width="full">
            {row3.slice(2).map((item) => (
              <Info {...item} key={item.label} />
            ))}
          </GridItem>
        </Grid>
        {/* Row 4  */}
        <SimpleGrid columns={4} width="full">
          {row4.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
        {/* Row 5  */}
        <SimpleGrid columns={4} width="full">
          {row5.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default General;
