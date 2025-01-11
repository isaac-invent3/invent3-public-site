import { HStack, Icon, VStack } from '@chakra-ui/react';
import { AddIcon } from '../CustomIcons';
import { Button } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';

const Header = ({
  showGenerate = true,
  header,
}: {
  showGenerate?: boolean;
  header?: string;
}) => {
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <HStack width="full" justifyContent="space-between">
        <PageHeader>{header ?? 'Reports & Analytics'}</PageHeader>

        {showGenerate && (
          <Button
            customStyles={{ width: '227px' }}
            href="/report-analytics/generate"
          >
            <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
            Generate a Report
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export default Header;
