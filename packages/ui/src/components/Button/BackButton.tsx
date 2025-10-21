// eslint-disable-next-line no-redeclare
import { HStack, Icon, StackProps, Text } from '@chakra-ui/react';
import { LongBackArrowIcon, ChevronLeftIcon } from '../CustomIcons';

interface BackButtonProps {
  handleClick: () => void;
  customStyles?: StackProps;
  variant?: 'primary' | 'secondary';
}
const BackButton = (props: BackButtonProps) => {
  const { handleClick, customStyles, variant = 'primary' } = props;
  return (
    <HStack
      cursor="pointer"
      px="12px"
      rounded="8px"
      spacing="8px"
      bgColor="#F6F6F6"
      width="85px"
      minH="32px"
      onClick={handleClick}
      {...customStyles}
      alignItems="center"
    >
      <Icon
        as={variant === 'primary' ? LongBackArrowIcon : ChevronLeftIcon}
        boxSize="16px"
        color="#374957"
      />
      <Text color="primary.500">Back</Text>
    </HStack>
  );
};

export default BackButton;
