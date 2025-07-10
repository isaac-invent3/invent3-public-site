import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import { UserGroup } from '~/lib/interfaces/user.interfaces';
import { TeamIconTwo } from '../../CustomIcons';

interface MyTeamProps {
  isLoading: boolean;
  data: UserGroup[];
}
const MyTeam = ({ isLoading, data }: MyTeamProps) => {
  return (
    <SectionWrapper
      title="My Team"
      subtitle="View and manage your current team details"
      sectionInfoWidth="221px"
      spacing={{ base: '16px' }}
      direction={{ base: 'column', md: 'row' }}
      sectionInfoStyle={{
        maxW: { base: 'full', md: '221px' },
      }}
    >
      {isLoading && <Skeleton width="200px" height="50px" />}
      {!isLoading && data && (
        <HStack spacing="59px" alignItems="flex-start" width="full">
          <VStack alignItems="flex-start" spacing="8px">
            {data?.map((item, index) => (
              <HStack spacing="8px">
                <Icon as={TeamIconTwo} color="#212121" boxSize="16px" />
                <Text
                  fontSize="16px"
                  lineHeight="22.4px"
                  color="black"
                  key={index}
                >
                  {item.groupName}
                </Text>
              </HStack>
            ))}
          </VStack>
        </HStack>
      )}
    </SectionWrapper>
  );
};

export default MyTeam;
