import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
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
    >
      {isLoading && <Skeleton width="200px" height="50px" />}
      {!isLoading && data && (
        <HStack spacing="59px" alignItems="flex-start">
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

          <Button variant="secondary" customStyles={{ width: 'max-content' }}>
            Change Team
          </Button>
        </HStack>
      )}
    </SectionWrapper>
  );
};

export default MyTeam;
