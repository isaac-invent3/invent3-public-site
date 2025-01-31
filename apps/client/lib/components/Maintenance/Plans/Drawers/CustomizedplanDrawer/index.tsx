/* eslint-disable no-unused-vars */
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import {
  BackButton,
  Button,
  ModalHeading,
  FormSectionInfo,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { useCreateMaintenancePlanMutation } from '~/lib/redux/services/maintenance/plan.services';
import Plan from './PlanType';
import AssetSelect from '~/lib/components/Common/SelectComponents/AssetSelect';
import { planSchema } from '~/lib/schemas/maintenance.schema';
import { MAINTENANCE_PLAN_ENUM } from '~/lib/utils/constants';
import moment from 'moment';
import Owner from '../../Common/Owner';
import PlanTitle from '../../Common/PlanTitle';
import StartDate from '../../Common/StartDate';
import EndDate from '../../Common/EndDate';
import { GenericDrawer } from '@repo/ui/components';

interface CustomizedPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetId?: number | null;
}
const CustomizedPlanModal = (props: CustomizedPlanModalProps) => {
  const { isOpen, onClose, assetId } = props;
  const [createPlan, { isLoading }] = useCreateMaintenancePlanMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      planName: null,
      startDate: null,
      endDate: null,
    },
    validationSchema: planSchema(false, false),
    enableReinitialize: true,
    onSubmit: async (values) => {
      const session = await getSession();
      const finalValue = {
        planName: values.planName!,
        assetId: assetId!,
        startDate: moment(values.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        endDate: values.endDate
          ? moment(values.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
          : null,
        planTypeId: MAINTENANCE_PLAN_ENUM.custom!,
        createdBy: session?.user?.username!,
      };
      const response = await handleSubmit(createPlan, finalValue, '');
      if (response?.data) {
        onClose();
      }
    },
  });

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="681px">
      <DrawerHeader p={0} m={0} px="32px" mt="20px" width="max-content">
        <BackButton handleClick={onClose} customStyles={{ mb: '60px' }} />
      </DrawerHeader>
      <DrawerBody p={0} m={0}>
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              justifyContent="space-between"
              px="32px"
              pb="32px"
              spacing={0}
              alignItems="flex-start"
            >
              <ModalHeading
                heading="Add  Maintenance Plan - Customised"
                subheading=""
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="27px" mt="60px">
                <PlanTitle sectionMaxWidth="118px" spacing="73px" />
                {!assetId && (
                  <>
                    <Plan />
                    <HStack width="full" alignItems="flex-start" spacing="73px">
                      <Flex width="full" maxW="118px">
                        <FormSectionInfo
                          title="Asset"
                          info="Choose the type of asset"
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
            </VStack>
          </form>
        </FormikProvider>
      </DrawerBody>
      <DrawerFooter pb="38px">
        <HStack width="full" spacing="16px" justifyContent="flex-end">
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
            isLoading={isLoading || formik.isSubmitting}
            handleClick={formik.handleSubmit}
          >
            Save Plan
          </Button>
        </HStack>
      </DrawerFooter>
    </GenericDrawer>
  );
};

export default CustomizedPlanModal;
