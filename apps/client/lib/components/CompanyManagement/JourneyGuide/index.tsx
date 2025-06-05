import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  Button,
  GenericModal,
  ModalCloseButtonText,
} from '@repo/ui/components';
import React, { useEffect, useState } from 'react';
import { CheckIcon, JourneyIcon } from '../../CustomIcons';
import { ROLE_IDS_ENUM, ROUTES } from '~/lib/utils/constants';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useGetCompanyJourneyGuideQuery } from '~/lib/redux/services/company.services';
import { CompanyJourneyGuide } from '~/lib/interfaces/company.interfaces';

export const journeyGuideSteps = [
  {
    title: 'Add Users',
    subtitle: '',
    buttonSuffix: 'Create User',
    link: `/${ROUTES.USERS}/add`,
    key: 'AddUsers',
  },
  {
    title: 'Add Asset(s)',
    subtitle: 'Upload assets Images or later',
    buttonSuffix: 'Create Asset',
    link: `/${ROUTES.ASSETS}/add`,
    key: 'AddAssets',
  },
  {
    title: 'Add Maintenance Plan',
    subtitle: 'Add schedules or later',
    buttonSuffix: 'Create Maintenance Plan',
    link: `/${ROUTES.MAINTENANCE_PLANS}/add`,
    key: 'AddMaintenancePlan',
  },
  {
    title: 'Configure Admin Settings',
    subtitle: '',
    buttonSuffix: 'Configure Settings',
    link: `/${ROUTES.SETTINGS}`,
    key: 'AddAdminSettings',
  },
];

export const CMFJourneyGuideSteps = [
  {
    title: 'Add Users',
    subtitle: '',
    buttonSuffix: 'Create User',
    link: `/${ROUTES.USERS}/add`,
    key: 'AddUsers',
  },
  {
    title: 'Create Managed Company',
    subtitle: '',
    buttonSuffix: 'Create Company',
    link: `/${ROUTES.COMPANY}/add`,
    key: 'CreateCompanyProfile',
  },
];

interface JourneyGuideProps {
  isOpen: boolean;
  onClose: () => void;
  closeWithNavigating?: boolean;
}
const JourneyGuide = (props: JourneyGuideProps) => {
  const { isOpen, onClose, closeWithNavigating } = props;
  const [activeStep, setActiveStep] = useState(0);
  const { data } = useSession();
  const { data: journeyGuideData } = useGetCompanyJourneyGuideQuery(
    { companyId: data?.user?.companyId! },
    { skip: !data?.user }
  );

  const steps = [
    ...(!data?.user?.roleIds.includes(ROLE_IDS_ENUM.CLIENT_ADMIN)
      ? [
          {
            title: 'Create Company',
            subtitle: '',
            buttonSuffix: 'Create Company',
            link: `/${ROUTES.COMPANY}/add`,
            key: 'CreateCompanyProfile',
          },
        ]
      : []),
    ...(data?.user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY)
      ? CMFJourneyGuideSteps
      : journeyGuideSteps),
  ];

  useEffect(() => {
    if (journeyGuideData?.data) {
      const nextStepIndex = steps.findIndex(
        (step) => !journeyGuideData?.data[step.key as keyof CompanyJourneyGuide]
      );

      if (nextStepIndex === -1) {
        // All steps completed
        setActiveStep(steps.length);
      } else {
        setActiveStep(nextStepIndex);
      }
    }
  }, [journeyGuideData, steps]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: { lg: '846px' },
        p: 0,
        bgColor: '#E4E3DF',
        maxW: '80vw',
        rounded: '24px',
        bgImage: '/journey-main-bg.jpg',
        bgSize: 'cover',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Flex
        width="full"
        height="full"
        minH={{ lg: '686px' }}
        position="relative"
      >
        {/* Left Side Starts Here */}
        <VStack
          width={{ base: 'full', lg: '50%' }}
          alignItems="flex-start"
          spacing={{ base: '24px', lg: '60px' }}
          bgColor="#DBDAD680"
          backdropFilter="blur(40px)"
          px={{ base: '24px', md: '32px' }}
          py={{ base: '24px', md: '24px' }}
        >
          <VStack alignItems="flex-start" spacing="20px">
            <HStack spacing="16px">
              <Icon as={JourneyIcon} boxSize="24px" />
              <Heading
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight="100%"
              >
                Journey Guide
              </Heading>
            </HStack>
            <Text
              size={{ base: 'md', lg: 'lg' }}
              lineHeight={{ base: '100%', lg: '150%' }}
              fontWeight={400}
              maxW="292px"
            >
              This step-by-step workflow will guide you through the complete
              process of configuring a new company profile.
            </Text>
          </VStack>
          <VStack alignItems="flex-start" spacing="5px">
            {steps.map((item, index) => (
              <VStack alignItems="flex-start" spacing="5px" key={index}>
                <HStack spacing="24px">
                  <Flex
                    width="48px"
                    height="48px"
                    rounded="full"
                    border={activeStep <= index ? '1px solid #0E2642' : 'none'}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {activeStep >= index && (
                      <Flex
                        width="36px"
                        height="36px"
                        bgColor={activeStep > index ? '#00A129' : 'primary.500'}
                        rounded="full"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {activeStep > index && (
                          <Icon as={CheckIcon} boxSize="18px" color="white" />
                        )}
                      </Flex>
                    )}
                  </Flex>
                  <VStack alignItems="flex-start" spacing="4px">
                    <Text
                      fontWeight={700}
                      lineHeight="150%"
                      color={
                        activeStep === index ? 'neutral.800' : 'neutral.700'
                      }
                    >
                      STEP {index + 1}
                    </Text>
                    <Text
                      size="lg"
                      fontWeight={700}
                      color={activeStep === index ? 'black' : 'neutral.700'}
                    >
                      {item.title}
                    </Text>
                    {item.subtitle && (
                      <Text size="md" color="neutral.700">
                        {item.subtitle}
                      </Text>
                    )}
                  </VStack>
                </HStack>
                {index !== steps.length - 1 && (
                  <Box
                    height="22px"
                    width="1px"
                    border="1px solid"
                    borderColor={
                      activeStep > index
                        ? activeStep - 1 > index
                          ? '#00A129'
                          : '#42403D'
                        : 'neutral.300'
                    }
                    ml="24px"
                  />
                )}
              </VStack>
            ))}
          </VStack>
          <Flex
            width="full"
            justifyContent="flex-end"
            display={{ base: 'flex', lg: 'none' }}
            mt="24px"
          >
            <Button
              customStyles={{ width: '195px' }}
              {...(closeWithNavigating
                ? { handleClick: onClose }
                : { href: steps[activeStep]?.link ?? '#' })}
            >
              {steps[activeStep]?.buttonSuffix ?? "You're Done"}
            </Button>
          </Flex>
        </VStack>
        {/* Left Side Ends Here */}
        {/* Right Side Starts Here */}
        <VStack
          width={{ base: 'full', lg: '50%' }}
          justifyContent="space-between"
          px={{ base: '24px', md: '32px' }}
          py={{ base: '24px', md: '24px' }}
          alignItems="flex-end"
          position="relative"
          display={{ base: 'none', lg: 'flex' }}
        >
          <HStack width="full" justifyContent="space-between">
            <HStack
              bgColor="white"
              border="1px solid #0E2642"
              rounded="6px"
              py="6px"
              px="9px"
              spacing="12px"
            >
              <Icon boxSize="25px" />
              <VStack alignItems="flex-start" spacing="4px">
                <Text
                  fontSize="9px"
                  fontWeight={700}
                  lineHeight="150%"
                  color="neutral.700"
                >
                  Having troubles?
                </Text>
                <Link href="mailto:support@invent3.ai">
                  <Text fontSize="11px" fontWeight={700} lineHeight="100%">
                    Contact Us
                  </Text>
                </Link>
              </VStack>
            </HStack>
            <ModalCloseButtonText onClose={() => onClose()} />
          </HStack>
          <Flex
            position="relative"
            height="300px"
            width="379px"
            left={'-120px'}
          >
            <Image src="/journey-image.png" alt="journey-image" fill />
          </Flex>
          <Button
            customStyles={{ width: '195px' }}
            {...(closeWithNavigating
              ? { handleClick: onClose }
              : { href: steps[activeStep]?.link ?? '#' })}
          >
            {steps[activeStep]?.buttonSuffix ?? "You're Done"}
          </Button>
        </VStack>
        {/* Right Side Ends Here */}
      </Flex>
    </GenericModal>
  );
};

export default JourneyGuide;
