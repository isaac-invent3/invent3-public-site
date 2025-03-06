import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useAppSelector } from '~/lib/redux/hooks';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';

const CompanyInfo = () => {
  const company = useAppSelector((state) => state.company.company);
  const session = useSession();
  const user = session?.data?.user;
  const isThirdParty =
    user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) ?? false;

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      w="full"
      justifyContent="space-between"
      alignItems="flex-start"
      px="16px"
      py="32px"
      bg="white"
      rounded="8px"
      spacing="24px"
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        alignItems="start"
        spacing="24px"
        width={{ base: 'full', md: '60%', lg: '70%' }}
      >
        <HStack spacing="16px" alignItems="flex-start">
          <Flex
            width={{ base: '83px', lg: '129px' }}
            height={{ base: '83px', lg: '129px' }}
            rounded="8px"
            position="relative"
            shrink={0}
            bgColor={!company?.base64Prefix ? 'neutral.100' : 'none'}
          >
            <Image
              src={
                company?.base64Prefix
                  ? `${company?.base64Prefix}${company?.photoImage}`
                  : ''
              }
              fill
              alt="company-logo"
            />
          </Flex>
          <VStack
            alignItems="flex-start"
            spacing="8px"
            display={{ base: 'flex', lg: 'none' }}
          >
            <Text
              color="black"
              fontWeight={800}
              size={{ base: 'lg', md: '2xl' }}
            >
              {company?.companyName}
            </Text>
            <Box py="8px" px="16px" rounded="full" bgColor="#BBBBBB">
              <Text>{company?.industryName}</Text>
            </Box>
          </VStack>
        </HStack>

        <VStack alignItems="start" spacing="24px">
          <VStack
            alignItems="flex-start"
            spacing="8px"
            display={{ base: 'none', lg: 'flex' }}
          >
            <Text color="black" fontWeight={800} size="2xl">
              {company?.companyName}
            </Text>
            <Box py="8px" px="16px" rounded="full" bgColor="#BBBBBB">
              <Text>{company?.industryName}</Text>
            </Box>
          </VStack>

          <SimpleGrid
            width="full"
            spacing={{ base: '24px', lg: '48px' }}
            columns={{ base: 1, lg: 2 }}
            alignItems="flex-start"
          >
            <VStack alignItems="start" spacing="8px">
              <HStack spacing="16px" alignItems="flex-start">
                <Text size="md" color="neutral.800" width="95px">
                  Email:
                </Text>
                <Text size="md" color="black">
                  {company?.emailAddress ?? 'N/A'}
                </Text>
              </HStack>
              <HStack spacing="16px" alignItems="flex-start">
                <Text size="md" color="neutral.800" width="95px">
                  Web address:
                </Text>
                <Text size="md" color="black">
                  {company?.webUrl ?? 'N/A'}
                </Text>
              </HStack>
            </VStack>

            <HStack spacing="16px" alignItems="flex-start">
              <Text size="md" color="neutral.800" width="95px">
                Correspondent Address:
              </Text>
              <Text size="md" color="black" maxW="70%">
                {company?.address ?? 'N/A'}
              </Text>
            </HStack>
          </SimpleGrid>
        </VStack>
      </Stack>

      <VStack
        w={{ base: 'full', md: '30%', lg: '20%' }}
        alignItems="start"
        spacing={0}
      >
        <Text color="primary.500" size="md" fontWeight={700}>
          Current Subscription
        </Text>
        <VStack
          alignItems="flex-start"
          spacing="8px"
          mt={{ base: '16px', md: '24px' }}
          mb={{ base: '16px', md: '24px' }}
        >
          {!isThirdParty && (
            <HStack>
              <Text color="black" size="xl" fontWeight={700}>
                Invent3 Pro
              </Text>
              <Text as="span" color="neutral.600" size="md" fontWeight={500}>
                (Yearly)
              </Text>
            </HStack>
          )}
          {!isThirdParty && (
            <Text color="neutral.600" size="md" fontWeight={500}>
              Start Date: 28 March 2025
            </Text>
          )}
          <Text color="neutral.600" size="md" fontWeight={500}>
            Renew Date: 28 March 2025
          </Text>
        </VStack>
        <Button
          customStyles={{
            maxW: '181px',
            height: { base: '36px', md: 'min-content' },
          }}
        >
          Renew Plan
        </Button>
      </VStack>
    </Stack>
  );
};

export default CompanyInfo;
