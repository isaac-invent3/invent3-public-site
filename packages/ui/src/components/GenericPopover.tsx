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
  Icon,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { ThreeVerticalDotsIcon } from './CustomIcons';

interface GenericPopoverProps {
  children: React.ReactNode;
  width?: string;
  placement?: PlacementWithLogical;
}

const GenericPopover = (props: GenericPopoverProps) => {
  const { children, width = '240px', placement = 'auto' } = props;
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
          <Flex onClick={() => onOpen()}>
            <Icon
              as={ThreeVerticalDotsIcon}
              boxSize="16px"
              color="neutral.700"
            />
          </Flex>
        </PopoverTrigger>
        <PopoverContent
          bgColor="white"
          width={width}
          boxShadow="0px 4px 32px 0px #00000026"
          rounded="8px"
        >
          <PopoverBody m={0} p="16px" onClick={onClose}>
            {children}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default GenericPopover;
