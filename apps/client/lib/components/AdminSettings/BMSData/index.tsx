import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import GeneralOverview from './GeneralOverview';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import FacilitySelect from '../../AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/FacilitySelect';
import { bmsSettingsSchema } from '~/lib/schemas/settings.schema';
import BuildingSettings from './BuildingSettings';
import { newBuildingSettings } from './helpers';
import { DeleteIcon } from '../../CustomIcons';

const BMSData = () => {
  const formik = useFormik({
    initialValues: {
      facilityId: null,
      bmsBuildingSettingsModel: [],
    },
    validationSchema: bmsSettingsSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {},
  });

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
                <FacilitySelect type="general" />
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
                    {formik.values.bmsBuildingSettingsModel.map((_, index) => (
                      <HStack
                        width="full"
                        alignItems="flex-end"
                        transition="all 0.5s ease"
                      >
                        <BuildingSettings index={index} />
                        <Icon
                          as={DeleteIcon}
                          boxSize="16px"
                          cursor="pointer"
                          onClick={() => remove(index)}
                          mb="8px"
                        />
                      </HStack>
                    ))}
                    <Text
                      size="md"
                      color="blue.500"
                      fontWeight={700}
                      cursor="pointer"
                      onClick={() => push(newBuildingSettings)}
                    >
                      Configure A Building
                    </Text>
                  </VStack>
                );
              }}
            </FieldArray>
          </VStack>
        </VStack>
      </form>
    </FormikProvider>
  );
};

export default BMSData;
