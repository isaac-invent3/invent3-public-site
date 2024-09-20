/* eslint-disable no-unused-vars */
import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import SectionInfo from '../../SectionInfo';
import AddButton from '../../AddButton';
import LocationModal from './Modals/LocationModal';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import { FormikErrors } from 'formik';
import { useAppSelector } from '~/lib/redux/hooks';

interface AssetLocationProps {
  errors: FormikErrors<AssetFormDetails>;
  setFieldValue: (
    field: keyof AssetFormDetails,
    value: string | number | undefined,
    shouldValidate?: boolean
  ) => void;
}
const AssetLocation = (props: AssetLocationProps) => {
  const {
    facilityName,
    buildingName,
    floorName,
    departmentName,
    roomName,
    aisleName,
    shelfName,
  } = useAppSelector((state) => state.asset.assetForm);
  const { errors, setFieldValue } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <HStack
      width="full"
      alignItems="center"
      spacing="104px"
      position="relative"
    >
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Location"
          info="Specify where the asset is located"
          isRequired
        />
      </Flex>
      <Grid width="full" gap="16px" templateColumns="repeat(4, 1fr)">
        {facilityName && (
          <GridItem colSpan={2}>
            <Text py="14px" px="16px" bgColor="neutral.100" rounded="8px">
              {[
                facilityName,
                buildingName,
                floorName,
                departmentName,
                roomName,
                aisleName,
                shelfName,
              ]
                .filter(Boolean)
                .join(', ')}
            </Text>
          </GridItem>
        )}
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" justifyContent="center" height="full">
            <AddButton handleClick={onOpen}>
              {facilityName ? 'Edit' : 'Add'} Location
            </AddButton>
            {errors.facilityId && (
              <ErrorMessage>Location is required</ErrorMessage>
            )}
          </VStack>
        </GridItem>
        <LocationModal
          isOpen={isOpen}
          onClose={onClose}
          setFieldValue={setFieldValue}
        />
      </Grid>
    </HStack>
  );
};

export default AssetLocation;
