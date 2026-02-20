export interface Note {
  id: string;
  userId: string;

  title: string;
  content: string;

  isPinned: boolean;
  isArchived: boolean;

  priority: 'urgent' | 'done' | 'normal';

  attachments: {
    name: string;
    type: string;
    data: string;
  }[];

  createdAt: Date;
  updatedAt: Date;
}
export interface Attachment {
  fileUrl: string;
  fileType: string;
  uploadedAt: Date;
}
