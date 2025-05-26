import {
  Collapse,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FormTextInput } from '@repo/ui/components';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import BuildingSelect from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/BuildingSelect';
import { ChevronDownIcon, DeleteIcon } from '~/lib/components/CustomIcons';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import { BMSData } from '~/lib/interfaces/settings.interfaces';
import BudgetExpenditure from './BudgetExpenditure';
import { newFloor } from '../helpers';
import FloorSettings from '../FloorSettings';
import { set } from 'lodash';

interface BuildingSettingsProps {
  buildingIndex: number;
}
const BuildingSettings = (props: BuildingSettingsProps) => {
  const { buildingIndex } = props;
  const { onToggle, isOpen } = useDisclosure();
  const { values, setFieldValue } = useFormikContext<BMSData>();
  return (
    <VStack
      width="full"
      bgColor="#F7F7F7"
      rounded={isOpen ? 'none' : '16px'}
      p="16px"
      onClick={onToggle}
      transition="all 0.5s ease"
      cursor="pointer"
      spacing="40px"
      borderWidth="1px"
      borderColor={isOpen ? 'transparent' : 'netural.300'}
    >
      <HStack width="full" justifyContent="space-between">
        <Stack
          spacing={{ base: '24px', lg: '96px' }}
          direction={{ base: 'column', lg: 'row' }}
          alignItems="flex-start"
        >
          <Text
            width="246px"
            fontSize="20px"
            lineHeight="100%"
            color="primary.500"
            fontWeight={800}
          >
            Building Settings
          </Text>
          <Flex
            width={{ base: 'full', lg: '391px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <BuildingSelect
              type="specificById"
              facilityId={values?.facilityId}
              handleSelect={(option) => {
                setFieldValue(
                  `bmsBuildingSettingsModel.${buildingIndex}.buildingId`,
                  option?.value
                );
              }}
              selectName={`bmsBuildingSettingsModel.${buildingIndex}.buildingId`}
              selectStyles={{ backgroundColor: '#E6E6E6' }}
            />
          </Flex>
        </Stack>
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
        <VStack width="full" spacing="24px">
          <VStack
            width="full"
            spacing={{ base: '24px', lg: '16px' }}
            alignItems="flex-start"
          >
            <VStack
              width="full"
              spacing={{ base: '24px', lg: '16px' }}
              alignItems="flex-start"
              maxW={{ lg: '80%' }}
            >
              <SectionWrapper
                title="Cost of Energy per kWh"
                subtitle="The unit cost of electricity per kWh depending on the distributing company."
                spacing={{ base: '8px', sm: '16px', lg: '96px' }}
                direction={{ base: 'column', lg: 'row' }}
                sectionInfoStyle={{
                  width: { lg: '246px' },
                }}
                subtitleStyle={{ width: '246px' }}
                width="full"
              >
                <Grid
                  gridTemplateColumns="repeat(3, 1fr)"
                  width="full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GridItem colSpan={2}>
                    <FormTextInput
                      name={`bmsBuildingSettingsModel.${buildingIndex}.costOfEnergyPerKWh`}
                      type="number"
                      label="Cost per KWh"
                      customStyle={{ bgColor: '#E6E6E6' }}
                    />
                  </GridItem>
                </Grid>
              </SectionWrapper>
              <BudgetExpenditure buildingSettingsIndex={buildingIndex} />
            </VStack>
          </VStack>
          <FieldArray
            name={`bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels`}
          >
            {({ insert, remove, form, push }) => {
              return (
                <VStack
                  width="full"
                  spacing="16px"
                  alignItems={
                    values.bmsBuildingSettingsModel.length > 0
                      ? 'flex-end'
                      : 'center'
                  }
                >
                  {values.bmsBuildingSettingsModel?.[
                    buildingIndex
                  ]?.bmsFloorSettingsModels.map((_, index) => (
                    <HStack
                      width="full"
                      alignItems="flex-end"
                      transition="all 0.5s ease"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FloorSettings buildingIndex={index} floorIndex={index} />
                      {index !== 0 && (
                        <Icon
                          as={DeleteIcon}
                          boxSize="16px"
                          cursor="pointer"
                          onClick={() => remove(index)}
                          mb="8px"
                        />
                      )}
                    </HStack>
                  ))}
                  <Text
                    size="md"
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      push(newFloor);
                    }}
                  >
                    Configure A Floor
                  </Text>
                </VStack>
              );
            }}
          </FieldArray>
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default BuildingSettings;
