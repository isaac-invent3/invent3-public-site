import { SimpleGrid, VStack } from '@chakra-ui/react';
import DetailSection from '../../../DetailSection';
import { useAppSelector } from '~/lib/redux/hooks';
import MapView from './MapView';

const InfoTwo = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const { currentOwner, departmentName, assignedTo, responsibleFor } =
    assetData;
  const details = [
    {
      label: 'Owner',
      value: currentOwner ?? 'N/A',
    },
    {
      label: 'Department',
      value: departmentName ?? 'N/A',
    },
    {
      label: 'Responsible for',
      value: responsibleFor ?? 'N/A',
    },
    {
      label: 'Assigned to',
      value: assignedTo ?? 'N/A',
    },
  ];
  return (
    <SimpleGrid
      columns={2}
      width="full"
      gap="74px"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <VStack alignItems="flex-start" spacing="16px">
        <DetailSection
          minWidth="101px"
          details={details}
          header="Owner's Info"
        />
      </VStack>
      <MapView />
    </SimpleGrid>
  );
};

export default InfoTwo;
