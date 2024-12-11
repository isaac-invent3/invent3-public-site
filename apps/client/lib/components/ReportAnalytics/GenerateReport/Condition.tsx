import { Box, HStack, Link, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useState } from 'react';
import DropDown from '../../Dashboard/Common/DropDown';
import FormInputWrapper from '../../UI/Form/FormInputWrapper';
import OperatorDropdown from './OperationDropdown';

type Operator = 'Equals' | 'Less than' | 'Greater than';
type JOIN = 'AND' | 'OR';
type ConditionJoin = {
  join: JOIN;
  condition: number;
};

type Condition<T extends Operator = 'Equals'> = {
  column: string;
  operator: Operator;
  value: T extends 'Equals' ? string | number : number;
  conditionJoin: ConditionJoin | null;
};

const entryAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const exitAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const DynamicConditions = () => {
  const [conditions, setConditions] = useState<Condition[]>([
    { column: '', operator: 'Equals', value: '', conditionJoin: null },
  ]);

  

  const [removingIndex, setRemovingIndex] = useState<number | null>(null);

  // Add a new condition
  const addCondition = (index: number) => {
    const newCondition: Condition = {
      column: '',
      operator: 'Equals',
      value: '',
      conditionJoin: null,
    };

    if (index >= 0 && index < conditions.length) {
      const updatedConditions = [...conditions];
      const currentCondition = updatedConditions[index];

      if (!currentCondition) return;

      updatedConditions[index] = {
        column: currentCondition.column,
        operator: currentCondition.operator,
        value: currentCondition.value,
        conditionJoin: {
          condition: index + 1,
          join: 'AND',
        },
      };

      updatedConditions.splice(index + 1, 0, newCondition);

      console.log(conditions);

      return setConditions(updatedConditions);
    }

    const updatedConditions = [...conditions];
    updatedConditions.splice(index + 1, 0, newCondition);
    setConditions(updatedConditions);
  };

  // Remove a condition
  const removeCondition = (index: number) => {
    setRemovingIndex(index);

    setTimeout(() => {
      const updatedConditions = conditions.filter((_, i) => i !== index);
      setConditions(updatedConditions);
      setRemovingIndex(null);
    }, 300);
  };

  // Update a condition
  const updateCondition = (
    index: number,
    key: keyof Condition,
    value: string
  ) => {
    const updatedConditions = [...conditions];
    if (updatedConditions[index]) {
      updatedConditions[index] = {
        ...updatedConditions[index],
        [key]: value,
      };
      setConditions(updatedConditions);
    }
  };

  return (
    <FormInputWrapper
      sectionMaxWidth="118px"
      spacing="24px"
      description="Add name that users can likely search with"
      title="Condition"
      isRequired
    >
      {/* TODO: set Max Height */}
      <VStack
        transition="all 0.5s ease"
        align="stretch"
        width="full"
        spacing="16px"
        style={{
          marginLeft: conditions.length > 1 ? '40px' : '0px',
        }}
 
      >
        {conditions.map((condition, index) => (
          <Box
            position="relative"
            zIndex={1}
            animation={
              removingIndex === index
                ? `${exitAnimation} 0.3s forwards`
                : index > 1
                  ? `${entryAnimation} 0.3s ease-out`
                  : `${entryAnimation} 1s ease-out`
            }
          >
            {index + 1 < conditions.length && (
              <>
                <OperatorDropdown
                  position="absolute"
                  top="90%"
                  left="-9%"
                  zIndex={3}
                  bg="#F7F7F7"
                />
                <Box
                  position="absolute"
                  top="50%"
                  left="-5%"
                  transform="translateY(-5%)"
                  border="1px solid #BBBBBB"
                  borderRight="none"
                  borderRadius="8px"
                  height="80px"
                  width="80px"
                  zIndex={-1}
                />
              </>
            )}

            <HStack
              alignItems="center"
              spacing={4}
              justifyContent="space-between"
              zIndex={2}
              height="66px"
              bg="#F7F7F7"
              p="8px"
              borderRadius="8px"
            >
              <DropDown
                options={[
                  {
                    label: 'Testing',
                    value: '1',
                  },
                ]}
                label="Column"
                handleClick={(option) => console.log(option)}
                selectedOptions={null}
                labelStyles={{
                  border: '1px solid #D4D4D4',
                  background: 'transparent',
                  height: '50px',
                  borderRadius: '8px',
                }}
                containerStyles={{
                  flex: 1,
                  maxW: 'none',
                }}
                chevronStyles={{
                  boxSize: '24px',
                  color: '#42403D',
                }}
              />

              <DropDown
                options={[]}
                label="Column"
                handleClick={(option) => console.log(option)}
                selectedOptions={null}
                labelStyles={{
                  border: '1px solid #D4D4D4',
                  background: 'transparent',
                  height: '50px',
                  borderRadius: '8px',
                }}
                containerStyles={{
                  flex: 0.5,
                  maxW: 'none',
                }}
                chevronStyles={{
                  boxSize: '24px',
                  color: '#42403D',
                }}
              />
              <DropDown
                options={[]}
                label="Column"
                handleClick={(option) => console.log(option)}
                selectedOptions={null}
                labelStyles={{
                  border: '1px solid #D4D4D4',
                  background: 'transparent',
                  height: '50px',
                  borderRadius: '8px',
                }}
                containerStyles={{
                  flex: 1,
                  maxW: 'none',
                }}
                chevronStyles={{
                  boxSize: '24px',
                  color: '#42403D',
                }}
              />
              <VStack flex={0.5} alignItems="flex-start">
                <Link
                  color="#0366EF"
                  onClick={() => addCondition(index)}
                  fontSize="12px"
                  fontWeight={500}
                >
                  + Add Condition
                </Link>

                {index >= 1 && (
                  <Link
                    color="#F50000"
                    onClick={() => removeCondition(index)}
                    fontSize="12px"
                    fontWeight={500}
                  >
                    - Remove Condition
                  </Link>
                )}
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </FormInputWrapper>
  );
};

export default DynamicConditions;
