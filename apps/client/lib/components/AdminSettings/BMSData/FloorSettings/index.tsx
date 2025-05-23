import {
  Collapse,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FormTextInput } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import React from 'react';
import BuildingSelect from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/BuildingSelect';
import FloorSelect from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/FloorSelect';
import { ChevronDownIcon, FileIcon } from '~/lib/components/CustomIcons';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import { BMSData } from '~/lib/interfaces/settings.interfaces';

interface FloorSettingsProps {
  index: number;
}
const FloorSettings = (props: FloorSettingsProps) => {
  const { index } = props;
  const { onToggle, isOpen } = useDisclosure();
  const { values, setFieldValue } = useFormikContext<BMSData>();
  return (
    <VStack
      width="full"
      bgColor="#F7F7F7"
      p="16px"
      onClick={onToggle}
      transition="all 0.5s ease"
      cursor="pointer"
      spacing="32px"
    >
      <HStack width="full" justifyContent="space-between">
        <HStack spacing="56px">
          <Text
            width="103px"
            fontSize="16px"
            lineHeight="100%"
            color="primary.500"
            fontWeight={700}
          >
            Floor Settings
          </Text>
          <Flex width="565px" onClick={(e) => e.stopPropagation()}>
            <FloorSelect
              type="specificById"
              buildingId={values?.facilityId}
              handleSelect={() => {}}
              selectStyles={{ backgroundColor: '#F7F7F7' }}
            />
          </Flex>
        </HStack>
        <Icon
          as={ChevronDownIcon}
          boxSize="24px"
          color="neutral.800"
          transition="transform 0.3s ease-out"
          transform={isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'}
          cursor="pointer"
        />
      </HStack>
      <Collapse
        startingHeight={0}
        in={isOpen}
        transition={{ enter: { duration: 0 } }}
        style={{ width: '100%' }}
      >
        <VStack width="full" spacing="32px">
          <SectionWrapper
            title="Upload Floor Map (JPG, PNG)"
            subtitle="Easily upload your data files"
            spacing={{ base: '8px', sm: '24px', lg: '96px' }}
            direction={{ base: 'column', sm: 'row' }}
            sectionInfoStyle={{
              width: { lg: '246px' },
            }}
            subtitleStyle={{ width: '246px' }}
            width="full"
          >
            <HStack
              py="18px"
              px="16px"
              width="304px"
              height="60px"
              bgColor="white"
              rounded="8px"
            >
              <Icon as={FileIcon} boxSize="24px" />
            </HStack>
          </SectionWrapper>
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default FloorSettings;
