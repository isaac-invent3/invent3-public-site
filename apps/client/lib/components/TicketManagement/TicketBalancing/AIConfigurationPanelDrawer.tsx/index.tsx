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
  RadioBox,
} from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { CreateTicketForm } from '~/lib/interfaces/ticket.interfaces';
import { createTicketSchema } from '~/lib/schemas/ticket.schema';

interface AIConfigurationPanelDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIConfigurationPanelDrawer = (props: AIConfigurationPanelDrawerProps) => {
  const { isOpen, onClose } = props;

  const data = [
    {
      label: 'Skill Match',
      key: 'skillMatch',
    },
    {
      label: 'Availability',
      key: 'availability',
    },
    {
      label: 'Location Proximity',
      key: 'locationProximity',
    },
    {
      label: 'Past Performance',
      key: 'pastPerformance',
    },
  ];

  const RadioButtonData = [
    {
      label: 'Auto Assign',
      key: 'autoAssign',
    },
    {
      label: 'Suggest Only',
      key: 'suggestOnly',
    },
  ];

  const initialValues = {
    ticketTitle: '',
    issueDescription: '',
    assetId: null,
    reportedByEmployeeId: null,
    reportedByEmployeeName: null,
    assignedTo: null,
    assignedToEmployeeName: null,
    ticketTypeId: null,
    document: null,
    ticketPriorityId: null,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: false,
    validationSchema: createTicketSchema,
    onSubmit: async () => {},
  });

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
            <VStack width="full" alignItems="flex-start" spacing="9px">
              <Text size="md" color="primary.500" fontWeight={700}>
                Balancing Mode
              </Text>
              <HStack spacing="36px">
                {RadioButtonData.map((item, index) => (
                  <HStack key={index} spacing="8px">
                    <RadioBox isSelected={index === 1} handleClick={() => {}} />
                    <Text color="neutral.600">{item?.label}</Text>
                  </HStack>
                ))}
              </HStack>
            </VStack>
            <VStack width="full" alignItems="flex-start" spacing={6}>
              <Text size="md" color="primary.500" fontWeight={700}>
                Criteria Weighting
              </Text>
              {data?.map((item, index) => (
                <VStack width="full" key={index} spacing="9px">
                  <HStack width="full" justifyContent="space-between">
                    <Text fontWeight={700} color="neutral.800">
                      {item.label}
                    </Text>
                    <Text fontWeight={700} color="neutral.800">
                      30%
                    </Text>
                  </HStack>
                  <Slider
                    aria-label="custom-slider"
                    defaultValue={40}
                    min={0}
                    max={100}
                    step={1}
                    size="lg"
                    sx={{
                      h: '10px',
                    }}
                  >
                    <SliderTrack bg="#F2F1F1" borderRadius="full" h="10px">
                      <SliderFilledTrack bg="#0E2642" />{' '}
                    </SliderTrack>
                    <SliderThumb
                      boxSize={4}
                      bg="#0E2642"
                      border="2px solid white"
                      _hover={{ bg: '#0E2642' }}
                    />
                  </Slider>
                </VStack>
              ))}
            </VStack>

            <FormInputWrapper
              sectionMaxWidth="141px"
              customSpacing="8px"
              title="Minimum Rest Hours"
              isRequired
              description="Minimum rest time for a technician before the next ticket assignment."
            >
              <FormSelect
                name="restHours"
                title="Rest Hours"
                options={[
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
          <Button variant="primary" customStyles={{ width: '217px' }}>
            Save Configuration
          </Button>
        </Flex>
      </DrawerFooter>
    </GenericDrawer>
  );
};

export default AIConfigurationPanelDrawer;
