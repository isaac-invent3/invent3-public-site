'use client';

import { Flex, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  SlideTransition,
  FormStepper,
  FormActionButtons,
  Button,
} from '@repo/ui/components';
import withFormLeaveDialog from '../../UI/FormLeaveDialogProvider';
import PageHeader from '../../UI/PageHeader';
import { FormikProvider, useFormik } from 'formik';
import { ROUTES } from '~/lib/utils/constants';
import { locationMasterSchema } from '~/lib/schemas/asset/location.schema';
import FacilityInfoStep from './FacilityInfoStep';
import BuildingStep from './BuildingStep';

const STEPS = [
  'Facility Info',
  'Add Building',
  'Add Floor',
  'Add Department',
  'Add Room',
  'Add Aisle',
  'Add Shelf',
];

interface LocationFormProps {
  type: 'create' | 'edit';
}
const LocationForm = (props: LocationFormProps) => {
  const { type } = props;
  const [activeStep, setActiveStep] = useState(1);

  const formik = useFormik({
    initialValues: {
      picture: null,
      countryId: 1,
      stateId: null,
      lgaId: null,
      buildingModel: null,
      address: null,
    },
    validationSchema: locationMasterSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {},
  });

  return (
    <Flex width="full" direction="column" pb={{ md: '24px' }}>
      <PageHeader>Add New Facility</PageHeader>
      <Flex width="full" gap={{ md: '8px' }} mt="32px" direction="column">
        <FormStepper currentStep={activeStep} steps={STEPS} />

        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack width="full" spacing="24px" alignItems="flex-end">
              <FacilityInfoStep activeStep={activeStep} />
              <SlideTransition trigger={activeStep === 2}>
                <BuildingStep activeStep={activeStep} />
              </SlideTransition>
              <FormActionButtons
                cancelLink={`/${ROUTES.LOCATION}`}
                totalStep={STEPS.length}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                type={activeStep < STEPS.length ? 'button' : 'submit'}
                handleContinue={async () => {
                  const valid = await formik.validateForm();
                  if (Object.keys(valid).length === 0) {
                    setActiveStep((prev) => prev + 1);
                  } else {
                    formik.setTouched(
                      Object.keys(valid).reduce(
                        (acc, key) => ({ ...acc, [key]: true }),
                        {}
                      )
                    );
                  }
                }}
              >
                <Button
                  customStyles={{ width: '161px' }}
                  variant="outline"
                  type="submit"
                >
                  Save & Close
                </Button>
              </FormActionButtons>
            </VStack>
          </form>
        </FormikProvider>
      </Flex>
    </Flex>
  );
};

export default withFormLeaveDialog(LocationForm);
