import { Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

let storedHandler: ((e: BeforeUnloadEvent) => void) | null = null;

export function disableBeforeUnload() {
  if (storedHandler) {
    window.removeEventListener('beforeunload', storedHandler);
    storedHandler = null;
  }
}

const withFormLeaveDialog = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC = (props: P) => {
    const { data: session } = useSession();
    const sessionRef = useRef(session);

    // keep latest session value
    useEffect(() => {
      sessionRef.current = session;
    }, [session]);

    useEffect(() => {
      storedHandler = (event: BeforeUnloadEvent) => {
        if (sessionRef.current && !sessionRef.current.error) {
          event.preventDefault();
        }
      };

      window.addEventListener('beforeunload', storedHandler);
      return () => {
        disableBeforeUnload();
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
