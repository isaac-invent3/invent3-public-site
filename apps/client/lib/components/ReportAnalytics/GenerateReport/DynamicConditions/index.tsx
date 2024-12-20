import { Box, HStack, Link, VStack } from '@chakra-ui/react';
import { Select } from '@repo/ui/components';
import { FieldArray, Form, useFormikContext } from 'formik';
import { useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { GenerateReportDetails } from '~/lib/interfaces/report.interfaces';
import { SystemContextTypeColumns } from '~/lib/interfaces/systemContextType.interfaces';
import { useGetSystemContextTypeColumnsInfoQuery } from '~/lib/redux/services/systemcontexttypes.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import OperatorDropdown from '../OperationDropdown';
import {
  entryAnimation,
  exitAnimation,
  getRelationalOperators,
  getSelectedOperatorOption,
  newCriterion,
} from './helpers';
import DynamicConditionValue from './ValueComponent';

const DynamicConditions = () => {
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);

  const { setFieldValue, values } = useFormikContext<GenerateReportDetails>();

  const { data, isLoading } = useGetSystemContextTypeColumnsInfoQuery({
    systemContextTypeId: values.contextTypeId!,
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const selectedColumns = values.contextTypeColumns;

  const getSelectedColumnOption = (index: number): Option | undefined => {
    return selectedColumns.find(
      (item) => item.value === values.criterion[index]?.columnName
    );
  };

  const getSelectedColumnData = (
    index: number
  ): SystemContextTypeColumns | undefined => {
    return data?.data.items.find(
      (item) => item.columnName === values.criterion[index]?.columnName
    );
  };

  return (
    <VStack
      transition="all 0.5s ease"
      align="stretch"
      width="full"
      style={{
        marginLeft: values.criterion.length > 1 ? '40px' : '0px',
      }}
    >
      <Form>
        <FieldArray name="criterion">
          {({ insert, remove }) => {
            return (
              <VStack transition="all 0.5s ease" align="stretch" spacing="24px">
                {values.criterion.map((criterion, index) => (
                  <Box
                    position="relative"
                    animation={
                      removingIndex === index
                        ? `${exitAnimation} 0.3s forwards`
                        : index > 1
                          ? `${entryAnimation} 0.3s ease-out`
                          : `${entryAnimation} 1s ease-out`
                    }
                  >
                    {index + 1 < values.criterion.length && (
                      <>
                        <OperatorDropdown
                          position="absolute"
                          top="90%"
                          left="-9%"
                          zIndex={3}
                          bg="#F7F7F7"
                          selectedValue={values.criterion[index]?.join}
                          handleClick={(option) => {
                            setFieldValue(
                              `criterion[${index}].join`,
                              option?.value
                            );
                          }}
                        />
                        <Box
                          position="absolute"
                          top="50%"
                          left="-5%"
                          transform="translateY(-5%)"
                          border="1px solid #BBBBBB"
                          borderRight="none"
                          borderTopLeftRadius="8px"
                          borderBottomLeftRadius="8px"
                          height="80px"
                          width="40px"
                        />
                      </>
                    )}

                    <HStack
                      alignItems="center"
                      spacing={4}
                      justifyContent="space-between"
                      height="66px"
                      bg="#F7F7F7"
                      p="8px"
                      borderRadius="8px"
                    >
                      <Select
                        title="Column"
                        isLoading={isLoading}
                        options={selectedColumns}
                        showTitleAfterSelect={true}
                        selectedOption={getSelectedColumnOption(index)}
                        handleSelect={(option) => {
                          setFieldValue(
                            `criterion[${index}].columnName`,
                            option?.value
                          );
                        }}
                        containerStyles={{
                          flex: 1,
                          border: '1px solid #D4D4D4',
                          background: 'transparent',
                          borderRadius: '8px',
                          height: 'auto',
                          alignItems: 'center',
                        }}
                      />

                      <Select
                        title="Operator"
                        showTitleAfterSelect={true}
                        options={getRelationalOperators(
                          getSelectedColumnData(index)?.dataType
                        )}
                        selectedOption={getSelectedOperatorOption(
                          getSelectedColumnData(index)?.dataType,
                          values.criterion[index]?.operation
                        )}
                        handleSelect={(option) => {
                          setFieldValue(
                            `criterion[${index}].operation`,
                            option?.value
                          );
                        }}
                        containerStyles={{
                          width: '155px',
                          border: '1px solid #D4D4D4',
                          background: 'transparent',
                          borderRadius: '8px',
                          height: 'auto',
                        }}
                      />
                      <DynamicConditionValue
                        selectedContextTypeColumn={getSelectedColumnData(
                          index
                        )}
                        index={index}
                      />

                      {/* <Select
                        title="Value"
                        options={[]}
                        isLoading={isLoading}
                        showTitleAfterSelect={true}
                        handleSelect={(option) => {
                          setFieldValue(
                            `criterion[${index}].columnValue`,
                            option?.value
                          );
                        }}
                        containerStyles={{
                          flex: 1,
                          border: '1px solid #D4D4D4',
                          background: 'transparent',
                          borderRadius: '8px',
                          height: 'auto',
                        }}
                      /> */}

                      <VStack flex={0.5} alignItems="flex-start">
                        <Link
                          color="#0366EF"
                          onClick={() => insert(index + 1, newCriterion)}
                          fontSize="12px"
                          fontWeight={500}
                        >
                          + Add Condition
                        </Link>

                        {index >= 1 && (
                          <Link
                            color="#F50000"
                            onClick={() => {
                              setRemovingIndex(index);

                              setTimeout(() => {
                                remove(index);
                                setRemovingIndex(null);
                              }, 300);
                            }}
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
            );
          }}
        </FieldArray>
      </Form>
    </VStack>
  );
};

export default DynamicConditions;
