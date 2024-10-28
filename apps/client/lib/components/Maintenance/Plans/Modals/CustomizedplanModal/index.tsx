/* eslint-disable no-unused-vars */
import { Flex, HStack, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { useCreateMaintenancePlanMutation } from '~/lib/redux/services/maintenance/plan.services';
import ModalHeading from '~/lib/components/UI/Modal/ModalHeading';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import Plan from './PlanType';
import AssetSelect from '~/lib/components/Common/AssetSelect';
import { planSchema } from '~/lib/schemas/maintenance.schema';
import BackButton from '~/lib/components/UI/Button/BackButton';
import { MAINTENANCE_PLAN_ENUM } from '~/lib/utils/constants';
import moment from 'moment';
import Owner from '../../Common/Owner';
import PlanTitle from '../../Common/PlanTitle';
import Frequency from '../../../Common/Frequency';
import StartDate from '../../Common/StartDate';
import EndDate from '../../Common/EndDate';

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
      frequencyId: null,
    },
    validationSchema: planSchema(false, false),
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
              <PlanTitle sectionMaxWidth="118px" spacing="73px" />
              <Frequency sectionMaxWidth="118px" spacing="73px" />
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

              <StartDate sectionMaxWidth="118px" spacing="73px" />
              <EndDate sectionMaxWidth="118px" spacing="73px" />
              <Owner sectionMaxWidth="118px" spacing="73px" />
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
