import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { FormActionButtons } from '@repo/ui/components';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import { roleGroupInfoSchema } from '~/lib/schemas/user.schema';
import { ROUTES } from '~/lib/utils/constants';
import UserRole from './UserRole';
import UserGroup from './UserGroup';

interface RoleGroupInfoProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  isManual: boolean;
}
const RoleGroupInfo = (props: RoleGroupInfoProps) => {
  const { activeStep, setActiveStep, isManual } = props;
  const dispatch = useAppDispatch();
  const formDetails = useAppSelector((state) => state.user.userForm);
  const step = isManual ? 0 : 1;

  const formik = useFormik({
    initialValues: {
      userRoleIds: formDetails?.userRoleIds ?? [],
      userGroupIds: formDetails?.userGroupIds ?? [],
    },
    validationSchema: roleGroupInfoSchema,
    enableReinitialize: false,
    onSubmit: async (values) => {
      dispatch(updateUserForm(values));
      setActiveStep(isManual ? 4 : 3);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 3 - step ? 'flex' : 'none'}
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
            <SimpleGrid width="full" columns={{ base: 1, md: 2 }} gap="37px">
              <UserRole />
              <UserGroup />
            </SimpleGrid>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.USERS}`}
              totalStep={4}
              activeStep={3 - step}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default RoleGroupInfo;
