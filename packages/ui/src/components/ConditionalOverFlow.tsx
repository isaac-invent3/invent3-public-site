import { Flex, Tooltip } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

interface ConditionalOverFlowProps {
  label: string;
  children: React.ReactNode;
}
const ConditionalOverFlow = (props: ConditionalOverFlowProps) => {
  const { label, children } = props;
  const [isOverflowing, setIsOverflowing] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (divRef.current) {
        const isOverflow =
          divRef.current.scrollWidth > divRef.current.clientWidth;
        setIsOverflowing(isOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <Tooltip
      label={label}
      isDisabled={!isOverflowing}
      hasArrow
      bgColor="neutral.200"
      color="primary.500"
      p="8px"
      fontSize="sm"
    >
      <Flex ref={divRef} width="full" bgColor="red">
        {children}
      </Flex>
    </Tooltip>
  );
};

export default ConditionalOverFlow;
