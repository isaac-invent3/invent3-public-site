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
  apikey: string | null;
  companyId: string | null;
  createdBy: string;
  createdDate: string;
  deletedBy: string;
  deletedDate: string | null;
  email: string;
  emailVerificationDate: string | null;
  emailVerificationToken: string | null;
  firstName: string;
  guid: string;
  isDeleted: boolean;
  isEmailVerified: boolean;
  isNew: boolean;
  lastModifiedBy: string;
  lastModifiedDate: string | null;
  lastName: string;
  passwordHash: string;
  userGroups: string[] | null;
  userId: number;
  userPermissions: string[] | null;
  userRoles: string[] | null;
  username: string;
}

export type { Employee, User };
