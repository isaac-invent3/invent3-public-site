import { Flex, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import {
  BackButton,
  Button,
  FormInputWrapper,
  FormTextInput,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateAssetLifecycleSimulationForm } from '~/lib/redux/slices/AssetSlice';
import { maintenanceDepreciationSchema } from '~/lib/schemas/asset/lifeCycleSimulation.schema';
import MaintenanceFrequencyCost from './MaintenanceFrequencyCost';
import DepreciationModelUsage from './DepreciationModelUsage';

interface MaintenanceDepreciationParametersProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const MaintenanceDepreciationParameters = (
  props: MaintenanceDepreciationParametersProps
) => {
  const { activeStep, setActiveStep } = props;
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      maintenanceFrequency: null,
      maintenanceCost: null,
      depreciationModel: null,
      residualValue: null,
      autoAdjust: false,
    },
    validationSchema: maintenanceDepreciationSchema,
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
      display={activeStep === 2 ? 'flex' : 'none'}
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
            <VStack spacing={{ base: '24px', lg: '45px' }} width="full">
              <MaintenanceFrequencyCost />
              <DepreciationModelUsage />
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
                gap={{ base: '24px' }}
                width="full"
              >
                <GridItem colSpan={1} width="full">
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="16px"
                    title="Residual Value"
                    isRequired
                    description="Enter the estimated value of the asset after its useful life."
                  >
                    <Field
                      as={FormTextInput}
                      name="residualValue"
                      type="number"
                      label="Residual Value"
                    />
                  </FormInputWrapper>
                </GridItem>
              </Grid>
            </VStack>
            <HStack width="full" justifyContent="space-between">
              <BackButton
                handleClick={() => setActiveStep(1)}
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

export default MaintenanceDepreciationParameters;
