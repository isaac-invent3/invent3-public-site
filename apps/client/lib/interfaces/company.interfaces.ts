import { BaseDto } from './general.interfaces';

interface Company {
  companyId: number;
  guid: string;
  companyName: string;
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
  subscriptionPlan: string | null;
  startDate: string | null;
  endDate: string | null;
  contactFirstName: string | null;
  contactLastName: string | null;
  contactEmail: string | null;
  contactPhoneNumber: string | null;
}

interface CompanyImageDto extends BaseDto {
  imageName: string;
  base64PhotoImage: string;
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
  webUrl: string;
}
interface createCompanyPayload {
  createCompanyDto: CompanyDto;
  createCompanyImageDtos: CompanyImageDto[];
  createUserDto: CompanyUserDto;
}
interface updateCompanyPayload {
  updateCompanyDto: CompanyDto;
  updateCompanyImageDtos: CompanyImageDto[];
  updateUserDto: CompanyUserDto;
}

export type {
  Company,
  CompanyFormDetails,
  CompanyFormImage,
  CompanySummary,
  createCompanyPayload,
  updateCompanyPayload,
};
