import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Stack,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FieldArray, useFormikContext } from 'formik';
import React, { useState } from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
} from '~/lib/components/CustomIcons';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import {
  ApprovalLevel,
  CreateApprovalWorkflowFormikValues,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import AddApproverModal from './AddApproverModal';
import { ErrorMessage } from '@repo/ui/components';

interface ApproversProps {
  data: ApprovalLevel;
  shouldEdit?: boolean;
}
const Approvers = ({ data, shouldEdit = true }: ApproversProps) => {
  const [hasMultipleApprover, setHasMultipleApprover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setFieldValue, values, errors } =
    useFormikContext<CreateApprovalWorkflowFormikValues>();

  const handleMultipleApproversChange = (value: boolean) => {
    setHasMultipleApprover(value);
    if (!value) {
      // If switching to single approver, clear all but the first approver
      const currentApprovers = values.levels[data.levelNumber - 1]?.approvers;
      if (currentApprovers && currentApprovers.length > 1) {
        setFieldValue(`levels.${data.levelNumber - 1}.approvers`, [
          currentApprovers[0],
        ]);
      }
    }
  };
  return (
    <AccordionItem
      bgColor="#F7F7F7"
      p={0}
      roundedTop="16px"
      overflow="hidden"
      mb="8px"
      border="none"
      width="full"
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton
            px="16px"
            pt="16px"
            pb="21px"
            _hover={{ bgColor: 'none' }}
          >
            <HStack width="full" justifyContent="space-between">
              <HStack spacing={{ base: '16px', lg: '48px' }} width="full">
                <Text size="lg" fontWeight={800} lineHeight="100%">
                  Level {data?.levelNumber}
                </Text>
                <Text fontWeight={800} size="md" color="primary.500">
                  {String(
                    values?.levels[data?.levelNumber - 1]?.approvers?.length
                  ).padStart(2, '0')}{' '}
                  <Text
                    as="span"
                    fontWeight={500}
                    size="md"
                    color="primary.500"
                  >
                    Primary Approvers
                  </Text>
                </Text>
                <Text fontWeight={800} size="md" color="primary.500">
                  00{' '}
                  <Text
                    as="span"
                    fontWeight={500}
                    size="md"
                    color="primary.500"
                  >
                    Escalation Approver
                  </Text>
                </Text>
              </HStack>
              <Icon
                as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                boxSize="24px"
                color="neutral.800"
              />
            </HStack>
          </AccordionButton>
          <AccordionPanel
            p="16px"
            borderTopWidth="1px"
            borderColor="#838383 !important"
            // bgColor={shouldEdit ? '#EBEBEB' : '#F7F7F7'}
          >
            <Stack
              direction="column"
              width="full"
              spacing="21px"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Heading color="primary.500" size="md">
                Approvers
              </Heading>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                width="full"
                spacing="16px"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <SectionWrapper
                  title="Primary Approvers"
                  subtitle="These are the primary approvers"
                  spacing={{ base: '8px', sm: '16px', lg: '40px' }}
                  direction={{ base: 'column', lg: 'row' }}
                  sectionInfoStyle={{
                    width: { lg: '149px' },
                  }}
                  maxW="70%"
                  subtitleStyle={{ width: '246px' }}
                  justifyContent="flex-start"
                  alignItems={{ base: 'flex-start' }}
                >
                  <VStack width="full" alignItems="flex-start">
                    <FieldArray
                      name={`levels.${data.levelNumber - 1}.approvers`}
                    >
                      {({ insert, remove, form, push }) => {
                        return (
                          <Flex gap="16px" flexWrap="wrap">
                            {form.values.levels[
                              data.levelNumber - 1
                            ]?.approvers.map(
                              (
                                approver: {
                                  userId: number;
                                  userFullName: string;
                                  approvalActionName: string;
                                  partyId: number | null;
                                },
                                index: number
                              ) => (
                                <HStack
                                  cursor="pointer"
                                  role="group"
                                  key={index}
                                >
                                  <UserInfo
                                    name={approver?.userFullName}
                                    role={approver?.approvalActionName}
                                    customAvatarStyle={{
                                      width: '50px',
                                      height: '50px',
                                      fontWeight: 700,
                                    }}
                                    roleStyle={{
                                      fontStyle: 'italic',
                                      mt: '4px',
                                    }}
                                  />
                                  <Icon
                                    as={CloseIcon}
                                    boxSize="16px"
                                    color="black"
                                    visibility="hidden"
                                    _groupHover={{
                                      visibility: shouldEdit
                                        ? 'visible'
                                        : 'hidden',
                                    }}
                                    transition="all 0.3s ease"
                                    cursor="pointer"
                                    onClick={() => {
                                      if (approver?.partyId) {
                                        setFieldValue('deletedParties', [
                                          ...values.deletedParties,
                                          {
                                            partyId: approver?.partyId,
                                            levelNumber: data.levelNumber,
                                          },
                                        ]);
                                      }
                                      remove(index);
                                    }}
                                  />
                                </HStack>
                              )
                            )}
                            {shouldEdit &&
                              (hasMultipleApprover ||
                                (!hasMultipleApprover &&
                                  form.values.levels[data.levelNumber - 1]
                                    .approvers?.length === 0)) && (
                                <IconButton
                                  variant="solid"
                                  bgColor="#F1F1F1"
                                  aria-label="Add Approver"
                                  icon={
                                    <AddIcon color="#374957" boxSize="24px" />
                                  }
                                  sx={{
                                    width: '50px',
                                    height: '50px',
                                    rounded: 'full',
                                  }}
                                  onClick={onOpen}
                                />
                              )}
                          </Flex>
                        );
                      }}
                    </FieldArray>
                    {typeof errors?.levels?.[data.levelNumber - 1] ===
                      'object' &&
                      errors?.levels?.[data.levelNumber - 1] !== null && (
                        <ErrorMessage>
                          {typeof errors?.levels?.[data.levelNumber - 1] ===
                            'object' &&
                          errors?.levels?.[data.levelNumber - 1] !== null
                            ? (
                                errors.levels[data.levelNumber - 1] as {
                                  approvers?: string;
                                }
                              )?.approvers
                            : undefined}
                        </ErrorMessage>
                      )}
                  </VStack>
                </SectionWrapper>

                {shouldEdit && (
                  <HStack spacing="50px">
                    <Text whiteSpace="nowrap">Multiple Approvers</Text>
                    <Switch
                      isChecked={hasMultipleApprover}
                      onChange={() => {
                        handleMultipleApproversChange(!hasMultipleApprover);
                      }}
                    />
                  </HStack>
                )}
              </Stack>
              <SectionWrapper
                title="Escalation Approvers"
                subtitle="Escalation Approvers"
                spacing={{ base: '8px', sm: '16px', lg: '40px' }}
                direction={{ base: 'column', lg: 'row' }}
                sectionInfoStyle={{
                  width: { lg: '149px' },
                }}
                maxW="70%"
                subtitleStyle={{ width: '246px' }}
                justifyContent="flex-start"
                alignItems={{ base: 'flex-start' }}
              >
                <IconButton
                  variant="solid"
                  bgColor="#F1F1F1"
                  aria-label="Add Approver"
                  icon={<AddIcon color="#374957" boxSize="24px" />}
                  sx={{
                    width: '50px',
                    height: '50px',
                    rounded: 'full',
                  }}
                  onClick={onOpen}
                />
              </SectionWrapper>
              <AddApproverModal
                isOpen={isOpen}
                onClose={onClose}
                levelNumber={data?.levelNumber}
              />
            </Stack>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default Approvers;
