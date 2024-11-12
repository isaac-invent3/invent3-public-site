import { Collapse, Icon, Td, Tr, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '~/lib/components/CustomIcons';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import Details from './Details';

interface TemplateRowProps {
  plan: MaintenancePlan;
}

const TemplateRow = (props: TemplateRowProps) => {
  const { plan } = props;
  const { onToggle, isOpen } = useDisclosure();

  const info = [
    plan?.maintenancePlanId ?? 'N/A',
    plan?.planName ?? 'N/A',
    plan?.activeSchedules ?? 'N/A',
    plan?.openTasks ?? 'N/A',
    plan?.owner ?? 'N/A',
    plan?.dateCreated
      ? dateFormatter(plan?.dateCreated, 'DD / MM / YYYY')
      : 'N/A',
  ];

  return (
    <>
      <Tr cursor="pointer" onClick={onToggle}>
        {info.map((item, index) => (
          <Td
            key={index}
            borderColor="neutral.300"
            py="16px"
            pl="16px"
            fontSize="12px"
            fontWeight={isOpen ? 800 : 500}
            lineHeight="14.26px"
            color="black"
            transition="all 0.1s ease-in-out"
            bgColor={isOpen ? 'neutral.200' : 'white'}
          >
            {item}
          </Td>
        ))}
        <Td
          borderColor="neutral.300"
          bgColor={isOpen ? 'neutral.200' : 'white'}
          py="16px"
          px={0}
        >
          <Icon
            as={isOpen ? ChevronUpIcon : ChevronDownIcon}
            boxSize="16px"
            color="neutral.800"
          />
        </Td>
      </Tr>
      {isOpen && (
        <Tr>
          <Td colSpan={info.length + 1} p={0} border="none">
            <Collapse in={isOpen} animateOpacity>
              <Details data={plan} />
            </Collapse>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default TemplateRow;
