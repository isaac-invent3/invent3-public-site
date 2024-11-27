import {
  Box,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';

const growAnimation = `
  from { width: 0; }
  to { width: 100%; }
`;

interface Branch {
  name: string;
  value: number;
  color: string;
}

const branches: Branch[] = [
  {
    name: 'Lekki - Admiralty Road',
    value: 250,
    color: 'rgba(147, 237, 248, 0.5)',
  },
  {
    name: 'Lekki - Admiralty Way',
    value: 200,
    color: 'rgba(206, 185, 223, 0.6)',
  },
  { name: 'Oniru', value: 150, color: 'rgba(147, 237, 248, 0.3)' },
  { name: 'Chisco', value: 100, color: 'white' },
  { name: 'Chevron', value: 50, color: 'rgba(156, 156, 156, 0.6)' },
];

export default function BranchAssetsChart() {
  const maxValue = Math.max(...branches.map((branch) => branch.value));

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={8}
      boxShadow="0px 4px 20px rgba(0, 0, 0, 0.05)"
      width="100%"
      maxW="1200px"
    >
      <VStack align="stretch" spacing={8}>
        {/* Header Section */}
        <Box>
          <Text fontSize="2xl" fontWeight="medium" color="gray.800" mb={4}>
            Top 5 branches with most Assets
          </Text>
          <Text fontSize="5xl" fontWeight="bold" color="gray.900">
            750k
          </Text>
          <Text fontSize="xl" color="gray.500">
            Total Assets
          </Text>
        </Box>

        {/* Chart Section */}
        <Box position="relative">
          {/* Y-axis arrow */}
          <Box
            position="absolute"
            left={0}
            top="-20px"
            height="calc(100% + 40px)"
            width="1px"
            bg="gray.300"
            _after={{
              content: '""',
              position: 'absolute',
              top: '-6px',
              left: '-4px',
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderBottom: '6px solid',
              borderBottomColor: 'gray.300',
              transform: 'rotate(180deg)',
            }}
          />

          {/* Bars */}
          <VStack spacing={6} pl={40}>
            {branches.map((branch, index) => (
              <HStack key={branch.name} width="100%" spacing={4}>
                <Text
                  width="200px"
                  textAlign="right"
                  color="gray.500"
                  fontSize="md"
                  position="absolute"
                  left="0"
                >
                  {branch.name}
                </Text>
                <Box
                  height="40px"
                  bg={branch.color}
                  borderRadius="sm"
                  width={`${(branch.value / maxValue) * 100}%`}
                  position="relative"
                  animation={`${growAnimation} 1s ease-out`}
                >
                  <Text
                    position="absolute"
                    right={4}
                    top="50%"
                    transform="translateY(-50%)"
                    fontWeight="semibold"
                    fontSize="lg"
                  >
                    {branch.value}k
                  </Text>
                </Box>
              </HStack>
            ))}
          </VStack>

          {/* X-axis arrow */}
          <Box
            position="absolute"
            bottom="-20px"
            left="0"
            width="calc(100% + 20px)"
            height="1px"
            bg="gray.300"
            _after={{
              content: '""',
              position: 'absolute',
              right: '-6px',
              top: '-4px',
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderLeft: '6px solid',
              borderLeftColor: 'gray.300',
            }}
          />

          {/* X-axis label */}
          <Text
            position="absolute"
            bottom="-40px"
            right="0"
            color="gray.500"
            fontSize="md"
          >
            Asset Total
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
