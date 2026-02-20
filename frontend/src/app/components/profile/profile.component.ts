import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  notes: Note[] = [];
  notesCreated: number = 0;
  notesPinned: number = 0;
  notesArchived: number = 0;

  // Mock user
  user = {
    name: 'Sean Matear',
    email: 'seanmatear@gmail.com',
  };

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
      this.calculateStats();
    });
  }

  calculateStats() {
    this.notesCreated = this.notes.length;
    this.notesPinned = this.notes.filter((n) => n.isPinned).length;
    this.notesArchived = this.notes.filter((n) => n.isArchived).length;
  }
}
