import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FieldArray, useFormikContext } from 'formik';
import React, { useState } from 'react';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import { BMSData } from '~/lib/interfaces/settings.interfaces';
import { newBudgetExpenditure } from '../helpers';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllAssetCategoryQuery,
  useSearchCategoriesMutation,
} from '~/lib/redux/services/asset/category.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { FormTextInput } from '@repo/ui/components';

interface BudgetExpenditureProps {
  buildingSettingsIndex: number;
}
const BudgetExpenditure = (props: BudgetExpenditureProps) => {
  const { buildingSettingsIndex } = props;
  const { values, setFieldValue } = useFormikContext<BMSData>();
  const [searchAsset] = useSearchCategoriesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAssetCategoryQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });

  return (
    <SectionWrapper
      title="Budget Expenditure on Energy"
      subtitle="Set the budget amount for mainatenance for each asset category"
      spacing={{ base: '8px', sm: '16px', lg: '96px' }}
      direction={{ base: 'column', lg: 'row' }}
      sectionInfoStyle={{
        width: { lg: '246px' },
      }}
      subtitleStyle={{ width: '246px' }}
      width="full"
    >
      <FieldArray
        name={`bmsBuildingSettingsModel.${buildingSettingsIndex}.budgetExpenditureModels`}
      >
        {({ insert, remove, form, push }) => {
          return (
            <VStack width="full" spacing="16px" alignItems="flex-end">
              {values?.bmsBuildingSettingsModel?.[
                buildingSettingsIndex
              ]?.budgetExpenditureModels.map((item, index) => (
                <SimpleGrid
                  width="full"
                  columns={3}
                  key={index}
                  gap="16px"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GenericAsyncSelect
                    selectName={`bmsBuildingSettingsModel.${buildingSettingsIndex}.budgetExpenditureModels.${index}.value.contextId`}
                    selectTitle="Asset Category"
                    data={data}
                    labelKey="categoryName"
                    valueKey="categoryId"
                    mutationFn={searchAsset}
                    isLoading={isLoading}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    handleSelect={(option) => {
                      setFieldValue(
                        `bmsBuildingSettingsModel.${buildingSettingsIndex}.budgetExpenditureModels.${index}.value.contextId`,
                        option?.value
                      );
                    }}
                    selectStyles={{ backgroundColor: '#E6E6E6' }}
                  />
                  <FormTextInput
                    name={`bmsBuildingSettingsModel.${buildingSettingsIndex}.budgetExpenditureModels.${index}.value.kWhTarget`}
                    type="number"
                    label="KWh Target"
                    placeholder="kWh target eg. 3500kWh"
                    customStyle={{ bgColor: '#E6E6E6' }}
                  />
                  <FormTextInput
                    name="budgetCost"
                    type="number"
                    label="Budget Cost"
                    placeholder="Budget Cost"
                    customStyle={{ bgColor: '#E6E6E6' }}
                  />
                </SimpleGrid>
              ))}

              <Text
                size="md"
                color="blue.500"
                fontWeight={700}
                cursor="pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  push(newBudgetExpenditure);
                }}
              >
                Add Another Asset Category
              </Text>
            </VStack>
          );
        }}
      </FieldArray>
    </SectionWrapper>
  );
};

export default BudgetExpenditure;
