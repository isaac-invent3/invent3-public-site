import React, { useEffect } from 'react';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  FormInputWrapper,
  FormSelect,
  GenericDrawer,
} from '@repo/ui/components';
import { FormikProvider } from 'formik';
import { useAppFormik } from '~/lib/hooks/useAppFormik';
import InfoCard from '~/lib/components/UI/InfoCard';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useCreateAIConfigurationPayloadMutation } from '~/lib/redux/services/ticket.services';
import { aiConfigurationWorkloadBalancingSchema } from '~/lib/schemas/ticket.schema';

interface AIConfigurationPanelDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIConfigurationPanelDrawer = ({
  isOpen,
  onClose,
}: AIConfigurationPanelDrawerProps) => {
  const { handleSubmit } = useCustomMutation();
  const [createAIConfigurationPayload, { isLoading }] =
    useCreateAIConfigurationPayloadMutation();

  const criteria = [
    { label: 'Skill Match', key: 'skillMatchWeight' },
    { label: 'Availability', key: 'availiabilityWeight' },
    { label: 'Location Proximity', key: 'locationProximityWeight' },
    { label: 'Past Performance', key: 'pastPerformanceWeight' },
  ] as const;

  const initialValues = {
    minimumRestHours: 3,
    skillMatchWeight: 25,
    availiabilityWeight: 25,
    locationProximityWeight: 25,
    pastPerformanceWeight: 25,
  };

  const formik = useAppFormik({
    initialValues,
    enableReinitialize: false,
    validationSchema: aiConfigurationWorkloadBalancingSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const totalWeight =
        values.skillMatchWeight +
        values.availiabilityWeight +
        values.locationProximityWeight +
        values.pastPerformanceWeight;

      if (totalWeight !== 100) {
        alert('Total of all sliders must equal 100%');
        setSubmitting(false);
        return;
      }

      const session = await getSession();
      setSubmitting(true);
      await handleSubmit(
        createAIConfigurationPayload,
        {
          ...values,
          createdBy: session?.user?.username!,
        },
        'AI Configuration Set Successfully'
      );
      setSubmitting(false);
    },
  });

  // Optional: Recalculate total for validation hint
  const total =
    formik.values.skillMatchWeight +
    formik.values.availiabilityWeight +
    formik.values.locationProximityWeight +
    formik.values.pastPerformanceWeight;

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="548px">
      <DrawerHeader p={0} m={0}>
        <VStack
          width="full"
          alignItems="flex-start"
          px={{ base: '24px', lg: '32px' }}
          mb="48px"
        >
          <HStack
            pt="16px"
            pb="40px"
            width="full"
            justifyContent="space-between"
          >
            <BackButton handleClick={onClose} />
          </HStack>
          <Heading
            size={{ base: 'lg', lg: 'xl' }}
            color="primary.500"
            fontWeight={700}
          >
            AI Configuration Panel
          </Heading>
        </VStack>
      </DrawerHeader>

      <FormikProvider value={formik}>
        <DrawerBody p={0} px={{ base: '24px', lg: '32px' }}>
          <VStack width="full" alignItems="flex-start" spacing="48px" mb={8}>
            {/* 🔹 Criteria Weighting */}
            <VStack width="full" alignItems="flex-start" spacing={6}>
              <Text size="md" color="primary.500" fontWeight={700}>
                Criteria Weighting
              </Text>

              {criteria.map((item) => (
                <VStack width="full" key={item.key} spacing="9px">
                  <HStack width="full" justifyContent="space-between">
                    <Text fontWeight={700} color="neutral.800">
                      {item.label}
                    </Text>
                    <Text fontWeight={700} color="neutral.800">
                      {formik.values[item.key]}%
                    </Text>
                  </HStack>

                  <Slider
                    aria-label={`${item.label}-slider`}
                    value={formik.values[item.key]}
                    onChange={(val) => {
                      // Get total excluding the current slider
                      const totalWithoutCurrent =
                        formik.values.skillMatchWeight +
                        formik.values.availiabilityWeight +
                        formik.values.locationProximityWeight +
                        formik.values.pastPerformanceWeight -
                        formik.values[item.key];

                      // Calculate the allowed maximum value for this slider
                      const remaining = 100 - totalWithoutCurrent;

                      // Allow value only if it doesn't make total exceed 100
                      if (val <= remaining) {
                        formik.setFieldValue(item.key, val);
                      }
                    }}
                    min={0}
                    max={100}
                    step={1}
                    size="lg"
                    sx={{ h: '10px' }}
                  >
                    <SliderTrack bg="#F2F1F1" borderRadius="full" h="10px">
                      <SliderFilledTrack bg="#0E2642" />
                    </SliderTrack>
                    <SliderThumb
                      boxSize={4}
                      bg="#F2F1F1"
                      border="4px solid #0E2642"
                    />
                  </Slider>
                </VStack>
              ))}

              <InfoCard
                infoText={`Total of all sliders must equal 100%. Current total: ${total}%`}
              />
            </VStack>

            {/* 🔹 Minimum Rest Hours */}
            <FormInputWrapper
              sectionMaxWidth="141px"
              customSpacing="19px"
              title="Minimum Rest Hours"
              isRequired={false}
              description="Minimum rest time for a technician before the next ticket assignment."
            >
              <FormSelect
                name="minimumRestHours"
                title="Rest Hours"
                options={[
                  { label: '3 Hours', value: 3 },
                  { label: '6 Hours', value: 6 },
                  { label: '12 Hours', value: 12 },
                ]}
                isLoading={false}
                selectStyles={{ height: '46px', pt: '0px' }}
              />
            </FormInputWrapper>
          </VStack>
        </DrawerBody>
      </FormikProvider>

      <DrawerFooter pb="32px">
        <Flex width="full" justifyContent="flex-end">
          <Button
            variant="primary"
            customStyles={{ width: '217px' }}
            handleClick={formik.handleSubmit}
            isLoading={formik.isSubmitting || isLoading}
            isDisabled={total !== 100}
          >
            Save Configuration
          </Button>
        </Flex>
      </DrawerFooter>
    </GenericDrawer>
  );
};

export default AIConfigurationPanelDrawer;
