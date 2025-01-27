import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import UserInfo from '~/lib/components/Common/UserInfo';
import { CalendarIcon } from '~/lib/components/CustomIcons';

const SectionFour = () => {
  return (
    <VStack alignItems="flex-start" gap="1.2em">
      <Box
        display="grid"
        gridTemplateColumns="90px 1fr"
        columnGap="2.5em"
        width="100%"
      >
        <Text color="neutral.600" size="md">
          Requested By
        </Text>
        <UserInfo
          name="Mustapha Sule"
          textStyle={{
            color: '#0366EF',
            size: 'md',
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
          Date
        </Text>

        <HStack alignItems='center' gap='8px'>
          <Icon as={CalendarIcon} />

          <Text color="neutral.800" size="md">
            November, 14 2024
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
};

export default SectionFour;
