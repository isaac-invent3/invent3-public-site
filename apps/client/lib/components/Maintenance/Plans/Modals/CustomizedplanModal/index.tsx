/* eslint-disable no-unused-vars */
import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import TextInput from '~/lib/components/UI/TextInput';
import { useCreateMaintenancePlanMutation } from '~/lib/redux/services/maintenance/plan.services';
import ModalHeading from '~/lib/components/UI/ModalHeading';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import Plan from './PlanType';
import AssetSelect from '~/lib/components/Common/AssetSelect';
import { LongBackArrowIcon } from '~/lib/components/CustomIcons';
import { planSchema } from '~/lib/schemas/maintenance.schema';
import BackButton from '~/lib/components/UI/Button/BackButton';
import { MAINTENANCE_PLAN_ENUM } from '~/lib/utils/constants';
import moment from 'moment';
import Frequency from '~/lib/components/Common/Frequency';
import Owner from './Owner';

interface CustomizedPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetId?: number | null;
}
const CustomizedPlanModal = (props: CustomizedPlanModalProps) => {
  const { isOpen, onClose, assetId } = props;
  const [createPlan, { isLoading }] = useCreateMaintenancePlanMutation({});
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const formik = useFormik({
    initialValues: {
      planName: null,
      startDate: null,
      endDate: null,
    },
    validationSchema: planSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const finalValue = {
        ...values,
        assetId,
        startDate: moment(values.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        endDate: moment(values.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        planTypeId: MAINTENANCE_PLAN_ENUM.custom,
        createdBy: data?.user?.username,
      };
      const response = await handleSubmit(createPlan, finalValue, '');
      if (response?.data) {
        onClose();
      }
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { md: '681px' }, rounded: 'none' }}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            width="full"
            px="32px"
            pt="20px"
            pb="32px"
            spacing={0}
            alignItems="flex-start"
          >
            <BackButton handleClick={onClose} customStyles={{ mb: '60px' }} />
            <ModalHeading
              heading="Add  Maintenance Plan - Customised"
              subheading=""
            />

            {/* Main Form Starts Here */}
            <VStack width="full" spacing="27px" mt="71px">
              <HStack width="full" alignItems="flex-start" spacing="73px">
                <Flex width="full" maxW="118px">
                  <SectionInfo
                    title="Plan Title"
                    info="Add name that users can likely search with"
                    isRequired
                  />
                </Flex>

                <Field
                  as={TextInput}
                  name="planName"
                  type="text"
                  label="Plan Title"
                />
              </HStack>
              <Frequency />
              {!assetId && (
                <>
                  <Plan />
                  <HStack width="full" alignItems="flex-start" spacing="73px">
                    <Flex width="full" maxW="118px">
                      <SectionInfo
                        title="Asset"
                        info="Add name that users can likely search with"
                        isRequired
                      />
                    </Flex>

                    <AssetSelect selectName="assetId" selectTitle="Asset" />
                  </HStack>
                </>
              )}
              <HStack width="full" alignItems="flex-start" spacing="73px">
                <Flex width="full" maxW="118px">
                  <SectionInfo
                    title="Start Date"
                    info="Add name that users can likely search with"
                    isRequired
                  />
                </Flex>

                <CustomDatePicker
                  name="startDate"
                  label="Start Date"
                  type="date"
                />
              </HStack>
              <HStack width="full" alignItems="flex-start" spacing="73px">
                <Flex width="full" maxW="118px">
                  <SectionInfo
                    title="End Date"
                    info="Add name that users can likely search with"
                    isRequired
                  />
                </Flex>

                <CustomDatePicker name="endDate" label="End Date" type="date" />
              </HStack>
              <Owner />
            </VStack>
            {/* Main Form Ends Here */}
            <HStack
              width="full"
              spacing="16px"
              mt="165px"
              justifyContent="flex-end"
            >
              <Button
                variant="secondary"
                customStyles={{ width: '138px' }}
                handleClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                customStyles={{ width: '237px' }}
                isLoading={isLoading}
              >
                Save Plan
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default CustomizedPlanModal;
