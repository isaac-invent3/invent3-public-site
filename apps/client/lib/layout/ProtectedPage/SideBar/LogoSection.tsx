import {
  Box,
  Collapse,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

import {
  CaretLeftIcon,
  CaretRightIcon,
} from '~/lib/components/CustomIcons/layout';

interface LogoSectionProps {
  isCollapse: boolean;
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}
const LogoSection = (props: LogoSectionProps) => {
  const { isCollapse, setIsCollapse } = props;
  return (
    <VStack
      alignItems="flex-start"
      mb="48px"
      pl={isCollapse ? '0' : '24px'}
      width="full"
    >
      <HStack width="full" position="relative">
        <Flex
          width="full"
          position="relative"
          justifyContent={isCollapse ? 'center' : 'flex-start'}
        >
          <Flex
            position="relative"
            height="35px"
            width={isCollapse ? '13px' : '125px'}
            justifyContent="center"
          >
            <Image
              src={
                isCollapse
                  ? '/logo-small-initials-white.svg'
                  : '/logo-white.svg'
              }
              alt="Invent3 logo"
              fill
            />
          </Flex>
        </Flex>
        <Icon
          position="absolute"
          mr="8px"
          as={isCollapse ? CaretRightIcon : CaretLeftIcon}
          boxSize="20px"
          right={0}
          cursor="pointer"
          onClick={() => setIsCollapse((prev) => !prev)}
        />
      </HStack>
      <Box height="25px" width="full">
        <Collapse
          in={!isCollapse}
          transition={{
            exit: { duration: 0.6 },
            enter: { duration: 1 },
          }}
        >
          <Text
            fontSize="10px"
            fontWeight={700}
            lineHeight="11.88px"
            letterSpacing="0.2em"
            color="neutral.600"
          >
            ASSET MANAGEMENT PLATFORM
          </Text>
        </Collapse>
      </Box>
    </VStack>
  );
};

export default LogoSection;
