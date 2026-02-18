import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[] = [
    {
      id: '1',
      userId: 'demoUser',
      title: 'Elden Ring Boss Strategy',
      content: 'Use bleed build and stay aggressive in phase two.',
      tags: ['Elden Ring', 'RPG'],
      isPinned: true,
      isArchived: false,
      priority: 'urgent',
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      userId: 'demoUser',
      title: 'Fallout 4 Settlement Tips',
      content: 'Maximize happiness by balancing defense and beds.',
      tags: ['Fallout 4', 'RPG'],
      isPinned: false,
      isArchived: false,
      priority: 'normal',
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      userId: 'demoUser',
      title: 'World of Warcraft',
      content: 'Kill all the Marmots',
      tags: ['World of Warcraft', 'RPG'],
      isPinned: false,
      isArchived: false,
      priority: 'urgent',
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  constructor() {}

  getNotes(): Observable<Note[]> {
    return of(this.notes);
  }

  addNotes(note: Note): Observable<Note> {
    this.notes.push(note);
    return of(note);
  }

  updateNote(updatedNote: Note): Observable<Note> {
    const index = this.notes.findIndex((n) => n.id === updatedNote.id);
    if (index !== 1) {
      this.notes[index] = updatedNote;
    }
    return of(updatedNote);
  }

  deleteNote(id: string): Observable<boolean> {
    this.notes = this.notes.filter((n) => n.id !== id);
    return of(true);
  }
}
