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

# Current Status
Planning and documentaion 
Next Phase is to implement frontend


