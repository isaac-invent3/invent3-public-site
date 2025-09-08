import { BaseEntity } from '@repo/interfaces';

interface Team extends BaseEntity {
  teamId: number;
  name: string;
  description: string;
  owner: number;
  dateCreated: Date;
}

interface TeamPayload {
  name: string;
  description?: string;
  owner?: number;
  dateCreated?: Date;
  createdBy: string;
}

export type { Team, TeamPayload };
