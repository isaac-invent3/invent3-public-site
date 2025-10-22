import { Flex, HStack, VStack } from '@chakra-ui/react';
import { BackButton, Button } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateAssetLifecycleSimulationForm } from '~/lib/redux/slices/AssetSlice';
import { assetParameterSchema } from '~/lib/schemas/asset/lifeCycleSimulation.schema';
import AssetNameCategory from './AssetNameCategory';
import AcquisitionPurchaseCost from './AcquisitionPurchaseCost';
import LifeExpectancyCurrentAge from './LifeExpectancyCurrentAge';
import Location from './Location';
import CurrentCondition from './CurrentCondition';

interface AssetParametersProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}
const AssetParameters = (props: AssetParametersProps) => {
  const { activeStep, setActiveStep, onClose } = props;
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      assetName: null,
      categoryName: null,
      acquisitionDate: null,
      expectedUsefulLife: null,
      currentAge: null,
      purchasePrice: null,
      location: null,
      currentCondition: 0,
    },
    validationSchema: assetParameterSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateAssetLifecycleSimulationForm(values));
      setActiveStep(2);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 1 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form
          style={{ width: '100%', minHeight: '100%' }}
          onSubmit={formik.handleSubmit}
        >
          <VStack
            width="full"
            justifyContent="space-between"
            px={{ lg: 8 }}
            height="full"
          >
            <VStack spacing={{ base: '24px', lg: '32px' }} width="full">
              <AssetNameCategory />
              <AcquisitionPurchaseCost />
              <LifeExpectancyCurrentAge />
              <Location />
              <CurrentCondition />
            </VStack>
            <HStack width="full" justifyContent="space-between">
              <BackButton
                handleClick={onClose}
                variant="secondary"
                customStyles={{
                  height: '50px',
                  width: '96px',
                  justifyContent: 'center',
                }}
              />
              <Button
                customStyles={{ width: '161px' }}
                handleClick={formik.handleSubmit}
              >
                Next
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default AssetParameters;
