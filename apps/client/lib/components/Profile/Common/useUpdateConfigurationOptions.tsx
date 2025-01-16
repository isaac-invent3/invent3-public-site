import { Button } from '@repo/ui/components';
import _ from 'lodash';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useUpdateUserConfigurationOptionsMutation } from '~/lib/redux/services/user.services';
import { setInitialOptions } from '~/lib/redux/slices/UserSlice';
import { FORM_ENUM } from '~/lib/utils/constants';

const useUpdateConfigurationOptions = () => {
  const { handleSubmit } = useCustomMutation();
  const dispatch = useAppDispatch();
  const [updateOptions, { isLoading }] =
    useUpdateUserConfigurationOptionsMutation({});
  const [localIsLoading, setLocalIsLoading] = useState(false);
  const { formConfigurationOptions, userConfigurationOptions } = useAppSelector(
    (state) => state.user
  );

  // Find deleted configuration options (in user but not in form)
  const deletedConfigurationOptions = _.differenceBy(
    userConfigurationOptions,
    formConfigurationOptions,
    'systemConfigurationOptionId'
  );

  // Find newly added configuration options (in form but not in user)
  const newlyAddedConfigurationOptions = _.differenceBy(
    formConfigurationOptions,
    userConfigurationOptions,
    'systemConfigurationOptionId'
  );

  // Remove deleted options from userConfigurationOptions
  const updatedUserConfigurationOptions = _.differenceBy(
    userConfigurationOptions,
    deletedConfigurationOptions,
    'systemConfigurationOptionId'
  );

  // Add newly added options
  const newUserConfigurationGroup = _.concat(
    updatedUserConfigurationOptions,
    newlyAddedConfigurationOptions
  );

  const handleUpdateOptions = async () => {
    const session = await getSession();
    const user = session?.user;
    const userInfo = {
      userId: user?.userId!,
      changeInitiatedBy: user?.username!,
    };
    const deletedConfigurationOptionsPayload = deletedConfigurationOptions.map(
      (item) => ({ ...item, ...userInfo, actionType: FORM_ENUM.delete })
    );

    const newlyAddedConfigurationOptionsPayload =
      newlyAddedConfigurationOptions.map((item) => ({
        ...item,
        ...userInfo,
        actionType: FORM_ENUM.add,
      }));

    setLocalIsLoading(true);
    const response = await handleSubmit(
      updateOptions,
      [
        ...newlyAddedConfigurationOptionsPayload,
        ...deletedConfigurationOptionsPayload,
      ],
      'Changes saved successfully'
    );
    if (response?.data) {
      //Updates the initial options
      dispatch(setInitialOptions(newUserConfigurationGroup));
    }
    setLocalIsLoading(false);
  };

  const submitButton = (
    <Button
      handleClick={handleUpdateOptions}
      isLoading={isLoading}
      loadingText="Saving..."
      customStyles={{ width: 'max-content' }}
    >
      Save Changes
    </Button>
  );

  return {
    handleUpdateOptions,
    isLoading: isLoading || localIsLoading,
    submitButton,
  };
};

export default useUpdateConfigurationOptions;
