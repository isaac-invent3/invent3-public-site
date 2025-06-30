import { Flex, HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import FacilitySelect from '../../AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/FacilitySelect';
import { bmsSettingsSchema } from '~/lib/schemas/settings.schema';
import BuildingSettings from './BuildingSettings';
import { newBuildingSettings } from './helpers';
import { DeleteIcon } from '../../CustomIcons';
import { Button } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useBmsSettingsMutation,
  useGetBuildingSettingsByFacilityIdQuery,
} from '~/lib/redux/services/settings.services';

const BMSData = () => {
  const { handleSubmit } = useCustomMutation();
  const [updateSettings, { isLoading }] = useBmsSettingsMutation();
  const formik = useFormik({
    initialValues: {
      facilityId: null!,
      bmsBuildingSettingsModel: [],
    },
    validationSchema: bmsSettingsSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const session = await getSession();
      await handleSubmit(
        updateSettings,
        {
          ...values,
          createdBy: session?.user?.username!,
        },
        'Settings Updated Successfully'
      );
      setSubmitting(false);
    },
  });
  const {
    data: buildingSettingsData,
    isLoading: isLoadingBuildingSettings,
    isFetching: isFetchingBuildingSettings,
  } = useGetBuildingSettingsByFacilityIdQuery(
    { facilityId: formik.values.facilityId },
    {
      skip: !formik.values.facilityId,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    formik.setFieldValue('bmsBuildingSettingsModel', []);
  }, [formik.values.facilityId]);

  useEffect(() => {
    if (buildingSettingsData) {
      buildingSettingsData.data.forEach((building) => {
        formik.setFieldValue('bmsBuildingSettingsModel', [
          ...formik.values.bmsBuildingSettingsModel,
          {
            buildingId: building,
            costOfEnergyPerKWh: null,
            budgetExpenditureModels: [],
            bmsFloorSettingsModels: [],
          },
        ]);
      });
    }
  }, [buildingSettingsData]);

  return (
    <FormikProvider value={formik}>
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
        <VStack spacing="24px" width="full" alignItems="flex-end">
          <VStack
            spacing="48px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            p={{ base: '16px', md: '24px' }}
            pt={{ base: '23px', lg: '35px' }}
            rounded={{ md: '6px' }}
            minH={{ base: '60vh' }}
          >
            <HStack width="full" spacing="8px" alignItems="center">
              <Flex width="386px">
                <FacilitySelect
                  type="general"
                  handleSelect={(option) =>
                    formik.setFieldValue('facilityId', option.value)
                  }
                />
              </Flex>
            </HStack>

            <FieldArray name="bmsBuildingSettingsModel">
              {({ insert, remove, form, push }) => {
                return (
                  <VStack
                    width="full"
                    spacing="16px"
                    alignItems={
                      formik.values.bmsBuildingSettingsModel.length > 0
                        ? 'flex-end'
                        : 'center'
                    }
                  >
                    {isLoadingBuildingSettings || isFetchingBuildingSettings ? (
                      <VStack width="full" spacing="16px">
                        {Array(3)
                          .fill(0)
                          .map((_, index) => (
                            <Skeleton
                              width="full"
                              rounded="8px"
                              key={index}
                              height="150px"
                            />
                          ))}
                      </VStack>
                    ) : (
                      <Text
                        size="md"
                        color="blue.500"
                        fontWeight={700}
                        cursor="pointer"
                        onClick={() => push(newBuildingSettings)}
                      >
                        Configure A Building
                      </Text>
                    )}
                    {formik.values.bmsBuildingSettingsModel.map((_, index) => (
                      <HStack
                        width="full"
                        alignItems="center"
                        transition="all 0.5s ease"
                      >
                        <BuildingSettings buildingIndex={index} />
                        <Icon
                          as={DeleteIcon}
                          boxSize="16px"
                          cursor="pointer"
                          onClick={() => remove(index)}
                          mb="8px"
                        />
                      </HStack>
                    ))}
                    {/* {formik.errors.bmsBuildingSettingsModel && (
                      <Text color="red.500" fontSize="sm">
                        {formik.errors.bmsBuildingSettingsModel}
                      </Text>
                    )} */}
                  </VStack>
                );
              }}
            </FieldArray>
          </VStack>
          <Button
            handleClick={() => {
              formik.handleSubmit();
            }}
            customStyles={{ width: '220px' }}
            isLoading={isLoading || formik.isSubmitting}
          >
            Save Changes
          </Button>
        </VStack>
      </form>
    </FormikProvider>
  );
};

export default BMSData;
