import { FormLocation } from '~/lib/interfaces/location.interfaces';

const intialState = null;

const resetFormikFields = (
  key:
    | 'countryId'
    | 'stateId'
    | 'lgaId'
    | 'facilityId'
    | 'buildingId'
    | 'floorId'
    | 'roomId'
    | 'departmentId'
    | 'aisleId'
    | 'shelfId'
) => {
  switch (key) {
    case 'countryId':
      return {
        stateId: null,
        lgaId: null,
        facilityId: null,
        buildingId: null,
        floorId: null,
        departmentId: null,
        roomId: null,
        aisleId: null,
        shelfId: null,
      };
    case 'stateId':
      return {
        lgaId: null,
        facilityId: null,
        buildingId: null,
        floorId: null,
        departmentId: null,
        roomId: null,
        aisleId: null,
        shelfId: null,
      };
    case 'lgaId':
      return {
        facilityId: null,
        buildingId: null,
        floorId: null,
        departmentId: null,
        roomId: null,
        aisleId: null,
        shelfId: null,
      };
    case 'facilityId':
      return {
        buildingId: null,
        floorId: null,
        departmentId: null,
        roomId: null,
        aisleId: null,
        shelfId: null,
      };
    case 'buildingId':
      return {
        floorId: null,
        departmentId: null,
        roomId: null,
        aisleId: null,
        shelfId: null,
      };
    case 'floorId':
      return {
        departmentId: null,
        roomId: null,
        aisleId: null,
        shelfId: null,
      };
    case 'departmentId':
      return {
        roomId: null,
        aisleId: null,
        shelfId: null,
      };
    case 'roomId':
      return {
        aisleId: null,
        shelfId: null,
      };
    case 'aisleId':
      return {
        shelfId: null,
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
