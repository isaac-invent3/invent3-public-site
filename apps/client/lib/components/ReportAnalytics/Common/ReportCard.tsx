import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

interface ReportCardProps {
  title: string;
  value: string;
  onViewReport: () => void;
  color?: string;
}

const ReportCard = (props: ReportCardProps) => {
  const { onViewReport, title, value, color } = props;
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      p={4}
      bg="white"
      _hover={{ boxShadow: 'xl' }}
      width="222px"
      minHeight="144px"
    >
      <VStack align="start" height="100%" justifyContent="space-between">
        <VStack align="start" spacing="8px">
          <Text color="#42403D" fontWeight={500}>{title}</Text>

          <Heading
            fontSize="32px"
            lineHeight="38.02px"
            color={color ?? '#0E2642'}
            fontWeight={800}
          >
            {value}
          </Heading>
        </VStack>

        <Text>View Report</Text>

  
      </VStack>
    </Box>
  );
};

export default ReportCard;
