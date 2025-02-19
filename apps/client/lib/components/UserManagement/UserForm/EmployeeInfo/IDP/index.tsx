import { Divider, Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { FormActionButtons } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { userIDPSchema } from '~/lib/schemas/user.schema';
import EmployeeDirectory from './EmployeeDirectory';
import EmployeeDetailSummary from './EmployeeDetailSummary';

interface IDPProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const IDP = (props: IDPProps) => {
  const { activeStep, setActiveStep } = props;

  const formik = useFormik({
    initialValues: {
      employeeId: null,
    },
    validationSchema: userIDPSchema,
    enableReinitialize: true,
    onSubmit: async () => {
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
            spacing="25px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt={{ base: '16px', lg: '26px' }}
            pl="16px"
            pb={{ base: '16px', lg: '24px' }}
            pr={{ base: '16px', lg: '41px' }}
            rounded="6px"
            minH="60vh"
            divider={<Divider borderColor="#BBBBBB" />}
          >
            <EmployeeDirectory />
            <EmployeeDetailSummary />
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

export default IDP;
