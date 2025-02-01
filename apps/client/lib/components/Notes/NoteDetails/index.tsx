import {
  Box,
  Card,
  HStack,
  Icon,
  ModalBody,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  CheckBox,
  FilterDropDown,
  GenericModal,
} from '@repo/ui/components';
import { AddIcon, InfoIcon } from '../../CustomIcons';
import UserInfo from '../../Common/UserInfo';
interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoteDetails = (props: NoteFormModalProps) => {
  const { isOpen, onClose } = props;

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
                    <CheckBox isChecked={true} />
                    <Text color="neutral.800">Set as Priority</Text>
                  </HStack>
                </HStack>
              </HStack>

              <Card rounded="12px" p="20px" bgColor="white">
                <Text fontWeight={800} fontSize="20px">
                  Heading
                </Text>
                <Text
                  size="md"
                  fontWeight={400}
                  h="500px"
                  overflowY="scroll"
                  pl="1em"
                  mt="1em"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit aperiam hic rerum, cupiditate autem perferendis soluta
                  quo reprehenderit modi quis, dolorem maxime ratione vel odio,
                  temporibus cumque unde numquam. Sunt molestias nemo
                  perspiciatis expedita, totam veritatis vero enim vitae sint et
                  iusto itaque cum! Non quas quasi molestiae laborum,
                  perspiciatis labore veritatis eum nemo quibusdam voluptas
                  error iste numquam architecto autem accusamus vitae adipisci
                  magnam rem, itaque temporibus, tempora quaerat. Doloremque
                  voluptate tempore perferendis, maiores eum iusto iure fugiat
                  nihil nemo tempora ex, nam magnam accusamus! Repellat libero
                  cumque quam neque similique, inventore, in, voluptatibus est
                  delectus non unde tenetur tempore consectetur? Non molestiae
                  quis ipsam unde saepe vel quod ipsa voluptate quidem, iste
                  culpa soluta perspiciatis neque laborum architecto inventore
                  sunt aliquid repudiandae omnis deleniti voluptates, possimus
                  vitae dolore. Sunt asperiores deleniti nesciunt repudiandae
                  adipisci saepe. Corporis minima consectetur incidunt
                  architecto tempore quam doloribus optio modi voluptas
                  inventore minus odit officiis excepturi rem unde beatae,
                  dolores distinctio, nesciunt, consequatur sequi quasi aliquam?
                  Rem blanditiis suscipit sit quam quas repellat ipsam saepe
                  veritatis at sed cumque voluptatibus amet nulla fugit eum,
                  minima aliquid quis, possimus obcaecati fuga deleniti odio!
                  Esse nostrum dolorem totam commodi cupiditate adipisci,
                  recusandae repellendus minus sed!
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
                    name="George Clooney"
                    customAvatarStyle={{
                      width: '24px',
                      height: '24px',
                      fontWeight: 700,
                    }}
                  />
                  <Text color="neutral.600" size="xs" fontWeight={700}>
                    WED, 26 APR 2024
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
                  <Box
                    boxSize="28px"
                    rounded="full"
                    bgColor="#E4E4E4"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    role="group"
                  >
                    <Icon
                      as={AddIcon}
                      color="#374957"
                      boxSize="18px"
                      transition="all 300ms ease-in-out"
                      _groupHover={{ transform: 'rotate(90deg)' }}
                    />
                  </Box>
                </HStack>
              </VStack>
            </VStack>
          </HStack>
        </ModalBody>
      </GenericModal>
    </>
  );
};

export default NoteDetails;
