import { HStack, Text, VStack } from '@chakra-ui/react';
import {
  ErrorMessage,
  FormInputWrapper,
  FormTextInput,
  RadioBox,
} from '@repo/ui/components';
import { Field, useField } from 'formik';
import React from 'react';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateVendorForm } from '~/lib/redux/slices/VendorSlice';

const RadioButtonData = ['Active', 'Inactive'];
const ContractValueAndVendorStatus = () => {
  const [field, meta, helpers] = useField('vendorStatusId'); //eslint-disable-line
  const dispatch = useAppDispatch();

  return (
    <VStack spacing={{ base: '24px', lg: '35px' }} alignItems="flex-start">
      <FormInputWrapper
        sectionMaxWidth="141px"
        customSpacing="24px"
        description="Provide essential information about the contact person being added."
        title="Contract Value"
        isRequired
      >
        <Field
          as={FormTextInput}
          name="contractValue"
          type="number"
          label="Contract value"
          placeholder="Contract Value"
        />
      </FormInputWrapper>
      <FormInputWrapper
        sectionMaxWidth="141px"
        customSpacing="24px"
        description="Toggle the button to activate this vendor or deactivate."
        title="Vendor Status"
        isRequired
      >
        <VStack>
          <HStack spacing="24px">
            {RadioButtonData.map((item, index) => (
              <HStack key={index} spacing="8px">
                <RadioBox
                  isSelected={index === meta.value}
                  handleClick={() => {
                    helpers.setValue(index);
                    dispatch(updateVendorForm({ vendorStatusName: item }));
                  }}
                />
                <Text color="neutral.600" size="md">
                  {item}
                </Text>
              </HStack>
            ))}
          </HStack>
          {meta.touched && meta.error !== undefined && (
            <ErrorMessage>{meta.error}</ErrorMessage>
          )}
        </VStack>
      </FormInputWrapper>
    </VStack>
  );
};

export default ContractValueAndVendorStatus;
