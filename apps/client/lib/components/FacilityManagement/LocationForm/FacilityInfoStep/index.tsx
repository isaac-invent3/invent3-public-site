import { SimpleGrid, VStack } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field, useFormikContext } from 'formik';
import FormImageUpload from '~/lib/components/Common/Form/FormImageUpload';
import CountrySelect from '~/lib/components/Common/SelectComponents/Location/CountrySelect';
import LGASelect from '~/lib/components/Common/SelectComponents/Location/LGASelect';
import StateSelect from '~/lib/components/Common/SelectComponents/Location/StateSelect';
import { LocationMasterFormInterface } from '~/lib/interfaces/location.interfaces';

interface FacilityInfoStepProps {
  activeStep: number;
}
const FacilityInfoStep = (props: FacilityInfoStepProps) => {
  const { activeStep } = props;
  const { values, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  return (
    <VStack
      spacing={{ base: '24px', lg: '43px' }}
      width="full"
      alignItems="flex-start"
      bgColor="white"
      pt={{ base: '16px', lg: '19px' }}
      pl={{ md: '24px', lg: '28px' }}
      pb={{ base: '16px', lg: '33px' }}
      pr={{ md: '24px', lg: '38px' }}
      rounded="6px"
      minH={{ lg: '60vh' }}
      display={activeStep === 1 ? 'flex' : 'none'}
    >
      <FormInputWrapper
        title="Picture"
        description="Size max: 10MB each Format: JPG, PNG"
        isRequired
        sectionMaxWidth="141px"
        customSpacing="36px"
      >
        <FormImageUpload name="picture" />
      </FormInputWrapper>
      <FormInputWrapper
        title="Country"
        description="Select the country where this location is based"
        isRequired
        sectionMaxWidth="141px"
        customSpacing="36px"
        width={{ base: 'full', lg: '50%' }}
      >
        <CountrySelect />
      </FormInputWrapper>
      <FormInputWrapper
        title="State / Region"
        description="Choose the state or region of the location"
        isRequired
        sectionMaxWidth="141px"
        customSpacing="36px"
        width={{ base: 'full', lg: '50%' }}
      >
        <StateSelect countryId={values.countryId} />
      </FormInputWrapper>
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
          <LGASelect type="specificById" stateId={values.stateId} />
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
            name="facilityName"
            type="text"
            label="Name"
            placeholder="Name"
          />
        </FormInputWrapper>
      </SimpleGrid>
      <FormInputWrapper
        title="Address"
        description="Address"
        isRequired
        sectionMaxWidth="141px"
        customSpacing="36px"
        width={{ base: 'full', lg: '50%' }}
      >
        <Field
          as={FormTextInput}
          name="address"
          type="text"
          label="Address"
          placeholder="Address"
        />
      </FormInputWrapper>
    </VStack>
  );
};

export default FacilityInfoStep;
