import {
  Box,
  Card,
  HStack,
  Icon,
  ModalBody,
  Text,
  Tooltip,
  VStack,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  CheckBox,
  GenericModal,
} from '@repo/ui/components';
import { Note } from '~/lib/interfaces/notes.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import UserInfo from '../../Common/UserInfo';
import { AddIcon, InfoIcon } from '../../CustomIcons';
import NoteComments from './Comments';
interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
}

const NoteDetails = (props: NoteFormModalProps) => {
  const { isOpen, onClose, note } = props;
  console.log({note})

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
        <ModalBody p={0} m={0} width="full">
          <HStack
            alignItems="start"
            justifyContent="space-between"
            w="full"
            mt="1em"
            spacing="2em"
          >
            <VStack
              p={0}
              marginTop={0}
              margin="0px"
              padding="0px"
              paddingInline="0px !important"
              width={{ md: '70%', base: '100%' }}
              spacing="24px"
              px="24px"
              mt="22px"
            >
              <HStack justifyContent="space-between" w="full">
                <Text lineHeight="38px" fontSize="32px" fontWeight={800}>
                  Notes
                </Text>

                <Button customStyles={{ w: '150px' }}>Edit Note</Button>
              </HStack>

              <HStack justifyContent="space-between" w="full">
                <BackButton handleClick={onClose} />
                <HStack spacing="12px">
                  <HStack alignItems="start">
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
                  </HStack>

                  <HStack spacing="8px">
                    <CheckBox isChecked={note.notePriorityId === 1} />
                    <Text color="neutral.800">Set as Priority</Text>
                  </HStack>
                </HStack>
              </HStack>

              <Card rounded="12px" p="20px" bgColor="white" w="full">
                <Text fontWeight={800} fontSize="20px">
                  {note.title}
                </Text>
                <Text
                  size="md"
                  fontWeight={400}
                  h="500px"
                  overflowY="scroll"
                  pl="1em"
                  mt="1em"
                >
                  {note.content}
                </Text>
              </Card>
            </VStack>

            <VStack w="30%" alignItems="start" spacing="20px">
              <VStack
                bgColor="white"
                p="20px"
                spacing="16px"
                rounded="12px"
                alignItems="start"
                w="full"
              >
                <Text color="black" size="md" fontWeight={800}>
                  Author
                </Text>
                <HStack justifyContent="space-between" w="full">
                  <UserInfo
                    name={`${note.authorFirstName ?? 'George'} ${note.authorLastName ?? 'Clooney'}`}
                    customAvatarStyle={{
                      width: '24px',
                      height: '24px',
                      fontWeight: 700,
                    }}
                  />
                  <Text color="neutral.600" size="xs" fontWeight={700}>
                    {/* WED, 26 APR 2024 */}
                    {dateFormatter(note.dateCreated, 'DD MM YYYY')}
                  </Text>
                </HStack>
              </VStack>

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
                <HStack justifyContent="space-between" w="full">
                  {/* {note.} */}
                  <AvatarGroup size="sm" max={4}>
                    <Avatar
                      size="sm"
                      width="28px"
                      height="28px"
                      border="2px solid white"
                      name="Ryan Florence"
                      src="https://bit.ly/ryan-florence"
                    />
                    <Avatar
                      size="sm"
                      width="28px"
                      height="28px"
                      border="2px solid white"
                      name="Segun Adebayo"
                      src="https://bit.ly/sage-adebayo"
                    />
                    <Avatar
                      size="sm"
                      width="28px"
                      height="28px"
                      border="2px solid white"
                      name="Kent Dodds"
                      src="https://bit.ly/kent-c-dodds"
                    />
                    <Avatar
                      size="sm"
                      width="28px"
                      height="28px"
                      border="2px solid white"
                      name="Prosper Otemuyiwa"
                      src="https://bit.ly/prosper-baba"
                    />
                    <Avatar
                      size="sm"
                      width="28px"
                      height="28px"
                      border="2px solid white"
                      name="Christian Nwamba"
                      src="https://bit.ly/code-beast"
                    />
                  </AvatarGroup>
                </HStack>
              </VStack>

              <VStack
                bgColor="white"
                p="20px"
                spacing="16px"
                rounded="12px"
                alignItems="start"
                w="full"
                h="460px"
                overflowY="scroll"
              >
                <NoteComments noteId={note.noteId} />
              </VStack>
            </VStack>
          </HStack>
        </ModalBody>
      </GenericModal>
    </>
  );
};

export default NoteDetails;
