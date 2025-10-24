import { useAppFormik } from '~/lib/hooks/useAppFormik';
import { Flex, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import {
  BackButton,
  Button,
  FormInputWrapper,
  FormTextInput,
} from '@repo/ui/components';
import { Field, FormikProvider } from 'formik';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  setSimulationData,
  updateAssetLifecycleSimulationForm,
} from '~/lib/redux/slices/AssetSlice';
import { maintenanceDepreciationSchema } from '~/lib/schemas/asset/lifeCycleSimulation.schema';
import MaintenanceFrequencyCost from './MaintenanceFrequencyCost';
import DepreciationModelUsage from './DepreciationModelUsage';
import {
  MaintenanceDepreciationFormValues,
  SimulationPayload,
} from '~/lib/interfaces/asset/lifeCycle.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useRunAssetLifecycleSimulationWizardMutation } from '~/lib/redux/services/asset/lifeCycle.services';
import moment from 'moment';

interface MaintenanceDepreciationParametersProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const MaintenanceDepreciationParameters = (
  props: MaintenanceDepreciationParametersProps
) => {
  const { activeStep, setActiveStep } = props;
  const dispatch = useAppDispatch();
  const [isCustomDepreciation, setIsCustomDepreciation] = useState(false);
  const [isCustomDetail, setIsCustomDetail] = useState(true);
  const state = useAppSelector((state) => state.asset.lifeCycleSimulationForm);
  const { handleSubmit } = useCustomMutation();
  const [simulateLifecycle, { isLoading }] =
    useRunAssetLifecycleSimulationWizardMutation();

  const formik = useAppFormik<MaintenanceDepreciationFormValues>({
    initialValues: {
      maintenanceFrequency: state?.maintenanceFrequency ?? null,
      maintenanceCost: state?.manintenanceCost ?? null,
      depreciationModel: state?.depreciationModel ?? null,
      residualValue: state?.residualValue ?? null,
      autoAdjust: state?.autoAdjust ?? false,
      scheduleType: state?.scheduleType ?? null,
      initialDepreciationRate: state?.initialDepreciationRate ?? null,
      adjustmentCurve: state?.adjustmentCurve ?? null,
      stepInterval: state?.stepInterval ?? null,
      annualCostBreakDown: state?.annualCostBreakDown ?? [],
    },
    validationSchema: maintenanceDepreciationSchema(
      isCustomDepreciation && isCustomDetail,
      isCustomDepreciation && !isCustomDetail
    ),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const payload: SimulationPayload = {
          assetParameters: {
            assetName: state.assetName!,
            assetCategoryId: state.categoryName!,
            acquisitionDate: moment(state.acquisitionDate, 'DD/MM/YYYY')
              .utc()
              .toISOString(),
            acquisitionCost: state.purchaseCost!,
            expectedUsefulLife: state.expectedUsefulLife!,
            currentAge: state.currentAge!,
            currentCondition: state.currentCondition!,
          },
          depreciationParameters: {
            depreciationMethod:
              values.depreciationModel !== 999
                ? values.depreciationModel!
                : null, //If it's not custom
            residualValue: values.residualValue!,
            maintenanceCost: values.maintenanceCost!,
            scheduleType: values.scheduleType ?? 0,
            initialDepreciationRate: values.initialDepreciationRate ?? 0,
            adjustmentCurve: values.adjustmentCurve ?? 0,
            stepInterval: values.stepInterval ?? 0,
            annualCostBreakdown:
              values.annualCostBreakDown?.map((item) => ({
                year: item.year!,
                depreciationRate: item.depreciationRate!,
              })) ?? [],
          },
          maintenanceFrequency: values.maintenanceFrequency!,
        };

        const response = await handleSubmit(simulateLifecycle, payload, '');

        if (response?.data) {
          dispatch(updateAssetLifecycleSimulationForm(payload));
          dispatch(setSimulationData(response?.data?.data));
          setActiveStep(3);
        }
      } catch (error) {
        console.error('Simulation Submit Error:', error);
      }
    },
  });

  useEffect(() => {
    if (formik.values.depreciationModel === 999) {
      setIsCustomDepreciation(true);
    } else {
      setIsCustomDepreciation(false);
    }
  }, [formik.values.depreciationModel]);

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
            <VStack
              spacing={{ base: '24px', lg: '45px' }}
              width="full"
              px={{ base: 4 }}
            >
              <MaintenanceFrequencyCost />
              <DepreciationModelUsage
                isCustomDetail={isCustomDetail}
                setIsCustomDetail={setIsCustomDetail}
              />
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
                type="submit"
                customStyles={{ width: '161px' }}
                isLoading={isLoading}
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
