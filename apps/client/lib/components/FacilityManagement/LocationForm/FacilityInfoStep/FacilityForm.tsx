import { SimpleGrid, VStack } from '@chakra-ui/react';
import {
  FormActionButtons,
  FormAddButton,
  FormInputWrapper,
  FormTextInput,
} from '@repo/ui/components';
import { Field, useFormikContext } from 'formik';
import FormImageUpload from '~/lib/components/Common/Form/FormImageUpload';
import CountrySelect from '~/lib/components/Common/SelectComponents/Location/CountrySelect';
import LGASelect from '~/lib/components/Common/SelectComponents/Location/LGASelect';
import StateSelect from '~/lib/components/Common/SelectComponents/Location/StateSelect';
import {
  FacilitiesInterface,
  FacilityFormInterface,
} from '~/lib/interfaces/location.interfaces';

interface FacilityFormProps {
  activeFacility?: number;
  setActiveFacility: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleAddFacility: () => void;
  setShowFacilityForm: React.Dispatch<React.SetStateAction<boolean>>;
  setFacilityLists: React.Dispatch<
    React.SetStateAction<FacilityFormInterface[]>
  >;
}
const FacilityForm = (props: FacilityFormProps) => {
  const {
    activeFacility = 0,
    setActiveFacility,
    handleAddFacility,
    setShowFacilityForm,
    setFacilityLists,
  } = props;

  const { values, validateForm, setTouched, setFieldValue } =
    useFormikContext<FacilitiesInterface>();
  const facilitiesCount = values.facilities.length;

  const validateActiveFacility = async () => {
    const touchedFields = {
      countryId: true,
      stateId: true,
      lgaId: true,
      facilityName: true,
      address: true,
      picture: true,
    };

    // mark active facility as touched
    setTouched(
      {
        facilities: values.facilities.map((_, idx) =>
          idx === activeFacility ? touchedFields : {}
        ),
      },
      false
    );

    const errors = await validateForm();
    return !errors.facilities || !errors.facilities[activeFacility];
  };

  const handleValidateAndAdd = async () => {
    const isValid = await validateActiveFacility();
    if (isValid) {
      handleAddFacility();
    }
  };

  const handleCancel = () => {
    const currentFacility = values.facilities[activeFacility];
    if (!currentFacility?.localId) {
      // remove the unsaved facility
      const newFacilities = values.facilities.filter(
        (_, idx) => idx !== activeFacility
      );
      setFieldValue('facilities', newFacilities);
    }
    setActiveFacility(undefined);
    setShowFacilityForm(false);
  };

  const handleSave = async () => {
    const currentFacility = values.facilities[activeFacility];

    const isValid = await validateActiveFacility();
    if (isValid) {
      setFacilityLists(values.facilities);
      if (!currentFacility?.localId) {
        // Wait for Formik to update before validating
        await setFieldValue(
          `facilities.${activeFacility}.localId`,
          values.facilities.length + 1
        );
      }
      setActiveFacility(undefined);
      setShowFacilityForm(false); // close form if valid
    }
  };

  return (
    <VStack width="full" alignItems="flex-end" p="16px">
      <VStack
        spacing={{ base: '16px', lg: '24px' }}
        width="full"
        alignItems="flex-start"
        p={facilitiesCount > 1 ? '16px' : 0}
        pb={{ base: '16px', lg: '21px' }}
        rounded="16px"
        bgColor={facilitiesCount > 1 ? '#EBEBEB' : 'none'}
      >
        <FormInputWrapper
          title="Picture"
          description="Size max: 10MB each Format: JPG, PNG"
          isRequired={false}
          sectionMaxWidth="141px"
          customSpacing="36px"
        >
          <FormImageUpload name={`facilities.${activeFacility}.picture`} />
        </FormInputWrapper>
        <SimpleGrid columns={{ base: 1, lg: 2 }} rowGap="24px" width="full">
          <FormInputWrapper
            title="Country"
            description="Select the country where this location is based"
            isRequired
            sectionMaxWidth="141px"
            customSpacing="36px"
          >
            <CountrySelect name={`facilities.${activeFacility}.countryId`} />
          </FormInputWrapper>

          <FormInputWrapper
            title="State / Region"
            description="Choose the state or region of the location"
            isRequired
            sectionMaxWidth="141px"
            customSpacing="36px"
            pl={{ lg: '24px' }}
          >
            <StateSelect
              name={`facilities.${activeFacility}.stateId`}
              countryId={values?.facilities[activeFacility]?.countryId || null}
              handleSelect={(option) =>
                setFieldValue(
                  `facilities.${activeFacility}.stateName`,
                  option?.label
                )
              }
            />
          </FormInputWrapper>
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing="0px"
          rowGap="24px"
          width="full"
        >
          <FormInputWrapper
            title="LGA"
            description="Select the local government area"
            isRequired
            sectionMaxWidth="141px"
            customSpacing="36px"
          >
            <LGASelect
              name={`facilities.${activeFacility}.lgaId`}
              type="specificById"
              stateId={values?.facilities[activeFacility]?.stateId || null}
              handleSelect={(option) =>
                setFieldValue(
                  `facilities.${activeFacility}.lgaName`,
                  option?.label
                )
              }
            />
          </FormInputWrapper>

          <FormInputWrapper
            title="Facility Name"
            description="Name of the Facility"
            isRequired
            sectionMaxWidth="141px"
            customSpacing="36px"
            pl={{ lg: '24px' }}
          >
            <Field
              as={FormTextInput}
              name={`facilities.${activeFacility}.facilityName`}
              type="text"
              label="Name"
              placeholder="Name"
            />
          </FormInputWrapper>
        </SimpleGrid>

        <FormInputWrapper
          title="Address"
          description="Address"
          isRequired={false}
          sectionMaxWidth="141px"
          customSpacing="36px"
          width={{ base: 'full', lg: '50%' }}
        >
          <Field
            as={FormTextInput}
            name={`facilities.${activeFacility}.address`}
            type="text"
            label="Address"
            placeholder="Address"
          />
        </FormInputWrapper>

        {facilitiesCount > 1 && (
          <FormActionButtons
            totalStep={1}
            activeStep={1}
            cancelAction={() => {
              handleCancel();
            }}
            type="button"
            handleContinue={async () => {
              handleSave();
            }}
            finalText="Save Facility"
          />
        )}
      </VStack>
      {facilitiesCount === 1 && (
        <FormAddButton handleClick={handleValidateAndAdd}>
          Add Multiple Facility
        </FormAddButton>
      )}
    </VStack>
  );
};

export default FacilityForm;
