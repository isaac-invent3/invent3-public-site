import { Document, ImageObject } from './general.interfaces';

interface Vendor {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  vendorId: number;
  vendorName: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
}

interface VendorFormDetails {
  vendorName: string | null;
  logo: ImageObject | null;
  description: string | null;
  categoryId: number | null;
  categoryName: string | null;
  address1: string | null;
  address2: string | null;
  countryId: number | null;
  stateId: number | null;
  cityId: number | null;
  cityName: string | null;
  countryName: string | null;
  stateName: string | null;
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
  slaDocuments: Document[];
}

interface VendorFilter {
  startDate: string | undefined;
  endDate: string | undefined;
}

export type { Vendor, VendorFormDetails, VendorFilter };
