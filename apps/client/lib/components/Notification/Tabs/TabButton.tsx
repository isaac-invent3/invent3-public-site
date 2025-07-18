import { Text } from '@chakra-ui/react';
import { NotificationTabType } from '~/lib/interfaces/notification.interfaces';

interface TabButtonProps {
  tab: { label: NotificationTabType; count: number };
  activeTab: NotificationTabType;
  setActiveTab: React.Dispatch<React.SetStateAction<NotificationTabType>>;
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
      size="base"
    >
      {tab.label}
      {tab.count > 0 ? `(${tab.count})` : ''}
    </Text>
  );
};

export default TabButton;
