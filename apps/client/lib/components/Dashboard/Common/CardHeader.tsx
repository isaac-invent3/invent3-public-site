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
      size="base"
      fontWeight={800}
      {...customStyle}
    >
      {children}
    </Heading>
  );
};

export default CardHeader;
