import {
  Flex,
  HStack,
  StackDivider,
  Tab,
  TabList,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { FilterButton } from '@repo/ui/components';
import { FilterIcon } from '../CustomIcons';
import PageHeader from '../UI/PageHeader';

interface ApprovalHeaderProps {
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Header = (props: ApprovalHeaderProps) => {
  const { setTabIndex, tabIndex } = props;

  const tabs = [
    {
      name: 'All',
      count: 8,
    },
    {
      name: 'Disposal',
      count: 0,
    },
    {
      name: 'Transfer',
      count: 16,
    },
  ];

  return (
    <HStack width="full" justifyContent="space-between" pt="40px">
      <PageHeader width="50%">Approval Requests</PageHeader>

      <Flex width="50%" alignItems="center" justifyContent="space-between">
        <HStack spacing="16px" alignItems="flex-start">
          <Text color="neutral.800" fontWeight="700" size="lg">
            Type:
          </Text>

          <Tabs
            variant="custom"
            width={'full'}
            onChange={(index) => setTabIndex(index)}
            index={tabIndex}
          >
            <TabList>
              <HStack
                divider={
                  <StackDivider
                    borderColor="#A6A6A6"
                    height="20px"
                    alignSelf="center"
                  />
                }
              >
                {tabs.map((tab, index) => {
                  const tabActive = tabIndex === index;

                  return (
                    <Tab paddingBottom="8px" key={index}>
                      <HStack>
                        <Text
                          color={tabActive ? '#0E2642' : '#838383'}
                          fontWeight={tabActive ? 700 : 500}
                          transition="all 300ms ease-in-out"
                          size="md"
                        >
                          {tab.name}
                        </Text>

                        <Flex
                          color={tabActive ? 'white' : 'black'}
                          bgColor={tabActive ? '#0E2642' : '#BBBBBB'}
                          transition="all 300ms ease-in-out"
                          borderRadius="16px"
                          width="30px"
                          height="22px"
                          alignItems="center"
                          justifyContent="center"
                          ml="8px"
                          opacity={tabActive ? 1 : 0.5}
                        >
                          <Text size={tabActive ? 'md' : 'base'}>
                            {tab.count}
                          </Text>
                        </Flex>
                      </HStack>
                    </Tab>
                  );
                })}
              </HStack>
            </TabList>
          </Tabs>
        </HStack>
        <FilterButton
          icon={FilterIcon}
          label="Filters"
          handleClick={() => console.log('hey')}
          isActive={false}
        />
      </Flex>
    </HStack>
  );
};

export default Header;
