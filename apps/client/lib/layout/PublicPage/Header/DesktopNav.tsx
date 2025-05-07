import { Flex, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import LINKS from './data';
import {
  ChevronDownIcon,
  GlobeIcon,
} from '~/lib/components/CustomIcons/PublicFacingSite';
import Link from 'next/link';
import Menu from './Menu';
import { MenuChild } from '~/lib/interfaces/publicFacingSite.interfaces';
import Image from 'next/image';

interface SubmenuProps {
  items: MenuChild[];
  menuImage?: string;
  rowGap?: string;
  columns?: number;
}
const Submenu = (props: SubmenuProps) => {
  const { items, menuImage, rowGap, columns } = props;
  return (
    <HStack
      alignItems="flex-start"
      spacing="52px"
      p="24px"
      justifyContent="flex-start"
      width={columns && columns > 1 ? '90vw' : 'full'}
      maxW={columns && columns > 1 ? '1138px' : 'max-content'}
      bgColor="white"
      rounded="10px"
      mt={columns && columns > 1 ? '24px' : 'full'}
      mx="24px"
    >
      <SimpleGrid
        columns={columns}
        columnGap="24px"
        rowGap={rowGap}
        width="full"
      >
        {items.map((item, index) => (
          <Link href={item.link} passHref key={index} style={{ width: 'full' }}>
            <VStack
              alignItems="flex-start"
              spacing="8px"
              width="full"
              cursor="pointer"
            >
              <HStack spacing="8px">
                {item.icon && (
                  <Flex position="relative" width="20px" height="20px">
                    <Image src={item.icon} alt="menu-image" fill />
                  </Flex>
                )}
                <Text
                  fontSize="14px"
                  lineHeight="16px"
                  fontWeight={700}
                  letterSpacing="0.04em"
                  //   whiteSpace="nowrap"
                >
                  {item.title}
                </Text>
              </HStack>
              {item.description && (
                <Text
                  color="primary.accent"
                  letterSpacing="0.04em"
                  fontSize="10px"
                  fontWeight={400}
                  lineHeight="140%"
                  maxW="90%"
                >
                  {item.description}
                </Text>
              )}
            </VStack>
          </Link>
        ))}
      </SimpleGrid>
      {menuImage && (
        <Flex position="relative" width="311px" height="311px">
          <Image src={menuImage} alt="menu-image" fill />
        </Flex>
      )}
    </HStack>
  );
};

const DesktopNav = () => {
  return (
    <HStack spacing="32px" display={{ base: 'none', xl: 'flex' }}>
      {LINKS.map((item, index) =>
        !item.children ? (
          <Link href={item.href} passHref key={item.label}>
            <Text color="white" size="md" whiteSpace="nowrap">
              {item.label}
            </Text>
          </Link>
        ) : (
          <Menu
            key={index}
            placement="auto"
            maxW="max-content"
            TriggerButton={
              <HStack spacing="4px" cursor="pointer">
                <Text color="white" size="md" whiteSpace="nowrap">
                  {item.label}
                </Text>
                <Icon as={ChevronDownIcon} boxSize="20px" />
              </HStack>
            }
          >
            <Submenu
              items={item.children.submenu}
              menuImage={item.children.image}
              rowGap={item.children.rowGap}
              columns={item.children.columns}
            />
          </Menu>
        )
      )}
      <HStack spacing="8px">
        <Icon as={GlobeIcon} boxSize="24px" color="white" />
        <Text size="lg" color="white">
          EN
        </Text>
      </HStack>
    </HStack>
  );
};

export default DesktopNav;
