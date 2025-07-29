import { NotificationTabType } from '~/lib/interfaces/notification.interfaces';
import { Archived } from './Archived';
import { Alerts } from './Alerts';
import { UnreadNotifications } from './UnreadNotifications';
import { AllNotifications } from './AllNotifications';

export const NotifcationTabs = ({
  activeTab,
  handleClose,
}: {
  activeTab: NotificationTabType;
  handleClose?: () => void;
}) => {
  return (
    <>
      {activeTab === 'All' && <AllNotifications handleClose={handleClose} />}
      {activeTab === 'Unread' && (
        <UnreadNotifications handleClose={handleClose} />
      )}
      {activeTab === 'Alerts' && <Alerts handleClose={handleClose} />}
      {activeTab === 'Archived' && <Archived handleClose={handleClose} />}
    </>
  );
};
