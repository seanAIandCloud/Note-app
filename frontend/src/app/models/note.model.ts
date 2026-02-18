export interface Note {
    id: string;
    userId: string;

    title: string;
    content: string;

    tags: String[];

    isPinned: boolean;
    isArchived: boolean;

    priority: 'urgent' | 'done' | 'normal';

    attachments: Attachment[];

    createdAt: Date;
    updatedAt: Date;
}
export interface Attachment {
    fileUrl: string;
    fileType: string;
    uploadedAt: Date;
}