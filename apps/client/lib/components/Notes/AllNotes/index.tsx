import {
  Box,
  Divider,
  Grid,
  HStack,
  ModalBody,
  ModalHeader,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import {
  useGetAllUserNotesQuery,
  useGetPinnedNotesQuery,
} from '~/lib/redux/services/notes.services';
import NoteForm from '../NoteForm';
import NoteCard from './NoteCard';
import { dummyNotes } from './dummyData';

interface AllNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllNotes = (props: AllNotesModalProps) => {
  const { isOpen, onClose } = props;

  const {
    isOpen: isNoteFormOpened,
    onOpen: onNoteFormOpen,
    onClose: onNoteFormClose,
  } = useDisclosure();

  const session = useSession();
  const user = session?.data?.user;

  const getSystemContextId = (): number => {
    return 0;
  };
  const { data: notes, isLoading: isGettingNotes } = useGetAllUserNotesQuery(
    { systemContextTypeId: getSystemContextId(), systemContextIds: [] },
    { skip: !user?.userId || !getSystemContextId() }
  );

  const { data: pinnedNotes, isLoading: isGettingPinnedNotes } =
    useGetPinnedNotesQuery(
      { userId: user?.userId!, pageSize: 5 },
      { skip: !user?.userId }
    );

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
          <HStack justifyContent="space-between" w="full">
            <Text lineHeight="38px" fontSize="32px" fontWeight={800}>
              Notes
            </Text>

            <Button handleClick={onNoteFormOpen} customStyles={{ w: '150px' }}>
              Add New Note
            </Button>
          </HStack>
        </ModalHeader>

        <ModalBody p={0} m={0} width="full">
          <VStack
            width="full"
            spacing="16px"
            divider={<Divider borderColor="#BBBBBB" />}
            maxH="550px"
            overflowY="scroll"
          >
            <HStack></HStack>

            <Box w="full">
              <Text size="md" color="black" fontWeight={800} mb="1em">
                Pinned Notes
              </Text>

              <Grid templateColumns="repeat(6, 1fr)" gap="16px" w="full">
                {isGettingPinnedNotes &&
                  new Array(15).map((item) => (
                    <Skeleton isLoaded={false} rounded="8px">
                      <NoteCard data={item} key={item.noteId} isPinned />
                    </Skeleton>
                  ))}

                {!isGettingPinnedNotes &&
                  pinnedNotes?.data.items?.map((item) => (
                    <NoteCard data={item} key={item.noteId} isPinned />
                  ))}

                {dummyNotes?.map((item) => (
                  <NoteCard data={item} key={item.noteId} isPinned />
                ))}
              </Grid>
            </Box>

            <Grid templateColumns="repeat(6, 1fr)" gap="16px" w="full">
              {isGettingNotes &&
                new Array(15).map((item) => (
                  <Skeleton isLoaded={false} rounded="8px">
                    <NoteCard data={item} key={item.noteId} />
                  </Skeleton>
                ))}

              {!isGettingPinnedNotes &&
                notes?.data.items?.map((item) => (
                  <NoteCard data={item} key={item.noteId} />
                ))}

              {dummyNotes?.map((item) => (
                <NoteCard data={item} key={item.noteId} />
              ))}
            </Grid>
          </VStack>
        </ModalBody>
      </GenericModal>

      <NoteForm
        onClose={onNoteFormClose}
        isOpen={isNoteFormOpened}
        type="add"
      />
    </>
  );
};

export default AllNotes;
