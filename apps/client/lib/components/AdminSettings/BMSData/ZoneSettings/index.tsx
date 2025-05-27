import {
  Collapse,
  Flex,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FormTextInput } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import RoomByFloorSelect from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/RoomsByFloorSelect';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import { BMSData } from '~/lib/interfaces/settings.interfaces';
import { useGetRoomSettingsByRoomIdQuery } from '~/lib/redux/services/settings.services';

interface ZoneSettingsProps {
  buildingIndex: number;
  floorIndex: number;
  zoneIndex: number;
}
const ZoneSettings = (props: ZoneSettingsProps) => {
  const { buildingIndex, floorIndex, zoneIndex } = props;
  const { onToggle, isOpen } = useDisclosure();
  const { values, setFieldValue } = useFormikContext<BMSData>();
  const { data, isLoading } = useGetRoomSettingsByRoomIdQuery(
    {
      roomId:
        values?.bmsBuildingSettingsModel?.[buildingIndex]
          ?.bmsFloorSettingsModels?.[floorIndex]?.bmsRoomSettingsModel?.[
          zoneIndex
        ]?.roomId!,
    },
    {
      skip:
        !isOpen ||
        !values?.bmsBuildingSettingsModel?.[buildingIndex]
          ?.bmsFloorSettingsModels?.[floorIndex]?.bmsRoomSettingsModel?.[
          zoneIndex
        ]?.roomId,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      setFieldValue(
        `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.temperatureSetPoint.value.value`,
        typeof data.data?.temperature === 'string'
          ? +data.data?.temperature
          : data.data?.temperature
      );
      setFieldValue(
        `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.humiditySetPoint.value.value`,
        typeof data.data?.humidity === 'string'
          ? +data.data?.humidity
          : data.data?.humidity
      );
      setFieldValue(
        `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.co2SetPoint.value.value`,
        typeof data.data?.co2 === 'string' ? +data.data?.co2 : data.data?.co2
      );
      setFieldValue(
        `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.energyConsumptionTarget.value.value`,
        typeof data.data?.energyConsumption === 'string'
          ? +data.data?.energyConsumption
          : data.data?.energyConsumption
      );
      setFieldValue(
        `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.lightningLevelSetPoint.value.value`,
        typeof data.data?.lightningLevel === 'string'
          ? +data.data?.lightningLevel
          : data.data?.lightningLevel
      );
    }
  }, [data]);

  return (
    <VStack
      width="full"
      bgColor="#F7F7F7"
      p="16px"
      onClick={onToggle}
      transition="all 0.5s ease"
      cursor="pointer"
      spacing="16px"
      rounded="16px"
    >
      <HStack width="full" justifyContent="space-between">
        <Stack
          spacing={{ base: '24px', lg: '96px' }}
          direction={{ base: 'column', lg: 'row' }}
          alignItems="center"
        >
          <Text
            width="246px"
            fontSize="16px"
            lineHeight="100%"
            color="primary.500"
            fontWeight={700}
          >
            Zone Settings
          </Text>
          <Flex
            width={{ base: 'full', lg: '306px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <RoomByFloorSelect
              type="specificById"
              floorId={
                values?.bmsBuildingSettingsModel?.[buildingIndex]
                  ?.bmsFloorSettingsModels?.[floorIndex]?.floorId
              }
              handleSelect={(option) => {
                setFieldValue(
                  `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.roomId`,
                  option?.value
                );
              }}
              selectName={`bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.roomId`}
              selectStyles={{ backgroundColor: '#E9E9E9' }}
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
        <VStack
          width="full"
          spacing="16px"
          alignItems="flex-start"
          opacity={isLoading ? 0.5 : 1}
          position="relative"
          pointerEvents={isLoading ? 'none' : 'initial'}
        >
          {isLoading && (
            <Flex
              position="absolute"
              width="full"
              height="full"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner size="md" />
            </Flex>
          )}
          <SectionWrapper
            title="Temperature SetPoint"
            subtitle="Target temperature set for automated climate control adjustments."
            spacing={{ base: '8px', sm: '16px', lg: '128px' }}
            direction={{ base: 'column', lg: 'row' }}
            sectionInfoStyle={{
              width: { lg: '246px' },
            }}
            subtitleStyle={{ width: '246px' }}
            width="full"
            justifyContent="flex-start"
            alignItems={{ base: 'flex-start', lg: 'center' }}
          >
            <FormTextInput
              name={`bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.temperatureSetPoint.value.value`}
              type="number"
              label="Temperature Value"
              customStyle={{
                bgColor: '#E9E9E9',
                width: '306px',
                onClick: (e) => e.stopPropagation(),
              }}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Humidity SetPoint"
            subtitle="Target humidity level to maintain optimal indoor air quality and comfort."
            spacing={{ base: '8px', sm: '16px', lg: '128px' }}
            direction={{ base: 'column', lg: 'row' }}
            sectionInfoStyle={{
              width: { lg: '246px' },
            }}
            subtitleStyle={{ width: '246px' }}
            width="full"
            justifyContent="flex-start"
            alignItems={{ base: 'flex-start', lg: 'center' }}
          >
            <FormTextInput
              name={`bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.humiditySetPoint.value.value`}
              type="number"
              label="Degree"
              customStyle={{
                bgColor: '#E9E9E9',
                width: '306px',
                onClick: (e) => e.stopPropagation(),
              }}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Lightning Level SetPoint"
            subtitle="Monitor current lighting intensity to ensure optimal visibility and energy use."
            spacing={{ base: '8px', sm: '16px', lg: '128px' }}
            direction={{ base: 'column', lg: 'row' }}
            sectionInfoStyle={{
              width: { lg: '246px' },
            }}
            subtitleStyle={{ width: '246px' }}
            width="full"
            justifyContent="flex-start"
            alignItems={{ base: 'flex-start', lg: 'center' }}
          >
            <FormTextInput
              name={`bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.lightningLevelSetPoint.value.value`}
              type="number"
              label="Level"
              customStyle={{
                bgColor: '#E9E9E9',
                width: '306px',
                onClick: (e) => e.stopPropagation(),
              }}
            />
          </SectionWrapper>
          <SectionWrapper
            title="CO Levels SetPoint"
            subtitle="Monitor indoor carbon monoxide levels to ensure occupant safety and air quality compliance."
            spacing={{ base: '8px', sm: '16px', lg: '128px' }}
            direction={{ base: 'column', lg: 'row' }}
            sectionInfoStyle={{
              width: { lg: '246px' },
            }}
            subtitleStyle={{ width: '246px' }}
            width="full"
            justifyContent="flex-start"
            alignItems={{ base: 'flex-start', lg: 'center' }}
          >
            <FormTextInput
              name={`bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.co2SetPoint.value.value`}
              type="number"
              label="CO Value"
              customStyle={{
                bgColor: '#E9E9E9',
                width: '306px',
                onClick: (e) => e.stopPropagation(),
              }}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Energy Consumption Target (per zone)"
            subtitle="Set and monitor energy usage goals for each zone to boost efficiency."
            spacing={{ base: '8px', sm: '16px', lg: '128px' }}
            direction={{ base: 'column', lg: 'row' }}
            sectionInfoStyle={{
              width: { lg: '246px' },
            }}
            subtitleStyle={{ width: '246px' }}
            width="full"
            justifyContent="flex-start"
            alignItems={{ base: 'flex-start', lg: 'center' }}
          >
            <FormTextInput
              name={`bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel.${zoneIndex}.energyConsumptionTarget.value.value`}
              type="number"
              label="Enrgy Consumption Target"
              placeholder="kWh target eg. 3500kWh"
              customStyle={{
                bgColor: '#E9E9E9',
                width: '306px',
                onClick: (e) => e.stopPropagation(),
              }}
            />
          </SectionWrapper>
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default ZoneSettings;
