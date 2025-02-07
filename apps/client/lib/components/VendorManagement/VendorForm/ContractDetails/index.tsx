import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { FormActionButtons } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { updateVendorForm } from '~/lib/redux/slices/VendorSlice';
import { contractDetailSchema } from '~/lib/schemas/vendor.schema';
import ContractStartEndDate from './ContractStartEndDate';
import ContractValueAndVendorStatus from './ContractValueAndVendorStatus';
import SLADocuments from './SLADocuments';

interface ContractDetailsProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const ContractDetails = (props: ContractDetailsProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.vendor.vendorForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      contractStartDate: formDetails?.contractStartDate ?? null,
      contractEndDate: formDetails?.contractEndDate ?? null,
      contractValue: formDetails?.contractValue ?? null,
      vendorStatusId: formDetails?.vendorStatusId ?? null,
      slaDocuments: formDetails?.slaDocuments ?? [],
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
            spacing="45px"
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
            <SimpleGrid width="full" columns={{ base: 1, md: 2 }} gap="27px">
              <ContractValueAndVendorStatus />
              <SLADocuments />
            </SimpleGrid>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.VENDOR}`}
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
