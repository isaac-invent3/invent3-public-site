import { Icon } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';
import { PenIcon } from '../../CustomIcons';

interface EditButtonProps {
  handleClick?: () => void;
}
const EditButton = ({ handleClick }: EditButtonProps) => {
  return (
    <Button
      variant="secondary"
      customStyles={{ width: 'max-content', px: '20px' }}
      handleClick={handleClick}
    >
      Edit
      <Icon as={PenIcon} boxSize="14px" ml="16px" />
    </Button>
  );
};

export default EditButton;
