import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { FormActionButtons, SlideTransition } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import { companyAdminSchema } from '~/lib/schemas/company/main.schema';
import AdminList from './AdminList';
import AdminForm from './AdminForm';

interface CompanyAdminStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const CompanyAdminStep = (props: CompanyAdminStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const formDetails = useAppSelector((state) => state.maintenance.planForm);
  const formik = useFormik({
    initialValues: {
      administrators: formDetails.schedules ?? [],
    },
    validationSchema: companyAdminSchema,
    enableReinitialize: true,

    onSubmit: async () => {
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
            spacing="24px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt="8px"
            pl="16px"
            pb="33px"
            pr="16px"
            rounded="6px"
            minH="60vh"
          >
            <AdminList
              type={type}
              showAdminInfo={showAdminForm}
              setShowAdminInfo={setShowAdminForm}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              selectMultiple={false}
            />

            {showAdminForm && (
              <SlideTransition
                style={{ width: '100%' }}
                trigger={showAdminForm}
              >
                <AdminForm setShowAdminForm={setShowAdminForm} />
              </SlideTransition>
            )}
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.COMPANY}`}
              totalStep={5}
              activeStep={2}
              setActiveStep={setActiveStep}
              disableBackButton={showAdminForm}
              disablePrimaryButton={showAdminForm}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default CompanyAdminStep;
