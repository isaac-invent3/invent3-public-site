import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option } from '@repo/interfaces';
import { LocationMasterFormInterface } from '~/lib/interfaces/location.interfaces';

export interface SliceProps {
  locationFormInfo: LocationMasterFormInterface | null;
  localLocation: {
    country: Option | null;
    state: Option | null;
    lga: Option | null;
    facility: Option | null;
    building: Option | null;
    floor: Option | null;
    department: Option | null;
    room: Option | null;
    aisle: Option | null;
    shelf: Option | null;
  };
}

const initialState: SliceProps = {
  locationFormInfo: null,
  localLocation: {
    country: null,
    state: null,
    lga: null,
    facility: null,
    building: null,
    floor: null,
    department: null,
    room: null,
    aisle: null,
    shelf: null,
  },
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
    setLocalLocation: (
      state,
      { payload }: PayloadAction<Partial<SliceProps['localLocation']>>
    ) => {
      state.localLocation = {
        ...state.localLocation,
        ...payload,
      };
    },
    resetLocalLocation: (state) => {
      state.localLocation = {
        country: null,
        state: null,
        lga: null,
        facility: null,
        building: null,
        floor: null,
        department: null,
        room: null,
        aisle: null,
        shelf: null,
      };
    },
  },
});

export const { setLocation, setLocalLocation, resetLocalLocation } =
  LocationSlice.actions;

export default LocationSlice.reducer;
