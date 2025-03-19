import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { FormActionButtons } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { updateVendorForm } from '~/lib/redux/slices/VendorSlice';
import { contractDetailSchema } from '~/lib/schemas/vendor.schema';
import ContractStartEndDate from './ContractStartEndDate';
import ContractValueAndVendorStatus from './ContractValueAndVendorStatus';
import VendorDocuments from './VendorDocuments';

interface ContractDetailsProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
  cancelAction?: () => void;
}
const ContractDetails = (props: ContractDetailsProps) => {
  const { activeStep, setActiveStep, type, cancelAction } = props;
  const formDetails = useAppSelector((state) => state.vendor.vendorForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      contractStartDate: formDetails?.contractStartDate ?? null,
      contractEndDate: formDetails?.contractEndDate ?? null,
      contractValue: formDetails?.contractValue ?? null,
      vendorStatusId: formDetails?.vendorStatusId ?? null,
      vendorDocuments: formDetails?.vendorDocuments ?? [],
    },
    validationSchema: contractDetailSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateVendorForm(values));
      setActiveStep(4);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 3 ? 'flex' : 'none'}
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
            pr={{ base: '16px', md: '44px' }}
            rounded="6px"
            minH="60vh"
          >
            <ContractStartEndDate />
            <SimpleGrid
              width="full"
              columns={{ base: 1, md: 2 }}
              gap={{ base: '24px', lg: '27px' }}
            >
              <ContractValueAndVendorStatus />
              <VendorDocuments />
            </SimpleGrid>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={type === 'edit' ? `/${ROUTES.VENDOR}` : undefined}
              cancelAction={
                type === 'create' && cancelAction ? cancelAction : undefined
              }
              totalStep={4}
              activeStep={3}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default ContractDetails;
