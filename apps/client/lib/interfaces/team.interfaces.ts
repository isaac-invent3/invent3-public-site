import { BaseEntity } from '@repo/interfaces';

interface Team extends BaseEntity {
  teamId: number;
  name: string;
  description: string;
  owner: number;
  dateCreated: Date;
}

interface UserTeam {
  userTeamId: number;
  userId: number;
  teamId: number;
  name: string;
  description: string;
  dateCreated: Date;
  isDeleted: boolean;
}

interface TeamPayload {
  name: string;
  description?: string;
  owner?: number;
  dateCreated?: Date;
  createdBy: string;
}

export type { Team, TeamPayload, UserTeam };
