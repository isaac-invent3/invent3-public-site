import { Flex, useOutsideClick, VStack } from '@chakra-ui/react';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { filterSidebarData } from './utils';
import NavItem from './NavItem';
import LogoSection from './LogoSection';
import FooterSection from './FooterSection';
import { SideBarData } from '~/lib/interfaces/general.interfaces';

interface SideBarProps {
  isCollapse: boolean;
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideBar = (props: SideBarProps) => {
  const { isCollapse, setIsCollapse } = props;
  const [sideBarData, setSideBarData] = useState<SideBarData[]>([]);
  const flexRef = useRef(null);

  useLayoutEffect(() => {
    const getSideBarData = async () => {
      const result = await filterSidebarData();
      setSideBarData(result);
    };
    getSideBarData();
  }, []);

  useOutsideClick({ ref: flexRef, handler: () => setIsCollapse(true) });

  return (
    <Flex
      ref={flexRef}
      direction="column"
      width={{
        base: isCollapse ? '0px' : '249px',
        md: isCollapse ? '65px' : '249px',
      }}
      mt="8px"
      ml="8px"
      pt="42px"
      pb="60px"
      height="calc(100vh - 16px)"
      justifyContent="space-between"
      borderTop="1px solid #F3F3F3"
      position={{ base: 'absolute', md: 'fixed' }}
      overflowY="auto"
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
        <VStack width="full" spacing="8px" px={isCollapse ? '0' : '24px'}>
          {sideBarData.map((item) => (
            <NavItem {...item} key={item.name} isCollapse={isCollapse} />
          ))}
        </VStack>
        {/* Navigation Menu */}
      </Flex>
      {/* Footer starts Here */}
      <FooterSection isCollapse={isCollapse} />
      {/* Footer Ends Here */}
    </Flex>
  );
};

export default SideBar;
