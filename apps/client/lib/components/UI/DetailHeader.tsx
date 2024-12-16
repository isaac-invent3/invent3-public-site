import { Text } from '@chakra-ui/react';

interface DetailHeaderProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  customStyles?: { [key: string]: unknown };
}
const DetailHeader = (props: DetailHeaderProps) => {
  const { children, variant, customStyles } = props;
  return (
    <Text
      width="full"
      size="md"
      pt={variant === 'primary' ? '0px' : '4px'}
      pb={variant === 'primary' ? '8px' : '4px'}
      fontWeight={variant === 'primary' ? 700 : 500}
      color={variant === 'primary' ? 'primary.500' : 'neutral.800'}
      borderBottomWidth="1px"
      borderColor="#BBBBBB80"
      {...customStyles}
    >
      {children}
    </Text>
  );
};

export default DetailHeader;
