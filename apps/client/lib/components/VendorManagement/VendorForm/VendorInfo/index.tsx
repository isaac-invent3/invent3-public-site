import { useAppFormik } from '~/lib/hooks/useAppFormik';
import { Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Field, FormikProvider } from 'formik';

import {
  FormActionButtons,
  FormInputWrapper,
  FormTextInput,
} from '@repo/ui/components';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { vendorInfoSchema } from '~/lib/schemas/vendor.schema';
import Logo from './Logo';
import VendorCategory from './VendorCategory';
import VendorDescription from './VendorDescription';
import VendorName from './VendorName';
import ContactName from '../ContactInformation/ContactName';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { use } from 'react';
import { getSession } from 'next-auth/react';
import Address from '../ContactInformation/Address';

interface VendorInfoProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
  cancelAction?: () => void;
  handleClose?: () => void;
}
const VendorInfo = (props: VendorInfoProps) => {
  const { activeStep, setActiveStep, type, cancelAction, handleClose } = props;
  const formDetails = useAppSelector(
    (state) => state.asset.assetForm.vendorFormDetails?.createVendor
  );
  const dispatch = useAppDispatch();

  const formik = useAppFormik({
    initialValues: {
      logo: null,
      vendorName: formDetails?.vendorName ?? null,
      description: formDetails?.description ?? null,
      vendorCategoryId: formDetails?.vendorCategoryId ?? null,
      contactFirstName: formDetails?.contactFirstName ?? null,
      contactLastName: formDetails?.contactLastName ?? null,
      primaryEmail: formDetails?.contactFirstName ?? null,
      primaryPhoneNumber: formDetails?.phoneNumber ?? null,
      address1: formDetails?.address ?? null,
      address2: null,
      vendorCountryId: formDetails?.vendorCountryId ?? null,
      vendorStateId: formDetails?.vendorStateId ?? null,
      vendorCityId: formDetails?.vendorCityId ?? null,
      postalCode: null,
    },
    validationSchema: vendorInfoSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const session = await getSession();
      const username = session?.user?.username;
      dispatch(
        updateAssetForm({
          vendorFormDetails: {
            createVendor: {
              vendorName: values.vendorName!,
              contactFirstName: values.contactFirstName!,
              contactLastName: values.contactLastName!,
              description: values.description!,
              address: values.address1!,
              phoneNumber: values.primaryPhoneNumber!,
              emailAddress: values.primaryEmail!,
              statusId: null,
              vendorCategoryId: values.vendorCategoryId!,
              vendorCountryId: values?.vendorCountryId!,
              vendorStateId: values?.vendorStateId!,
              vendorCityId: values?.vendorCityId!,
              createdBy: username!,
            },
            createVendorContractDocumentDto: null,
            createVendorImageDto: null,
          },
          vendorId: null,
          vendorDetails: {
            vendorName: values.vendorName!,
            emailAddress: values.primaryEmail!,
            address: values.address1!,
            phoneNumber: values.primaryPhoneNumber!,
          },
        })
      );
      if (cancelAction) cancelAction();
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 1 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing={{ base: '24px', lg: '45px' }}
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt="26px"
            pl="16px"
            pb="33px"
            pr={{ base: '16px', md: '16px' }}
            rounded="6px"
            // minH="60vh"
          >
            {/* <Logo /> */}
            <SimpleGrid
              width="full"
              columns={{ base: 1, md: 2 }}
              spacing={{ base: '24px', lg: '70px' }}
            >
              <VStack width="full" spacing={{ base: '24px', lg: '45px' }}>
                <VendorName />
                <VendorCategory />
              </VStack>
              <VendorDescription />
            </SimpleGrid>
            <VStack
              spacing={{ base: '24px', lg: '40px' }}
              width="full"
              alignItems="flex-start"
            >
              <Text size="lg" color="primary.500" fontWeight={700}>
                Contact Information
              </Text>
              <ContactName />
              <SimpleGrid
                width="full"
                columns={{ base: 1, md: 2 }}
                spacing={{ base: '24px', lg: '50px' }}
              >
                <FormInputWrapper
                  sectionMaxWidth="133px"
                  customSpacing="17px"
                  description="Enter work email"
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
                  sectionMaxWidth="133px"
                  customSpacing="17px"
                  description="Enter Phone Number"
                  title="Primary Contact Phone Number"
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
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={undefined}
              cancelAction={
                type === 'create' && cancelAction ? cancelAction : undefined
              }
              totalStep={1}
              activeStep={1}
              setActiveStep={setActiveStep}
              type="submit"
              finalText="Add Vendor"
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default VendorInfo;
