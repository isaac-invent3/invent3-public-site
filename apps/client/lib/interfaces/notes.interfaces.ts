import { QueryParams } from '@repo/interfaces';

interface Note {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  noteId: number;
  systemContextTypeId: number;
  systemContextId: number;
  authorId: number;
  content: string;
  isPrivate: boolean;
  parentId: number;
  dateCreated: string;
  notePriorityId: number;
}

interface GetAllNotesQueryParams extends QueryParams {
  systemContextTypeId: number;
  systemContextIds: number[];
}

interface CreateNotePayload {
  systemContextTypeId: number;
  systemContextId: number;
  authorId: number;
  content: 'string';
  isPrivate: true;
  parentId: 0;
  notePriorityId: 0;
  createdBy: "\\CGnJd:n!Gu}d6ah0GU9!Mf}2+.Ipavt'ommVWS<V9qOrLKL2)@]]nL}2mcqJ!x7m(.QU!E'\\yIOJb<U=v3:6{`";
}

interface GetAllPinnedNotesQueryParams extends QueryParams {
  userId: number;
}

export type {
  CreateNotePayload,
  GetAllNotesQueryParams,
  GetAllPinnedNotesQueryParams,
  Note,
};
