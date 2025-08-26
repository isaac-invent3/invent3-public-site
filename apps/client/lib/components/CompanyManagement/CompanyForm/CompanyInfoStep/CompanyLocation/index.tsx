/* eslint-disable no-unused-vars */
import { Grid, GridItem } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field, useField, useFormikContext } from 'formik';
import { useEffect } from 'react';
import CountrySelect from '~/lib/components/Common/SelectComponents/Location/CountrySelect';
import LGASelect from '~/lib/components/Common/SelectComponents/Location/LGASelect';
import StateSelect from '~/lib/components/Common/SelectComponents/Location/StateSelect';
import { CompanyFormDetails } from '~/lib/interfaces/company.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateCompanyForm } from '~/lib/redux/slices/CompanySlice';

const CompanyLocation = () => {
  const [field, meta, helpers] = useField('facilityId');
  const dispatch = useAppDispatch();
  const { setFieldValue, values } = useFormikContext<CompanyFormDetails>();

  useEffect(() => {
    if (meta.value) {
      helpers.setError(undefined);
    }
  }, [meta.value, meta.error]);
  return (
    <FormInputWrapper
      sectionMaxWidth="141px"
      customSpacing="47px"
      description="Enter details of the person responsible for the asset."
      title="Physical Address"
      isRequired
    >
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
        gap="16px"
        width="full"
      >
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Field
            as={FormTextInput}
            name="address1"
            type="text"
            label="Address Line 1"
          />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Field
            as={FormTextInput}
            name="address2"
            type="text"
            label="Address Line 2"
          />
        </GridItem>

        <GridItem colSpan={1}>
          <CountrySelect
            handleSelect={(option) => {
              setFieldValue('countryId', option.value);
              dispatch(updateCompanyForm({ countryName: option.label }));
            }}
          />
        </GridItem>

        <GridItem colSpan={1}>
          <StateSelect
            countryId={values?.countryId}
            handleSelect={(option) => {
              setFieldValue('stateId', option.value);
              dispatch(updateCompanyForm({ stateName: option.label }));
            }}
          />
        </GridItem>

        <GridItem colSpan={1}>
          <LGASelect
            stateId={values?.stateId}
            handleSelect={(option) => {
              setFieldValue('lgaId', option.value);
              dispatch(updateCompanyForm({ lgaName: option.label }));
            }}
            type="specificById"
          />
        </GridItem>

        <GridItem colSpan={1}>
          <Field
            as={FormTextInput}
            name="postalCode"
            type="text"
            label="zip/postalCode"
          />
        </GridItem>
      </Grid>
    </FormInputWrapper>
  );
};

export default CompanyLocation;
