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
  searchTerm: string = '';
  isSaving = false;

  newNote: Note = this.getEmptyNote();

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  // ---------------------------
  // Utility: Empty Note Factory
  // ---------------------------
  getEmptyNote(): Note {
    return {
      id: '',
      userId: 'demoUser',
      title: '',
      content: '',
      isPinned: false,
      isArchived: false,
      priority: 'normal',
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // ---------------------------
  // Load Notes
  // ---------------------------
  loadNotes(): void {
    this.noteService.getNotes().subscribe((data) => {
      this.allNotes = [...data];
      this.applyFilter();
    });
  }

  // ---------------------------
  // Modal: Create / Edit
  // ---------------------------
  openNewNoteForm(): void {
    this.editingNote = false;
    this.selectedNoteId = null;
    this.newNote = this.getEmptyNote();
    this.showNewNoteForm = true;
  }

  editNote(note: Note): void {
    this.editingNote = true;
    this.selectedNoteId = note.id;
    this.newNote = { ...note }; // clone to avoid reference issues
    this.showNewNoteForm = true;
  }

  closeNewNoteForm(): void {
    this.resetForm();
  }

  saveNote(): void {
    if (this.isSaving) return;
    this.isSaving = true;

    const noteToSave: Note = { ...this.newNote };

    if (this.editingNote && this.selectedNoteId) {
      // UPDATE existing note
      noteToSave.updatedAt = new Date();
      this.noteService.updateNote(noteToSave).subscribe({
        next: (updated) => {
          const index = this.allNotes.findIndex(
            (n) => n.id === this.selectedNoteId,
          );
          if (index !== -1) this.allNotes[index] = updated;
          this.applyFilter();
          this.resetForm();
          this.isSaving = false;
        },
        error: () => (this.isSaving = false),
      });
    } else {
      // CREATE new note
      noteToSave.id = Date.now().toString();
      noteToSave.createdAt = new Date();
      noteToSave.updatedAt = new Date();

      this.noteService.addNotes(noteToSave).subscribe({
        next: (note) => {
          this.allNotes.push(note);
          this.applyFilter();
          this.resetForm();
          this.isSaving = false;
        },
        error: () => (this.isSaving = false),
      });
    }
  }

  resetForm(): void {
    this.showNewNoteForm = false;
    this.editingNote = false;
    this.selectedNoteId = null;
    this.newNote = this.getEmptyNote();
    this.isSaving = false;
  }

  // ---------------------------
  // Delete / Pin / Archive
  // ---------------------------
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

  // ---------------------------
  // File Attachments
  // ---------------------------
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.newNote.attachments.push({
          name: file.name,
          type: file.type,
          data: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  downloadAttachment(file: any): void {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    link.click();
  }

  // ---------------------------
  // Sidebar Filter + Search
  // ---------------------------
  applyFilter(filter?: 'all' | 'pinned' | 'archived'): void {
    if (filter) this.currentFilter = filter;

    let filtered = [...this.allNotes];

    switch (this.currentFilter) {
      case 'pinned':
        filtered = filtered.filter((n) => n.isPinned && !n.isArchived);
        break;
      case 'archived':
        filtered = filtered.filter((n) => n.isArchived);
        break;
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(term) ||
          n.content.toLowerCase().includes(term),
      );
    }

    this.notes = filtered;
  }
}
