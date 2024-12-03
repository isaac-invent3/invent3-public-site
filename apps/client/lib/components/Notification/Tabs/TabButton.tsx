import { Text } from '@chakra-ui/react';
import React from 'react';

interface TabButtonProps {
  tab: { label: string; count: number };
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
const TabButton = (props: TabButtonProps) => {
  const { tab, activeTab, setActiveTab } = props;
  return (
    <Text
      role="button"
      color={tab.label === activeTab ? 'primary.500' : 'neutral.600'}
      pb="9px"
      borderBottom={tab.label === activeTab ? '2px solid #0E2642' : 'none'}
      onClick={() => setActiveTab(tab.label)}
      fontSize="9.33px"
      lineHeight="11.09px"
    >
      {tab.label}
      {tab.count > 0 ? `(${tab.count})` : ''}
    </Text>
  );
};

export default TabButton;
