import {
  Flex,
  HStack,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  Button,
  CheckBox,
  FormInputWrapper,
  GenericModal,
  ModalCloseButtonText,
} from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import { Note } from '~/lib/interfaces/notes.interfaces';
import {
  notesApi,
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from '~/lib/redux/services/notes.services';
import PageHeader from '../../UI/PageHeader';
import NoteContent from './NoteContent';
import NoteTag from './NoteTag';
import NoteTitle from './NoteTitle';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '~/lib/redux/hooks';
import { generateTagChanges } from './utils';

interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  note?: Note;
  taggedUsers?: { name: string; id: number }[];
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
  const { isOpen, onClose, note, taggedUsers } = props;

  const { handleSubmit } = useCustomMutation();

  const [createNote, { isLoading: createLoading }] = useCreateNoteMutation();
  const [updateNote, { isLoading: updateLoading, isSuccess }] =
    useUpdateNoteMutation();
  const formattedUrl = useFormatUrl();
  const parsedUrl = useParseUrlData(formattedUrl);
  const dispatch = useAppDispatch();
  const [isLoadingTag, setIsLoadingTag] = useState(false);
  const [localNoteTaggedUsers, setLocalNoteTaggedUsers] = useState<
    { name: string; id: number }[]
  >(taggedUsers ?? []);

  const initialValues: CreateNoteForm = {
    content: note?.content ?? '',
    title: note?.title ?? '',
    isPrivate: note?.isPrivate ?? false,
    notePriorityId: note?.notePriorityId ?? 0,
    tags: localNoteTaggedUsers,
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
        systemContextId: Number(parsedUrl?.contextId)!,
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
        const updatedPayload = {
          noteId: note.noteId,
          ...payload.createNoteDto,
          systemContextIds: payload.systemContextIds,
          systemContextId: Number(parsedUrl?.contextId)!,
          lastModifiedBy: session?.user?.username!,
        };

        const response = await handleSubmit(
          updateNote,
          {
            id: note.noteId,
            data: {
              updateNoteDto: updatedPayload,
              tags: generateTagChanges(localNoteTaggedUsers, tags),
            },
          },
          'Note Updated Successfully!'
        );

        if (response?.data) {
          formik.resetForm();
          onClose();
        }
      }
    },
  });

  const fetchTaggedUsers = async (): Promise<
    { name: string; id: number }[]
  > => {
    let hasNextPage = true;
    let taggedUsers: { name: string; id: number }[] = [];
    let pageNumber = 1;

    while (hasNextPage && note) {
      const result = await dispatch(
        notesApi.endpoints.getNoteTaggedUsers.initiate({
          id: note?.noteId!,
          pageNumber,
          pageSize: 50,
        })
      );

      if (result.data?.data?.items) {
        taggedUsers = [
          ...taggedUsers,
          ...result.data?.data?.items.map((item) => ({
            name: `${item?.firstName ?? ''} ${item?.lastName ?? ''}`,
            id: item.userId!,
          })),
        ];
      }
      hasNextPage = result.data?.data.hasNextPage ?? false;
      pageNumber += 1;
    }

    return taggedUsers;
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoadingTag(true);
    const fetchData = async () => {
      setLocalNoteTaggedUsers([]); // Clear existing tagged user before fetching new

      const taggedUser = await fetchTaggedUsers();

      if (isMounted) {
        setLocalNoteTaggedUsers(taggedUser);
        formik.setFieldValue('tags', taggedUser);
        setIsLoadingTag(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [note, isSuccess]);

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{
          width: { base: '100%', lg: '900px' },
          px: { base: '16px', lg: '48px' },
          py: { base: '32px', lg: '48px' },
          bgColor: '#E7E7E7',
          maxW: '80vw',
        }}
      >
        <ModalHeader m={0} p={0}>
          <PageHeader>{note ? 'Edit Note' : 'Add New Note'}</PageHeader>
          <Flex position="absolute" top="20px" right="20px">
            <Flex>
              <ModalCloseButtonText onClose={onClose} />
            </Flex>
          </Flex>
        </ModalHeader>

        <FormikProvider value={formik}>
          <ModalBody p={0} m={0} width="full">
            <Stack
              alignItems="start"
              justifyContent="space-between"
              w="full"
              mt="1em"
              spacing="1em"
              direction={{ base: 'column', lg: 'row' }}
            >
              <VStack
                p={0}
                marginTop={0}
                margin="0px"
                padding="0px"
                paddingInline="0px !important"
                width={{ lg: '100%', base: '100%' }}
                order={{ base: 1, md: 0 }}
                spacing="24px"
                px="24px"
                mt="22px"
              >
                <NoteTitle />

                <NoteContent />
                <NoteTag isLoading={isLoadingTag} />

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

              {/* <VStack
                order={{ base: 0, md: 1 }}
                alignItems="start"
                spacing="40px"
              >
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
              </VStack>*/}
            </Stack>
          </ModalBody>

          <ModalFooter p={0} m={0}>
            <HStack
              spacing="8px"
              w="full"
              justifyContent={{ base: 'space-between', md: 'flex-end' }}
              mt="8px"
              pt="32px"
            >
              <Button
                customStyles={{
                  width: { base: 'full', md: '138px' },
                  height: { base: '36px', md: '50px' },
                }}
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
                customStyles={{
                  width: { base: 'full', md: '150px' },
                  height: { base: '36px', md: '50px' },
                }}
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
