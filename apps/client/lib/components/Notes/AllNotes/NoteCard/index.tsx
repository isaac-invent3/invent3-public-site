import {
  Avatar,
  Box,
  Card,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { PinIcon } from '~/lib/components/CustomIcons';
import { Note } from '~/lib/interfaces/notes.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import NoteDetails from '../../NoteDetails';
import PopoverAction from './PopoverAction';

interface NoteCardProps {
  data: Note;
  isFetching?: boolean;
}

const NoteCard = (props: NoteCardProps) => {
  const {
    isOpen: isNoteDetailOpen,
    onOpen: onOpenNoteDetail,
    onClose: onCloseNoteDetail,
  } = useDisclosure();

  const [noteLoading, setNoteLoading] = useState(props.isFetching ?? false);

  if (!props.data) return;

  const { data } = props;
  const {
    content,
    notePriorityId,
    lastModifiedDate,
    title,
    authorFirstName,
    authorLastName,
  } = data;

  const noteTitle = () => {
    if (!title) return 'Text';

    if (title.length > 10) return `${title?.slice(0, 10)}...`;

    return title;
  };

  return (
    <>
      <Card
        cursor="pointer"
        p="8px"
        rounded="8px"
        bgColor="white"
        position="relative"
        h="180px"
        w='150px'
        transition="all 300ms ease-in-out"
        pointerEvents={noteLoading ? 'none' : 'all'}
        opacity={noteLoading ? 0.5 : 1}
        _hover={
          !noteLoading
            ? {
                boxShadow:
                  '0 4px 10px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)',
                marginTop: '-0.2em',
              }
            : undefined
        }
      >
        <Box onClick={onOpenNoteDetail}>
          <HStack w="full" justifyContent="space-between" gap="8px">
            <Text fontWeight={800}>{noteTitle()}</Text>

            {data?.isPinned && (
              <Box
                rounded="4px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgColor="#42403D"
                w="16px"
                h="16px"
              >
                <Icon as={PinIcon} boxSize="10px" />
              </Box>
            )}
          </HStack>

          {notePriorityId === 1 && !data?.isPinned && (
            <Box position="absolute" right="-8px">
              <Box
                display="flex"
                alignItems="end"
                justifyContent="end"
                pos="relative"
              >
                <Icon
                  as={AiFillStar}
                  color="white"
                  boxSize="13px"
                  position="absolute"
                  zIndex={3}
                  left={-4}
                  top={1}
                />

                <Box
                  w="32px"
                  h="24px"
                  rounded="4px"
                  bgColor="#222222"
                  borderBottomRightRadius="0px"
                  position="absolute"
                  top={0}
                  right={0}
                  zIndex={2}
                ></Box>

                <Box
                  w="8px"
                  h="29px"
                  bgColor="#000000"
                  top={0}
                  right={0}
                  roundedTopRight="4px"
                  roundedBottomRight="4px"
                  zIndex={1}
                ></Box>
              </Box>
            </Box>
          )}

          <Box
            pos="relative"
            h="120px"
            rounded="8px"
            overflow="hidden"
            mt="8px"
          >
            <Text
              color="#BBBBBB"
              fontWeight={400}
              size="xs"
              noOfLines={8}
              display="-webkit-box"
              style={{
                WebkitLineClamp: 8,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {content}
            </Text>

            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              pointerEvents="none"
              sx={{
                background: `
              linear-gradient(
                180deg, 
                rgba(247,250,252,0) 0%,
                rgba(247,250,252,0.5) 60%,
                rgba(247,250,252,0.8) 80%,
                rgba(255,255,255,1) 95%
              )`,
              }}
            />
          </Box>
        </Box>

        <Box position="absolute" bottom={2} w="90%">
          <HStack gap="8px" w="full">
            <Avatar w="12px" h="12px" />

            <Text fontSize="8px" fontWeight={500} color="black">
              {` ${authorFirstName ?? 'George'} ${authorLastName ?? 'Clooney'}`}
            </Text>
          </HStack>

          <HStack justifyContent="space-between" gap="8px" w="full">
            <Text
              color="#838383"
              fontWeight={700}
              fontSize="7px"
              lineHeight="8.32px"
            >
              {dateFormatter(lastModifiedDate, 'DD/MM/YYYY')}
            </Text>

            <PopoverAction data={props.data} setNoteLoading={setNoteLoading} />
          </HStack>
        </Box>
      </Card>

      {isNoteDetailOpen && (
        <NoteDetails
          note={props.data}
          isOpen={isNoteDetailOpen}
          onClose={onCloseNoteDetail}
        />
      )}
    </>
  );
};

export default NoteCard;
