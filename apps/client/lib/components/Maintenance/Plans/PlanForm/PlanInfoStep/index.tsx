import { Flex, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import {
  FormActionButtons,
  FormInputWrapper,
  RadioBox,
} from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AssetSelect from '~/lib/components/Common/SelectComponents/AssetSelect';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetTypeByIdQuery } from '~/lib/redux/services/asset/types.services';
import { updatePlanForm } from '~/lib/redux/slices/MaintenanceSlice';
import { planSchema } from '~/lib/schemas/maintenance.schema';
import {
  MAINTENANCE_PLAN_ENUM,
  planScopeOptions,
  ROUTES,
} from '~/lib/utils/constants';
import EndDate from '../../Common/EndDate';
import Owner from '../../Common/Owner';
import PlanTitle from '../../Common/PlanTitle';
import StartDate from '../../Common/StartDate';
import AssetGroupContext from './AssetGroupContext';
import AssetGroupType from './AssetGroupType';

interface PlanInfoStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const PlanInfoStep = (props: PlanInfoStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const maintenanceSlice = useAppSelector((state) => state.maintenance);
  const plan = maintenanceSlice.planForm;
  const dispatch = useAppDispatch();
  const [isDefaultPlan, setIsDefaultPlan] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [_, setCanProceed] = useState(true);
  const [inputtedStartDate, setInputtedStartDate] = useState<Date | undefined>(
    undefined
  );

  const initialValues = {
    planName: plan?.planName ?? null,
    startDate: plan?.startDate ?? null,
    endDate: plan?.endDate ?? null,
    ownerId: plan?.ownerId ?? null,
    assetId: plan?.assetId ?? null,
    assetGroupTypeID: plan?.assetGroupTypeID ?? null,
    assetGroupContextID: plan?.assetGroupContextID ?? null,
    cost: plan?.cost ?? null,
    planScope: plan?.planName
      ? plan?.assetId
        ? 'asset'
        : 'asset_group'
      : 'asset',
  };
  const previousDay = moment().subtract(1, 'days').format('DD/MM/YYYY');
  const todayDate = moment().format('DD/MM/YYYY');

  const formik = useFormik({
    initialValues,
    validationSchema: planSchema(
      isDefaultPlan,
      true,
      type === 'create' ? previousDay : undefined,
      type === 'create'
        ? (moment(inputtedStartDate).format('DD/MM/YYYY') ?? undefined)
        : todayDate
    ),
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(
        updatePlanForm({
          planName: values.planName,
          ownerId: values.ownerId,
          ...(values.planScope === 'asset'
            ? { assetId: values.assetId }
            : {
                assetGroupTypeID: values.assetGroupTypeID,
                assetGroupContextID: values.assetGroupContextID,
              }),
          startDate: values.startDate,
          endDate: values.endDate,
          planTypeId: isDefaultPlan
            ? MAINTENANCE_PLAN_ENUM.default
            : MAINTENANCE_PLAN_ENUM.custom,
          planTypeName: isDefaultPlan ? 'Default' : 'Custom',
        })
      );
      setActiveStep(2);
    },
  });

  const { data: assetTypeData } = useGetAssetTypeByIdQuery(
    { id: formik.values.assetGroupContextID ?? undefined },
    { skip: formik.values.assetGroupContextID === undefined }
  );

  // Set if it is a default plan to be created or not based on the plan scope (Used for Schema validation)
  useEffect(() => {
    setCanProceed(false);
    if (formik.values.planScope) {
      if (formik.values.planScope === 'asset') {
        setIsDefaultPlan(false);
      } else {
        setIsDefaultPlan(true);
      }
    }
  }, [formik.values.planScope]);

  // Temporarily proceed if it's asset group until endpoint to validate is available
  useEffect(() => {
    if (formik.values.assetGroupContextID) {
      setCanProceed(true);
    }
  }, [formik.values.assetGroupContextID]);

  // Proceed if either the asset of asset type selected doesn't have a maintenance plan
  useEffect(() => {
    if (
      formik.values.planScope === 'asset_group' &&
      formik.values.assetGroupContextID
    ) {
      setCanProceed(true);
    }
  }, [assetTypeData, formik.values.planScope]);

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 1 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            width="full"
            alignItems="flex-start"
            position="relative"
            bgColor="white"
            pt="26px"
            pl="16px"
            pb="24px"
            pr="41px"
            rounded="6px"
            minH="60vh"
          >
            <VStack width="full" spacing="36px">
              <FormInputWrapper
                sectionMaxWidth="141px"
                customSpacing="40px"
                title="Plan Scope"
                description="Define the coverage and objectives of the plan."
                isRequired
              >
                <HStack spacing={{ base: '40px', md: '73px' }}>
                  {planScopeOptions.map((item, index) => (
                    <HStack key={index} spacing="16px">
                      <RadioBox
                        handleClick={() =>
                          formik.setFieldValue('planScope', item.value)
                        }
                        isSelected={formik.values.planScope === item.value}
                      />
                      <Text color="black" size="md">
                        {item.label}
                      </Text>
                    </HStack>
                  ))}
                </HStack>
              </FormInputWrapper>

              {formik.values.planScope && (
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  gap="40px"
                  width="full"
                >
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="40px"
                    title={
                      formik.values.planScope === 'asset'
                        ? 'Asset'
                        : 'Group Type'
                    }
                    description={`${formik.values.planScope === 'asset' ? 'Choose the type of asset for maintenance.' : 'Select the relevant group for the plan'}`}
                    isRequired
                  >
                    {formik.values.planScope === 'asset' ? (
                      <AssetSelect
                        selectName="assetId"
                        selectTitle="Asset"
                        defaultInputValue={plan?.assetName}
                        handleSelect={(option) =>
                          dispatch(updatePlanForm({ assetName: option.label }))
                        }
                      />
                    ) : (
                      <AssetGroupType />
                    )}
                  </FormInputWrapper>

                  {formik.values.planScope === 'asset_group' &&
                    formik.values.assetGroupTypeID && <AssetGroupContext />}
                </SimpleGrid>
              )}

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="40px" width="full">
                <PlanTitle sectionMaxWidth="141px" spacing="40px" />
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="40px" width="full">
                <StartDate
                  sectionMaxWidth="141px"
                  spacing="40px"
                  handleSelectedDate={(date) => setInputtedStartDate(date)}
                  buttonStyle={{
                    opacity: type === 'edit' ? 0.5 : 1,
                    pointerEvents: type == 'edit' ? 'none' : 'initial',
                  }}
                />
                <EndDate
                  sectionMaxWidth="141px"
                  spacing="40px"
                  minDate={inputtedStartDate ?? new Date()}
                />
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="40px" width="full">
                <Owner
                  sectionMaxWidth="141px"
                  spacing="40px"
                  defaultName={plan?.owner}
                />
              </SimpleGrid>
            </VStack>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.MAINTENANCE}`}
              totalStep={3}
              activeStep={1}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default PlanInfoStep;
