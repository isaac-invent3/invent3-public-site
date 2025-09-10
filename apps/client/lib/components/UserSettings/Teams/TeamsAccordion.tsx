import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Text,
  Icon,
} from '@chakra-ui/react';
import { TeamIconOne } from '../../CustomIcons';
import TeamTable from './TeamTable';
import { UserTeam } from '~/lib/interfaces/team.interfaces';

interface TeamsAccordionProps {
  userTeams: UserTeam[];
}
const TeamsAccordion = ({ userTeams }: TeamsAccordionProps) => {
  return (
    <Accordion width="full" allowMultiple overflow="auto">
      {userTeams.map((team, index) => (
        <AccordionItem key={index} border="none">
          {({ isExpanded }) => (
            <>
              <AccordionButton
                bgColor="#B4BFCABF"
                p={0}
                m={0}
                py="14.5px"
                px="16px"
                justifyContent="space-between"
                borderTopWidth="1px"
                borderColor="grey"
                _hover={{ bgColor: 'none' }}
              >
                <HStack spacing="8px">
                  <Icon as={TeamIconOne} boxSize="16px" color="#374957" />
                  <Text
                    color="black"
                    size="lg"
                    fontWeight={isExpanded ? 700 : 500}
                  >
                    {team.name}
                  </Text>
                </HStack>

                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={0}>
                {isExpanded && <TeamTable teamId={team.teamId} />}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TeamsAccordion;
