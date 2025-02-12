import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { FormActionButtons } from '@repo/ui/components';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import { occupationInfoSchema } from '~/lib/schemas/user.schema';
import { ROUTES } from '~/lib/utils/constants';
import Branch from './Branch';
import EmploymentType from './EmploymentType';
import JobTitle from './JobTitle';
import Team from './Team';
import UserGroup from './UserGroup';
import UserRole from './UserRole';

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
      employmentTypeId: formDetails?.employmentTypeId ?? null,
      branchId: formDetails?.branchId ?? null,
      jobTitleId: formDetails?.jobTitleId ?? null,
      teamId: formDetails?.teamId ?? null,
      userRoleId: formDetails?.userRoleId ?? null,
      userGroupsId: formDetails?.userGroupIds ?? null,
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
            <SimpleGrid width="full" columns={{ base: 1, md: 2 }} gap="37px">
              <EmploymentType />
              <Branch />
            </SimpleGrid>
            <SimpleGrid width="full" columns={{ base: 1, md: 2 }} gap="37px">
              <JobTitle />
              <Team />
            </SimpleGrid>
            <SimpleGrid width="full" columns={{ base: 1, md: 2 }} gap="37px">
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
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default OccupationInfo;
