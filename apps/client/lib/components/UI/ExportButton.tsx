import { Button } from '@repo/ui/components';
import React from 'react';
import { DownloadIcon } from '../CustomIcons';
import { ButtonProps, Icon } from '@chakra-ui/react';

interface ExportButtonProps {
  handleClick: () => void;
  isLoading: boolean;
  customStyles?: ButtonProps;
}
const ExportButton = (props: ExportButtonProps) => {
  const { handleClick, isLoading, customStyles } = props;
  return (
    <Button
      customStyles={{
        minH: '36px',
        py: '6px',
        px: '8px',
        pr: '24px',
        width: '177px',
        className: 'no-pdf',
        ...customStyles,
      }}
      handleClick={handleClick}
      loadingText="Exporting..."
      isLoading={isLoading}
    >
      <Icon as={DownloadIcon} boxSize="18px" mr="8px" />
      Export
    </Button>
  );
};

export default ExportButton;
