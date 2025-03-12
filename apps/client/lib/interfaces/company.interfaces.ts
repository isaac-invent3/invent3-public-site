import { FORM_ENUM } from '../utils/constants';
import { BaseDto } from './general.interfaces';

interface Company {
  companyId: number;
  companyType: number;
  guid: string;
  companyName: string;
  tenantName: string;
  address: string;
  emailAddress: string;
  phoneNumber: string;
  dateCreated: string;
  subscriptionPlanId: number;
  subscriptionPlanTypeId: number;
  subscriptionStatusId: number;
  industryId: number;
  locationId: number;
  webUrl: string;
  registrationNumber: string;
  apikey: string;
  imageName: string;
  photoImage: string;
  isPrimaryImage: boolean;
  base64Prefix: string;
  industryName: string;
  lgaid: number;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  contactPersonEmail: string;
  contactPersonImagePrefix: string;
  contactPersonPrimaryImage: string;
  isDeleted: boolean;
}

interface CompanyFormImage {
  imageId: number | null;
  imageName: string | null;
  base64PhotoImage: string;
  base64Prefix: string | null;
}

interface CompanySummary {
  totalRegisteredCompanies: number;
  activeSubscriptions: number;
  trialAccounts: number;
  expiringSoon: number;
}

interface CompanyFormDetails {
  companyId: number | null;
  companyLogo: CompanyFormImage | null;
  companyName: string | null;
  registrationNumber: string | null;
  industryTypeId: number | null;
  industryTypeName: string | null;
  companyEmail: string | null;
  companyWebsite: string | null;
  address1: string | null;
  address2: string | null;
  lgaId: number | null;
  stateId: number | null;
  countryId: number | null;
  lgaName: string | null;
  stateName: string | null;
  countryName: string | null;
  postalCode: string | null;
  subscriptionPlanId: number | null;
  startDate: string | null;
  endDate: string | null;
  contactFirstName: string | null;
  contactLastName: string | null;
  contactEmail: string | null;
  contactPhoneNumber: string | null;
  clientAdminId: number | null;
}

interface CompanyImageDto extends BaseDto {
  imageName: string;
  base64PhotoImage: string;
  base64Prefix: string;
  isPrimaryImage: boolean;
  companyId: number | null;
}

interface CompanyUserDto extends BaseDto {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface CompanyDto extends BaseDto {
  companyName: string;
  address: string;
  emailAddress: string;
  phoneNumber: string | null;
  industryId: number;
  subscriptionPlanId: number;
  webUrl: string;
}
interface CreateCompanyPayload {
  createCompanyDto: {
    companyType: number;
  };
  createCompanyImageDtos: CompanyImageDto[];
  createUserDto: CompanyUserDto;
  clientAdminId?: number;
}
interface UpdateCompanyPayload {
  updateCompanyDto: CompanyDto;
  multiPurposeCompanyImageDto: CompanyImageDto[];
  updateUserDto: CompanyUserDto;
}
interface CompanyConfigurationPayload {
  companyId: number;
  companyConfigurationOptionId: number | null;
  systemConfigurationOptionId: number;
  actionType: typeof FORM_ENUM.add | typeof FORM_ENUM.delete;
  changeInitiatedBy: string;
}
interface CompanyConfigurationOption {
  rowId: number;
  companyId: number;
  companyName: string;
  companyConfigurationOptionId: number;
  guid: string;
  systemConfigurationOptionId: number;
  systemConfigurationOptionName: string;
  systemConfigurationOptionTypeId: number;
  systemConfigurationOptionTypeName: string;
  systemConfigurationContextTypeId: number;
  systemConfigurationContextTypeName: string;
}

interface CompanyConfigurationObject {
  companyConfigurationOptionId: number | null;
  systemConfigurationOptionId: number;
}

export type {
  Company,
  CompanyFormDetails,
  CompanyFormImage,
  CompanySummary,
  CreateCompanyPayload,
  UpdateCompanyPayload,
  CompanyConfigurationPayload,
  CompanyConfigurationOption,
  CompanyConfigurationObject,
};
