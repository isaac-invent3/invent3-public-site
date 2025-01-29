import { DrawerBody, DrawerHeader, VStack } from '@chakra-ui/react';
import { GenericDrawer, LoadingSpinner } from '@repo/ui/components';
import { useMemo } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import GenericErrorState from '../../UI/GenericErrorState';
import VendorHeader from './Header';
import { useGetVendorByIdQuery } from '~/lib/redux/services/vendor.services';
import { setVendor } from '~/lib/redux/slices/VendorSlice';

interface VendorDetailProps {
  isOpen: boolean;
  onClose: () => void;
}

const VendorDetail = ({ isOpen, onClose }: VendorDetailProps) => {
  const dispatch = useAppDispatch();
  const vendorSlug = SYSTEM_CONTEXT_DETAILS.VENDOR.slug;
  const selectedvendor = useAppSelector((state) => state.vendor.vendor);
  const { getSearchParam, clearSearchParamsAfter } = useCustomSearchParams();

  const vendorId = getSearchParam(vendorSlug)
    ? Number(getSearchParam(vendorSlug))
    : null;

  const { data: vendorData, isLoading } = useGetVendorByIdQuery(
    { vendorId: vendorId! },
    {
      skip: !vendorId || Boolean(selectedvendor),
    }
  );

  const closeDrawer = () => {
    clearSearchParamsAfter(vendorSlug, { removeSelf: true });
    onClose();
  };

  const vendor = useMemo(() => {
    if (vendorData?.data && !selectedvendor)
      dispatch(setVendor(vendorData?.data));

    return selectedvendor || vendorData?.data;
  }, [vendorData, selectedvendor]);

  const vendorNotFound = useMemo(() => {
    const notFound = !vendor && !isLoading;

    if (notFound) clearSearchParamsAfter(vendorSlug);

    return notFound;
  }, [vendor, isLoading]);

  return (
    <GenericDrawer
      isOpen={isOpen}
      onClose={closeDrawer}
      maxWidth="850px"
      customStyle={{ trapFocus: true }}
    >
      {vendorNotFound && (
        <GenericErrorState
          title="Error: Vendor Not Found!"
          subtitle="The Selected Vendor Could not be found"
        />
      )}

      {isLoading && !vendor && (
        <VStack width="full" minH="100vh" justifyContent="center">
          <LoadingSpinner />
        </VStack>
      )}

      {vendor && (
        <>
          <DrawerHeader px="32px" pt="16px" pb="29px">
            <VendorHeader handleBack={closeDrawer} />
          </DrawerHeader>
          <DrawerBody p={0} />
        </>
      )}
    </GenericDrawer>
  );
};

export default VendorDetail;
