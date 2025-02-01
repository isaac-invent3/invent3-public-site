import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Icon,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  Button,
  CheckBox,
  FilterDropDown,
  FormInputWrapper,
  FormTextAreaInput,
  FormTextInput,
  GenericModal,
} from '@repo/ui/components';
import { Field, FieldArray, FormikProvider, useFormik } from 'formik';
import { getSession, useSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { CreateNotePayload } from '~/lib/interfaces/notes.interfaces';
import { useCreateNoteMutation } from '~/lib/redux/services/notes.services';
import UserSelectModal from '../../Common/Modals/UserSelectModal';
import UserInfo from '../../Common/UserInfo';
import { AddIcon, InfoIcon } from '../../CustomIcons';
interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'add' | 'edit';
}

interface CreateNoteForm extends Partial<CreateNotePayload> {
  taggedPeople: { name: string; id: number }[];
}

const NoteForm = (props: NoteFormModalProps) => {
  const { isOpen, onClose, type } = props;

  const session = useSession();
  const user = session?.data?.user;

  const getSystemContextId = (): number => {
    return 0;
  };

  const { handleSubmit } = useCustomMutation();

  const [createNoteMutation, { isLoading: isCreatingNote }] =
    useCreateNoteMutation();
  const {
    isOpen: isOpenSelectUser,
    onOpen: onOpenSelectUser,
    onClose: onCloseSelectUser,
  } = useDisclosure();

  const initialValues: CreateNoteForm = {
    content: '',
    isPrivate: false,
    notePriorityId: 0,
    createdBy: '',
    taggedPeople: [],
  };

  const formik = useFormik<CreateNoteForm>({
    initialValues,
    enableReinitialize: false,
    onSubmit: async (data) => {
      const session = await getSession();
    },
  });

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{
          width: { lg: '1150px' },
          padding: '48px',
          bgColor: '#E7E7E7',
        }}
      >
        <ModalHeader m={0} p={0}>
          <Text lineHeight="38px" fontSize="32px" fontWeight={800}>
            Add New Note
          </Text>
        </ModalHeader>

        <FormikProvider value={formik}>
          <ModalBody p={0} m={0} width="full">
            <HStack
              alignItems="start"
              justifyContent="space-between"
              w="full"
              mt="1em"
            >
              <VStack
                p={0}
                marginTop={0}
                margin="0px"
                padding="0px"
                paddingInline="0px !important"
                width={{ md: '80%', base: '100%' }}
                spacing="24px"
                px="24px"
                mt="22px"
              >
                <FormInputWrapper
                  sectionMaxWidth="157px"
                  spacing="24px"
                  description="Provide essential information about the asset being added."
                  title="Title"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="noteTitle"
                    type="text"
                    label="Title"
                  />
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="157px"
                  spacing="24px"
                  description="Provide essential information about the asset being added."
                  title="Title"
                  isRequired
                >
                  <Field
                    as={FormTextAreaInput}
                    name="content"
                    type="text"
                    label="Note"
                    customStyle={{ height: '300px' }}
                  />
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="157px"
                  spacing="24px"
                  description=""
                  title=""
                >
                  <VStack
                    bgColor="white"
                    p="20px"
                    spacing="16px"
                    rounded="12px"
                    alignItems="start"
                    w="full"
                  >
                    <Text color="black" size="md" fontWeight={800}>
                      Tag Someone
                    </Text>

                    <FieldArray name="taggedPeople">
                      {({ push, remove }) => {
                        return (
                          <HStack
                            transition="all 0.5s ease"
                            w="full"
                            flexWrap="wrap"
                            spacing="16px"
                          >
                            {formik.values.taggedPeople.map((person, index) => (
                              <HStack cursor="pointer" role="group">
                                <UserInfo
                                  name={person.name}
                                  customAvatarStyle={{
                                    width: '30px',
                                    height: '30px',
                                    fontWeight: 700,
                                  }}
                                />
                                <Icon
                                  as={CloseIcon}
                                  boxSize="10px"
                                  color="black"
                                  opacity="0"
                                  _groupHover={{ opacity: '1' }}
                                  transition="all 0.3s ease-in-out"
                                  cursor="pointer"
                                  onClick={() => remove(index)}
                                />
                              </HStack>
                            ))}

                            <Box
                              boxSize="28px"
                              rounded="full"
                              bgColor="#E4E4E4"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              cursor="pointer"
                              role="group"
                              onClick={onOpenSelectUser}
                            >
                              <Icon
                                as={AddIcon}
                                color="#374957"
                                boxSize="18px"
                                transition="all 300ms ease-in-out"
                                _groupHover={{ transform: 'rotate(90deg)' }}
                              />
                            </Box>

                            <UserSelectModal
                              isOpen={isOpenSelectUser}
                              onClose={onCloseSelectUser}
                              handleSelectUser={(option) => {
                                const existingUser =
                                  formik.values.taggedPeople.find(
                                    (item) => item.id === option?.value
                                  );

                                if (existingUser) return;

                                push({
                                  name: option.label,
                                  id: option.value,
                                });
                              }}
                              sectionInfoText="Tagged user"
                              sectionInfoTitle="Select a user to tag into the note"
                            />
                          </HStack>
                        );
                      }}
                    </FieldArray>
                  </VStack>
                </FormInputWrapper>

                <FormInputWrapper
                  sectionMaxWidth="157px"
                  spacing="24px"
                  description=""
                  title=""
                >
                  <HStack spacing="8px">
                    <CheckBox
                      isChecked={formik.values.notePriorityId === 1}
                      handleChange={() =>
                        formik.setFieldValue(
                          'notePriorityId',
                          formik.values.notePriorityId === 1 ? 0 : 1
                        )
                      }
                    />
                    <Text color="neutral.800">Set as Priority</Text>
                  </HStack>
                </FormInputWrapper>
              </VStack>

              <VStack alignItems="start" spacing="40px">
                <VStack alignItems="start">
                  <HStack>
                    <Text size="md" fontWeight={800}>
                      System Context
                    </Text>

                    <Tooltip
                      label="Default Plans are automatically added to an asset based on the selected asset type"
                      placement="top"
                      bgColor="#CADBF2"
                      color="blue.500"
                      width="181px"
                      rounded="4px"
                      py="8px"
                      px="16px"
                      fontSize="12px"
                    >
                      <HStack justifyContent="center" flexShrink={0}>
                        <Icon as={InfoIcon} boxSize="14px" color="blue.500" />
                      </HStack>
                    </Tooltip>
                  </HStack>

                  <Text color="neutral.700" size="lg" fontWeight={400}>
                    Asset Management
                  </Text>
                </VStack>

                <VStack alignItems="start">
                  <HStack>
                    <Text size="md" fontWeight={800}>
                      System Context Type
                    </Text>

                    <Tooltip
                      label="Default Plans are automatically added to an asset based on the selected asset type"
                      placement="top"
                      bgColor="#CADBF2"
                      color="blue.500"
                      width="181px"
                      rounded="4px"
                      py="8px"
                      px="16px"
                      fontSize="12px"
                    >
                      <HStack justifyContent="center" flexShrink={0}>
                        <Icon as={InfoIcon} boxSize="14px" color="blue.500" />
                      </HStack>
                    </Tooltip>
                  </HStack>

                  <FilterDropDown
                    options={[]}
                    selectedOptions={[]}
                    handleClick={(option) => console.log(option)}
                    labelStyles={{
                      background: 'none',
                      padding: '0px',
                      color: '#0366EF !important',
                    }}
                    chevronStyles={{ display: 'none' }}
                  />
                </VStack>
              </VStack>
            </HStack>
          </ModalBody>

          <ModalFooter p={0} m={0}>
            <HStack spacing="8px" justifyContent="flex-end" mt="8px" pt="32px">
              <Button
                customStyles={{ width: '138px', height: '50px' }}
                variant="secondary"
                handleClick={onClose}
              >
                Cancel
              </Button>

              <Button
                isLoading={isCreatingNote}
                handleClick={() => {
                  formik.handleSubmit();
                }}
                customStyles={{ width: '150px', height: '50px' }}
              >
                Save Note
              </Button>
            </HStack>
          </ModalFooter>
        </FormikProvider>
      </GenericModal>
    </>
  );
};

export default NoteForm;
