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
import { useState } from 'react';
import {
  AssetFormDetails,
  FormLocation,
} from '~/lib/interfaces/asset.interfaces';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import { FormikErrors } from 'formik';

interface AssetLocationProps {
  errors: FormikErrors<AssetFormDetails>;
  setFieldValue: (
    field: keyof AssetFormDetails,
    value: string | number | null,
    shouldValidate?: boolean
  ) => void;
}
const AssetLocation = (props: AssetLocationProps) => {
  const { errors, setFieldValue } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [location, setLocation] = useState<FormLocation>({
    facility: '',
    building: '',
    floor: '',
    department: '',
    room: '',
    aisle: '',
    shelf: '',
  });
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
        {location.facility && (
          <GridItem colSpan={2}>
            <Text py="14px" px="16px" bgColor="neutral.100" rounded="8px">
              {Object.values(location).filter(Boolean).join(', ')}
            </Text>
          </GridItem>
        )}
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" justifyContent="center" height="full">
            <AddButton handleClick={onOpen}>
              {location?.facility ? 'Edit' : 'Add'} Location
            </AddButton>
            {errors.facilityId && (
              <ErrorMessage>Location is required</ErrorMessage>
            )}
          </VStack>
        </GridItem>
        <LocationModal
          isOpen={isOpen}
          onClose={onClose}
          setLocation={setLocation}
          setFieldValue={setFieldValue}
        />
      </Grid>
    </HStack>
  );
};

export default AssetLocation;
