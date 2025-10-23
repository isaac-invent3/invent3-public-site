import { useAppFormik } from '~/lib/hooks/useAppFormik';
/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useField } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { useCreateFacilityMutation } from '~/lib/redux/services/location/facility.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { facilitySchema } from '~/lib/schemas/asset/location.schema';
import LGASelect from '../../../../../Common/SelectComponents/Location/LGASelect';
import { getSession } from 'next-auth/react';
import { Option } from '@repo/interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';

interface FacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLGAId: number | null;
  stateId: number | null;
  handleReadableLocation?: (option: Option, key: keyof FormLocation) => void;
}
const FacilityModal = (props: FacilityModalProps) => {
  const { isOpen, onClose, defaultLGAId, stateId, handleReadableLocation } =
    props;
  const [createFacility, { isLoading }] = useCreateFacilityMutation({});
  const { handleSubmit } = useCustomMutation();
  const [field, meta, helpers] = useField('facilityId');

  const formik = useAppFormik({
    initialValues: {
      lgaId: defaultLGAId ?? undefined,
      facilityName: '',
      facilityRef: '',
      address: '',
      longitude: 0,
      latitude: 0,
    },
    validationSchema: facilitySchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = { ...values, createdBy: session?.user?.username };
      const response = await handleSubmit(createFacility, finalValue, '');
      if (response?.data) {
        helpers.setValue(response?.data?.data?.facilityId);
        if (handleReadableLocation) {
          handleReadableLocation(
            {
              label: response?.data?.data?.facilityName,
              value: response?.data?.data?.facilityId,
            },
            'facility'
          );
        }
        onClose();
        resetForm();
      }
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px' } }}
    >
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              spacing="32px"
              py={{ base: '24px', md: '40px' }}
              px="20px"
            >
              <ModalHeading
                heading="Add New Facility"
                subheading="Add a new facility that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="LGA"
                  description="Select LGA"
                  isRequired
                >
                  <LGASelect type="specificById" stateId={stateId} />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Facility Name"
                  description="Input Facility Name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="facilityName"
                    type="text"
                    label="Facility Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Facility Reference"
                  description="Input Facility Reference"
                >
                  <Field
                    as={FormTextInput}
                    name="facilityRef"
                    type="text"
                    label="Facility Reference"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Facility Address"
                  description="Input Facility Address"
                >
                  <Field
                    as={FormTextInput}
                    name="address"
                    type="text"
                    label="Address"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Facility Longitude"
                  description="Input Facility Longitude"
                >
                  <Field
                    as={FormTextInput}
                    name="longitude"
                    type="number"
                    label="Longitude"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Facility Latitude"
                  description="Input Facility Latitude"
                >
                  <Field
                    as={FormTextInput}
                    name="latitude"
                    type="number"
                    label="Latitude"
                  />
                </FormInputWrapper>
              </VStack>
              {/* Main Form Ends Here */}
              <HStack width="full" spacing="24px">
                <Button
                  variant="secondary"
                  customStyles={{ width: '96px' }}
                  handleClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading || formik.isSubmitting}
                >
                  Add Facility
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default FacilityModal;
