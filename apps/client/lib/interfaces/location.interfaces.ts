import { BaseEntity, QueryParams } from '@repo/interfaces';

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

interface State extends BaseEntity {
  stateId: number;
  stateName: string;
  countryId: number;
}

interface Aisle extends BaseEntity {
  aisleId: number;
  aisleName: string;
  aisleRef: string;
  roomId: number;
}

interface Country extends BaseEntity {
  countryId: number;
  countryName: string;
}

interface LGA extends BaseEntity {
  lgaId: number;
  lgaName: string;
  stateId: number;
}

interface Facility extends BaseEntity {
  facilityId: number;
  lgaId: number;
  facilityName: string;
  facilityRef: string;
  address: string;
  longitude: number;
  latitude: number;
}

interface Floor extends BaseEntity {
  floorId: number;
  buildingId: number;
  floorName: string;
  floorRef: string;
}

interface Building extends BaseEntity {
  buildingId: number;
  buildingName: string;
  facilityId: number;
  buildingRef: string;
  address: string;
  longitude: number;
  latitude: number;
}

interface Department extends BaseEntity {
  departmentId: number;
  departmentName: string;
  departmentRef: string;
  floorId: number;
}

interface Room extends BaseEntity {
  roomId: number;
  roomName: string;
  roomRef: string;
  departmentId: number;
}

interface Shelf extends BaseEntity {
  shelfId: number;
  shelfName: string;
  shelfRef: string;
  aisleId: number;
}

interface LocationQueryParams extends QueryParams {
  id: number | undefined;
  includeDeleted?: boolean;
}

interface BaseLocationQuery {
  address: string | undefined;
  longitude?: number;
  latitude?: number;
  createdBy: string | undefined;
}

interface GroupByState {
  stateId: number;
  stateName: string;
  totalBranchCount: number;
}

interface ShelfModel {
  shelfName: string;
  shelfRef: string | null;
}

interface AisleModel {
  aisleName: string;
  aisleRef: string | null;
  shelfModel: ShelfModel[];
}

interface RoomModel {
  roomName: string;
  roomRef: string | null;
  aisleModel: AisleModel[];
}

interface DepartmentModel {
  departmentName: string;
  departmentRef: string | null;
  roomModel: RoomModel[];
}

interface FloorModel {
  floorName: string;
  floorRef: string | null;
  departmentModel: DepartmentModel[];
}

interface BuildingModel {
  buildingName: string;
  buildingRef: string | null;
  floorModel: FloorModel[];
}

interface LocationMasterFormInterface {
  countryId: number | null;
  stateId: number | null;
  lgaId: number | null;
  facilityId: number | null;
  buildingModel: BuildingModel[];
}

export type {
  State,
  FormLocation,
  Aisle,
  Country,
  LGA,
  Facility,
  Floor,
  Building,
  Department,
  Room,
  Shelf,
  LocationQueryParams,
  BaseLocationQuery,
  GroupByState,
  LocationMasterFormInterface,
  BuildingModel,
  FloorModel,
  DepartmentModel,
  RoomModel,
  AisleModel,
  ShelfModel,
};
