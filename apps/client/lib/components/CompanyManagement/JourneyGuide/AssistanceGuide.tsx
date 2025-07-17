import { Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';
import React, { useEffect, useState } from 'react';
import { CloseIcon, JourneyIcon } from '../../CustomIcons';
import { useGetCompanyJourneyGuideQuery } from '~/lib/redux/services/company.services';
import { useSession } from 'next-auth/react';
import { CMFJourneyGuideSteps, journeyGuideSteps } from '.';
import { CompanyJourneyGuide } from '~/lib/interfaces/company.interfaces';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';

interface AssistanceGuideProps {
  isOpen: boolean;
  onClose: () => void;
  companyId?: number;
}
const AssistanceGuide = (props: AssistanceGuideProps) => {
  const { isOpen, onClose } = props;
  const { data } = useSession();
  const { data: journeyGuideData } = useGetCompanyJourneyGuideQuery(
    { companyId: data?.user?.companyId! },
    { skip: !data?.user }
  );
  const [activeStep, setActiveStep] = useState(0);

  const guideSteps = data?.user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY)
    ? CMFJourneyGuideSteps
    : journeyGuideSteps;

  useEffect(() => {
    if (journeyGuideData?.data) {
      const nextStepIndex = guideSteps.findIndex(
        (step) => !journeyGuideData?.data[step.key as keyof CompanyJourneyGuide]
      );

      if (nextStepIndex === -1) {
        // All steps completed
        setActiveStep(guideSteps.length);
      } else {
        setActiveStep(nextStepIndex);
      }
    }
  }, [journeyGuideData]);

  return (
    <GenericModal
      isOpen={
        journeyGuideData && activeStep === guideSteps.length ? false : isOpen
      }
      onClose={onClose}
      mainModalStyle={{ isCentered: false }}
      contentStyle={{
        width: 'full',
        p: 0,
        bgColor: 'transparent',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        pt: '100px',
        justifyContent: 'flex-end',
        maxW: '550px',
      }}
    >
      <Flex
        bgColor="#E4E3DF"
        width={{ base: 'full', lg: '550px' }}
        bgImage="/journey-main-bg.jpg"
        bgSize="cover"
        rounded="24px"
        overflow="hidden"
        maxW="550px"
      >
        {/* Left Side Starts Here */}
        <VStack
          width={{ base: 'full', lg: '50%' }}
          alignItems="flex-start"
          spacing={{ base: '24px', lg: '88px' }}
          bgColor="#DBDAD680"
          backdropFilter="blur(40px)"
          pl="24px"
          py={{ base: '20px' }}
          roundedLeft="full"
          overflow="hidden"
        >
          <VStack alignItems="flex-start" spacing="20px">
            <HStack spacing="16px">
              <Icon as={JourneyIcon} boxSize="24px" />
              <Heading fontWeight={800} fontSize={{ base: '24px' }}>
                Journey Guide
              </Heading>
            </HStack>
            <Text
              size={{ base: 'md', lg: 'lg' }}
              lineHeight={{ base: '100%', lg: '150%' }}
              fontWeight={400}
              maxW="247px"
            >
              Your company setup is pending completion. Click the button to
              continue
            </Text>
          </VStack>
        </VStack>
        <VStack
          width={{ base: 'full', lg: '50%' }}
          justifyContent="space-between"
          px={{ base: '24px' }}
          py={{ base: '20px' }}
          alignItems="flex-end"
          position="relative"
          display={{ base: 'flex' }}
          spacing="14px"
        >
          <Icon
            as={CloseIcon}
            boxSize="20px"
            color="#F50000"
            cursor="pointer"
            onClick={() => onClose()}
          />
          <VStack alignItems="flex-start" spacing="4px" width="full">
            <Text
              width="full"
              fontWeight={800}
              fontSize="20px"
              lineHeight="100%"
            >
              {activeStep}
              <Text
                as="span"
                fontWeight={800}
                fontSize="14px"
                lineHeight="100%"
              >
                /5
              </Text>{' '}
              steps pending
            </Text>
            <Text color="neutral.700">
              Next Step: {guideSteps?.[activeStep]?.title}
            </Text>
          </VStack>
          <Button
            customStyles={{ height: '33px' }}
            href={guideSteps?.[activeStep]?.link}
          >
            Continue
          </Button>
        </VStack>
      </Flex>
    </GenericModal>
  );
};

export default AssistanceGuide;
