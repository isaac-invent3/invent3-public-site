import { SimpleGrid, VStack } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field, useFormikContext } from 'formik';
import React from 'react';
import CountrySelect from '~/lib/components/Common/SelectComponents/Location/CountrySelect';
import LGASelect from '~/lib/components/Common/SelectComponents/Location/LGASelect';
import StateSelect from '~/lib/components/Common/SelectComponents/Location/StateSelect';
import { UserFormDetails } from '~/lib/interfaces/user.interfaces';

const Address = () => {
  const { setFieldValue, values } = useFormikContext<UserFormDetails>();
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      spacing="65px"
      description="User's Address"
      title="Address"
    >
      <VStack width="full" spacing="8px">
        <SimpleGrid width="full" gap="16px" columns={2}>
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
        <SimpleGrid width="full" gap="16px" columns={4}>
          <CountrySelect
            handleSelect={(option) => {
              setFieldValue('country', option.value);
            }}
          />
          <StateSelect
            countryId={values.country}
            handleSelect={(option) => {
              setFieldValue('state', option.value);
            }}
          />
          <LGASelect
            stateId={values.state}
            handleSelect={(option) => {
              setFieldValue('city', option.value);
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
