import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { HStack, Text } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';

const MyTeam = () => {
  return (
    <SectionWrapper
      title="My Team"
      subtitle="View and manage your current team details"
      sectionInfoWidth="221px"
    >
      <HStack spacing="59px">
        <Text fontSize="16px" lineHeight="22.4px" color="black">
          Engineering & Product
        </Text>
        <Button variant="secondary" customStyles={{ width: 'max-content' }}>
          Change Team
        </Button>
      </HStack>
    </SectionWrapper>
  );
};

export default MyTeam;
