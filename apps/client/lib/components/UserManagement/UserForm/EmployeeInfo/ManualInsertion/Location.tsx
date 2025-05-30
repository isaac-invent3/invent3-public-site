import { SimpleGrid, VStack } from '@chakra-ui/react';
import { FormInputWrapper } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import CountrySelect from '~/lib/components/Common/SelectComponents/Location/CountrySelect';
import LGASelect from '~/lib/components/Common/SelectComponents/Location/LGASelect';
import StateSelect from '~/lib/components/Common/SelectComponents/Location/StateSelect';
import { UserFormDetails } from '~/lib/interfaces/user.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';

const Location = () => {
  const { setFieldValue, values } = useFormikContext<UserFormDetails>();
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
          />
          <StateSelect
            countryId={values.countryId}
            handleSelect={(option) => {
              setFieldValue('stateId', option.value);
              dispatch(updateUserForm({ stateName: option.label }));
            }}
          />
          <LGASelect
            stateId={values.stateId}
            name="cityId"
            handleSelect={(option) => {
              setFieldValue('cityId', option.value);
              dispatch(updateUserForm({ cityName: option.label }));
            }}
            type="specificById"
          />
        </SimpleGrid>
      </VStack>
    </FormInputWrapper>
  );
};

export default Location;
