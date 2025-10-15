import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import type { PlacementWithLogical } from '@chakra-ui/react';
import { useRef } from 'react';

interface IMenu {
  TriggerButton: React.ReactNode;
  maxW?: string;
  children: React.ReactNode;
  placement?: PlacementWithLogical;
}
const Menu = (props: IMenu) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    TriggerButton,
    maxW = 'full',
    children,
    placement = 'bottom',
  } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(undefined);

  const btnMouseLeaveEvent = () => {
    timerRef.current = window.setTimeout(() => {
      onClose();
    }, 150);
  };

  const menuListMouseEnterEvent = () => {
    clearTimeout(timerRef.current);
    timerRef.current = undefined;
    onOpen();
  };
  return (
    <Popover isOpen={isOpen} placement={placement}>
      <PopoverTrigger>
        <Flex onMouseEnter={onOpen} onMouseLeave={btnMouseLeaveEvent}>
          {TriggerButton}
        </Flex>
      </PopoverTrigger>

      <PopoverContent
        onMouseEnter={menuListMouseEnterEvent}
        onMouseLeave={onClose}
        maxW={maxW}
        mt="8px"
        bgColor="transparent"
        border="none"
        width="full"
        onClick={() => onClose()}
      >
        <PopoverBody p={0} bgColor="transparent">
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Menu;
