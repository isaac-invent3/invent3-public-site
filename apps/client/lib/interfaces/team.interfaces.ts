import { BaseEntity } from '@repo/interfaces';

interface Team extends BaseEntity {
  teamId: number;
  name: string;
  description: string;
  owner: number;
  dateCreated: string;
}

interface UserTeam {
  userTeamId: number;
  userId: number;
  teamId: number;
  name: string;
  description: string;
  dateCreated: string;
  isDeleted: boolean;
}

interface TeamPayload {
  name: string;
  description?: string;
  owner?: number;
  dateCreated?: string;
  createdBy: string;
}

interface TeamMember {
  userTeamId: number;
  userId: number;
  teamId: number;
  name: string;
  description: string;
  isDeleted: boolean;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  statusID: number;
  statusName: string;
  designationID: number;
  designationName: string;
  dateCreated: string;
  lastActive: string;
  displayColorCode: string;
}

export type { Team, TeamPayload, UserTeam, TeamMember };
