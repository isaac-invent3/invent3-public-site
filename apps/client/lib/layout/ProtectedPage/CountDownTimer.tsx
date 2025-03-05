import {
  Collapse,
  HStack,
  Icon,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { Button, SlideTransition } from '@repo/ui/components';
import React, { useEffect, useRef, useState } from 'react';
import {
  InfoIcon,
  MinusIcon,
  PlusIcon,
} from '~/lib/components/CustomIcons/layout';

const CountDownTimer = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [time, setTime] = useState(60);
  const popoverRef = useRef(null);

  useOutsideClick({
    ref: popoverRef,
    handler: onClose,
  });

  useEffect(() => {
    if (time === 0) return; // Stop re-running when time is 0

    const timerId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [time]);

  return (
    <VStack
      width="347px"
      rounded="10.67px"
      overflow="hidden"
      position="fixed"
      top={0}
      right={0}
      spacing={0}
      mr="16px"
      boxShadow="lg"
      mt="110px"
      ref={popoverRef}
    >
      <HStack
        width="full"
        height="47px"
        bgColor="#0366EF1A"
        justifyContent="space-between"
        px="16px"
      >
        <HStack spacing="6px">
          <Text fontWeight={800} size="lg" whiteSpace="nowrap">
            Shutdown Countdown{' '}
          </Text>
          {!isOpen && (
            <SlideTransition trigger={!isOpen}>
              <Text as="span" color="#F50000" fontWeight={800} size="lg">
                {time < 10 ? `0${time}` : time}s
              </Text>
            </SlideTransition>
          )}
        </HStack>
        <Icon
          as={isOpen ? MinusIcon : PlusIcon}
          boxSize="24px"
          color="#374957"
          cursor="pointer"
          onClick={onToggle}
        />
      </HStack>
      <Collapse in={isOpen}>
        <HStack
          width="full"
          bgColor="white"
          px="16px"
          pt="24px"
          pb="17px"
          spacing="16px"
          alignItems="flex-start"
        >
          <HStack
            width="40px"
            height="40px"
            rounded="full"
            bgColor="#004BB3"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Icon as={InfoIcon} boxSize="24px" />
          </HStack>
          <VStack width="full" alignItems="flex-end" spacing="35px">
            <VStack width="full" alignItems="flex-start" spacing="8px">
              <Text color="black" size="md" fontWeight={800}>
                Countdown to restart
              </Text>
              <Text color="neutral.700" fontWeight={400}>
                Your system needs to shutdown and restart due to the changes to
                either of your user setup or system configuration. Save any
                current work to avoid lost
              </Text>
              <Text fontWeight={800} color="neutral.700">
                Time to restart:
                <Text as="span" ml="8px" fontWeight={800} color="neutral.700">
                  {time < 10 ? `0${time}` : time}s
                </Text>
              </Text>
            </VStack>
            <Button
              customStyles={{
                height: '34px',
                px: '16px',
                width: 'max-content',
              }}
            >
              Restart Now
            </Button>
          </VStack>
        </HStack>
      </Collapse>
    </VStack>
  );
};

export default CountDownTimer;
