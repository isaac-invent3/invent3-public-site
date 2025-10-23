import {
  Accordion,
  Collapse,
  Flex,
  HStack,
  Icon,
  StackDivider,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '../../CustomIcons';
import {
  ApprovalLevel,
  ApprovalWorkflow,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import { FormikProvider } from 'formik';
import { FORM_ENUM } from '~/lib/utils/constants';
import { createApprovalWorkflowSchema } from '~/lib/schemas/settings.schema';
import {
  useDeleteApprovalWorkflowMutation,
  useGetAllApprovalWorkflowPartyQuery,
  useUpdateApprovalWorkflowMutation,
} from '~/lib/redux/services/approval-workflow/settings.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { Button, FormSelect, GenericDeleteModal } from '@repo/ui/components';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import Approvers from './Common/Approvers';
import { options } from './CreateApprovalWorkflow';
import { useAppFormik } from '~/lib/hooks/useAppFormik';

interface ExistingApprovalWorkflowProps {
  data: ApprovalWorkflow;
}

const ExistingApprovalWorkflow = ({ data }: ExistingApprovalWorkflowProps) => {
  const { onToggle, isOpen } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDisclosure();
  const { handleSubmit } = useCustomMutation();
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const [shouldEdit, setShouldEdit] = useState(false);
  const { data: approvalWorkflowParty, isLoading: isLoadingParty } =
    useGetAllApprovalWorkflowPartyQuery({
      approvalWorkFlowId: data.approvalWorkFlowId,
      pageNumber: 1,
      pageSize: 100,
    });
  const [updateApprovalWorkflow, { isLoading }] =
    useUpdateApprovalWorkflowMutation();
  const [deleteApprovalWorkflow, { isLoading: isDeleting }] =
    useDeleteApprovalWorkflowMutation();
  const formik = useAppFormik({
    initialValues: {
      approvalTypeId: data?.approvalTypeId ?? null,
      approvalLevel: 1,
      turnaroundTime: data?.turnAroundTime ?? null,
      escalationTurnaroundTime: data?.escalationTurnAroundTime ?? null,
      levels: [],
      deletedParties: [] as { levelNumber: number; partyId: number }[],
    },
    validationSchema: createApprovalWorkflowSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const session = await getSession();
      await handleSubmit(
        updateApprovalWorkflow,
        {
          updateApprovalWorkFlowDto: {
            approvalWorkFlowId: data?.approvalWorkFlowId,
            approvalWorkFlowName: '',
            description: '',
            approvalTypeId: values.approvalTypeId!,
            isDefaultApprovalWorkFlow: true,
            lastModifiedBy: session?.user?.username!,
          },
          updateApprovalWorkFlowPartyDtos: [
            ...values.levels.flatMap((level: ApprovalLevel) =>
              (level.approvers || []).map((approver) => ({
                approvalWorkFlowPartyId: approver?.partyId,
                approvalWorkFlowId: data?.approvalWorkFlowId,
                userId: approver.userId,
                approvalActionId: approver.approvalActionId,
                levelNumber: level.levelNumber,
                approvalRequirementTypeId: null!,
                actionType: approver?.partyId
                  ? FORM_ENUM.update
                  : FORM_ENUM.add,
                changeInitiatedBy: session?.user?.username!,
              }))
            ),
            ...(values.deletedParties
              ? values.deletedParties.map((party, index) => ({
                  approvalWorkFlowPartyId: party.partyId,
                  approvalWorkFlowId: data?.approvalWorkFlowId,
                  userId: null!,
                  approvalActionId: null!,
                  levelNumber: party.levelNumber,
                  approvalRequirementTypeId: null!,
                  actionType: FORM_ENUM.delete,
                  changeInitiatedBy: session?.user?.username!,
                }))
              : []),
          ],
        },
        'Approval Workflow Updated Successfully'
      );
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (approvalWorkflowParty?.data) {
      const levels = approvalWorkflowParty.data?.items.reduce<ApprovalLevel[]>(
        (acc, party) => {
          let level = acc.find(
            (l: ApprovalLevel) => l.levelNumber === party.levelNumber
          );
          if (!level) {
            level = {
              levelNumber: party.levelNumber,
              approvers: [],
              escalatorApprover: null,
            };
            acc.push(level);
          }

          if (party.isEscalationApprover) {
            level.escalatorApprover = {
              userId: party.userId,
              userFullName: `${party.firstName} ${party.lastName}` || null,
            };
          } else {
            level.approvers.push({
              userId: party.userId,
              userFullName: `${party.firstName} ${party.lastName}` || null,
              approvalActionId: party.approvalActionId,
              approvalActionName: party.actionName,
              partyId: party.approvalWorkFlowPartyId,
            });
          }
          return acc;
        },
        []
      );
      formik.setFieldValue('levels', levels);
      formik.setFieldValue('approvalLevel', levels.length);
    }
  }, [approvalWorkflowParty]);

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

  const handleDelete = async () => {
    const session = await getSession();
    await handleSubmit(
      deleteApprovalWorkflow,
      {
        id: data.approvalWorkFlowId,
        deletedBy: session?.user?.username!,
      },
      'Approval Workflow Deleted Successfully'
    );
  };

  return (
    <>
      <VStack
        width="full"
        borderWidth="1px"
        borderColor="neutral.300"
        transition="all 0.5s ease"
        cursor="pointer"
        spacing="0px"
        rounded="8px"
        overflow="hidden"
      >
        <HStack
          width="full"
          justifyContent="space-between"
          bgColor="neutral.250"
          p="16px"
          onClick={onToggle}
        >
          <HStack spacing={{ base: '24px', lg: '48px' }} alignItems="center">
            <Text
              fontSize="16px"
              lineHeight="100%"
              color="primary.500"
              fontWeight={800}
            >
              {data?.approvalTypeName}
            </Text>
            <Text>{data?.numberOfApprovalLevels ?? 0} Levels</Text>
          </HStack>
          <Icon
            as={ChevronDownIcon}
            boxSize="24px"
            color="neutral.800"
            transition="transform 0.3s ease-out"
            transform={isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'}
            cursor="pointer"
          />
        </HStack>
        <Collapse
          startingHeight={0}
          in={isOpen}
          transition={{ enter: { duration: 0 } }}
          style={{ width: '100%' }}
        >
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack
                width="full"
                spacing="20px"
                alignItems="flex-start"
                position="relative"
                bgColor="#F7F7F7"
                px="16px"
                pt="20px"
              >
                {shouldEdit && (
                  <VStack spacing="16px" width="full">
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
                          backgroundColor: '#EBEBEB',
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
                          label: item.label,
                          value: item.value,
                        }))}
                        containerStyles={{
                          width: isMobile ? '100%' : '179px',
                        }}
                        selectStyles={{
                          height: '46px',
                          pt: '0px',
                          backgroundColor: '#EBEBEB',
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
                          label: item.label,
                          value: item.value,
                        }))}
                        containerStyles={{
                          width: isMobile ? '100%' : '179px',
                        }}
                        selectStyles={{
                          height: '46px',
                          pt: '0px',
                          backgroundColor: '#EBEBEB',
                        }}
                        showTitleAfterSelect={false}
                      />
                    </SectionWrapper>
                  </VStack>
                )}
                <VStack width="full" spacing="32px">
                  <Accordion width="full" allowToggle>
                    {formik.values.levels.map((level, index: number) => (
                      <Approvers
                        data={level}
                        key={index}
                        shouldEdit={shouldEdit}
                      />
                    ))}
                  </Accordion>
                </VStack>

                <Flex width="full" justifyContent="flex-end" pb="16px">
                  {!shouldEdit && (
                    <HStack divider={<StackDivider />} spacing="16px">
                      <Text
                        color="blue.500"
                        cursor="pointer"
                        onClick={() => setShouldEdit(true)}
                      >
                        Edit
                      </Text>
                      <Text
                        color="red"
                        cursor="pointer"
                        onClick={() => onOpenDelete()}
                      >
                        Delete
                      </Text>
                    </HStack>
                  )}
                  {shouldEdit && (
                    <HStack>
                      <Button
                        variant="secondary"
                        customStyles={{ bgColor: '#EBEBEB', width: '100px' }}
                        handleClick={() => setShouldEdit(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        handleClick={() => {
                          formik.handleSubmit();
                        }}
                        customStyles={{ width: 'min-width' }}
                        isLoading={isLoading || formik.isSubmitting}
                      >
                        Save Changes
                      </Button>
                    </HStack>
                  )}
                </Flex>
              </VStack>
            </form>
          </FormikProvider>
        </Collapse>
      </VStack>
      <GenericDeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ExistingApprovalWorkflow;
