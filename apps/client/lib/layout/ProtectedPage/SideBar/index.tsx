import {
  Flex,
  HStack,
  Icon,
  Text,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { isEmpty, some } from 'lodash';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { filterSidebarData } from './utils';
import NavItem from './NavItem';
import LogoSection from './LogoSection';
import FooterSection from './FooterSection';
import { SideBarData } from '~/lib/interfaces/general.interfaces';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';

interface SideBarProps {
  isCollapse: boolean;
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideBar = (props: SideBarProps) => {
  const { isCollapse, setIsCollapse } = props;
  const [sideBarData, setSideBarData] = useState<SideBarData[]>([]);
  const flexRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  // Checks for overflow of the sidebar content
  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        setHasOverflow(
          containerRef.current.scrollHeight > containerRef.current.clientHeight
        );
      }
    };

    checkOverflow();

    // Observe resizing in case content changes dynamically
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [sideBarData, isCollapse]);

  useLayoutEffect(() => {
    const getSideBarData = async () => {
      const result = await filterSidebarData();
      setSideBarData(result);
    };
    getSideBarData();
  }, []);

  useOutsideClick({ ref: flexRef, handler: () => setIsCollapse(true) });

  const hasAnyChildren = some(
    sideBarData,
    (item) => item.children && item.children.length > 0
  );

  return (
    <Flex
      ref={flexRef}
      direction="column"
      width={{
        base: isCollapse ? '0px' : '249px',
        md: isCollapse ? '80px' : '249px',
      }}
      mt="8px"
      ml="8px"
      pt="42px"
      pb={{ base: '40px', lg: '72px' }}
      height="calc(100vh - 16px)"
      justifyContent="space-between"
      borderTop="1px solid #F3F3F3"
      position={{ base: 'absolute', md: 'fixed' }}
      rounded="16px"
      transition="width 0.4s ease"
      bgImage="/layout-bg.png"
      bgSize="cover"
      zIndex={999}
      onMouseEnter={() => setIsCollapse(false)}
      onMouseLeave={() => setIsCollapse(true)}
    >
      <Flex direction="column">
        {/* Logo Section Starts */}
        <LogoSection isCollapse={isCollapse} />
        {/* Logo Section Ends */}
        {/* Navigation Menu */}
        <VStack
          width="full"
          spacing="8px"
          pb="8px"
          maxH="60vh"
          overflowY="auto"
          sx={{
            scrollbarWidth: '0px',
            scrollbarColor: 'transparent transparent',
            '&::-webkit-scrollbar': {
              width: '0px',
              height: '0px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'transparent',
            },
          }}
          ref={containerRef}
        >
          {sideBarData.map((item) => (
            <NavItem
              key={item.name}
              {...item}
              children={isEmpty(item.children) ? undefined : item.children}
              isCollapse={isCollapse}
              hasAnyChildren={hasAnyChildren}
            />
          ))}
        </VStack>
        {hasOverflow && (
          <HStack spacing="8px" width="full" justifyContent="center" pt="8px">
            {!isCollapse && <Text color="white">Scroll Down</Text>}
            <Icon as={ChevronDownIcon} boxSize="16px" color="white" />
          </HStack>
        )}
        {/* Navigation Menu */}
      </Flex>
      {/* Footer starts Here */}
      <FooterSection isCollapse={isCollapse} />
      {/* Footer Ends Here */}
    </Flex>
  );
};

export default SideBar;
