import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import AssetSelect from '~/lib/components/Common/AssetSelect';
import UserDisplayAndAddButton from '~/lib/components/Common/UserDisplayAndAddButton';
import AssetField from '~/lib/components/TaskManagement/TaskForm/SectionOne/Asset';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import SelectableButtonGroup from '~/lib/components/UI/Button/SelectableButtonGroup';
import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import TextareaInput from '~/lib/components/UI/TextArea';
import TextInput from '~/lib/components/UI/TextInput';
import FormInputWrapperContainer from '../Common/FormInputWrapperContainer';

interface CreateTicketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTicketDrawer = (props: CreateTicketDrawerProps) => {
  const { isOpen, onClose } = props;

  const formik = useFormik({
    initialValues: {
      assignedTo: null,
    },
    enableReinitialize: true,
    onSubmit: async () => {},
  });

  const typeOptions = [
    {
      label: 'Incident',
      value: 'incident',
    },
    {
      label: 'Problem',
      value: 'problem',
    },
    {
      label: 'Suggestion',
      value: 'suggestion',
    },
  ];

  const priorityOptions = [
    {
      label: 'High',
      value: 'high',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'Low',
      value: 'low',
    },
  ];

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="535px">
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

        <DrawerBody p={0}>
          <Flex
            direction="column"
            width="full"
            alignItems="flex-start"
            pb="20px"
          >
            <Heading
              fontSize="32px"
              lineHeight="38.02px"
              color="black"
              px="24px"
              pb="20px"
              fontWeight={800}
            >
              Add New Ticket
            </Heading>
            <FormikProvider value={formik}>
              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <VStack width="full" spacing="24px" px="24px" mt="22px">
                  <FormInputWrapperContainer
                    sectionMaxWidth="141px"
                    spacing="24px"
                    description="Add name that users can likely search with"
                    title="Ticket Title"
                    isRequired
                  >
                    <Field
                      as={TextInput}
                      name="ticketTitle"
                      type="text"
                      label="Ticket Title"
                    />
                  </FormInputWrapperContainer>

                  <FormInputWrapperContainer
                    sectionMaxWidth="141px"
                    spacing="24px"
                    description="Choose the category and the sub-category"
                    title="Ticket Description"
                    isRequired
                  >
                    <Field
                      as={TextareaInput}
                      name="ticketDescription"
                      type="text"
                      label="Description"
                      placeholder="Description"
                      customStyle={{ height: '133px' }}
                    />
                  </FormInputWrapperContainer>

                  <FormInputWrapperContainer
                    sectionMaxWidth="141px"
                    spacing="24px"
                    description="Choose the category and the sub-category"
                    title="Ticket Asset"
                    isRequired
                  >
                    <AssetSelect
                      selectName="assetId"
                      selectTitle="Asset"
                      handleSelect={(option) => {}}
                    />
                  </FormInputWrapperContainer>

                  <FormInputWrapperContainer
                    sectionMaxWidth="141px"
                    spacing="24px"
                    description="Choose the category and the sub-category"
                    title="Type"
                    isRequired
                  >
                    <SelectableButtonGroup
                      options={typeOptions}
                      selectedOptions={[]}
                      handleSelect={(options) => {}}
                      isMultiSelect={false}
                      buttonVariant="secondary"
                      customButtonStyle={{ width: 'max-content' }}
                    />
                  </FormInputWrapperContainer>

                  <FormInputWrapperContainer
                    sectionMaxWidth="141px"
                    spacing="24px"
                    description="Choose the category and the sub-category"
                    title="Priority"
                    isRequired
                  >
                    <SelectableButtonGroup
                      options={priorityOptions}
                      selectedOptions={[]}
                      handleSelect={(options) => {}}
                      isMultiSelect={false}
                      buttonVariant="secondary"
                      customButtonStyle={{ width: 'max-content' }}
                    />
                  </FormInputWrapperContainer>

                  <FormInputWrapperContainer
                    sectionMaxWidth="141px"
                    spacing="24px"
                    description="Add name that users can likely search with"
                    title="Ticket Raised By"
                  >
                    <UserDisplayAndAddButton
                      selectedUser={null}
                      handleSelectUser={(user) => {}}
                      sectionInfoTitle="Raised By"
                    />
                  </FormInputWrapperContainer>
                  <FormInputWrapperContainer
                    sectionMaxWidth="141px"
                    spacing="24px"
                    description="Choose the category and the sub-category"
                    title="Request Date"
                    isRequired
                  >
                    <CustomDatePicker
                      name="resolutionDate"
                      label="Resolution Date"
                      type="date"
                      minDate={new Date()}
                    />
                  </FormInputWrapperContainer>
                </VStack>
              </form>
            </FormikProvider>
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

            <Button customStyles={{ width: '237px', height: '50px' }}>
              Save Ticket
            </Button>
          </HStack>
        </DrawerFooter>
      </GenericDrawer>
    </>
  );
};

export default CreateTicketDrawer;
