import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { FormActionButtons } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import Picture from './Picture';
import FullName from './FullName';
import DateOfBirth from './DateOfBirth';
import PhoneNumber from './PhoneNumber';
import Email from './Email';
import Gender from './Gender';
import Address from './Address';
import { employeeInfoSchema } from '~/lib/schemas/user.schema';

interface EmployeeInfoProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const EmployeeInfo = (props: EmployeeInfoProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.user.userForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      picture: formDetails?.picture ?? null,
      firstName: formDetails?.firstName ?? null,
      middleName: formDetails?.middleName ?? null,
      lastName: formDetails?.lastName ?? null,
      dob: formDetails?.dob ?? null,
      mobileNumber: formDetails?.mobileNumber ?? null,
      personalEmail: formDetails?.personalEmail ?? null,
      workEmail: formDetails?.workEmail ?? null,
      gender: formDetails?.gender ?? null,
      address1: formDetails?.address1 ?? null,
      address2: formDetails?.address2 ?? null,
      countryId: formDetails?.countryId ?? null,
      stateId: formDetails?.stateId ?? null,
      cityId: formDetails?.cityId ?? null,
      postalCode: formDetails?.postalCode ?? null,
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
            pt="26px"
            pl="16px"
            pb="33px"
            pr="44px"
            rounded="6px"
            minH="60vh"
          >
            <Picture />
            <FullName />
            <DateOfBirth />
            <PhoneNumber />
            <Email />
            <Gender />
            <Address />
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

export default EmployeeInfo;
