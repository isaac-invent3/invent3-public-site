import {
  Card,
  Flex,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RightArrowIcon } from '~/lib/components/CustomIcons';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import ApprovalComments from './ApprovalDetailsTabs/ApprovalComments';
import ApprovalDetails from './ApprovalDetailsTabs/ApprovalDetails';
import ApprovalDocuments from './ApprovalDetailsTabs/ApprovalDocuments';

const ApprovalDetailsPanel = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const AllTabs = [
    {
      label: 'Details',
      slug: 'details',
      component: <ApprovalDetails />,
    },
    {
      label: 'Documents',
      slug: 'documents',
      component: <ApprovalDocuments />,
    },

    {
      label: 'Comments',
      slug: 'comments',
      component: <ApprovalComments />,
    },
  ];

  const { updateSearchParam, getSearchParam } = useCustomSearchParams();

  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    const tabSelected = getSearchParam('tabSelected');

    if (tabSelected) {
      const foundIndex = AllTabs.findIndex((tab) => tab.slug === tabSelected);

      setTabIndex(foundIndex !== -1 ? foundIndex : 0);
    }
  }, []);

  return (
    <Card
      rounded="8px"
      padding="16px"
      background="white"
      width="490px"
      overflowY="scroll"
      height={isOpen ? '680px' : 'auto'}
      transition="all 200ms ease-in-out"
      transform={isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'}
      transformOrigin="top right"
    >
      <Tabs
        variant="custom"
        onChange={(index) => setTabIndex(index)}
        width={'full'}
        index={tabIndex}
      >
        <TabList>
          <HStack width="full" alignItems="flex-start">
            {AllTabs.map((tab, index) => {
              const tabActive = tabIndex === index;

              return (
                <Tab
                  paddingBottom="20px"
                  key={index}
                  onClick={() =>
                    isOpen && updateSearchParam('tabSelected', tab.slug)
                  }
                >
                  <Text
                    color={tabActive ? '#0E2642' : '#838383'}
                    fontWeight={tabActive ? 700 : 500}
                    transition="all 200ms ease-in-out"
                    size="md"
                  >
                    {tab.label}
                  </Text>
                </Tab>
              );
            })}
          </HStack>

          <Flex
            background={isOpen ? 'neutral.200' : 'primary.500'}
            rounded="4px"
            width="32px"
            height="32px"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={onToggle}
            color={isOpen ? 'primary.500' : 'neutral.100'}
            transition="all 200ms ease-in-out"
          >
            <Icon as={RightArrowIcon} />
          </Flex>
        </TabList>

        {isOpen && (
          <TabPanels>
            {AllTabs.map((item, index) => (
              <TabPanel mt="24px" key={item.label}>
                {index === tabIndex && item.component}
              </TabPanel>
            ))}
          </TabPanels>
        )}
      </Tabs>
    </Card>
  );
};

export default ApprovalDetailsPanel;
