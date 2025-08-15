import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericDeleteModal, GenericPopover } from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { Note } from '~/lib/interfaces/notes.interfaces';
import {
  useDeleteNoteMutation,
  useDuplicateNoteMutation,
  usePinNoteMutation,
  useUnPinNoteMutation,
  useUpdateNoteMutation,
} from '~/lib/redux/services/notes.services';
import NoteForm from '../../NoteForm';

interface NotePopoverProps {
  data: Note;
  setNoteLoading: Dispatch<SetStateAction<boolean>>;
}

const ActionItem = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <Text
    w="full"
    cursor="pointer"
    color="primary.500"
    px="16px"
    py="10px"
    rounded="4px"
    transition="all 200ms ease-in-out"
    onClick={onClick}
    _hover={{ bgColor: 'neutral.200' }}
  >
    {label}
  </Text>
);

const PopoverAction = ({ data, setNoteLoading }: NotePopoverProps) => {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  const editNote = useDisclosure();
  const deleteNoteModal = useDisclosure();

  const [pinNote, { isLoading: isPinning }] = usePinNoteMutation();
  const [unpinNote, { isLoading: isUnPinning }] = useUnPinNoteMutation();
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();
  const [duplicateNote, { isLoading: isDuplicating }] =
    useDuplicateNoteMutation();

  const isLoading = useMemo(
    () => isPinning || isUpdating || isDeleting || isDuplicating || isUnPinning,
    [isPinning, isUpdating, isDeleting, isDuplicating, isUnPinning]
  );

  useEffect(() => {
    setNoteLoading(isLoading);
  }, [isLoading, setNoteLoading]);

  const handleDelete = () =>
    deleteNote({ id: data.noteId, deletedBy: user?.username! });
  const handlePin = () => {
    if (data.isPinned) {
      return unpinNote({
        noteId: data.noteId,
        authorId: user?.userId!,
        unpinnedBy: user?.username!,
      });
    }
    pinNote({ id: data.noteId, authorId: user?.userId! });
  };
  const handleDuplicate = () =>
    duplicateNote({ id: data.noteId, DuplicatedBy: user?.id! });
  const togglePriority = () => {
    updateNote({
      id: data.noteId,
      data: {
        updateNoteDto: {
          noteId: data.noteId,
          notePriorityId: data.notePriorityId ? 0 : 1,
          lastModifiedBy: user?.username!,
        },
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
          <ActionItem label="Edit Note" onClick={editNote.onOpen} />
          <ActionItem label="Duplicate" onClick={handleDuplicate} />
          <ActionItem
            label={data.isPinned ? 'Unpin this Note' : 'Pin this Note'}
            onClick={handlePin}
          />
          <ActionItem
            label={data.notePriorityId ? 'Remove Priority' : 'Set as Priority'}
            onClick={togglePriority}
          />
          <ActionItem label="Delete Note" onClick={deleteNoteModal.onOpen} />
        </VStack>
      </GenericPopover>

      <GenericDeleteModal
        isOpen={deleteNoteModal.isOpen}
        onClose={deleteNoteModal.onClose}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />

      {editNote.isOpen && (
        <NoteForm
          note={data}
          onClose={editNote.onClose}
          isOpen={editNote.isOpen}
        />
      )}
    </>
  );
};

export default PopoverAction;
