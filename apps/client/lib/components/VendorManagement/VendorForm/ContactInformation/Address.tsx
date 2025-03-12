import { SimpleGrid, VStack } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field, useFormikContext } from 'formik';
import CountrySelect from '~/lib/components/Common/SelectComponents/Location/CountrySelect';
import LGASelect from '~/lib/components/Common/SelectComponents/Location/LGASelect';
import StateSelect from '~/lib/components/Common/SelectComponents/Location/StateSelect';
import { VendorFormDetails } from '~/lib/interfaces/vendor.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateVendorForm } from '~/lib/redux/slices/VendorSlice';

const Address = () => {
  const { setFieldValue, values } = useFormikContext<VendorFormDetails>();
  const dispatch = useAppDispatch();
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      customSpacing="65px"
      description="Enter the address of the  contact person"
      title="Address"
    >
      <VStack width="full" spacing="8px">
        <SimpleGrid width="full" gap="16px" columns={{ base: 1, md: 2 }}>
          <Field
            as={FormTextInput}
            name="address1"
            type="text"
            label="Address 1"
            placeholder="Address 1"
          />
          <Field
            as={FormTextInput}
            name="address1"
            type="text"
            label="Address 2"
            placeholder="Address 2"
          />
        </SimpleGrid>
        <SimpleGrid width="full" gap="16px" columns={{base:2, md:4}}>
          <CountrySelect
            handleSelect={(option) => {
              setFieldValue('countryId', option.value);
              dispatch(updateVendorForm({ countryName: option.label }));
            }}
          />
          <StateSelect
            countryId={values.countryId}
            handleSelect={(option) => {
              setFieldValue('stateId', option.value);
              dispatch(updateVendorForm({ stateName: option.label }));
            }}
          />
          <LGASelect
            stateId={values.stateId}
            handleSelect={(option) => {
              setFieldValue('cityId', option.value);
              dispatch(updateVendorForm({ cityName: option.label }));
            }}
            type="specificById"
          />
          <Field
            as={FormTextInput}
            name="postalCode"
            type="text"
            label="Zip/Postal Code"
            placeholder="Zip/Postal Code"
          />
        </SimpleGrid>
      </VStack>
    </FormInputWrapper>
  );
};

export default Address;
