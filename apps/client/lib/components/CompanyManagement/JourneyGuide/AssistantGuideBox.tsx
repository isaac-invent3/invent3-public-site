import {
  Flex,
  FlexProps,
  Heading,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { JourneyIcon } from '../../CustomIcons';
import JourneyGuide, { journeyGuideSteps } from '.';
import { useGetCompanyJourneyGuideQuery } from '~/lib/redux/services/company.services';
import { useSession } from 'next-auth/react';
import { CompanyJourneyGuide } from '~/lib/interfaces/company.interfaces';

interface AssistantGuideBoxProps {
  containerStyle?: FlexProps;
}

const AssistantGuideBox = (props: AssistantGuideBoxProps) => {
  const { containerStyle } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data } = useSession();
  const { data: journeyGuideData } = useGetCompanyJourneyGuideQuery(
    { companyId: data?.user?.companyId! },
    { skip: !data?.user }
  );
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (journeyGuideData?.data) {
      const nextStepIndex = journeyGuideSteps.findIndex(
        (step) => !journeyGuideData?.data[step.key as keyof CompanyJourneyGuide]
      );

      if (nextStepIndex === -1) {
        // All steps completed
        setActiveStep(journeyGuideSteps.length);
      } else {
        setActiveStep(nextStepIndex);
      }
    }
  }, [journeyGuideData]);

  return (
    <>
      <Flex
        bgColor="white"
        width="440px"
        bgImage="/assitant-ellipse.png"
        backgroundPosition="55% top"
        bgRepeat="no-repeat"
        rounded="24px"
        overflow="hidden"
        cursor="pointer"
        onClick={onOpen}
        height="50px"
        {...containerStyle}
        display={
          journeyGuideData && activeStep === journeyGuideSteps.length
            ? 'none'
            : 'flex'
        }
      >
        {/* Left Side Starts Here */}
        <VStack
          width="58%"
          alignItems="flex-start"
          spacing={{ base: '24px', lg: '88px' }}
          bgColor="#DBDAD680"
          backdropFilter="blur(40px)"
          pl="16px"
          pr={0}
          justifyContent="center"
          border="1px solid white"
        >
          <HStack spacing="16px">
            <Icon as={JourneyIcon} boxSize="24px" />
            <Heading fontWeight={800} fontSize={{ base: '16px' }}>
              Journey Guide
            </Heading>
          </HStack>
        </VStack>
        <VStack
          width="45%"
          justifyContent="center"
          spacing="0px"
          alignItems="flex-start"
          pl="16px"
        >
          <Text fontWeight={700} size="md" color="blue.500">
            Task Pending
          </Text>
          <Text
            color="neutral.700"
            fontSize="10px"
            lineHeight="100%"
            letterSpacing={0}
            // whiteSpace="nowrap"
          >
            Next Step: {journeyGuideSteps?.[activeStep]?.title}
          </Text>
        </VStack>
      </Flex>
      <JourneyGuide isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AssistantGuideBox;
