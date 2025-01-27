import { Flex, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { filterSideBarData } from './utils';
import NavItem from './NavItem';
import LogoSection from './LogoSection';
import FooterSection from './FooterSection';
import { SYSTEM_ROLES } from '~/lib/utils/constants';

const SideBar = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const sideBarData = filterSideBarData([SYSTEM_ROLES.ADMIN]);

  return (
    <Flex
      direction="column"
      width={isCollapse ? '65px' : '249px'}
      mt="8px"
      ml="8px"
      pt="42px"
      pb="60px"
      height="calc(100vh - 16px)"
      justifyContent="space-between"
      borderTop="1px solid #F3F3F3"
      position="fixed"
      overflowY="auto"
      rounded="16px"
      transition="width 0.4s ease"
      bgImage="/layout-bg.png"
      bgSize="cover"
      zIndex={9999}
      onMouseEnter={() => setIsCollapse(false)}
      onMouseLeave={() => setIsCollapse(true)}
    >
      <Flex direction="column">
        {/* Logo Section Starts */}
        <LogoSection isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
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
