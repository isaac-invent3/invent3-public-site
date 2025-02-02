import {
  Box,
  Divider,
  Grid,
  HStack,
  Icon,
  ModalBody,
  ModalHeader,
  Skeleton,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  Button,
  FilterButton,
  FilterDropDown,
  GenericModal,
  SearchInput,
} from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData, {
  findSystemContextDetailById,
} from '~/lib/hooks/useParseUrl';
import {
  useGetAllUserNotesQuery,
  useGetPinnedNotesQuery,
} from '~/lib/redux/services/notes.services';
import { FilterIcon, GridIcon, InfoIcon, ListIcon } from '../../CustomIcons';
import NoteForm from '../NoteForm';
import NoteCard from './NoteCard';
import { dummyNotes } from './dummyData';

interface AllNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllNotes = (props: AllNotesModalProps) => {
  const { isOpen, onClose } = props;
  const formattedUrl = useFormatUrl();
  const data = useParseUrlData(formattedUrl);
  const [search, setSearch] = useState('');

  const {
    isOpen: isNoteFormOpened,
    onOpen: onNoteFormOpen,
    onClose: onNoteFormClose,
  } = useDisclosure();

  const session = useSession();
  const user = session?.data?.user;

  const { data: notes, isLoading: isGettingNotes } = useGetAllUserNotesQuery(
    {
      systemContextTypeId: data?.systemContextId!,
      systemContextIds: [],
    },
    { skip: !user?.userId || !data?.systemContextId }
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
            <HStack gap="1em" w="full" justifyContent="space-between" mt="1em">
              <HStack alignItems="start" spacing="40px">
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
                    {findSystemContextDetailById(data?.systemContextId)
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
                      height: 'auto',
                    }}
                    chevronStyles={{ display: 'none' }}
                  />
                </VStack>
              </HStack>

              <HStack spacing="16px">
                <SearchInput setSearch={setSearch} placeholderText="Search" />

                <FilterButton
                  icon={FilterIcon}
                  label="Filters"
                  handleClick={() => console.log('')}
                  isActive={false}
                />

                <HStack>
                  <Box
                    rounded="4px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgColor="primary.500"
                    boxSize="32px"
                    cursor="pointer"
                  >
                    <Icon as={GridIcon} color="white" />
                  </Box>

                  <Box
                    rounded="4px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxSize="32px"
                    cursor="pointer"
                  >
                    <Icon as={ListIcon} color="primary.500" />
                  </Box>
                </HStack>
              </HStack>
            </HStack>

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
      />
    </>
  );
};

export default AllNotes;
