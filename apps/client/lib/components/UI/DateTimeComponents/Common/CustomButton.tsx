import { Icon } from '@chakra-ui/react';
import React from 'react';
import Button from '../../Button';
import { PenIcon } from '~/lib/components/CustomIcons';

interface CustomButtonProps {
  buttonVariant: 'solid' | 'outline';
  handleClick: () => void;
}
const CustomButton = (props: CustomButtonProps) => {
  const { buttonVariant, handleClick } = props;

  const buttonStyle = {
    py: '10px',
    px: '16px',
    height: '37px',
    color: 'black',
    width: 'max-content',
    border: buttonVariant === 'outline' ? '1px solid #898989' : 'none',
    bgColor: buttonVariant === 'solid' ? '#E4E4E4' : 'transparent',
    _hover: { bgColor: 'none' },
    _active: { bgColor: 'none' },
    _focus: { bgColor: 'none' },
  };

  return (
    <Button customStyles={buttonStyle} handleClick={handleClick}>
      <Icon as={PenIcon} boxSize="16px" color="#374957" mr="8px" />
      Custom
    </Button>
  );
};

export default CustomButton;
