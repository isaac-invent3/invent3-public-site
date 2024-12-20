import { BaseEntity } from '@repo/interfaces';

interface Template extends BaseEntity {
  templateId: number;
  contextId: number;
  contextTypeId: number;
  templateName: string;
  description: string;
}

export type { Template };
