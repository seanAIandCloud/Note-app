# GameNotes-app

# Overview
GameNotes is a web based note taking app for gamers. The application allows users to create, edit, organize and manage notes related to different games, genres and platforms. This repository contains the initial planning and documetation of Assignment 1.1. This phase is focused on design and planning.

# Tech Stack
- Frontend: Angular
- Backen: Node.js
- Database: Mongodb
- Version Control: Github

# Assignment 1.1
- Design Database schema
- Define relationships
- Justify design choices
- Create UI prototypes

# Database Design

### Users Collection
-id (objectID)
-name (String)
-email (String)
-password(String)
-createdAt(date)
-updatedAt(date)

### Notes Collection
- id (ObjectID)
- userID (ObjectID)
- title (String)
- content (String)
- tags (Array of Strings)
- isPinned (Boolean)
- isArchived (Boolean)
- priorty (String)
- Attachments (Embedded objects)
- createdAt (date)
- updatedAt (date)

### Relationshipps
- One User --> many notes
- One Note --> many attachments
- One Note --> many tags

# UI Prototypes
- login page
- register page
- forgot password page
- dashboard
- edit note
- new note
- about page
- profile page


# 1.3 Dashboard CRUD (v1.3)

## 1.3.1 Overview
Version 1.3 focuses on implementing full **CRUD functionality** for the dashboard notes system.  
The main goal of this update was to allow notes to be created, displayed, edited, and deleted dynamically while maintaining persistence through the backend database.

The dashboard acts as the central workspace where all notes are managed, while the profile page provides basic statistics related to note usage.

## 1.3.2 Features

### 1.3.2.1 Create Notes
- Users can create new notes directly from the dashboard.
- Each note includes:
  - Title
  - Description/content
  - Created timestamp
- Newly created notes immediately appear in the dashboard without needing a refresh.

### 1.3.2.2 Read Notes
- All stored notes are retrieved from the backend API.
- Notes are displayed in a structured layout for easy viewing.
- The dashboard automatically updates when data changes.

### 1.3.2.3 Update Notes
- Existing notes can be edited.
- Updates modify the stored data and refresh the UI automatically.
- Each edit updates the `updatedAt` timestamp.

### 1.3.2.4 Delete Notes
- Notes can be permanently removed.
- Deleted notes are immediately removed from both the UI and database.

### 1.3.2.5 Pin and Archive System
- Notes can be pinned to keep important items at the top.
- Archived notes are separated from active notes.
- Filtering logic dynamically updates the displayed list.

## 1.3.3 Profile Page
The profile page provides simple statistics generated from stored notes:

- Total number of notes
- Number of pinned notes
- Number of archived notes

These values are calculated dynamically when the page loads.

## 1.3.4 Tech Stack

### Frontend
- Angular
- TypeScript
- HTML / SCSS
- Angular HttpClient for API communication

### Backend
- Node.js
- Express REST API

### Database
- MongoDB using Mongoose schemas

## 1.3.5 How to Use

### Dashboard
1. Open the dashboard page.
2. Click **Add Note** to create a new note.
3. Select a note to edit its content.
4. Use pin or archive actions to organize notes.
5. Delete notes when no longer needed.

### Profile
1. Navigate to the profile page.
2. View automatically calculated note statistics.

## 1.3.6 Implementation Notes
- CRUD operations communicate with the backend through REST endpoints.
- Notes are stored persistently in MongoDB.
- State updates are handled using Angular subscriptions.
- The dashboard refreshes automatically after create, update, or delete operations.
- IDs are generated automatically by the database.

## 1.3.7 Future Improvements
- Add advanced filtering and search functionality.
- Implement drag-and-drop ordering for pinned notes.



