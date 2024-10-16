import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  type PlacementWithLogical,
  useOutsideClick,
  Box,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface GenericPopoverProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  width?: string;
  placement?: PlacementWithLogical;
}

const GenericPopover = (props: GenericPopoverProps) => {
  const { children, icon, width = '240px', placement = 'auto' } = props;
  const popoverRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useOutsideClick({
    ref: popoverRef,
    handler: onClose,
  });

  return (
    <Box ref={popoverRef}>
      <Popover
        placement={placement}
        autoFocus={false}
        onClose={onClose}
        isOpen={isOpen}
      >
        <PopoverTrigger>
          <Flex onClick={() => onOpen()}>{icon}</Flex>
        </PopoverTrigger>
        <PopoverContent
          bgColor="white"
          width={width}
          boxShadow="0px 4px 32px 0px #00000026"
          rounded="8px"
        >
          <PopoverBody m={0} p="16px">
            {children}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default GenericPopover;
