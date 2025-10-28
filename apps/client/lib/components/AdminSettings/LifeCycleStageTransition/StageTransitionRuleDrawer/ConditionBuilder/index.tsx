import {
  Heading,
  HStack,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button, FormInputWrapper, GenericModal } from '@repo/ui/components';
import React from 'react';
import { useAppFormik } from '~/lib/hooks/useAppFormik';
import { lifeCycleTransitionSchema } from '~/lib/schemas/asset/lifeCycleSimulation.schema';
import DynamicConditions from './Condtions';
import { GenerateReportCriterion } from '~/lib/interfaces/report.interfaces';
import { FormikProvider } from 'formik';

interface ConditionBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}
const ConditionBuilder = (props: ConditionBuilderProps) => {
  const { isOpen, onClose } = props;

  const initialValues: { criterion: GenerateReportCriterion[] } = {
    criterion: [
      {
        columnName: null,
        columnValue: null,
        operation: null,
        join: 1,
      },
    ],
  };

  const formik = useAppFormik({
    initialValues,
    enableReinitialize: false,
    validationSchema: lifeCycleTransitionSchema,
    onSubmit: async (data) => {},
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: '800px',
        height: '499px',
        p: { base: '16px', lg: '24px' },
        rounded: '16px',
      }}
    >
      <ModalHeader p={0} m={0}>
        <VStack spacing="24px" width="full" alignItems="flex-start">
          <Heading size={{ lg: 'xl' }} fontWeight={800}>
            Condition Builder
          </Heading>
        </VStack>
      </ModalHeader>
      <FormikProvider value={formik}>
        <ModalBody p={0} m={0} mt="24px">
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack width="full" spacing="40px" alignItems="flex-start">
              <FormInputWrapper
                sectionMaxWidth="141px"
                customSpacing="24px"
                description="Specify the condition for the transition stage"
                title="Condition"
                isRequired
                direction={{ base: 'column' }}
              >
                <DynamicConditions />
              </FormInputWrapper>
              <HStack width="full" spacing={6}>
                <VStack alignItems="flex-start" spacing={2}>
                  <Text color="black" size="md" lineHeight="140%">
                    Preview Condition
                  </Text>
                  <Text color="neutral.600" fontWeight={400}>
                    Ticket of different maintenance type
                  </Text>
                </VStack>
                <Text
                  color="neutral.800"
                  size="lg"
                  lineHeight="140%"
                  fontStyle="italic"
                >
                  “Asset Age &gt; 3 years AND Condition Rating &lt; 40”
                </Text>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter
          p={0}
          m={0}
          mt="24px"
          justifyContent="space-between"
          width="full"
        >
          <HStack spacing="16px" width="full" justifyContent="flex-end">
            <Button
              variant="secondary"
              handleClick={onClose}
              customStyles={{
                width: { base: 'full', lg: '138px' },
                height: '41px',
              }}
            >
              Cancel
            </Button>
            <Button
              customStyles={{
                width: { base: 'full', lg: '157px' },
                height: '41px',
              }}
              type="submit"
            >
              Add Condition
            </Button>
          </HStack>
        </ModalFooter>
      </FormikProvider>
    </GenericModal>
  );
};

export default ConditionBuilder;
