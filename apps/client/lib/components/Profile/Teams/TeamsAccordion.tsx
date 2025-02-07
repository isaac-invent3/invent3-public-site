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
import { UserGroup } from '~/lib/interfaces/user.interfaces';
import { TeamIconOne } from '../../CustomIcons';
import TeamTable from './TeamTable';

interface TeamsAccordionProps {
  userGroups: UserGroup[];
}
const TeamsAccordion = ({ userGroups }: TeamsAccordionProps) => {
  return (
    <Accordion width="full" allowMultiple overflow="auto">
      {userGroups.map((group, index) => (
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
                    {group.groupName}
                  </Text>
                </HStack>

                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={0}>
                {isExpanded && <TeamTable groupId={group.groupId} />}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TeamsAccordion;
