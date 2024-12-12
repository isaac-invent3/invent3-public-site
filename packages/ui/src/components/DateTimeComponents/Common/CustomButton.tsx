import { Icon } from '@chakra-ui/react';
import Button from '../../Button';
import { PenIcon } from '../../CustomIcons';

interface CustomDateButtonProps {
  buttonVariant: 'solid' | 'outline';
  handleClick: () => void;
  buttonText?: string;
}
const CustomDateButton = (props: CustomDateButtonProps) => {
  const { buttonVariant, handleClick, buttonText } = props;

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
      {buttonText ?? 'Custom'}
    </Button>
  );
};

export default CustomDateButton;
