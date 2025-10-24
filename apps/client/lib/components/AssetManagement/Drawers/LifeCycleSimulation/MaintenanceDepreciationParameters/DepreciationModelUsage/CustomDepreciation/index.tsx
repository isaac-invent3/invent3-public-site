import { HStack, Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Manual from './Manual';
import CustomDetail from './CustomDetail';
import { SlideTransition } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import { MaintenanceDepreciationFormValues } from '~/lib/interfaces/asset/lifeCycle.interfaces';

const CustomDepreciation = ({
  isCustomDetail,
  setIsCustomDetail,
}: {
  isCustomDetail: boolean;
  setIsCustomDetail: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setFieldValue } =
    useFormikContext<MaintenanceDepreciationFormValues>();

  const handleToggle = () => {
    if (!isCustomDetail) {
      // Switching to Custom — reset manual data
      setFieldValue('annualCostBreakDown', []);
    }
    setIsCustomDetail(!isCustomDetail);
  };

  return (
    <VStack
      width="full"
      bgColor="neutral.300"
      p={4}
      pb={8}
      rounded="8px"
      spacing={8}
      maxW="80%"
    >
      <HStack spacing={4} width="full">
        <Text color="black" size="md" lineHeight="140%">
          Set custom details
        </Text>

        <Switch size="md" isChecked={!isCustomDetail} onChange={handleToggle} />

        <Text color="black" size="md" lineHeight="140%">
          Set Details Manually
        </Text>
      </HStack>

      <SlideTransition trigger={true}>
        {isCustomDetail ? <CustomDetail /> : <Manual />}
      </SlideTransition>
    </VStack>
  );
};

export default CustomDepreciation;
