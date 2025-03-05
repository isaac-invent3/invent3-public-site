import {
  HStack,
  Icon,
  Text as ChakraText,
  StackProps,
  TextProps,
} from '@chakra-ui/react';
import { AddIcon } from '../CustomIcons';

interface AddButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
  color?: string;
  customStyle?: StackProps;
  customTextStyle?: TextProps;
}
const AddButton = (props: AddButtonProps) => {
  const {
    children,
    handleClick,
    color = 'blue.500',
    customStyle,
    customTextStyle,
  } = props;

  return (
    <HStack
      spacing="4px"
      cursor="pointer"
      onClick={handleClick}
      {...customStyle}
    >
      <Icon as={AddIcon} boxSize="18px" color={color} />
      <ChakraText color={color} mt="2px" {...customTextStyle}>
        {children}
      </ChakraText>
    </HStack>
  );
};

export default AddButton;
