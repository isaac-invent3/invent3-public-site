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
  totalShelvesInAisle: number;
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
  lgaid: number;
  lganame: string;
  stateId: number;
  stateName: string;
  countryId: number;
  countryName: string;
  facilityName: string;
  facilityRef: string;
  address: string;
  longitude: number;
  latitude: number;
  currentCapacity: number;
  maxCapacity: number;
  image: string;
  imageBasePrefix: string;
  energyCostPerKwh: number;
  totalBuildingsInFacility: number;
}

interface Floor extends BaseEntity {
  floorId: number;
  buildingId: number;
  floorName: string;
  floorRef: string;
  departmentsInFloor: number;
}

interface Building extends BaseEntity {
  buildingId: number;
  buildingName: string;
  facilityId: number;
  buildingRef: string;
  address: string;
  longitude: number;
  latitude: number;
  totalFloorsInBuilding: number;
}

interface Department extends BaseEntity {
  departmentId: number;
  departmentName: string;
  departmentRef: string;
  floorId: number;
  totalRoomsInDepartmentFloor: number;
}

interface Room extends BaseEntity {
  roomId: number;
  roomName: string;
  roomRef: string;
  departmentId: number;
  totalAislesInRoom: number;
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

interface CreateShelfDto {
  createShelfDto: {
    shelfName: string;
    shelfRef: string | null;
    createdBy: string;
  };
}

interface CreateAisleDto {
  createAisleDto: {
    aisleName: string;
    aisleRef: string | null;
    createdBy: string;
  };
  createShelveDtos: CreateShelfDto[];
}

interface CreateRoomDto {
  createRoomDto: {
    roomName: string;
    roomRef: string | null;
    createdBy: string;
  };
  createAisleDtos: CreateAisleDto[];
}

interface CreateDepartmentDto {
  createDepartmentDto: {
    departmentName: string;
    departmentRef: string | null;
    createdBy: string;
  };
  createRoomDtos: CreateRoomDto[];
}

interface CreateFloorDto {
  createFloorDto: {
    floorName: string;
    floorRef: string | null;
    createdBy: string;
  };
  createDepartmentDtos: CreateDepartmentDto[];
}

interface CreateBuildingDto {
  createBuildingDto: {
    buildingName: string;
    buildingRef: string | null;
    createdBy: string;
  };
  createFloorDtos: CreateFloorDto[];
}

interface createFacilityDtos {
  lgaId: number;
  facilityName: string;
  facilityRef?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
  energyCostPerKwh?: number;
  imageName?: string | null;
  base64PhotoImage?: string | null;
  createdBy: string;
}

interface FacilityFormInterface {
  localId: number;
  countryId: number;
  stateId: number;
  lgaId: number;
  address: string;
  facilityName: string;
  countryName: string;
  stateName: string;
  lgaName: string;
}

interface FacilitiesInterface {
  facilities: FacilityFormInterface[];
}
interface LocationMasterFormInterface {
  facilityId: number;
  countryId: number;
  stateId: number;
  lgaId: number;
  address: string;
  facilityName: string;
  createBuildingDtos: CreateBuildingDto[];
}

interface LocationMasterFormDto {
  createFacilityDto: createFacilityDtos;
  createBuildingDtos?: CreateBuildingDto[];
}

interface BuildingFormData {
  createdBy: string;
  facilityId: number;
  buildingName: string;
  buildingRef: string;
  address: string;
  longitude: number;
  latitude: number;
}

interface FloorFormData {
  buildingId: number;
  floorName: string;
  floorRef: string;
  createdBy: string;
}

type LocationBase =
  | 'Buildings'
  | 'Floors'
  | 'Departments'
  | 'Rooms'
  | 'Aisles'
  | 'Shelves';

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
  CreateAisleDto,
  CreateBuildingDto,
  CreateDepartmentDto,
  CreateFloorDto,
  CreateRoomDto,
  BuildingFormData,
  FloorFormData,
  LocationMasterFormDto,
  LocationBase,
  FacilitiesInterface,
  FacilityFormInterface,
};
