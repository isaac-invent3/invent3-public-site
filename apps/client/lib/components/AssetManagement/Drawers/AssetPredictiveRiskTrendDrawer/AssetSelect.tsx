import { VStack } from '@chakra-ui/react';
import { ErrorMessage, FilterDropDown } from '@repo/ui/components';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useGetAllAssetQuery } from '~/lib/redux/services/asset/general.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface AssetSelectProps {
  label?: string;
  hasBorder?: boolean;
}

const AssetSelect = ({ label, hasBorder }: AssetSelectProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [options, setOptions] = useState<Option[]>([]);
  const { data, isLoading, isFetching } = useGetAllAssetQuery({
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const [field, meta, helpers] = useField<number[]>('assets');

  useEffect(() => {
    if (data?.data?.items) {
      const newAssets = generateOptions(
        data.data.items,
        'assetName',
        'assetId'
      );
      // Avoid duplicates (infinite scroll safety)
      setOptions((prev) => {
        const unique = [
          ...prev,
          ...newAssets.filter(
            (item) => !prev.some((opt) => opt.value === item.value)
          ),
        ];
        return unique;
      });
    }
  }, [data]);

  const handleSelect = (option: Option) => {
    const alreadySelected = field.value?.some((item) => item === option.value);
    if (alreadySelected) {
      // remove if already selected
      helpers.setValue(field.value.filter((item) => item !== option.value));
    } else {
      if (meta.value.length < 5) {
        // add new one
        helpers.setValue([...meta.value, +option.value]);
      }
    }
  };

  return (
    <VStack width="full" alignItems="flex-start">
      <FilterDropDown
        label={label ?? 'Assets:'}
        options={options}
        selectedOptions={meta.value.map((item) => ({
          label: item.toString(),
          value: item,
        }))}
        handleClick={handleSelect}
        hasMoreOptions={data?.data?.hasNextPage}
        loadMoreOptions={() => setPageNumber((prev) => prev + 1)}
        isLoading={isLoading || isFetching}
        containerStyles={{
          minW: 'full',
        }}
        labelStyles={{
          width: 'full',
          backgroundColor: meta?.error ? '#FFDCDC' : '#F2F1F1',
          border: meta?.error ? '1px solid #F50000' : 'none',
          height: '45px',
        }}
        nestedLabelStyles={{
          width: 'full',
          justifyContent: 'space-between',
        }}
      />
      {meta?.touched && meta?.error && (
        <ErrorMessage>{meta.error}</ErrorMessage>
      )}
    </VStack>
  );
};

export default AssetSelect;
