'use client';
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  VStack,
  useDisclosure,
  Icon,
  Text,
  Box,
} from '@chakra-ui/react';
import { ThreeVerticalDotsIcon } from '../CustomIcons';
import { debounce } from 'lodash';

interface DynamicTabsProps {
  tabs: { name: string; component: React.ReactNode }[];
  activeTabParam?: string | null;
  onTabChange?: (tabName: string) => void;
  moreLabel?: string;
  isLoading?: boolean;
}

/**
 * A reusable dynamic Tabs component that automatically handles overflow with a "More" popover.
 *
 * Props:
 * - tabs: Array of { name, component }
 * - activeTabParam?: optional string to preselect tab
 * - onTabChange?: callback(tabName) fired when a tab changes
 * - moreLabel?: custom label for "More" menu
 * - isLoading?: optional boolean to reduce opacity while loading
 */
const DynamicTabs: React.FC<DynamicTabsProps> = ({
  tabs,
  activeTabParam,
  onTabChange,
  moreLabel = 'More',
  isLoading = false,
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [activeMoreTab, setActiveMoreTab] = useState<string | null>(null);
  const [visibleTabs, setVisibleTabs] = useState(tabs);
  const [overflowTabs, setOverflowTabs] = useState<typeof tabs>([]);

  const tabListRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle initial tab selection via URL/search param
  useEffect(() => {
    const mainIndex = tabs.findIndex((t) => t.name === activeTabParam);
    if (mainIndex !== -1) {
      if (mainIndex < visibleTabs.length) {
        setTabIndex(mainIndex);
        setActiveMoreTab(null);
      } else {
        if (tabs?.[mainIndex]?.name) setActiveMoreTab(tabs?.[mainIndex]?.name);
        setTabIndex(-1);
      }
    } else {
      setTabIndex(0);
    }
  }, [activeTabParam, visibleTabs, tabs]);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    setActiveMoreTab(null);
    const tabName = visibleTabs[index]?.name;
    if (tabName && onTabChange) onTabChange(tabName);
  };

  const handleMoreClick = (name: string) => {
    setActiveMoreTab(name);
    if (onTabChange) onTabChange(name);
    setTabIndex(-1);
    onClose();
  };

  // ✅ Stable resize observer to detect overflow without flicker
  useLayoutEffect(() => {
    const container = tabListRef.current;
    if (!container) return;

    const calculateTabs = () => {
      const containerWidth = container.offsetWidth;
      const childWidths = Array.from(container.children).map(
        (child) => (child as HTMLElement).offsetWidth
      );

      const moreButtonWidth = 160;
      let total = 0;
      let cutoffIndex = tabs.length;

      for (let i = 0; i < tabs.length; i++) {
        total += childWidths[i] ?? 100;
        if (total + moreButtonWidth > containerWidth) {
          cutoffIndex = i;
          break;
        }
      }

      const newVisible = tabs.slice(0, cutoffIndex);
      const newOverflow = tabs.slice(cutoffIndex);

      // ✅ Only update if values actually changed
      const visibleChanged =
        JSON.stringify(newVisible.map((t) => t.name)) !==
        JSON.stringify(visibleTabs.map((t) => t.name));
      const overflowChanged =
        JSON.stringify(newOverflow.map((t) => t.name)) !==
        JSON.stringify(overflowTabs.map((t) => t.name));

      if (visibleChanged || overflowChanged) {
        setVisibleTabs(newVisible);
        setOverflowTabs(newOverflow);
      }
    };

    const debouncedCalc = debounce(calculateTabs, 100);
    const resizeObserver = new ResizeObserver(debouncedCalc);

    resizeObserver.observe(container);
    calculateTabs(); // run once on mount

    return () => {
      resizeObserver.disconnect();
      debouncedCalc.cancel();
    };
  }, [tabs]);

  const isMoreActive = overflowTabs.some((t) => t.name === activeMoreTab);

  return (
    <Tabs
      variant="custom"
      width="full"
      onChange={handleTabChange}
      index={tabIndex >= 0 ? tabIndex : -1}
    >
      <Flex width="full" opacity={isLoading ? 0.5 : 1}>
        <TabList
          ref={tabListRef}
          overflowX="visible"
          borderBottom="1px solid"
          borderColor="#BBBBBB"
          width="full"
        >
          {visibleTabs.map((tab) => (
            <Tab key={tab.name}>{tab.name}</Tab>
          ))}

          {overflowTabs.length > 0 && (
            <Popover
              placement="bottom-end"
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              isLazy
            >
              <PopoverTrigger>
                <Box
                  as="button"
                  mb="-1px"
                  px={4}
                  pt={2}
                  pb="11px"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  cursor="pointer"
                  borderBottom="3px solid"
                  borderColor={isMoreActive ? 'primary.500' : 'transparent'}
                  color={isMoreActive ? 'primary.500' : 'neutral.600'}
                  _hover={{ color: 'primary.500' }}
                >
                  <Flex
                    bgColor="neutral.300"
                    width="20px"
                    height="20px"
                    rounded="full"
                    alignItems="center"
                    justifyContent="center"
                    p="2px"
                  >
                    <Icon
                      as={ThreeVerticalDotsIcon}
                      boxSize="12px"
                      color="#212121"
                    />
                  </Flex>
                  <Text size="md">{moreLabel}</Text>
                </Box>
              </PopoverTrigger>

              <PopoverContent w="220px" zIndex={1500}>
                <PopoverBody p={0} py={2} px={4}>
                  <VStack align="stretch" spacing={2}>
                    {overflowTabs.map(({ name }) => (
                      <Button
                        key={name}
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                        onClick={() => handleMoreClick(name)}
                        colorScheme={
                          activeMoreTab === name ? 'blue' : undefined
                        }
                        p={1}
                      >
                        {name}
                      </Button>
                    ))}
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </TabList>
      </Flex>

      <TabPanels pt="16px">
        {visibleTabs.map((tab, index) => (
          <TabPanel key={tab.name} height="full">
            {tabIndex === index && tab.component}
          </TabPanel>
        ))}
      </TabPanels>

      {activeMoreTab && (
        <Flex mt="16px">
          {tabs.find((t) => t.name === activeMoreTab)?.component}
        </Flex>
      )}
    </Tabs>
  );
};

export default DynamicTabs;
