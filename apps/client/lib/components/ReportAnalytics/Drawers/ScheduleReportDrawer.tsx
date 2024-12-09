import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import Button from '../../UI/Button';
import BackButton from '../../UI/Button/BackButton';
import CheckBox from '../../UI/CheckBox';
import EndDateTime from '../../UI/DateTimeComponents/RecurrenceModal/EndDateTime';
import Frequency from '../../UI/DateTimeComponents/RecurrenceModal/Frequency';
import Intervals from '../../UI/DateTimeComponents/RecurrenceModal/Intervals';
import StartDateTime from '../../UI/DateTimeComponents/RecurrenceModal/StartDateTime';
import FormInputWrapper from '../../UI/Form/FormInputWrapper';
import GenericDrawer from '../../UI/GenericDrawer';
import TextInput from '../../UI/TextInput';

interface ScheduleReportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleReportDrawer = (props: ScheduleReportDrawerProps) => {
  const { isOpen, onClose } = props;

  //   TODO: Fill form details
  const formik = useFormik({
    initialValues: {
      startDate: null,
      endDate: null,
    },

    enableReinitialize: true,
    onSubmit: async () => {},
  });

  const [maxInterval, setMaxInterval] = useState(1);

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="507px">
      <DrawerHeader p={0} m={0}>
        <HStack
          pt="16px"
          pb="32px"
          px="24px"
          width="full"
          justifyContent="space-between"
        >
          <BackButton handleClick={onClose} />
        </HStack>
      </DrawerHeader>

      <FormikProvider value={formik}>
        <DrawerBody p={0}>
          <Flex
            direction="column"
            width="full"
            alignItems="flex-start"
            pb="20px"
            px="32px"
          >
            <Heading
              fontSize="32px"
              lineHeight="38.02px"
              color="black"
              pb="20px"
              fontWeight={800}
            >
              Schedule Report
            </Heading>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack width="full" mt="40px" pb="71px" spacing="0px">
                <Frequency setMaxInterval={setMaxInterval} />
                <Intervals maxInterval={maxInterval} />
                <StartDateTime />
                <EndDateTime />
                <FormInputWrapper
                  sectionMaxWidth="130px"
                  mt="32px"
                  spacing="29px"
                  description="Choose the category and the sub-category"
                  title="Send To"
                  isRequired
                >
                  <VStack alignItems="start" spacing="16px">
                    <HStack spacing="8px">
                      <CheckBox
                        isChecked={true}
                        handleChange={() => console.log('hey')}
                      />

                      <Text color="neutral.800">My Email</Text>
                    </HStack>

                    <HStack spacing="8px">
                      <CheckBox
                        isChecked={false}
                        handleChange={() => console.log('hey')}
                      />

                      <Field
                        as={TextInput}
                        name="ticketTitle"
                        type="text"
                        label="Ticket Title"
                        customStyle={{ height: '32px', width: '100%' }}
                      />
                    </HStack>
                  </VStack>
                </FormInputWrapper>
              </VStack>
            </form>
          </Flex>
        </DrawerBody>

        <DrawerFooter p={0} m={0}>
          <HStack
            spacing="8px"
            justifyContent="flex-end"
            mt="8px"
            px="24px"
            pb="32px"
          >
            <Button
              customStyles={{ width: '138px', height: '50px' }}
              variant="secondary"
              handleClick={onClose}
            >
              Cancel
            </Button>

            <Button
              handleClick={() => {
                formik.handleSubmit();
              }}
              customStyles={{ width: '137px', height: '50px' }}
            >
              Schedule Report
            </Button>
          </HStack>
        </DrawerFooter>
      </FormikProvider>
    </GenericDrawer>
  );
};

export default ScheduleReportDrawer;
