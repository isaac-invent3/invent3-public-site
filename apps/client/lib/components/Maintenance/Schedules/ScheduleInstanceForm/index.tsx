import { Flex, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import { useAppSelector } from '~/lib/redux/hooks';
import { FormikProvider, useFormik } from 'formik';
import { scheduleSchema } from '~/lib/schemas/maintenance.schema';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import Button from '~/lib/components/UI/Button';
import { useUpdateScheduleInstanceMutation } from '~/lib/redux/services/maintenance/scheduleInstance.services';
import SectionTwo from '../ScheduleForm/FormSection/SectionTwo';
import moment from 'moment';
import withFormLeaveDialog from '~/lib/components/UI/Form/FormLeaveDialogProvider';
import AssetInfo from './AssetInfo';
import Tasks from './Tasks';

const ScheduleInstanceForm = () => {
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const [saveOnlyThisInstance, setSaveOnlyThisInstance] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [updateScheduleInstance, { isLoading }] =
    useUpdateScheduleInstanceMutation({});

  const formik = useFormik({
    initialValues: {
      name: formDetails.name ?? null,
      planId: formDetails.planId ?? null,
      typeId: formDetails.typeId ?? null,
      frequencyId: formDetails.frequencyId ?? null,
      assetId: formDetails.assetId ?? null,
      sla: formDetails.sla ?? null,
      scheduleId: formDetails.scheduleId ?? null,
      description: formDetails.description ?? null,
      comment: formDetails.comment ?? null,
      scheduledDate: formDetails.scheduledDate ?? null,
      completionDate: formDetails.completionDate ?? null,
      tasks: formDetails.tasks ?? [],
      taskCount: formDetails?.taskCount ?? 0,
    },
    validationSchema: scheduleSchema(false, false, false, undefined, undefined),
    enableReinitialize: true,

    onSubmit: async () => {
      setSaveOnlyThisInstance(false);
    },
  });

  return (
    <Flex width="full" height="full" direction="column" gap="40px" pb="25px">
      <Header />
      <Flex width="full" direction="column" roundedTop="8px" overflow="hidden">
        <AssetInfo />
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack width="full" alignItems="flex-end" spacing="16px">
              <VStack
                width="full"
                bgColor="white"
                pt="40px"
                pl="16px"
                pr="30px"
                pb="60px"
                roundedBottom="8px"
              >
                <SectionTwo
                  scheduleType="instance"
                  buttonVariant="secondary"
                  minScheduleDate={moment().toDate()}
                  maxScheduleDate={
                    formDetails?.maintenancePlanInfo?.endDate
                      ? moment(
                          formDetails?.maintenancePlanInfo?.endDate
                        ).toDate()
                      : undefined
                  }
                />
                <Flex
                  width="full"
                  mt="40px"
                  pt="24px"
                  borderTop="1px solid #BBBBBB"
                >
                  <Tasks />
                </Flex>
              </VStack>
              <FormActionButtons
                cancelLink="/maintenance"
                totalStep={1}
                activeStep={1}
                finalText="Save This Instance"
                isLoading={isLoading && saveOnlyThisInstance}
                type="submit"
                loadingText="Saving..."
              >
                <Button
                  variant="outline"
                  handleClick={() => {
                    setSaveOnlyThisInstance(true);
                    formik.handleSubmit();
                  }}
                  loadingText="Saving..."
                  customStyles={{ minW: '234px' }}
                >
                  Save This and Future Instances
                </Button>
              </FormActionButtons>
            </VStack>
          </form>
        </FormikProvider>
      </Flex>
    </Flex>
  );
};

export default withFormLeaveDialog(ScheduleInstanceForm);
