import { FormLocation } from '~/lib/interfaces/asset.interfaces';

const intialState = {
  label: undefined,
  value: undefined,
};

const resetFormikFields = (
  key:
    | 'facilityId'
    | 'buildingId'
    | 'floorId'
    | 'roomId'
    | 'departmentId'
    | 'aisleId'
    | 'shelfId'
) => {
  switch (key) {
    case 'facilityId':
      return {
        buildingId: undefined,
        floorId: undefined,
        departmentId: undefined,
        roomId: undefined,
        aisleId: undefined,
        shelfId: undefined,
      };
    case 'buildingId':
      return {
        floorId: undefined,
        departmentId: undefined,
        roomId: undefined,
        aisleId: undefined,
        shelfId: undefined,
      };
    case 'floorId':
      return {
        departmentId: undefined,
        roomId: undefined,
        aisleId: undefined,
        shelfId: undefined,
      };
    case 'departmentId':
      return {
        roomId: undefined,
        aisleId: undefined,
        shelfId: undefined,
      };
    case 'roomId':
      return {
        aisleId: undefined,
        shelfId: undefined,
      };
    case 'aisleId':
      return {
        shelfId: undefined,
      };
    default:
      return {};
  }
};

const resetDependentFields = (key: keyof FormLocation) => {
  switch (key) {
    case 'facility':
      return {
        building: intialState,
        floor: intialState,
        department: intialState,
        room: intialState,
        aisle: intialState,
        shelf: intialState,
      };
    case 'building':
      return {
        floor: intialState,
        department: intialState,
        room: intialState,
        aisle: intialState,
        shelf: intialState,
      };
    case 'floor':
      return {
        department: intialState,
        room: intialState,
        aisle: intialState,
        shelf: intialState,
      };
    case 'department':
      return {
        room: intialState,
        aisle: intialState,
        shelf: intialState,
      };
    case 'room':
      return {
        aisle: intialState,
        shelf: intialState,
      };
    case 'aisle':
      return {
        shelf: intialState,
      };
    default:
      return {};
  }
};

export { resetDependentFields, resetFormikFields };
