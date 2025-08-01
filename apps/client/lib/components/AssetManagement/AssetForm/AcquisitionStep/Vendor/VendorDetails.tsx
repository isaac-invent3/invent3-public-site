import {
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllAssetVendorsQuery,
  useGetAssetVendorByIdQuery,
  useSearchAssetVendorsMutation,
} from '~/lib/redux/services/asset/vendors.services';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import AssetTypeSelect from '~/lib/components/Common/SelectComponents/AssetTypeSelect';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import {
  FormAddButton,
  FormInputWrapper,
  FormSectionInfo,
} from '@repo/ui/components';
import VendorDrawer from './VendorDrawer';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';

const VendorDetails = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { vendorDetails, vendorFormDetails } = useAppSelector(
    (state) => state.asset.assetForm
  );
  const [selectedVendor, setSelectedVendor] = useState<number | undefined>(
    undefined
  );

  const canCreateVendor = usePermissionAccess('vendor:create');
  const [searchVendor] = useSearchAssetVendorsMutation({});
  const { data: vendorData } = useGetAssetVendorByIdQuery(
    { id: selectedVendor },
    {
      skip: !selectedVendor,
    }
  );
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllAssetVendorsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });

  useEffect(() => {
    if (vendorData?.data) {
      dispatch(
        updateAssetForm({
          vendorDetails: {
            emailAddress: vendorData?.data?.emailAddress,
            address: vendorData?.data?.address,
            vendorName: vendorData?.data?.vendorName,
            phoneNumber: vendorData?.data?.phoneNumber,
          },
        })
      );
    }
  }, [vendorData]);

  return (
    <>
      <Stack
        width="full"
        direction={{ base: 'column', lg: 'row' }}
        alignItems="flex-start"
        spacing={{ base: '16px', lg: '33px' }}
      >
        <Flex width="full" maxW="144px" display={{ base: 'none', lg: 'flex' }}>
          <FormSectionInfo
            title="Vendor Details"
            info="Enter vendor name and contact information"
            isRequired={false}
          />
        </Flex>
        <Grid
          templateColumns={{ lg: 'repeat(3, 1fr)' }}
          gap="20px"
          width="full"
        >
          <GridItem colSpan={1}>
            <FormInputWrapper
              sectionMaxWidth="130px"
              customSpacing="0px"
              description="Enter vendor name and contact information"
              title="Vendor Details"
              isRequired={false}
              direction={{ base: 'column', md: 'row' }}
              formSectionCustomStyle={{
                maxW: { md: '130px' },
                display: { lg: 'none' },
              }}
            >
              <VStack alignItems="flex-end" width="full">
                <GenericAsyncSelect
                  selectName="vendorId"
                  selectTitle="Vendor"
                  data={data}
                  labelKey="vendorName"
                  valueKey="vendorId"
                  defaultInputValue={vendorDetails?.vendorName}
                  mutationFn={searchVendor}
                  isLoading={isLoading || isFetching}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  handleSelect={(option) => {
                    setSelectedVendor(Number(option.value) ?? undefined);
                    dispatch(updateAssetForm({ vendorFormDetails: null }));
                  }}
                  selectedOption={
                    vendorDetails
                      ? { value: 9999, label: vendorDetails?.vendorName! }
                      : undefined
                  }
                />
                {!canCreateVendor && (
                  <FormAddButton handleClick={onOpen}>
                    {vendorFormDetails ? 'Edit' : 'Add'} New Vendor
                  </FormAddButton>
                )}
              </VStack>
            </FormInputWrapper>
          </GridItem>
          <GridItem colSpan={1}>
            <VStack
              bgColor="neutral.100"
              minH="146px"
              width="full"
              rounded="8px"
              py="6px"
              px="16px"
              alignItems="flex-start"
              spacing="16px"
            >
              <Text color="neutral.600">Details</Text>
              {vendorDetails.vendorName ? (
                <VStack width="full" spacing="4px" alignItems="flex-start">
                  <Text size="lg" color="black" fontWeight={700}>
                    {vendorDetails?.vendorName}
                  </Text>
                  <Text size="md" color="neutral.600">
                    {vendorDetails?.address}
                  </Text>
                  <Text size="md" color="neutral.600">
                    {vendorDetails?.emailAddress}
                  </Text>
                </VStack>
              ) : (
                <Text
                  fontStyle="italic"
                  color="neutral.600"
                  width="full"
                  textAlign="center"
                >
                  No vendor selected yet.
                </Text>
              )}
            </VStack>
          </GridItem>
          <GridItem colSpan={1}>
            <FormInputWrapper
              sectionMaxWidth="130px"
              customSpacing="0px"
              description="Select the category of this asset"
              title="Asset Type"
              isRequired
              direction={{ base: 'column', md: 'row' }}
              formSectionCustomStyle={{
                maxW: { md: '130px' },
              }}
            >
              <AssetTypeSelect
                selectName="assetTypeId"
                selectTitle="Asset Type"
                handleSelect={(option) =>
                  dispatch(updateAssetForm({ assetTypeName: option.label }))
                }
              />
            </FormInputWrapper>
          </GridItem>
        </Grid>
      </Stack>
      <VendorDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default VendorDetails;
