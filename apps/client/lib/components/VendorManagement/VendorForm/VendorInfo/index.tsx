import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { FormActionButtons } from '@repo/ui/components';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateVendorForm } from '~/lib/redux/slices/VendorSlice';
import { vendorInfoSchema } from '~/lib/schemas/vendor.schema';
import { ROUTES } from '~/lib/utils/constants';
import Logo from './Logo';
import VendorCategory from './VendorCategory';
import VendorDescription from './VendorDescription';
import VendorName from './VendorName';

interface VendorInfoProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const VendorInfo = (props: VendorInfoProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.vendor.vendorForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      logo: formDetails?.logo ?? null,
      vendorName: formDetails?.vendorName ?? null,
      description: formDetails?.description ?? null,
      categoryId: formDetails?.categoryId ?? null,
    },
    validationSchema: vendorInfoSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateVendorForm(values));
      setActiveStep(2);
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
            pr={{ base: '16px', md: '44px' }}
            rounded="6px"
            minH="60vh"
          >
            <Logo />
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
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.VENDOR}`}
              totalStep={4}
              activeStep={1}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default VendorInfo;
