'use client';

import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  Button,
  FormActionButtons,
  GenericSuccessModal,
  SlideTransition,
} from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import PageHeader from '~/lib/components/UI/PageHeader';
import withFormLeaveDialog from '~/lib/components/UI/FormLeaveDialogProvider';
import { useRouter } from 'next/navigation';
import { useCreateMasterFacilityMutation } from '~/lib/redux/services/location/facility.services';
import { facilitiesSchema } from '~/lib/schemas/asset/location.schema';
import { useEffect, useState } from 'react';
import FacilityForm from './FacilityForm';
import FacilityList from './FacilityList';
import { FacilityFormInterface } from '~/lib/interfaces/location.interfaces';
import { ImageObject } from '~/lib/interfaces/general.interfaces';

const defaultFaciltySate = {
  countryId: 1,
  stateId: null,
  lgaId: null,
  countryName: 'Nigeria',
  stateName: null,
  lgaName: null,
  facilityName: null,
  address: null,
  picture: null,
};

const FacilityFormPage = () => {
  const { handleSubmit } = useCustomMutation();
  const { isOpen: isOpenSuccess, onOpen: onOpenSuccess } = useDisclosure();
  const router = useRouter();
  const [createFacility, { isLoading: isCreating }] =
    useCreateMasterFacilityMutation({});
  const [activeFacility, setActiveFacility] = useState<number | undefined>(0);
  const [showFacilityForm, setShowFacilityForm] = useState(true);
  const [facilityLists, setFacilityLists] = useState<FacilityFormInterface[]>(
    []
  );

  const formik = useFormik({
    initialValues: {
      facilities: [
        {
          localId: 1,
          ...defaultFaciltySate,
        },
      ],
    },
    validationSchema: facilitiesSchema,
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const response = await handleSubmit(
        createFacility,
        {
          createFacilityDtos: values.facilities.map(
            ({ lgaId, facilityName, address, picture }) => ({
              createFacilityDto: {
                lgaId: lgaId!,
                facilityName: facilityName!,
                address: address!,
                imageName: (picture as unknown as ImageObject)?.imageName!,
                base64PhotoImage: (picture as unknown as ImageObject)
                  ?.base64PhotoImage!,
                createdBy: session?.user?.username!,
              },
            })
          ),
        },
        ''
      );
      if (response?.data) {
        resetForm();
        onOpenSuccess();
      }
    },
  });

  const handleAddFacility = () => {
    setFacilityLists(
      formik.values.facilities as unknown as FacilityFormInterface[]
    );
    formik.setFieldValue('facilities', [
      ...formik.values.facilities,
      {
        localId: null,
        ...defaultFaciltySate,
      },
    ]);
    setActiveFacility(formik.values.facilities.length - 1 + 1);
    setShowFacilityForm(true);
  };

  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Add New Facility</PageHeader>
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing="32px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            mt="40px"
            rounded="6px"
            minH="60vh"
            overflow="hidden"
          >
            {facilityLists.length >= 1 && (
              <VStack width="full" p="16px">
                <FacilityList
                  handleAddFacility={handleAddFacility}
                  activeFacility={activeFacility}
                  setActiveFacility={setActiveFacility}
                  setShowFacilityForm={setShowFacilityForm}
                  facilityLists={facilityLists}
                  setFacilityLists={setFacilityLists}
                />
              </VStack>
            )}
            {showFacilityForm && (
              <SlideTransition
                style={{ width: '100%' }}
                trigger={showFacilityForm}
              >
                <FacilityForm
                  activeFacility={activeFacility}
                  setActiveFacility={setActiveFacility}
                  handleAddFacility={handleAddFacility}
                  setShowFacilityForm={setShowFacilityForm}
                  setFacilityLists={setFacilityLists}
                />
              </SlideTransition>
            )}
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              type="submit"
              cancelLink={`/${ROUTES.LOCATION}`}
              totalStep={1}
              activeStep={1}
              loadingText="Creating.."
              isLoading={isCreating || formik.isSubmitting}
            />
          </Flex>
        </form>
      </FormikProvider>
      <GenericSuccessModal
        isOpen={isOpenSuccess}
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
    </Flex>
  );
};

export default withFormLeaveDialog(FacilityFormPage);
