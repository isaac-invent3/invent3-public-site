import {
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
  GenericModal,
} from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData, {
  findSystemContextDetailById,
} from '~/lib/hooks/useParseUrl';
import { Note } from '~/lib/interfaces/notes.interfaces';
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from '~/lib/redux/services/notes.services';
import { InfoIcon } from '../../CustomIcons';
import NoteContent from './NoteContent';
import NoteTag from './NoteTag';
import NoteTitle from './NoteTitle';
interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  note?: Note;
}

interface CreateNoteForm {
  content: string;
  isPrivate: boolean;
  notePriorityId: number;
  title: string;
  tags: { name: string; id: number }[];
  systemContextIds: number[];
}

const NoteForm = (props: NoteFormModalProps) => {
  const { isOpen, onClose, note } = props;

  const { handleSubmit } = useCustomMutation();

  const [createNote, { isLoading: createLoading }] = useCreateNoteMutation();
  const [updateNote, { isLoading: updateLoading }] = useUpdateNoteMutation();

  const {
    isOpen: isOpenSelectUser,
    onOpen: onOpenSelectUser,
    onClose: onCloseSelectUser,
  } = useDisclosure();

  const formattedUrl = useFormatUrl();
  const parsedUrl = useParseUrlData(formattedUrl);

  const initialValues: CreateNoteForm = {
    content: note?.content ?? '',
    title: note?.content ?? '',
    isPrivate: note?.isPrivate ?? false,
    notePriorityId: note?.notePriorityId ?? 0,
    tags: [],
    systemContextIds: [],
  };

  const formik = useFormik<CreateNoteForm>({
    initialValues,
    enableReinitialize: false,
    onSubmit: async (data) => {
      const session = await getSession();

      if (!parsedUrl?.systemContextId || !session?.user.id) return;

      const { tags, systemContextIds, ...rest } = data;

      const createNoteDto = {
        systemContextTypeId: parsedUrl?.systemContextId!,
        authorId: Number(session?.user.id),
        createdBy: session?.user?.username!,
        ...rest,
      };

      const payload = {
        createNoteDto,
        tags: tags.map((item) => item.id),
        systemContextIds,
      };

      if (!note) {
        const response = await handleSubmit(
          createNote,
          payload,
          'Note Created Successfully!'
        );

        if (response?.data) {
          formik.resetForm();
          onClose();
        }
      }

      if (note) {
        const response = await handleSubmit(
          updateNote,
          payload,
          'Note Created Successfully!'
        );

        if (response?.data) {
          formik.resetForm();
          onClose();
        }
      }
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
                <NoteTitle />

                <NoteContent />
                <NoteTag />

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
                    {findSystemContextDetailById(parsedUrl?.systemContextId)
                      ?.displayName ?? 'N/A'}
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
                isLoading={createLoading || updateLoading}
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
