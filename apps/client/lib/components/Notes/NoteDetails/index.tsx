import {
  HStack,
  Icon,
  ModalBody,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import {
  FilterDropDown,
  FormInputWrapper,
  FormTextAreaInput,
  FormTextInput,
  GenericModal,
} from '@repo/ui/components';
import { Field } from 'formik';
import { InfoIcon } from '../../CustomIcons';
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
          >
            <VStack
              p={0}
              marginTop={0}
              margin="0px"
              padding="0px"
              paddingInline="0px !important"
              width={{ md: '80%', base: '100%' }}
              spacing="24px"
              px="24px"
              mt="22px"
            >
              <FormInputWrapper
                sectionMaxWidth="157px"
                spacing="24px"
                description="Provide essential information about the asset being added."
                title="Title"
                isRequired
              >
                <Field
                  as={FormTextInput}
                  name="noteTitle"
                  type="text"
                  label="Title"
                />
              </FormInputWrapper>

              <FormInputWrapper
                sectionMaxWidth="157px"
                spacing="24px"
                description="Provide essential information about the asset being added."
                title="Title"
                isRequired
              >
                <Field
                  as={FormTextAreaInput}
                  name="content"
                  type="text"
                  label="Note"
                  customStyle={{ height: '300px' }}
                />
              </FormInputWrapper>
            </VStack>

            <VStack alignItems="start" spacing="40px">
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
                  Asset Management
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
            </VStack>
          </HStack>
        </ModalBody>
      </GenericModal>
    </>
  );
};

export default NoteDetails;
