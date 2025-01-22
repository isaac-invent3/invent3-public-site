import { Heading } from '@chakra-ui/react';

interface CardHeaderProps {
  children: React.ReactNode;
  color?: string;
}
const CardHeader = ({ children, color }: CardHeaderProps) => {
  return (
    <Heading
      color={color ?? 'neutral.800'}
      fontSize="14px"
      lineHeight="16.63px"
      fontWeight={800}
    >
      {children}
    </Heading>
  );
};

export default CardHeader;
