import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  notes: Note[] = [];
  showNewNoteForm: boolean = false;

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
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe(data => {
      this.notes = data;
    });
  }

  openNewNoteForm(): void {
    this.showNewNoteForm = true;
  }

  closeNewNoteForm(): void {
    this.showNewNoteForm = false;
  }

  addNote(): void {
    // Assign a unique ID
    this.newNote.id = Date.now().toString();
    this.newNote.createdAt = new Date();
    this.newNote.updatedAt = new Date();

    this.noteService.addNotes({ ...this.newNote }).subscribe(note => {
      this.notes.push(note);

      // Reset form
      this.newNote.title = '';
      this.newNote.content = '';
      this.newNote.priority = 'normal';
      this.newNote.tags = [];

      this.closeNewNoteForm();
    });
  }

  deleteNote(id: string): void {
    this.noteService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter(n => n.id !== id);
    });
  }
}
