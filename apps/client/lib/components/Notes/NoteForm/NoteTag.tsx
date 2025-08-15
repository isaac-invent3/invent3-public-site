import { CloseIcon } from '@chakra-ui/icons';
import {
  AvatarGroup,
  Box,
  HStack,
  Icon,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FormInputWrapper } from '@repo/ui/components';
import { FieldArray, useField } from 'formik';
import UserSelectModal from '../../Common/Modals/UserSelectModal';
import UserInfo from '../../Common/UserInfo';
import { AddIcon } from '../../CustomIcons';

type Tag = { name: string; id: number };

const NoteTag = ({ isLoading }: { isLoading: boolean }) => {
  const {
    isOpen: isOpenSelectUser,
    onOpen: onOpenSelectUser,
    onClose: onCloseSelectUser,
  } = useDisclosure();

  const [field, meta] = useField('tags');

  return (
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

        {isLoading && (
          <Stack direction="row" wrap="wrap" spacing="16px">
            {Array.from({ length: 4 }).map((_, index) => (
              <HStack>
                <SkeletonCircle
                  key={index}
                  width="28px"
                  height="28px"
                  border="2px solid white"
                />
                <Skeleton height="10px" width="40px" />
              </HStack>
            ))}
          </Stack>
        )}

        {!isLoading && (
          <FieldArray name="tags">
            {({ push, remove }) => {
              return (
                <HStack
                  transition="all 0.5s ease"
                  w="full"
                  flexWrap="wrap"
                  spacing="16px"
                >
                  {meta.value?.map((person: Tag, index: number) => (
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
                      const existingUser = meta.value?.find(
                        (item: Tag) => item.id === option?.value
                      );

                      if (existingUser) return;

                      push({
                        name: option.label,
                        id: option.value,
                      });
                    }}
                    sectionInfoText="Tagged user"
                    sectionInfoTitle="Select a user to tag into the note"
                    buttonText="Tag"
                  />
                </HStack>
              );
            }}
          </FieldArray>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default NoteTag;
