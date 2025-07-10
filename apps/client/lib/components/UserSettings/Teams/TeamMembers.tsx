import React from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import TeamsAccordion from './TeamsAccordion';
import { Skeleton } from '@chakra-ui/react';
import { UserGroup } from '~/lib/interfaces/user.interfaces';

interface TeamMembersProps {
  isLoading: boolean;
  data: UserGroup[];
}
const TeamMembers = ({ isLoading, data }: TeamMembersProps) => {
  return (
    <SectionWrapper
      title="Team Members"
      subtitle="See the list of members in your team."
      sectionInfoWidth="221px"
      spacing={{ base: '16px', lg: '16px' }}
      direction={{ base: 'column', md: 'row' }}
      sectionInfoStyle={{ maxW: { base: 'full', md: '221px' } }}
    >
      {isLoading && <Skeleton width="full" height="250px" />}
      {!isLoading && data && <TeamsAccordion userGroups={data} />}
    </SectionWrapper>
  );
};

export default TeamMembers;
