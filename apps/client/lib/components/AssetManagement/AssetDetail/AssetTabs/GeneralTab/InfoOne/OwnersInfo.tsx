import { VStack } from '@chakra-ui/react';
import { useAppSelector } from '~/lib/redux/hooks';
import Detail from '~/lib/components/UI/ContentDetails/Detail';

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
    <VStack alignItems="flex-start" spacing="8px" width="full">
      {details.map((item, index) => (
        <Detail {...item} key={index} labelMinWidth="100px" />
      ))}
    </VStack>
  );
};

export default OwnersInfo;
