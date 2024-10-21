/* eslint-disable no-unused-vars */
import { Flex, HStack, useToast, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import AssetSelect from '~/lib/components/Common/AssetSelect';
import AssetTypeSelect from '~/lib/components/Common/AssetTypeSelect';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import SelectInput from '~/lib/components/UI/Select';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';
import { useGetAssetTypeByIdQuery } from '~/lib/redux/services/asset/types.services';
import {
  useCreateMaintenancePlanMutation,
  useGetAssetCustomMaintenancePlanByAssetGuidQuery,
  useUpdateMaintenancePlanMutation,
} from '~/lib/redux/services/maintenance/plan.services';
import { planSchema } from '~/lib/schemas/maintenance.schema';
import { MAINTENANCE_PLAN_ENUM, planScopeOptions } from '~/lib/utils/constants';
import PlanTitle from '../../Common/PlanTitle';
import Owner from '../../Common/Owner';
import StartDate from '../../Common/StartDate';
import EndDate from '../../Common/EndDate';
import Frequency from '../../../Common/Frequency';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';

interface PlanInfoStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const PlanInfoStep = (props: PlanInfoStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const maintenanceSlice = useAppSelector((state) => state.maintenance);
  const plan = maintenanceSlice.planForm;
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [isDefaultPlan, setIsDefaultPlan] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [createPlan, { isLoading }] = useCreateMaintenancePlanMutation({});
  const [updatePlan, { isLoading: isUpdating }] =
    useUpdateMaintenancePlanMutation({});

  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const initialValues = {
    planName: plan?.planName ?? null,
    frequencyId: plan?.frequencyId ?? null,
    startDate: plan?.startDate ?? null,
    endDate: plan?.endDate ?? null,
    ownerId: plan?.ownerId ?? null,
    assetId: plan?.assetId ?? null,
    assetTypeId: plan?.assetTypeId ?? null,
    cost: plan?.cost ?? null,
    planScope: plan ? (plan?.assetId ? 'asset' : 'asset_type') : null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: planSchema(isDefaultPlan, true),
    enableReinitialize: true,
    onSubmit: async (values) => {
      const info = {
        planName: values.planName,
        frequencyId: values.frequencyId,
        ownerId: values.ownerId,
        ...(values.planScope === 'asset'
          ? { assetId: values.assetId }
          : { assetTypeId: values.assetTypeId }),
        startDate: moment(values.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        endDate: moment(values.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        planTypeId: isDefaultPlan
          ? MAINTENANCE_PLAN_ENUM.default
          : MAINTENANCE_PLAN_ENUM.custom,
      };
      if (type === 'create') {
        if (!maintenanceSlice.scheduleForm.planId) {
          const response = await handleSubmit(
            createPlan,
            { ...info, createdBy: data?.user?.username },
            ''
          );
          if (response?.data) {
            const maintenancePlan: MaintenancePlan =
              response?.data?.data?.maintenancePlanInfoHeader;
            dispatch(
              updateScheduleForm({
                planId: response?.data?.data?.maintenancePlanId,
                maintenancePlanInfo: {
                  planName: maintenancePlan?.planName,
                  planType: maintenancePlan?.planTypeName,
                  planStatus: maintenancePlan?.planStatusName,
                  assetName: assetData?.data?.assetName,
                  assetTypeName: maintenancePlan?.assetTypeName,
                  startDate: maintenancePlan?.startDate,
                  endDate: maintenancePlan?.endDate,
                },
              })
            );
          }
          setActiveStep(1);
        }
      } else {
        const response = await handleSubmit(
          updatePlan,
          {
            id: plan?.planId,
            ...info,
            maintenancePlanId: plan?.planId,
            lastModifiedBy: data?.user?.username,
          },
          ''
        );
        if (response?.data) {
          const maintenancePlan: MaintenancePlan =
            response?.data?.data?.maintenancePlanInfoHeader;
          dispatch(
            updateScheduleForm({
              planId: plan?.planId,
              maintenancePlanInfo: {
                planName: maintenancePlan?.planName,
                planType: maintenancePlan?.planTypeName,
                planStatus: maintenancePlan?.planStatusName,
                assetName: assetData?.data?.assetName,
                assetTypeName: maintenancePlan?.assetTypeName,
                startDate: maintenancePlan?.startDate,
                endDate: maintenancePlan?.endDate,
              },
            })
          );
        }
        setActiveStep(1);
      }
    },
  });

  const { data: assetData } = useGetAssetInfoHeaderByIdQuery(
    formik.values.assetId,
    { skip: !formik.values.assetId }
  );
  const { data: assetTypeData } = useGetAssetTypeByIdQuery(
    formik.values.assetTypeId,
    { skip: !formik.values.assetTypeId }
  );
  const { data: assetCustomPlans, error } =
    useGetAssetCustomMaintenancePlanByAssetGuidQuery(assetData?.data?.guid, {
      skip: !assetData?.data?.guid,
    });

  // Handles Toast Error
  const showToast = (description: string) => {
    toast({
      title: 'Error',
      description,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  // Set if it is a default plan to be created or not based on the plan scope (Used for Schema validation)
  useEffect(() => {
    if (formik.values.planScope) {
      if (formik.values.planScope === 'asset') {
        setIsDefaultPlan(false);
      } else {
        setIsDefaultPlan(true);
      }
    }
  }, [formik.values.planScope]);

  // Reset Proceed Flag to false if assetId and assetTypeId is changed
  useEffect(() => {
    setCanProceed(false);
  }, [formik.values.assetId, formik.values.assetTypeId]);

  // Proceed if either the asset of asset type selected doesn't have a maintenance plan
  useEffect(() => {
    if (assetCustomPlans || assetTypeData || error) {
      if (formik.values.planScope === 'asset') {
        if (error) {
          setCanProceed(true);
        } else if (
          type === 'create' ||
          plan?.assetId !== formik.values.assetId
        ) {
          showToast('This Asset already have a customized maintenance plan');
        } else {
          setCanProceed(true);
        }
      }
      if (formik.values.planScope === 'asset_type') {
        if (assetTypeData?.data?.maintenancePlanId === null) {
          setCanProceed(true);
        } else {
          showToast('This Asset Type already have a default maintenance plan');
        }
      }
    }
  }, [assetTypeData, error, assetCustomPlans]);

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 0 ? 'flex' : 'none'}
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
            <VStack width="full" maxW="50%" spacing="36px">
              <PlanTitle sectionMaxWidth="141px" spacing="40px" />

              <HStack width="full" alignItems="flex-start" spacing="40px">
                <Flex width="full" maxW="141px">
                  <SectionInfo
                    title="Plan Scope"
                    info="Add name that users can likely search with"
                    isRequired
                  />
                </Flex>
                <SelectInput
                  name="planScope"
                  title="Plan Scope"
                  options={planScopeOptions}
                  isSearchable={false}
                />
              </HStack>
              {formik.values.planScope && (
                <HStack width="full" alignItems="flex-start" spacing="40px">
                  <Flex width="full" maxW="141px">
                    <SectionInfo
                      title={
                        formik.values.planScope === 'asset'
                          ? 'Asset'
                          : 'Asset Type'
                      }
                      info="Add name that users can likely search with"
                      isRequired
                    />
                  </Flex>
                  {formik.values.planScope === 'asset' ? (
                    <AssetSelect selectName="assetId" selectTitle="Asset" />
                  ) : (
                    <AssetTypeSelect
                      selectName="assetTypeId"
                      selectTitle="Asset Type"
                    />
                  )}
                </HStack>
              )}
              <Frequency
                sectionMaxWidth="141px"
                spacing="40px"
                defaultName={plan?.frequencyName}
              />
              <Owner
                sectionMaxWidth="141px"
                spacing="40px"
                defaultName={plan?.owner}
              />
              <StartDate sectionMaxWidth="141px" spacing="40px" />
              <EndDate sectionMaxWidth="141px" spacing="40px" />
            </VStack>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink="/maintenance"
              totalStep={3}
              activeStep={0}
              setActiveStep={setActiveStep}
              disablePrimaryButton={!canProceed}
              isLoading={isLoading || isUpdating}
              loadingText="Loading..."
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default PlanInfoStep;
