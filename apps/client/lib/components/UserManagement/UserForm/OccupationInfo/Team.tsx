import { useDisclosure, VStack } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import { FormAddButton, FormInputWrapper } from '@repo/ui/components';
import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useAppDispatch } from '~/lib/redux/hooks';
import {
  useGetAllTeamsQuery,
  useSearchTeamsMutation,
} from '~/lib/redux/services/team.services';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import TeamModal from '../../Modals/TeamModal';

const Team = () => {
  const [searchTeam] = useSearchTeamsMutation({});
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllTeamsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <FormInputWrapper
        sectionMaxWidth="141px"
        customSpacing="36px"
        description="Select Team"
        title="Team"
      >
        <VStack width="full" spacing="4px" alignItems="flex-end">
          <GenericAsyncSelect
            selectName="teamIds"
            selectTitle="Team"
            data={data}
            labelKey="name"
            valueKey="teamId"
            mutationFn={searchTeam}
            isLoading={isLoading || isFetching}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            fetchKey="team"
            handleSelect={(option) => {
              dispatch(
                updateUserForm({
                  teamNames: (option as unknown as Option[]).map(
                    (item) => item.label
                  ),
                })
              );
            }}
            isMultiSelect
          />
          <FormAddButton handleClick={onOpen}>Add New Team</FormAddButton>
        </VStack>
      </FormInputWrapper>
      <TeamModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Team;
