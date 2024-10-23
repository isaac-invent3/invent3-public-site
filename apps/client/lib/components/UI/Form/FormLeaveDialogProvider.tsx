import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const withFormLeaveDialog = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC = (props: P) => {
    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);

    return (
      <Flex width="full">
        <WrappedComponent {...props} />
      </Flex>
    );
  };

  return HOC;
};

export default withFormLeaveDialog;
