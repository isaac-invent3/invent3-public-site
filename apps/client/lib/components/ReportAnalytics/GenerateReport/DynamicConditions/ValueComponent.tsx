import { Select, TextInput } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import { GenerateReportDetails } from '~/lib/interfaces/report.interfaces';
import { SystemContextTypeColumns } from '~/lib/interfaces/systemContextType.interfaces';
import baseQueryWithReauth from '~/lib/redux/baseQueryWithReauth';

interface DynamicConditionValueProps {
  selectedContextTypeColumn?: SystemContextTypeColumns;
  index: number;
}

const DynamicConditionValue = (props: DynamicConditionValueProps) => {
  const { selectedContextTypeColumn, index } = props;
  const { setFieldValue, getFieldMeta } =
    useFormikContext<GenerateReportDetails>();

  const meta = getFieldMeta(`criterion[${index}].columnValue`);

  if (selectedContextTypeColumn && !selectedContextTypeColumn.relativeListUrl) {
    const numericTypes = ['int', 'datetime2', 'decimal'];

    return (
      <TextInput
        name="value"
        label="Value"
        type={
          numericTypes.includes(selectedContextTypeColumn?.dataType)
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
  }

  const fetchData = async () => {
    const args = {
      url: selectedContextTypeColumn?.relativeListUrl,
      method: 'GET',
    };

    try {
      const result = await baseQueryWithReauth(args, {}, {}); 
      if (result.error) {
        console.error('API call failed:', result.error);
        return;
      }
      console.log('API call succeeded:', result.data);
      // Handle the result.data as needed
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  fetchData();

  return (
    <Select
      title="Value"
      options={[]}
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
};

export default DynamicConditionValue;
