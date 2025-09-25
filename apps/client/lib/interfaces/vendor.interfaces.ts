import { BaseEntity } from '@repo/interfaces';
import { BaseUpdateDto, Document, ImageObject } from './general.interfaces';

interface Vendor extends BaseEntity {
  vendorId: number;
  vendorCategoryId: null;
  vendorName: string;
  contactFirstName: null;
  contactLastName: null;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  statusId: null;
  description: null;
}

interface VendorFormDetails {
  vendorId: number | null;
  vendorName: string | null;
  logo: ImageObject | null;
  description: string | null;
  vendorCategoryId: number | null;
  vendorCategoryName: string | null;
  address1: string | null;
  address2: string | null;
  vendorCountryId: number | null;
  vendorStateId: number | null;
  vendorCityId: number | null;
  vendorCityName: string | null;
  vendorCountryName: string | null;
  vendorStateName: string | null;
  postalCode: string | null;
  contactFirstName: string | null;
  contactLastName: string | null;
  primaryEmail: string | null;
  primaryPhoneNumber: string | null;
  contractStartDate: string | null;
  contractEndDate: string | null;
  contractValue: number | null;
  vendorStatusId: number | null;
  vendorStatusName: string | null;
  vendorDocuments: Document[];
  initialDocumentIds: number[];
}

interface VendorFilter {
  startDate: string | undefined;
  endDate: string | undefined;
}

interface VendorDto {
  vendorName: string;
  contactFirstName: string;
  contactLastName: string;
  description: string;
  address: string | null;
  phoneNumber: string;
  emailAddress: string;
  statusId: number | null;
  vendorCategoryId: number;
}

interface VendorImageDto {
  vendorImageName: string;
  base64PhotoImage: string;
  isPrimaryImage: boolean;
  base64Prefix: string;
  vendorId: number | null;
}

interface CreateVendorImageDto extends VendorImageDto {
  createdBy: string;
}
interface UpdateVendorImageDto extends VendorImageDto, BaseUpdateDto {}

interface VendorContractDocumentDto {
  contractId: number | null;
  base64ContractDocument: string;
  documentName: string;
  documentType: string;
}

interface CreateVendorContractDocumentDto extends VendorContractDocumentDto {
  createdBy: string;
}
interface UpdateVendorContractDocumentDto
  extends VendorContractDocumentDto,
    BaseUpdateDto {}

interface CreateVendorPayload {
  createVendor: VendorDto & { createdBy: string };
  createVendorImageDto: CreateVendorImageDto[] | null;
  createVendorContractDocumentDto: CreateVendorContractDocumentDto[] | null;
}

interface UpdateVendorPayload {
  updateVendorDto: VendorDto & { vendorId: number; lastModifiedBy: string };
  multiPurposeVendorImageDto: UpdateVendorImageDto[];
  multiPurposeVendorContractDocumentDto:
    | UpdateVendorContractDocumentDto[]
    | null;
}

interface VendorCategory extends BaseEntity {
  categoryId: number;
  categoryName: string;
}

export type {
  Vendor,
  VendorFormDetails,
  VendorFilter,
  CreateVendorPayload,
  UpdateVendorPayload,
  VendorCategory,
};
