import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { FormActionButtons } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import FullName from './FullName';
import PhoneNumber from './PhoneNumber';
import Email from './Email';
import { employeeInfoSchema } from '~/lib/schemas/user.schema';
import Branch from './Branch';
import Picture from './Picture';

interface ManualInsertionProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const ManualInsertion = (props: ManualInsertionProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.user.userForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      picture: formDetails?.picture ?? null,
      firstName: formDetails?.firstName ?? null,
      lastName: formDetails?.lastName ?? null,
      mobileNumber: formDetails?.mobileNumber ?? null,
      workEmail: formDetails?.workEmail ?? null,
      branchId: formDetails?.branchId ?? null,
    },
    validationSchema: employeeInfoSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateUserForm(values));
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
            spacing="32px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt={{ base: '16px', lg: '26px' }}
            pl="16px"
            pb={{ base: '16px', lg: '24px' }}
            pr={{ base: '16px', lg: '41px' }}
            rounded="6px"
            minH="60vh"
          >
            <Picture />
            <FullName />
            <PhoneNumber />
            <Email />
            <Branch />
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.USERS}`}
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

export default ManualInsertion;
