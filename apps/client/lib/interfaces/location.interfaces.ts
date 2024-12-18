interface LocationOption {
  label: string | null;
  value: number | null;
}

interface FormLocation {
  country: LocationOption;
  state: LocationOption;
  lga: LocationOption;
  facility: LocationOption;
  building: LocationOption;
  floor: LocationOption;
  department: LocationOption;
  room: LocationOption;
  aisle: LocationOption;
  shelf: LocationOption;
}

interface LocationIds {
  countryId: number | null;
  stateId: number | null;
  lgaId: number | null;
  facilityId: number | null;
  buildingId: number | null;
  floorId: number | null;
  departmentId: number | null;
  roomId: number | null;
  aisleId: number | null;
  shelfId: number | null;
}

interface State {
  isNew: boolean;
  createdDate: string; // ISO 8601 date string
  createdBy: string;
  lastModifiedDate: string; // ISO 8601 date string
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string; // ISO 8601 date string
  deletedBy: string;
  guid: string; // UUID
  stateId: number;
  stateName: string;
  countryId: number;
}

export type { State, FormLocation, LocationIds };
