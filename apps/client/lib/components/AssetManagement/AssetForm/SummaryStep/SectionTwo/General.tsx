import { Grid, GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import Info from './Info';
import { useAppSelector } from '~/lib/redux/hooks';

const General = () => {
  const assetFormDetails = useAppSelector((state) => state.asset.assetForm);
  const {
    assetName,
    categoryName,
    subCategoryName,
    brandName,
    modelRef,
    serialNo,
    weightKg,
    widthCm,
    heightCm,
    lengthCm,
    currentOwnerName,
    assignedToName,
    responsibleForName,
    facilityName,
    buildingName,
    floorName,
    departmentName,
    roomName,
    aisleName,
    shelfName,
    assetTypeName,
    statusName,
    countryName,
    stateName,
    lgaName,
  } = assetFormDetails;

  const row1 = [
    {
      label: 'Asset Name',
      value: assetName,
    },
    {
      label: 'Asset Type',
      value: assetTypeName,
    },
    {
      label: 'Asset Status',
      value: statusName,
    },
  ];

  const row2 = [
    {
      label: 'Location',
      value: [
        facilityName,
        buildingName,
        floorName,
        departmentName,
        roomName,
        aisleName,
        shelfName,
      ]
        .filter(Boolean)
        .join(', '),
    },
    {
      label: 'Category',
      value: categoryName,
    },
    {
      label: 'Sub-category',
      value: subCategoryName,
    },
  ];

  const row3 = [
    {
      label: 'Make',
      value: brandName,
    },
    {
      label: 'Model',
      value: modelRef,
    },
    {
      label: 'Serial Number',
      value: serialNo,
    },
  ];

  const row4 = [
    {
      label: 'Weight',
      value: weightKg + 'kg',
    },
    {
      label: 'Width',
      value: widthCm + 'cm',
    },
    {
      label: 'Height',
      value: heightCm + 'cm',
    },
    {
      label: 'Length',
      value: lengthCm + 'cm',
    },
  ];

  const row5 = [
    {
      label: 'Owner',
      value: currentOwnerName,
    },
    {
      label: 'Assigned to',
      value: assignedToName,
    },
    {
      label: 'Responsible for',
      value: responsibleForName,
    },
  ];

  const row6 = [
    {
      label: 'Country',
      value: countryName,
    },
    {
      label: 'State',
      value: stateName,
    },
    {
      label: 'LGA',
      value: lgaName,
    },
  ];

  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">General</DetailHeader>
      <VStack width="full" spacing="24px" alignItems="flex-start">
        {/* Row 1  */}
        <SimpleGrid columns={4} width="full">
          {row1.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
        {/* Row 6  */}
        <SimpleGrid columns={4} width="full">
          {row6.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
        {/* Row 2  */}
        <Grid templateColumns="repeat(4, 1fr)" width="full">
          <GridItem colSpan={3} width="full">
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
