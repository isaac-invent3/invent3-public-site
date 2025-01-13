import { BaseEntity } from '@repo/interfaces';

interface Template extends BaseEntity {
  templateId: number;
  contextId: number;
  contextTypeId: number;
  templateName: string;
  description: string;
}

interface TemplateFilter {
  contextTypeId: number[];
  owner: number[];
  createdDate: string | null;
}

export type { Template, TemplateFilter };
