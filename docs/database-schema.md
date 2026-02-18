# GameNotes Database Schema

This file contains database design and schema 

## Users Collection

```json
{
  "id": "ObjectID",
  "name": "String",
  "email": "String (unique)",
  "password": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}

```
## Notes Collection

```json
{
  "id": "ObjectID",
  "userID": "ObjectID (reference to Users)",
  "title": "String",
  "content": "String",
  "tags": ["String"],
  "isPinned": "Boolean",
  "isArchived": "Boolean",
  "priority": "String (urgent, done, normal)",
  "attachments": [
    {
      "fileUrl": "String",
      "fileType": "String",
      "uploadedAt": "Date"
    }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
# Justification of Design Choices

# MongoDB / NoSQL
- Notes taking apps often include attachments and tags, so embedding them reduces the need for joins and multiple queries.
- Flexible schema allows each note to have different fields (attachments, tags, priority) without altering any of the structure.

# Tags / Attachments
- Tags are small strings (game titles, genres, platforms) so its efficient.
- Attachments are tightly coupled with notes, easy retrieval.

# Priority Field
- Allows visual categorization notes (urgent, done, normal).
- Supports color-coded display in the UI for quick identification notes.

# Indexing
- Index on `userID` = fast retrieval of a user’s notes for the dashboard.
- Index on `tags` = filtering and searching by game or genre.
