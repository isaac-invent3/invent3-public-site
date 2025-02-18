interface Company {
  isNew: boolean;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: Date;
  deletedBy: string;
  guid: string;
  companyId: number;
  companyName: string;
  address: string;
  apikey: string;
  industry: string;
  totalAsset: number;
  primaryContacts: string;
  email: string;
  subscriptionType: 'Free Tier' | 'Pro';
  subscriptionStatus: 'Active' | 'Inactive';
}

interface CompanyFormImage {
  imageId: number | null;
  imageName: string | null;
  base64PhotoImage: string;
  base64Prefix: string | null;
}

interface CompanyFormDetails {
  companyLogo: CompanyFormImage | null;
  companyName: string | null;
  registrationNumber: string | null;
  industryType: string | null;
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
  contactInformation: CompanyContactInformation[];
  subscriptionPlan: string | null;
  startDate: string | null;
  endDate: string | null;
}

interface CompanyContactInformation {
  contactFirstName: string | null;
  contactLastName: string | null;
  contactEmail: string | null;
  contactPhoneNumber: string | null;
  contactJobTitle: string | null;
}

export type { Company, CompanyFormDetails, CompanyFormImage };
