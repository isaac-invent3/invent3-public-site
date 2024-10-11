import { Flex, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SectionInfo from '../../../UI/Form/FormSectionInfo';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllVendorsQuery,
  useGetVendorByIdQuery,
  useSearchVendorsMutation,
} from '~/lib/redux/services/asset/vendor.services';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import AssetTypeSelect from './AssetType';

const VendorDetails = () => {
  const dispatch = useAppDispatch();
  const { vendorDetails } = useAppSelector((state) => state.asset.assetForm);
  const [selectedVendor, setSelectedVendor] = useState<number | null | string>(
    null
  );
  const [searchVendor] = useSearchVendorsMutation({});
  const { data: vendorData } = useGetVendorByIdQuery(selectedVendor, {
    skip: !selectedVendor,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllVendorsQuery({
    pageSize: 25,
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
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <SectionInfo
          title="Vendor Details"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="20px" width="full">
        <GridItem colSpan={1}>
          <GenericAsyncSelect
            selectName="vendorId"
            selectTitle="Vendor"
            data={data}
            labelKey="vendorName"
            valueKey="vendorId"
            mutationFn={searchVendor}
            isLoading={isLoading}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            handleSelect={(option) => setSelectedVendor(option.value)}
          />
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
                  {vendorDetails.vendorName}
                </Text>
                <Text size="md" color="neutral.600">
                  {vendorDetails.address}
                </Text>
                <Text size="md" color="neutral.600">
                  {vendorDetails.emailAddress}
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
          <HStack width="full" alignItems="flex-start" spacing="0px">
            <Flex width="full" maxW="130px">
              <SectionInfo
                title="Asset Type"
                info="Add name that users can likely search with"
                isRequired
              />
            </Flex>
            <AssetTypeSelect />
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default VendorDetails;
