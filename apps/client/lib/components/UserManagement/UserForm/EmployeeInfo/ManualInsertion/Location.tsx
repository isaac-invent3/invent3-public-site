import { SimpleGrid, VStack } from '@chakra-ui/react';
import { FormInputWrapper } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import CountrySelect from '~/lib/components/Common/SelectComponents/Location/CountrySelect';
import LGASelect from '~/lib/components/Common/SelectComponents/Location/LGASelect';
import StateSelect from '~/lib/components/Common/SelectComponents/Location/StateSelect';
import { UserFormDetails } from '~/lib/interfaces/user.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';

const Location = () => {
  const { setFieldValue, values } = useFormikContext<UserFormDetails>();
  const { countryName, stateName, cityName } = useAppSelector(
    (state) => state.user.userForm
  );
  const dispatch = useAppDispatch();
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      customSpacing="65px"
      description="User's Location"
      title="Location"
    >
      <VStack width="full" spacing="8px">
        <SimpleGrid width="full" gap="16px" columns={{ base: 2, md: 3 }}>
          <CountrySelect
            handleSelect={(option) => {
              setFieldValue('countryId', option.value);
              dispatch(updateUserForm({ countryName: option.label }));
            }}
            defaultInputValue={countryName ?? undefined}
          />
          <StateSelect
            countryId={values.countryId}
            handleSelect={(option) => {
              setFieldValue('stateId', option.value);
              dispatch(updateUserForm({ stateName: option.label }));
            }}
            defaultInputValue={stateName ?? undefined}
          />
          <LGASelect
            stateId={values.stateId}
            name="cityId"
            handleSelect={(option) => {
              setFieldValue('cityId', option.value);
              dispatch(updateUserForm({ cityName: option.label }));
            }}
            type="specificById"
            defaultInputValue={cityName ?? undefined}
          />
        </SimpleGrid>
      </VStack>
    </FormInputWrapper>
  );
};

export default Location;
