import { HStack, Icon } from '@chakra-ui/react';
import React from 'react';
import { CloseIcon } from '../CustomIcons';

interface DimissibleContainerProps {
  children: React.ReactNode;
  handleClose: () => void;
  showCloseArea?: boolean;
}

const DimissibleContainer = (props: DimissibleContainerProps) => {
  const { children, handleClose, showCloseArea = true } = props;
  return (
    <HStack role="group" flexWrap="nowrap">
      {children}
      <Icon
        as={CloseIcon}
        boxSize="16px"
        color="black"
        display={showCloseArea ? 'flex' : 'none'}
        visibility="hidden"
        opacity={0}
        _groupHover={{ opacity: 1, visibility: 'visible', display: 'flex' }}
        transition="opacity 0.3s ease"
        cursor="pointer"
        onClick={() => handleClose()}
      />
    </HStack>
  );
};

export default DimissibleContainer;
