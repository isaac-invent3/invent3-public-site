import { VStack } from '@chakra-ui/react';
import DetailSection from '../../../DetailSection';
import { useAppSelector } from '~/lib/redux/hooks';

const OwnersInfo = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

  const { currentOwner, departmentName, assignedTo, employeeResponsible } =
    assetData;
  const details = [
    {
      label: 'Owner:',
      value: currentOwner ?? 'N/A',
    },
    {
      label: 'Department:',
      value: departmentName ?? 'N/A',
    },
    {
      label: 'Responsible for:',
      value: employeeResponsible ?? 'N/A',
    },
    {
      label: 'Assigned to:',
      value: assignedTo ?? 'N/A',
    },
  ];
  return (
    <VStack alignItems="flex-start" spacing="16px" width="full">
      <DetailSection
        labelMinWidth="101px"
        details={details}
        header="Owner's Info"
      />
    </VStack>
  );
};

export default OwnersInfo;
