import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { Note } from '~/lib/interfaces/notes.interfaces';
import {
  useDeleteNoteMutation,
  usePinNoteMutation,
  useUpdateNoteMutation,
} from '~/lib/redux/services/notes.services';
import NoteForm from '../../NoteForm';

interface NotePopoverProps {
  data: Note;
}

const PopoverAction = (props: NotePopoverProps) => {
  const { data } = props;

  const session = useSession();
  const user = session?.data?.user;

  const {
    isOpen: isEditNoteOpen,
    onOpen: onOpenEditNote,
    onClose: onCloseEditNote,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [pinNote] = usePinNoteMutation();

  const [updateNote] = useUpdateNoteMutation();

  const [deleteNote, { isLoading: isDeletingNote }] = useDeleteNoteMutation();

  const handleDelete = () => {
    deleteNote({ id: data.noteId, deletedBy: user?.username! });
  };

  const handlePinNote = () => {
    pinNote({ id: data.noteId, authorId: user?.userId! });
  };

  const setNoteAsPriority = () => {
    updateNote({
      id: data.noteId,
      data: {
        noteId: data.noteId,
        notePriorityId: data.notePriorityId == 0 ? 1 : 0,
        lastModifiedBy: user?.username!,
      },
    });
  };

  return (
    <>
      <GenericPopover
        width="129px"
        placement="bottom-start"
        icon={AiOutlineEllipsis}
        popoverBodyStyles={{ padding: '0px' }}
      >
        <VStack width="full" alignItems="flex-start" spacing="4px">
          <Text
            w="full"
            cursor="pointer"
            color="primary.500"
            px="16px"
            py="10px"
            rounded="4px"
            transition="all 200ms ease-in-out"
            onClick={onOpenEditNote}
            _hover={{
              bgColor: 'neutral.200',
            }}
          >
            Edit Note
          </Text>
          <Text
            w="full"
            cursor="pointer"
            color="primary.500"
            px="16px"
            py="10px"
            rounded="4px"
            transition="all 200ms ease-in-out"
            _hover={{
              bgColor: 'neutral.200',
            }}
          >
            Duplicate
          </Text>
          <Text
            w="full"
            cursor="pointer"
            color="primary.500"
            px="16px"
            py="10px"
            rounded="4px"
            transition="all 200ms ease-in-out"
            onClick={handlePinNote}
            _hover={{
              bgColor: 'neutral.200',
            }}
          >
            Pin this Note
          </Text>
          <Text
            w="full"
            cursor="pointer"
            color="primary.500"
            px="16px"
            py="10px"
            rounded="4px"
            transition="all 200ms ease-in-out"
            onClick={setNoteAsPriority}
            _hover={{
              bgColor: 'neutral.200',
            }}
          >
            {data.notePriorityId ? 'Remove Priority' : ' Set as Priority'}
          </Text>
          <Text
            w="full"
            cursor="pointer"
            color="primary.500"
            px="16px"
            py="10px"
            rounded="4px"
            transition="all 200ms ease-in-out"
            onClick={onOpenDelete}
            _hover={{
              bgColor: 'neutral.200',
            }}
          >
            Delete Note
          </Text>
        </VStack>
      </GenericPopover>

      <GenericDeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        handleDelete={handleDelete}
        isLoading={isDeletingNote}
      />

      <NoteForm note={data} onClose={onCloseEditNote} isOpen={isEditNoteOpen} />
    </>
  );
};

export default PopoverAction;
