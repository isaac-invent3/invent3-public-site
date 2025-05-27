import {
  Collapse,
  Flex,
  HStack,
  Icon,
  Input,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FieldArray, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import FloorSelect from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/SelectInputs/FloorSelect';
import {
  ChevronDownIcon,
  CloseIcon,
  DeleteIcon,
  FileIcon,
} from '~/lib/components/CustomIcons';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import { BMSData } from '~/lib/interfaces/settings.interfaces';
import ZoneSettings from '../ZoneSettings';
import { newRoom } from '../helpers';
import { useGetFloorSettingsByFloorIdQuery } from '~/lib/redux/services/settings.services';
import { FORM_ENUM, UNIT_ID } from '~/lib/utils/constants';

interface FloorSettingsProps {
  buildingIndex: number;
  floorIndex: number;
}
const FloorSettings = (props: FloorSettingsProps) => {
  const { buildingIndex, floorIndex } = props;
  const { onToggle, isOpen } = useDisclosure();
  const { values, setFieldValue } = useFormikContext<BMSData>();
  const [imageName, setImageName] = React.useState<string | undefined>(
    undefined
  );
  const { data, isLoading } = useGetFloorSettingsByFloorIdQuery(
    {
      floorId:
        values?.bmsBuildingSettingsModel?.[buildingIndex]
          ?.bmsFloorSettingsModels?.[floorIndex]?.floorId!,
    },
    {
      skip:
        !isOpen ||
        !values?.bmsBuildingSettingsModel?.[buildingIndex]
          ?.bmsFloorSettingsModels?.[floorIndex]?.floorId,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      setFieldValue(
        `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.floorMap`,
        `${data.data?.floor?.imageBasePrefix}${data.data?.floor?.floorPlanImage}`
      );
      data?.data?.roomIds.forEach((roomId) => {
        setFieldValue(
          `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel`,
          [
            ...(values.bmsBuildingSettingsModel?.[buildingIndex]
              ?.bmsFloorSettingsModels?.[floorIndex]?.bmsRoomSettingsModel ??
              []),
            {
              roomId: roomId,
              temperatureSetPoint: {
                key: FORM_ENUM.update,
                value: {
                  key: UNIT_ID.DEGREE_CELSIUS,
                  value: null,
                },
              },
              humiditySetPoint: {
                key: FORM_ENUM.update,
                value: {
                  key: UNIT_ID.RELATIVE_HUMIDITY,
                  value: null,
                },
              },
              co2SetPoint: {
                key: FORM_ENUM.update,
                value: {
                  key: UNIT_ID.PARTS_PER_MILLION,
                  value: null,
                },
              },
              lightningLevelSetPoint: {
                key: FORM_ENUM.update,
                value: {
                  key: UNIT_ID.LUX,
                  value: null,
                },
              },
              energyConsumptionTarget: {
                key: FORM_ENUM.update,
                value: {
                  key: UNIT_ID.KILOWATT_HOUR,
                  value: null,
                },
              },
            },
          ]
        );
      });
    }
  }, [data]);

  return (
    <VStack
      width="full"
      bgColor="#E7E7E7"
      p="16px"
      onClick={onToggle}
      transition="all 0.5s ease"
      cursor="pointer"
      spacing="32px"
      rounded="16px"
    >
      <HStack width="full" justifyContent="space-between">
        <Stack
          spacing={{ base: '24px', lg: '56px' }}
          direction={{ base: 'column', lg: 'row' }}
          alignItems="center"
        >
          <Text
            width="103px"
            fontSize="16px"
            lineHeight="100%"
            color="primary.500"
            fontWeight={700}
          >
            Floor Settings
          </Text>
          <Flex
            minW={{ base: '200px', lg: '565px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <FloorSelect
              type="specificById"
              buildingId={
                values?.bmsBuildingSettingsModel?.[buildingIndex]?.buildingId
              }
              handleSelect={(option) => {
                setFieldValue(
                  `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.floorId`,
                  option?.value
                );
              }}
              selectName={`bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.floorId`}
              selectStyles={{ backgroundColor: '#F7F7F7', width: '100%' }}
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
          spacing="32px"
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
            title="Upload Floor Map (JPG, PNG)"
            subtitle="Easily upload your data files"
            spacing={{ base: '8px', sm: '24px', lg: '30px' }}
            direction={{ base: 'column', sm: 'row' }}
            sectionInfoStyle={{
              width: { lg: '246px' },
            }}
            subtitleStyle={{ width: '246px' }}
            width="full"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Input
              id="file"
              display="none"
              onClick={(e) => e.stopPropagation()}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const fileList = event.currentTarget.files;

                if (fileList && fileList.length > 0) {
                  const file = fileList[0];
                  const reader = new FileReader();
                  reader.readAsDataURL(file as Blob);

                  reader.onloadend = () => {
                    if (reader.result) {
                      const base64PhotoImage = reader.result as string;

                      setImageName(file?.name);
                      // Update the Formik helpers with the processed image
                      setFieldValue(
                        `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.floorMap`,
                        base64PhotoImage
                      );
                    }

                    // Clear the input after the file is processed
                    event.target.value = '';
                  };
                }
              }}
              type="file"
              accept="image/*"
            />
            <label htmlFor="file" onClick={(e) => e.stopPropagation()}>
              <HStack onClick={(e) => e.stopPropagation()}>
                <HStack
                  py="18px"
                  px="16px"
                  width="304px"
                  height="60px"
                  bgColor="white"
                  rounded="8px"
                  spacing="8px"
                  cursor="pointer"
                >
                  <Icon as={FileIcon} boxSize="24px" />
                  <Text size="md" color="primary.500">
                    {imageName ?? 'Click to upload'}
                  </Text>
                </HStack>
                {values.bmsBuildingSettingsModel[buildingIndex]
                  ?.bmsFloorSettingsModels[floorIndex]?.floorMap && (
                  <Icon
                    as={CloseIcon}
                    boxSize="24px"
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFieldValue(
                        `bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.floorMap`,
                        null
                      );
                      setImageName(undefined);
                    }}
                  />
                )}
              </HStack>
            </label>
          </SectionWrapper>

          <FieldArray
            name={`bmsBuildingSettingsModel.${buildingIndex}.bmsFloorSettingsModels.${floorIndex}.bmsRoomSettingsModel`}
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
                  <Text
                    size="md"
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      push(newRoom);
                    }}
                  >
                    Configure A Zone
                  </Text>
                  {values.bmsBuildingSettingsModel?.[
                    buildingIndex
                  ]?.bmsFloorSettingsModels?.[
                    floorIndex
                  ]?.bmsRoomSettingsModel.map((_, index) => (
                    <HStack
                      width="full"
                      alignItems="center"
                      transition="all 0.5s ease"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ZoneSettings
                        buildingIndex={buildingIndex}
                        floorIndex={floorIndex}
                        zoneIndex={index}
                      />
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
                </VStack>
              );
            }}
          </FieldArray>
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default FloorSettings;
