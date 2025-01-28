import {
  Box,
  Grid,
  HStack,
  ModalBody,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import NoteCard from './NoteCard';
import { dummyNotes } from './dummyData';

interface AllNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllNotes = (props: AllNotesModalProps) => {
  const { isOpen, onClose } = props;

  const session = useSession();
  const user = session?.data?.user;

  const getSystemContextId = (): number => {
    return 0;
  };
  //   const { data: notes, isLoading: isGettingNotes } = useGetAllUserNotesQuery(
  //     { systemContextTypeId: getSystemContextId(), systemContextIds: [] },
  //     { skip: !user?.userId || !getSystemContextId() }
  //   );

  //   const { data: pinnedNotes, isLoading: isGettingPinnedNotes } =
  //     useGetPinnedNotesQuery({ userId: user?.userId! }, { skip: !user?.userId });

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

            <Button customStyles={{ w: '150px' }}>Add New Note</Button>
          </HStack>
        </ModalHeader>

        <ModalBody p={0} m={0} width="full">
          <VStack width="full">
            <HStack></HStack>

            <Box w="full">
              <Text size="md" color="black" fontWeight={800} mb="1em">
                Pinned Notes
              </Text>

              <Grid templateColumns="repeat(6, 1fr)" gap="16px">
                {dummyNotes?.map((item) => (
                  <NoteCard data={item} key={item.noteId} isPinned />
                ))}
              </Grid>
            </Box>
            <Grid templateColumns="repeat(6, 1fr)" gap="16px"></Grid>
          </VStack>
        </ModalBody>
      </GenericModal>
    </>
  );
};

export default AllNotes;
