import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private baseUrl = 'http://localhost:3000/api/notes'; // <- your backend URL

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, note);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/${note.id}`, note);
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}