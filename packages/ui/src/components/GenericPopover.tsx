import { IconProps } from '@chakra-ui/icons';
import {
  Box,
  ComponentWithAs,
  Flex,
  Icon,
  Popover,
  PopoverBody,
  PopoverBodyProps,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
  type PlacementWithLogical,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { ThreeVerticalDotsIcon } from './CustomIcons';
import { IconType } from 'react-icons';

interface GenericPopoverProps {
  children: React.ReactNode;
  width?: string;
  placement?: PlacementWithLogical;
  icon?: ComponentWithAs<'svg', IconProps> | IconType;
  popoverTriggerElement?: React.ReactNode;
  popoverBodyStyles?: PopoverBodyProps;
}

const GenericPopover = (props: GenericPopoverProps) => {
  const {
    children,
    width = '240px',
    placement = 'auto',
    icon,
    popoverBodyStyles,
    popoverTriggerElement,
  } = props;
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
          <Flex
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            {popoverTriggerElement ?? (
              <Icon
                as={icon ?? ThreeVerticalDotsIcon}
                boxSize="16px"
                color="neutral.700"
              />
            )}
          </Flex>
        </PopoverTrigger>
        <PopoverContent
          bgColor="white"
          width={width}
          boxShadow="0px 4px 32px 0px #00000026"
          rounded="8px"
        >
          <PopoverBody
            m={0}
            p="16px"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            {...popoverBodyStyles}
          >
            {children}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default GenericPopover;
