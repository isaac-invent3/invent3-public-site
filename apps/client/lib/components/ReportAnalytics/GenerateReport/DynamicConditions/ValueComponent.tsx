import { Select, TextInput } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { GenerateReportDetails } from '~/lib/interfaces/report.interfaces';
import { SystemContextTypeColumns } from '~/lib/interfaces/systemContextType.interfaces';
import baseQueryWithReauth from '~/lib/redux/baseQueryWithReauth';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface DynamicConditionValueProps {
  selectedContextTypeColumn?: SystemContextTypeColumns;
  index: number;
}

const DynamicConditionValue = (props: DynamicConditionValueProps) => {
  const { selectedContextTypeColumn, index } = props;
  const { setFieldValue, getFieldMeta } =
    useFormikContext<GenerateReportDetails>();
  const meta = getFieldMeta(`criterion[${index}].columnValue`);

  const [dropdownData, setDropdownData] = useState<any>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (
        selectedContextTypeColumn &&
        selectedContextTypeColumn.relativeListUrl
      ) {
        const data = await getDropdownData(
          selectedContextTypeColumn.relativeListUrl
        );

        setDropdownData(data);
      }
    };

    fetchData();
  }, [selectedContextTypeColumn?.relativeListUrl]);

  const getDropdownData = async (relativeUrl: string) => {
    if (!relativeUrl) return [];
    setIsFetching(true);

    const args = {
      url: relativeUrl,
      method: 'GET',
    };

    try {
      const result: any = await baseQueryWithReauth(
        args,
        {
          signal: new AbortController().signal,
          dispatch: () => {},
          getState: () => {},
          abort: () => {},
          extra: undefined,
          endpoint: '',
          type: 'query'
        },
        {}
      );

      if (result.error) return [];

      return result?.data.data.items;
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setIsFetching(false);
    }
  };

  function getRelativeUrlLabelValue(inputStr: string) {
    // Remove the leading '/' and trailing 's'
    const cleaned = inputStr.replace(/^\//, '').replace(/s$/, '');

    // Convert to camelCase for the label and value
    const label = `${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}Name`;
    const value = `${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}Id`;

    return { label, value };
  }

  if (selectedContextTypeColumn && selectedContextTypeColumn.relativeListUrl) {
    return (
      <Select
        title="Value"
        isLoading={isFetching}
        options={generateOptions(
          dropdownData || [],
          getRelativeUrlLabelValue(selectedContextTypeColumn?.relativeListUrl)
            .label,
          getRelativeUrlLabelValue(selectedContextTypeColumn?.relativeListUrl)
            .value
        )}
        showTitleAfterSelect={true}
        handleSelect={(option) => {
          setFieldValue(`criterion[${index}].columnValue`, option?.value);
        }}
        containerStyles={{
          flex: 1,
          border: '1px solid #D4D4D4',
          background: 'transparent',
          borderRadius: '8px',
          height: 'auto',
        }}
      />
    );
  }

  const numericTypes = ['int', 'datetime2', 'decimal'];

  return (
    <TextInput
      name="value"
      label="Value"
      type={
        numericTypes.includes(selectedContextTypeColumn?.dataType ?? '')
          ? 'number'
          : 'text'
      }
      errorMessage={meta.error}
      value={meta.value as string}
      isInvalid={meta.touched && !!meta.error}
      onChange={(e) =>
        setFieldValue(`criterion[${index}].columnValue`, e.target.value)
      }
      formControlWrapperStyles={{
        flex: 1,
        height: 'full',
        border: '1px solid #D4D4D4',
        borderRadius: '8px',
        background: 'transparent',
      }}
    />
  );
};

export default DynamicConditionValue;
