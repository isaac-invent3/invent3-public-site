import {
  Accordion,
  Flex,
  Heading,
  HStack,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { createApprovalWorkflowSchema } from '~/lib/schemas/settings.schema';
import { Button, FormSelect } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useCreateApprovalWorkflowMutation } from '~/lib/redux/services/approval-workflow/settings.services';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import { useGetAllApprovalWorkflowTypesQuery } from '~/lib/redux/services/approval-workflow/types.services';
import ApprovalWorkflowTypeSelect from './ApprovalWorkflowTypeSelect';
import Approvers from '../Common/Approvers';
import { FORM_ENUM } from '~/lib/utils/constants';
import { CreateApprovalWorkflowFormikValues } from '~/lib/interfaces/approvalWorkflow.interfaces';

const DURATION_OPTIONS = [
  { label: '2 days', hours: 2 * 24 },
  { label: '1 week', hours: 7 * 24 },
  { label: '1 month', hours: 30 * 24 },
];

export const options = DURATION_OPTIONS.map((item, index) => ({
  label: item.label,
  value: item.hours,
}));

const CreateApprovalWorkflow = ({
  onClose,
  existingApprovalWorkflowId,
}: {
  onClose: () => void;
  existingApprovalWorkflowId: number[];
}) => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const {} = useGetAllApprovalWorkflowTypesQuery({
    pageNumber: 1,
    pageSize: 100,
  });
  const { handleSubmit } = useCustomMutation();
  const [createApprovalWorkflow, { isLoading }] =
    useCreateApprovalWorkflowMutation();
  const formik = useFormik<CreateApprovalWorkflowFormikValues>({
    initialValues: {
      approvalTypeId: null,
      approvalLevel: 1,
      turnaroundTime: null,
      escalationTurnaroundTime: null,
      deletedParties: [],
      levels: [
        {
          levelNumber: 1,
          approvers: [],
          escalatorApprover: null,
        },
      ],
    },
    validationSchema: createApprovalWorkflowSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const session = await getSession();
      const escalatorForLevelObject = values.levels.reduce(
        (acc, level) => {
          if (
            level.escalatorApprover &&
            level.escalatorApprover.userId != null
          ) {
            acc[level.levelNumber] = level.escalatorApprover.userId;
          }
          return acc;
        },
        {} as { [key: number]: number }
      );

      const response = await handleSubmit(
        createApprovalWorkflow,
        {
          createApprovalWorkFlowDto: {
            approvalWorkFlowName: 'Approval Settings',
            description: '',
            approvalTypeId: values.approvalTypeId!,
            isDefaultApprovalWorkFlow: true,
            createdBy: session?.user?.username!,
          },
          createApprovalWorkFlowPartyDtos: values.levels.flatMap((level) =>
            (level.approvers || []).map((approver: any) => ({
              approvalWorkFlowPartyId: null!,
              approvalWorkFlowId: null!,
              userId: approver.userId,
              approvalActionId: approver.approvalActionId,
              levelNumber: level.levelNumber,
              approvalRequirementTypeId: approver.approvalRequirementTypeId,
              actionType: FORM_ENUM.add,
              changeInitiatedBy: session?.user?.username!,
            }))
          ),
          turnAroundTime: values.turnaroundTime!,
          escalationTurnAroundTime: values.escalationTurnaroundTime!,
          escalatorForLevel:
            Object.keys(escalatorForLevelObject).length > 0
              ? escalatorForLevelObject
              : null,
        },
        'Approval Workflow Added Successfully'
      );
      if (response?.data) {
        onClose();
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (formik.values.approvalLevel) {
      const currentLevels = formik.values.levels || [];
      const desiredLength = formik.values.approvalLevel;
      if (currentLevels.length < desiredLength) {
        // Append new levels
        const newLevels = [
          ...currentLevels,
          ...Array.from(
            { length: desiredLength - currentLevels.length },
            (_, idx) => ({
              levelNumber: currentLevels.length + idx + 1,
              approvers: [],
            })
          ),
        ];
        formik.setFieldValue('levels', newLevels);
      } else if (currentLevels.length > desiredLength) {
        // Remove extra levels
        formik.setFieldValue('levels', currentLevels.slice(0, desiredLength));
      }
    }
  }, [formik.values.approvalLevel]);

  return (
    <FormikProvider value={formik}>
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
        <VStack
          spacing="24px"
          width="full"
          alignItems="flex-start"
          bgColor="#F0F0F0"
          p={{ base: '16px', md: '24px' }}
          rounded="16px"
        >
          <Heading fontWeight={800} color="primary.500">
            Create a New Approval Flow
          </Heading>
          <VStack
            spacing="16px"
            width="full"
            alignItems="flex-start"
            rounded={{ md: '6px' }}
          >
            <SectionWrapper
              title="Approval Type"
              subtitle="Select the approval type."
              spacing={{ base: '8px', sm: '16px', lg: '128px' }}
              direction={{ base: 'column', lg: 'row' }}
              sectionInfoStyle={{
                width: { lg: '246px' },
              }}
              subtitleStyle={{ width: '246px' }}
              width="full"
              justifyContent="space-between"
              alignItems={{ base: 'flex-start', lg: 'center' }}
            >
              <ApprovalWorkflowTypeSelect
                selectName="approvalTypeId"
                selectTitle="Approval Type"
                existingApprovalWorkflowId={existingApprovalWorkflowId}
              />
            </SectionWrapper>
            <SectionWrapper
              title="Number of Approval Levels"
              subtitle="Select the number of approval levels required for this workflow."
              spacing={{ base: '8px', sm: '16px', lg: '128px' }}
              direction={{ base: 'column', lg: 'row' }}
              sectionInfoStyle={{
                width: { lg: '246px' },
              }}
              subtitleStyle={{ width: '246px' }}
              width="full"
              justifyContent="space-between"
              alignItems={{ base: 'flex-start', lg: 'center' }}
            >
              <FormSelect
                name="approvalLevel"
                title="Levels"
                options={Array(5)
                  .fill('')
                  .map((_, index) => ({
                    label: `${index + 1}`,
                    value: index + 1,
                  }))}
                containerStyles={{
                  width: isMobile ? '100%' : '179px',
                }}
                selectStyles={{
                  height: '46px',
                  pt: '0px',
                  backgroundColor: '#FCFCFC',
                }}
                showTitleAfterSelect={false}
              />
            </SectionWrapper>
            <SectionWrapper
              title="Turnaround Time"
              subtitle="How long for each approver to act on the request."
              spacing={{ base: '8px', sm: '16px', lg: '128px' }}
              direction={{ base: 'column', lg: 'row' }}
              sectionInfoStyle={{
                width: { lg: '246px' },
              }}
              subtitleStyle={{ width: '246px' }}
              width="full"
              justifyContent="space-between"
              alignItems={{ base: 'flex-start', lg: 'center' }}
            >
              <FormSelect
                name="turnaroundTime"
                title="Duration"
                options={options.map((item, index) => ({
                  label: `${item}hrs`,
                  value: index + 1,
                }))}
                containerStyles={{
                  width: isMobile ? '100%' : '179px',
                }}
                selectStyles={{
                  height: '46px',
                  pt: '0px',
                  backgroundColor: '#FCFCFC',
                }}
                showTitleAfterSelect={false}
              />
            </SectionWrapper>
            <SectionWrapper
              title="Escalation Turnaround Time"
              subtitle="How long for each escalated approver to act on the request."
              spacing={{ base: '8px', sm: '16px', lg: '128px' }}
              direction={{ base: 'column', lg: 'row' }}
              sectionInfoStyle={{
                width: { lg: '246px' },
              }}
              subtitleStyle={{ width: '246px' }}
              width="full"
              justifyContent="space-between"
              alignItems={{ base: 'flex-start', lg: 'center' }}
            >
              <FormSelect
                name="escalationTurnaroundTime"
                title="Duration"
                options={options.map((item, index) => ({
                  label: `${item}hrs`,
                  value: index + 1,
                }))}
                containerStyles={{
                  width: isMobile ? '100%' : '179px',
                }}
                selectStyles={{
                  height: '46px',
                  pt: '0px',
                  backgroundColor: '#FCFCFC',
                }}
                showTitleAfterSelect={false}
              />
            </SectionWrapper>
            <VStack
              bgColor="#E7E7E7"
              p="16px"
              width="full"
              alignItems="flex-start"
              spacing="32px"
            >
              <Text fontSize="16px" color="primary.500" fontWeight={700}>
                Add Approvers For Each Level
              </Text>
              <VStack width="full" spacing="32px">
                <Accordion width="full" allowToggle>
                  {formik.values.levels.map((level, index) => (
                    <Approvers data={level} key={index} />
                  ))}
                </Accordion>
              </VStack>
            </VStack>
          </VStack>
          <Flex width="full" justifyContent="flex-end">
            <HStack>
              <Button
                variant="secondary"
                customStyles={{ bgColor: '#EBEBEB', width: '100px' }}
                handleClick={onClose}
                isDisabled={isLoading || formik.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                handleClick={() => {
                  //   console.log({ test: formik.errors });
                  formik.handleSubmit();
                }}
                customStyles={{ width: 'min-width' }}
                isLoading={isLoading || formik.isSubmitting}
              >
                Save Changes
              </Button>
            </HStack>
          </Flex>
        </VStack>
      </form>
    </FormikProvider>
  );
};

export default CreateApprovalWorkflow;
