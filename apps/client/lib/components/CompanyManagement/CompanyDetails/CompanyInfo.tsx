import {
  Avatar,
  Box,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui/components';

const CompanyInfo = () => {
  return (
    <Box rounded="md" px="3em" p="2em" bg="white" my="2em">
      <HStack w="full" justifyContent="space-between">
        <HStack alignItems="start" spacing="32px" w={{ md: '70%' }}>
          <Avatar
            w={{ base: '80px', md: '130px' }}
            h={{ base: '80px', md: '130px' }}
          ></Avatar>

          <VStack alignItems="start" spacing="16px">
            <Text
              color="black"
              fontWeight={800}
              fontSize={{ base: '16px', md: '32px' }}
            >
              SoftLayer, an IBM Company
            </Text>
            <Box py="8px" px="16px" rounded="full" bgColor="#BBBBBB">
              <Text>Automative</Text>
            </Box>

            <Grid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
              gap={{ base: '8px' }}
            >
              <GridItem colSpan={1} width="full">
                <HStack
                  width={{ base: 'full', md: 'max-content' }}
                  whiteSpace="nowrap"
                  justifyContent="space-between"
                >
                  <Text size="md" color="black">
                    Email:
                  </Text>
                  <Text size="md" color="black">
                    contact@softlayer.com
                  </Text>
                </HStack>
              </GridItem>

              <GridItem colSpan={1} width="full">
                <HStack
                  width={{ base: 'full', md: 'max-content' }}
                  whiteSpace="nowrap"
                  justifyContent="space-between"
                >
                  <Text size="md" color="black">
                    Correspondent Address:
                  </Text>
                  <Text size="md" color="black">
                    2118 Thornridge Cir. Syracuse, Connecticut 35624
                  </Text>
                </HStack>
              </GridItem>
              <GridItem colSpan={1} width="full">
                <HStack
                  width={{ base: 'full', md: 'max-content' }}
                  whiteSpace="nowrap"
                  justifyContent="space-between"
                >
                  <Text size="md" color="black">
                    Web address:
                  </Text>
                  <Text size="md" color="black">
                    https://softlayer.com
                  </Text>
                </HStack>
              </GridItem>
            </Grid>
          </VStack>
        </HStack>

        <VStack w={{ md: '20%' }} alignItems="start" spacing="16px">
          <Text color="primary.500" size="md" fontWeight={700}>
            Current Subscription
          </Text>
          <HStack>
            <Text color="black" size="xl" fontWeight={700}>
              Invent3 Pro
            </Text>
            <Text as="span" color="neutral.600" size="md" fontWeight={500}>
              (Yearly)
            </Text>
          </HStack>
          <Text color="neutral.600" size="md" fontWeight={500}>
            Renew Date: 28 March 2025
          </Text>
          <Button customStyles={{ maxW: '181px' }}>Renew Plan</Button>
        </VStack>
      </HStack>
    </Box>
  );
};

export default CompanyInfo;
