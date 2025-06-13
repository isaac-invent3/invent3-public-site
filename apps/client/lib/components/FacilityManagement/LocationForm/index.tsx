'use client';

import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  SlideTransition,
  FormStepper,
  FormActionButtons,
  Button,
  GenericSuccessModal,
} from '@repo/ui/components';
import withFormLeaveDialog from '../../UI/FormLeaveDialogProvider';
import PageHeader from '../../UI/PageHeader';
import { FormikProvider, useFormik } from 'formik';
import { ROUTES } from '~/lib/utils/constants';
import { locationMasterSchema } from '~/lib/schemas/asset/location.schema';
import FacilityInfoStep from './FacilityInfoStep';
import BuildingStep from './BuildingStep';
import FloorStep from './FloorStep';
import { useAppDispatch } from '~/lib/redux/hooks';
import { setLocation } from '~/lib/redux/slices/LocationSlice';
import DepartmentStep from './DepartmentStep';
import RoomStep from './RoomStep';
import AisleStep from './AisleStep';
import ShelfStep from './ShelfStep';
import { useCreateMasterFacilityMutation } from '~/lib/redux/services/location/facility.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
  const { handleSubmit } = useCustomMutation();
  const dispatch = useAppDispatch();
  const [createMasterFacility, { isLoading }] =
    useCreateMasterFacilityMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      picture: null,
      countryId: 1,
      stateId: null!,
      lgaId: null!,
      address: undefined,
      facilityName: null!,
      createBuildingDtos: [],
    },
    validationSchema: locationMasterSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const session = await getSession();
      console.log(values);
      const response = await handleSubmit(
        createMasterFacility,
        {
          createFacilityDtos: [
            {
              createFacilityDto: {
                lgaId: values.lgaId!,
                facilityName: values.facilityName!,
                address: values.address,
                createdBy: session?.user?.username!,
              },
              createBuildingDtos: values.createBuildingDtos,
            },
          ],
        },
        ''
      );
      if (response?.data) {
        onOpen();
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <Flex width="full" direction="column" pb={{ md: '24px' }}>
        <PageHeader>Add New Facility</PageHeader>
        <Flex width="full" gap={{ md: '8px' }} mt="32px" direction="column">
          <FormStepper currentStep={activeStep} steps={STEPS} />

          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack width="full" alignItems="flex-end">
                <FacilityInfoStep activeStep={activeStep} />
                <SlideTransition trigger={activeStep === 2}>
                  <BuildingStep activeStep={activeStep} />
                </SlideTransition>
                <SlideTransition trigger={activeStep === 3}>
                  <FloorStep activeStep={activeStep} />
                </SlideTransition>
                <SlideTransition trigger={activeStep === 4}>
                  <DepartmentStep activeStep={activeStep} />
                </SlideTransition>
                <SlideTransition trigger={activeStep === 5}>
                  <RoomStep activeStep={activeStep} />
                </SlideTransition>
                <SlideTransition trigger={activeStep === 6}>
                  <AisleStep activeStep={activeStep} />
                </SlideTransition>
                <SlideTransition trigger={activeStep === 7}>
                  <ShelfStep activeStep={activeStep} />
                </SlideTransition>
                <FormActionButtons
                  cancelLink={`/${ROUTES.LOCATION}`}
                  totalStep={STEPS.length}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  type={activeStep < STEPS.length ? 'button' : 'submit'}
                  isLoading={isLoading || formik.isSubmitting}
                  handleContinue={async () => {
                    if (activeStep < STEPS.length) {
                      const valid = await formik.validateForm();
                      if (Object.keys(valid).length === 0) {
                        dispatch(setLocation(formik.values));
                        setActiveStep((prev) => prev + 1);
                      } else {
                        formik.setTouched(
                          Object.keys(valid).reduce(
                            (acc, key) => ({ ...acc, [key]: true }),
                            {}
                          )
                        );
                      }
                    }
                  }}
                >
                  {activeStep < STEPS.length && (
                    <Button
                      customStyles={{ width: '161px' }}
                      variant="outline"
                      type="submit"
                      isLoading={isLoading || formik.isSubmitting}
                    >
                      Save & Close
                    </Button>
                  )}
                </FormActionButtons>
              </VStack>
            </form>
          </FormikProvider>
        </Flex>
      </Flex>
      <GenericSuccessModal
        isOpen={isOpen}
        onClose={() => router.push(`${ROUTES.LOCATION}`)}
        successText="Facility Added Successfully"
        mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
      >
        <Button
          customStyles={{ width: '193px' }}
          handleClick={() => router.push(`/${ROUTES.LOCATION}`)}
        >
          Continue
        </Button>
      </GenericSuccessModal>
    </>
  );
};

export default withFormLeaveDialog(LocationForm);
