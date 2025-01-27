import { DrawerBody, DrawerHeader, VStack } from '@chakra-ui/react';
import { GenericDrawer, LoadingSpinner } from '@repo/ui/components';
import { useMemo } from 'react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import GenericErrorState from '../../UI/GenericErrorState';
import UserInfo from './UserInfo';
import UserTabs from './UserTabs';
import UserHeader from './Header';
import { setUser } from '~/lib/redux/slices/UserSlice';
import { useGetUserByIdQuery } from '~/lib/redux/services/user.services';

interface UserDetailProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserDetail = ({ isOpen, onClose }: UserDetailProps) => {
  const dispatch = useAppDispatch();
  const userSlug = SYSTEM_CONTEXT_DETAILS.USER.slug;
  const selectedUser = useAppSelector((state) => state.user.user);
  const { getSearchParam, clearSearchParamsAfter } = useCustomSearchParams();

  const userId = getSearchParam(userSlug)
    ? Number(getSearchParam(userSlug))
    : null;

  const { data: userData, isLoading } = useGetUserByIdQuery(
    { userId: userId! },
    {
      skip: !userId || Boolean(selectedUser),
    }
  );

  const closeDrawer = () => {
    clearSearchParamsAfter(userSlug, { removeSelf: true });
    onClose();
  };

  const user = useMemo(() => {
    if (userData?.data && !selectedUser) dispatch(setUser(userData?.data));

    return selectedUser || userData?.data;
  }, [userData, selectedUser]);

  const userNotFound = useMemo(() => {
    const notFound = !user && !isLoading;

    if (notFound) clearSearchParamsAfter(userSlug);

    return notFound;
  }, [user, isLoading]);

  return (
    <GenericDrawer
      isOpen={isOpen}
      onClose={closeDrawer}
      maxWidth="850px"
      customStyle={{ trapFocus: true }}
    >
      {userNotFound && (
        <GenericErrorState
          title="Error: User Not Found!"
          subtitle="The Selected User Could not be found"
        />
      )}

      {isLoading && !user && (
        <VStack width="full" minH="100vh" justifyContent="center">
          <LoadingSpinner />
        </VStack>
      )}

      {user && (
        <>
          <DrawerHeader px="32px" pt="16px" pb="29px">
            <UserHeader handleBack={closeDrawer} />
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack width="full" alignItems="flex-start" spacing="33px">
              <UserInfo />
              <UserTabs />
            </VStack>
          </DrawerBody>
        </>
      )}
    </GenericDrawer>
  );
};

export default UserDetail;
