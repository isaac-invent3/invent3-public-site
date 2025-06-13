import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationMasterFormInterface } from '~/lib/interfaces/location.interfaces';

export interface SliceProps {
  locationFormInfo: LocationMasterFormInterface | null;
}

const initialState: SliceProps = {
  locationFormInfo: null,
};

export const LocationSlice = createSlice({
  name: 'locationReducer',
  initialState,
  reducers: {
    setLocation: (
      state,
      { payload }: PayloadAction<Partial<LocationMasterFormInterface>>
    ) => {
      state.locationFormInfo = {
        ...state.locationFormInfo,
        ...payload,
        countryId:
          payload.countryId !== undefined
            ? payload.countryId
            : (state.locationFormInfo?.countryId ?? null),
      } as LocationMasterFormInterface;
    },
  },
});

export const { setLocation } = LocationSlice.actions;

export default LocationSlice.reducer;
