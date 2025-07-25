import { ResponsiveValue, Spinner, StackProps, VStack } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  size?:
    | ResponsiveValue<(string & {}) | 'sm' | 'md' | 'lg' | 'xl' | 'xs'>
    | undefined;
  customStyle?: StackProps;
}
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  customStyle,
}) => {
  return (
    <VStack
      width="full"
      height="full"
      minH="inherit"
      justifyContent="center"
      {...customStyle}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primary.500"
        size={size ?? 'xl'}
      />
    </VStack>
  );
};

export default LoadingSpinner;
