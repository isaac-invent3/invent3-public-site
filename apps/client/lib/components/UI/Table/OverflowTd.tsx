import { Td, Tooltip } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';

interface OverflowTdProps {
  children: React.ReactNode | string;
  isNumeric: boolean;
  customTdStyle?: { [key: string]: unknown };
  maxW: string;
}

const OverflowTd = (props: OverflowTdProps) => {
  const { children, isNumeric, maxW, customTdStyle } = props;
  const tdRef = useRef<HTMLTableCellElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (tdRef.current) {
        const isOverflow =
          tdRef.current.scrollWidth > tdRef.current.clientWidth;
        setIsOverflowing(isOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <Tooltip
      label={children}
      isDisabled={!isOverflowing}
      hasArrow
      bgColor="neutral.200"
      color="primary.500"
      p="8px"
      fontSize="sm"
    >
      <Td
        ref={tdRef}
        isNumeric={isNumeric}
        borderColor="neutral.300"
        color="black"
        fontSize="12px"
        fontWeight={500}
        lineHeight="14.26px"
        py="8px"
        pl="10px"
        pr="16px"
        {...customTdStyle}
        maxW={maxW}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {children}
      </Td>
    </Tooltip>
  );
};

export default OverflowTd;
