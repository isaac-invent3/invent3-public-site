import { FORM_ENUM } from '../utils/constants';
import { Document } from './general.interfaces';

interface Employee {
  employeeId: number;
  employeeName: string;
  phoneNumber: string;
  emailAddress: string;
  departmentId: number;
  roleId: number;
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string | null;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string;
  guid: string;
  locationId: number | null;
  employeeLocation: string;
}

interface User {
  rowId: number;
  userId: number;
  guid: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isDeleted: boolean;
  phoneNumber: string;
  residentialAddress: string;
  facilityName: string;
  facilityRef: string;
  buildingName: string;
  buildingRef: string;
  floorName: string;
  floorRef: string;
  departmentName: string;
  departmentRef: string;
  roomName: string;
  roomRef: string;
  lganame: string;
  stateName: string;
  countryName: string;
}

interface UserGroup {
  userGroupId: number;
  userId: number;
  groupId: number;
  groupName: string;
  groupDescription: string;
  dateCreated: string;
  isDeleted: boolean;
}

interface UserGroupMember {
  rowId: number;
  userId: number;
  guid: string;
  firstName: string;
  lastName: string;
  email: string;
  isDeleted: boolean;
  lastActive: string;
  employeeStatusId: null;
  groupId: number;
  employeeStatus: null;
  dateAdded: string;
}

interface UserPasswordChangeQuery {
  userId: number;
  currentPassword: string;
  newPassword: string;
  lastModifiedBy: string;
}

interface UserConfigurationOption {
  rowId: number;
  userId: number;
  firstName: string;
  lastName: string;
  userConfigurationOptionId: number;
  guid: string;
  systemConfigurationOptionId: number;
  systemConfigurationOptionName: string;
  systemConfigurationOptionTypeId: number;
  systemConfigurationOptionTypeName: string;
  systemConfigurationContextTypeId: number;
  systemConfigurationContextTypeName: string;
}

interface UserConfigurationObject {
  userConfigurationOptionId: number | null;
  systemConfigurationOptionId: number;
}

interface UserConfigurationPayload {
  userId: number;
  userConfigurationOptionId: number | null;
  systemConfigurationOptionId: number;
  actionType: typeof FORM_ENUM.add | typeof FORM_ENUM.delete;
  changeInitiatedBy: string;
}

interface UserAuth {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  apiKey: string;
  expiresIn: number;
  sessionId: number;
}

interface UserPermission {
  rowId: number;
  routeName: string;
  routePath: string;
  roleRouteId: number;
  roleRouteGuid: string;
  createPermission: boolean;
  readPermission: boolean;
  updatePermission: boolean;
  deletePermission: boolean;
  isDeleted: boolean;
  roleId: number;
  roleName: string;
  routeSetId: number;
  routeSetName: string;
}

interface UserFilter {
  startDate: string | undefined;
  endDate: string | undefined;
}

interface UserPicture {
  imageId: number | null;
  imageName: string | null;
  base64PhotoImage: string;
  base64Prefix: string | null;
}

interface UserFormDetails {
  picture: UserPicture | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  dob: string | null;
  mobileNumber: string | null;
  personalEmail: string | null;
  workEmail: string | null;
  gender: string | null;
  address1: string | null;
  address2: string | null;
  country: number | null;
  state: number | null;
  city: number | null;
  postalCode: string | null;
  documents: Document[];
  employmentType: string | null;
  branch: string | null;
  jobTitle: string | null;
  team: string | null;
  userRole: string | null;
  userGroup: string[];
}

export type {
  Employee,
  User,
  UserAuth,
  UserPasswordChangeQuery,
  UserGroup,
  UserGroupMember,
  UserConfigurationOption,
  UserConfigurationObject,
  UserConfigurationPayload,
  UserPermission,
  UserFilter,
  UserFormDetails,
};
