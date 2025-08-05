import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  FormActionButtons,
  FormInputWrapper,
  FormTextInput,
} from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { updateVendorForm } from '~/lib/redux/slices/VendorSlice';
import { contactInformationSchema } from '~/lib/schemas/vendor.schema';
import ContactName from './ContactName';
import Address from './Address';

interface ContactInformationProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
  cancelAction?: () => void;
}
const ContactInformation = (props: ContactInformationProps) => {
  const { activeStep, setActiveStep, type, cancelAction } = props;
  const formDetails = useAppSelector((state) => state.vendor.vendorForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      contactFirstName: formDetails?.contactFirstName ?? null,
      contactLastName: formDetails?.contactLastName ?? null,
      primaryEmail: formDetails?.contactFirstName ?? null,
      primaryPhoneNumber: formDetails?.primaryPhoneNumber ?? null,
      address1: formDetails?.address1 ?? null,
      address2: formDetails?.address2 ?? null,
      vendorCountryId: formDetails?.vendorCountryId ?? null,
      vendorStateId: formDetails?.vendorStateId ?? null,
      vendorCityId: formDetails?.vendorCityId ?? null,
      postalCode: formDetails?.postalCode ?? null,
    },
    validationSchema: contactInformationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateVendorForm(values));
      setActiveStep(3);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 2 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing={{ base: '24px', lg: '40px' }}
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt="26px"
            pl="16px"
            pb="33px"
            pr={{ base: '16px', md: '44px' }}
            rounded="6px"
            minH="60vh"
          >
            <ContactName />
            <SimpleGrid
              width="full"
              columns={{ base: 1, md: 2 }}
              spacing={{ base: '24px', lg: '50px' }}
            >
              <FormInputWrapper
                sectionMaxWidth="157px"
                customSpacing="65px"
                description="Provide the person’s email"
                title="Primary Contact Email"
                isRequired
              >
                <Field
                  as={FormTextInput}
                  name="primaryEmail"
                  type="text"
                  label="Email"
                  placeholder="Email"
                />
              </FormInputWrapper>
              <FormInputWrapper
                sectionMaxWidth="141px"
                customSpacing="24px"
                description="Provide the person’s Phone Number"
                title="Primary Phone Number"
                isRequired
              >
                <Field
                  as={FormTextInput}
                  name="primaryPhoneNumber"
                  type="text"
                  label="Phone Number"
                  placeholder="Phone Number"
                />
              </FormInputWrapper>
            </SimpleGrid>
            <Address />
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={type === 'edit' ? `/${ROUTES.VENDOR}` : undefined}
              cancelAction={
                type === 'create' && cancelAction ? cancelAction : undefined
              }
              totalStep={4}
              activeStep={2}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default ContactInformation;
