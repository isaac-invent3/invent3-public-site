import { BaseEntity } from '@repo/interfaces';
import { FORM_ENUM } from '../utils/constants';
import { BaseDto, Document, LocationDto } from './general.interfaces';
import { Role } from './role.interfaces';

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
  statusId: number;
  statusName: string;
  displayColorCode: string;
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
  employeeId: number;
  companyId: number;
  designationId: number;
  designationName: string;
  lastActive: string;
  personalIdentificationNumber: number;
  personalEmail: string;
  dateOfBirth: string;
  userGroups: UserGroup[];
  userRoles: Role[];
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

interface UserGroupInfoHeader {
  groupId: number;
  groupName: string;
  noOfAssociatedUsers: number;
  owner: string;
  dateCreated: string;
  currentStatusId: number;
  currentStatusName: string;
  currentStatusDisplayColorCode: string;
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
  userId: number | null;
  picture: UserPicture | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  dob: string | null;
  mobileNumber: string | null;
  workEmail: string | null;
  gender: string | null;
  countryId: number | null;
  stateId: number | null;
  cityId: number | null;
  cityName: string | null;
  countryName: string | null;
  stateName: string | null;
  documents: Document[];
  employmentTypeId: number | null;
  employmentTypeName: string | null;
  branchId: number | null;
  branchName: string | null;
  jobTitleId: number | null;
  jobTitleName: string | null;
  teamId: number | null;
  teamName: string | null;
  userRoleIds: number[];
  userRoleNames: string[];
  userGroupIds: number[];
  userGroupNames: string[];
  initialRoleIds: number[];
  initialGroupIds: number[];
  initialDocumentIds: number[];
}

interface UserDesignation {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  userDesignationId: number;
  employeeId: number;
  designationId: number;
}

interface Group {
  isNew: boolean;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: Date;
  deletedBy: string;
  guid: string;
  groupId: number;
  groupName: string;
  groupDescription: string;
  groupRoles: GroupRole[];
  groupPermissions: GroupPermission[];
  groupUsers: User[];
}

interface GroupPermission {
  groupPermissionId: number;
  groupId: number;
  permissionId: number;
  permissionName: string;
}

interface GroupRole {
  groupRoleId: number;
  groupId: number;
  roleId: number;
  roleName: string;
}

interface UserGroupPayload {
  createGroupDto: {
    groupName: string;
    createdBy: string;
  };
  userIds: number[];
  roleIds: number[];
}

interface UserDocument extends BaseEntity {
  documentId: number;
  documentName: string;
  document: string;
  base64Prefix: string;
}

interface UpdateUserGroupPayload {
  groupId: number;
  groupName: string;
  roles?: Record<number, typeof FORM_ENUM.add | typeof FORM_ENUM.delete>;
  userIds?: Record<number, typeof FORM_ENUM.add | typeof FORM_ENUM.delete>;
  lastModifiedBy: string;
}

interface UserDto extends BaseDto {
  userId: number | null;
  username: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  companyId: number | null;
  employeeId: number | null;
  designationId: number | null;
  bio: string | null;
  roles: Record<number, typeof FORM_ENUM.add | typeof FORM_ENUM.delete> | null;
  groups: Record<number, typeof FORM_ENUM.add | typeof FORM_ENUM.delete> | null;
  permissions?: Record<number, typeof FORM_ENUM.add | typeof FORM_ENUM.delete>;
}

interface UserImageDto extends BaseDto {
  imageName: string;
  base64PhotoImage: string;
  base64Prefix: string;
  isPrimaryImage: boolean;
  userId: number | null;
}

interface UserDocumentDto extends BaseDto {
  documentName: string;
  base64Document: string;
}

interface CreateUserPayload {
  createUserDto: UserDto;
  createUserImageDto: UserImageDto[];
  createUserDocumentDto: UserDocumentDto[] | null;
  createLocationDto: LocationDto;
  userDocumentIds: number[] | null;
}

interface UpdateUserPayload {
  updateUserDto: UserDto;
  updateLocationDto: LocationDto;
  multiPurposeUserImageDto: UserImageDto[];
  multiPurposeUserDocumentDto: UserDocumentDto[] | null;
  userDocuments?: Record<
    number,
    typeof FORM_ENUM.add | typeof FORM_ENUM.delete
  > | null;
  userRoles?: Record<
    number,
    typeof FORM_ENUM.add | typeof FORM_ENUM.delete
  > | null;
  userGroups?: Record<
    number,
    typeof FORM_ENUM.add | typeof FORM_ENUM.delete
  > | null;
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
  UserDesignation,
  UserGroupInfoHeader,
  UserGroupPayload,
  CreateUserPayload,
  Group,
  UpdateUserGroupPayload,
  UpdateUserPayload,
  UserDocument,
};
