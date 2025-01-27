import { Heading, HeadingProps } from '@chakra-ui/react';

interface CardHeaderProps {
  children: React.ReactNode;
  color?: string;
  customStyle?: HeadingProps;
}
const CardHeader = ({ children, color, customStyle }: CardHeaderProps) => {
  return (
    <Heading
      color={color ?? 'neutral.800'}
      fontSize="14px"
      lineHeight="16.63px"
      fontWeight={800}
      {...customStyle}
    >
      {children}
    </Heading>
  );
};

export default CardHeader;
