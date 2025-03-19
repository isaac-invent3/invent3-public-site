import { Box, Text, VStack } from '@chakra-ui/react';
import UserInfo from '~/lib/components/Common/UserInfo';

const SectionTwo = () => {
  return (
    <VStack alignItems="flex-start" gap="1.2em">
      <Box
        display="grid"
        gridTemplateColumns="90px 1fr"
        columnGap="2.5em"
        width="100%"
      >
        <Text color="neutral.600" size="md">
          Total Assets
        </Text>
        <Text color="#0366EF" size="md">
          10
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="90px 1fr"
        columnGap="2.5em"
        width="100%"
      >
        <Text color="neutral.600" size="md">
          New Owner
        </Text>
        <UserInfo
          name="Mustapha Sule"
          textStyle={{
            color: '#0366EF',
            size:'md'
          }}
          customAvatarStyle={{
            width: '24px',
            height: '24px',
          }}
        />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="90px 1fr"
        columnGap="2.5em"
        width="100%"
      >
        <Text color="neutral.600" size="md">
          New Location
        </Text>
        <Text color="neutral.800" size="md" isTruncated>
          Lekki Branch, Building A, Floor 3, IT Room, Aisle 5, Shelve 3
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="90px 1fr"
        columnGap="2.5em"
        width="100%"
      >
        <Text color="neutral.600" size="md">
          Transfer Date
        </Text>
        <Text color="neutral.800" size="md">
          November, 14 2024
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="90px 1fr"
        columnGap="2.5em"
        width="100%"
      >
        <Text color="neutral.600" size="md"></Text>
        <Text color="#0366EF" fontWeight={500} fontSize="12px">
          See more details
        </Text>
      </Box>
    </VStack>
  );
};

export default SectionTwo;
