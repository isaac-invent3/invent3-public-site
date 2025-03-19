import { Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const withFormLeaveDialog = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC = (props: P) => {
    const session = useSession();

    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        if (session?.data?.error || !session?.data) {
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
