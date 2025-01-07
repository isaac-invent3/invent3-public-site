import { Spinner, VStack } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <VStack width="full" height="full" minH="inherit" justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primary.500"
        size="xl"
      />
    </VStack>
  );
};

export default LoadingSpinner;
