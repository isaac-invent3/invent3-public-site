import { Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import QuickLinks from './QuickLinks';
import EscalationAlert from './EscalationAlert';

const QuickLinkAlert = () => {
  const [hasEscalation, setHasEscalation] = useState(true);
  return (
    <HStack width="full">
      <Flex width={hasEscalation ? 'calc(100% - 580px)' : 'full'}>
        <QuickLinks />
      </Flex>
      {hasEscalation && (
        <Flex width="580px" height="full">
          <EscalationAlert />
        </Flex>
      )}
    </HStack>
  );
};

export default QuickLinkAlert;
