import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { FormActionButtons } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import { occupationInfoSchema } from '~/lib/schemas/user.schema';
import EmploymentType from './EmploymentType';
import Branch from './Branch';
import JobTitle from './JobTitle';
import Team from './Team';
import UserRole from './UserRole';
import UserGroup from './UserGroup';

interface OccupationInfoProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const OccupationInfo = (props: OccupationInfoProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.user.userForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      employmentType: formDetails?.employmentType ?? null,
      branch: formDetails?.branch ?? null,
      jobTitle: formDetails?.jobTitle ?? null,
      team: formDetails?.team ?? null,
      userRole: formDetails?.userRole ?? null,
      userGroup: formDetails?.userGroup ?? null,
    },
    validationSchema: occupationInfoSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateUserForm(values));
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
            <SimpleGrid width="full" columns={2} gap="37px">
              <EmploymentType />
              <Branch />
            </SimpleGrid>
            <SimpleGrid width="full" columns={2} gap="37px">
              <JobTitle />
              <Team />
            </SimpleGrid>
            <SimpleGrid width="full" columns={2} gap="37px">
              <UserRole />
              <UserGroup />
            </SimpleGrid>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.USERS}`}
              totalStep={4}
              activeStep={2}
              setActiveStep={setActiveStep}
              handleContinue={() => console.log({ error: formik.errors })}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default OccupationInfo;
