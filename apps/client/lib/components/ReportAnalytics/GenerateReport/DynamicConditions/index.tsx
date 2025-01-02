import { Box, HStack, Link, VStack } from '@chakra-ui/react';
import { ErrorMessage, Select } from '@repo/ui/components';
import { FieldArray, Form, getIn, useFormikContext } from 'formik';
import { useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  GenerateReportCriterion,
  GenerateReportDetails,
} from '~/lib/interfaces/report.interfaces';
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

  const { setFieldValue, values, submitCount } =
    useFormikContext<GenerateReportDetails>();

  const { data, isLoading } = useGetSystemContextTypeColumnsInfoQuery(
    {
      systemContextTypeId: values.systemContextTypeId!,
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    { skip: !values.systemContextTypeId }
  );

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
          {({ insert, remove, form }) => {
            const getErrorMessage = (
              key: keyof GenerateReportCriterion,
              index: number
            ) => {
              const name = `criterion[${index}][${key}]`;
              const error = getIn(form.errors, name);

              return {
                status: submitCount > 0 && error,
                message: error,
              };
            };
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
                      <VStack
                        spacing="4px"
                        alignItems="flex-start"
                        flex={1}
                        position="relative"
                      >
                        <Select
                          title="Column"
                          isLoading={isLoading}
                          options={selectedColumns}
                          showTitleAfterSelect={true}
                          selectedOption={getSelectedColumnOption(index)}
                          isInvalid={
                            getErrorMessage('columnName', index).status
                          }
                          handleSelect={(option) => {
                            setFieldValue(
                              `criterion[${index}].columnName`,
                              option?.value
                            );
                          }}
                          containerStyles={{
                            borderRadius: '8px',
                            height: 'auto',
                            alignItems: 'center',
                            border: '1px solid #D4D4D4',
                            background: 'transparent',
                          }}
                        />

                        {getErrorMessage('columnName', index).status && (
                          <ErrorMessage
                            position="absolute"
                            left={0}
                            bottom={-5}
                          >
                            {getErrorMessage('columnName', index).message}
                          </ErrorMessage>
                        )}
                      </VStack>
                      <VStack
                        spacing="4px"
                        alignItems="flex-start"
                        width="155px"
                        position="relative"
                      >
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
                          isInvalid={getErrorMessage('operation', index).status}
                          handleSelect={(option) => {
                            setFieldValue(
                              `criterion[${index}].operation`,
                              option?.value
                            );
                          }}
                          containerStyles={{
                            border: '1px solid #D4D4D4',
                            background: 'transparent',
                            borderRadius: '8px',
                            height: 'auto',
                          }}
                        />

                        {getErrorMessage('operation', index).status && (
                          <ErrorMessage
                            position="absolute"
                            left={0}
                            bottom={-5}
                          >
                            {getErrorMessage('operation', index).message}
                          </ErrorMessage>
                        )}
                      </VStack>
                      <DynamicConditionValue
                        selectedContextTypeColumn={getSelectedColumnData(index)}
                        index={index}
                      />

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
