import { Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const withFormLeaveDialog = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC = (props: P) => {
    const { data } = useSession();
    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // Block initial unload only if an access token exists
        if (data?.user?.accessToken) {
          event.preventDefault();
        }
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
