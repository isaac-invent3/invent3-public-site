import { BaseEntity, QueryParams } from '@repo/interfaces';
import { FORM_ENUM } from '../utils/constants';

interface Note extends BaseEntity {
  title: string;
  noteId: number;
  systemContextId: number;
  systemContextTypeId: number;
  systemContextTypeName: string;
  authorId: number;
  authorFirstName: string;
  authorLastName: string;
  hasComment: boolean;
  content: string;
  isPrivate: boolean;
  parentId: number;
  dateCreated: string;
  notePriorityId: number;
  notePriorityName: string;
  isPinned?: boolean;
}

interface NoteTaggedUser extends BaseEntity {
  noteId: number;
  notesTagId: number;
  userId: number;
}

interface GetAllNotesQueryParams extends QueryParams {
  systemContextTypeId: number;
  systemContextIds: number[];
}

interface CreateNotePayload {
  createNoteDto: {
    systemContextTypeId: number;
    systemContextId?: number;
    authorId: number;
    content: string;
    isPrivate?: boolean;
    parentId?: number;
    notePriorityId: number;
    createdBy: string;
    title: string;
  };
  tags: number[];
  systemContextIds: number[];
}

interface GetAllPinnedNotesQueryParams extends QueryParams {
  userId: number;
  systemContextTypeId: number;
  systemContextIds: number[];
}

interface UnPinNotePayload {
  noteId: number;
  authorId: number;
  unpinnedBy: string;
}

interface UpdateNotePayload {
  updateNoteDto: {
    noteId: number;
    systemContextTypeId?: number;
    systemContextId?: number;
    authorId?: number;
    content?: string;
    isPrivate?: boolean;
    parentId?: number;
    notePriorityId?: number;
    title?: string;
    lastModifiedBy: string;
  };
  tags?: {
    key:
      | typeof FORM_ENUM.add
      | typeof FORM_ENUM.update
      | typeof FORM_ENUM.delete;
    value: number;
  }[];
}

export type {
  CreateNotePayload,
  GetAllNotesQueryParams,
  GetAllPinnedNotesQueryParams,
  Note,
  NoteTaggedUser,
  UnPinNotePayload,
  UpdateNotePayload,
};
