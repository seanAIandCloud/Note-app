import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  notes: Note[] = [];         
  allNotes: Note[] = [];      
  currentFilter: 'all' | 'pinned' | 'archived' = 'all';

  showNewNoteForm: boolean = false;
  editingNote: boolean = false;
  selectedNoteId: string | null = null;

  newNote: Note = {
    id: '',
    userId: 'demoUser',
    title: '',
    content: '',
    tags: [],
    isPinned: false,
    isArchived: false,
    priority: 'normal',
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((data) => {
      this.allNotes = data;      
      this.applyFilter();        
    });
  }

  // Add / Edit Modal
  openNewNoteForm(): void {
    this.showNewNoteForm = true;
  }

  closeNewNoteForm(): void {
    this.resetForm();
  }

  editNote(note: Note): void {
    this.editingNote = true;
    this.selectedNoteId = note.id;
    this.newNote = { ...note }; 
    this.showNewNoteForm = true;
  }

  saveNote(): void {
    if (this.editingNote && this.selectedNoteId) {
      this.noteService.updateNote({ ...this.newNote }).subscribe((updated) => {
        const index = this.allNotes.findIndex((n) => n.id === this.selectedNoteId);
        if (index !== -1) this.allNotes[index] = updated;
        this.applyFilter();
        this.resetForm();
      });
    } else {
      this.newNote.id = Date.now().toString();
      this.newNote.createdAt = new Date();
      this.newNote.updatedAt = new Date();

      this.noteService.addNotes({ ...this.newNote }).subscribe((note) => {
        this.allNotes.push(note);
        this.applyFilter();
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.showNewNoteForm = false;
    this.editingNote = false;
    this.selectedNoteId = null;
    this.newNote = {
      id: '',
      userId: 'demoUser',
      title: '',
      content: '',
      tags: [],
      isPinned: false,
      isArchived: false,
      priority: 'normal',
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  deleteNote(id: string): void {
    this.noteService.deleteNote(id).subscribe(() => {
      this.allNotes = this.allNotes.filter((n) => n.id !== id);
      this.applyFilter();
    });
  }

  togglePin(note: Note): void {
    note.isPinned = !note.isPinned;
    this.noteService.updateNote(note).subscribe((updated) => {
      const index = this.allNotes.findIndex((n) => n.id === updated.id);
      if (index !== -1) this.allNotes[index] = updated;
      this.applyFilter();
    });
  }

  toggleArchive(note: Note): void {
    note.isArchived = !note.isArchived;
    this.noteService.updateNote(note).subscribe((updated) => {
      const index = this.allNotes.findIndex((n) => n.id === updated.id);
      if (index !== -1) this.allNotes[index] = updated;
      this.applyFilter();
    });
  }

  // Sidebar Filter
  applyFilter(filter?: 'all' | 'pinned' | 'archived'): void {
    if (filter) this.currentFilter = filter;

    switch (this.currentFilter) {
      case 'all':
        this.notes = [...this.allNotes];
        break;
      case 'pinned':
        this.notes = this.allNotes.filter((n) => n.isPinned && !n.isArchived);
        break;
      case 'archived':
        this.notes = this.allNotes.filter((n) => n.isArchived);
        break;
    }
  }
}
