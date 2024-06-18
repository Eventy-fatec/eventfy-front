import { Injectable } from '@angular/core';
import { ICreateEvent, IEvent } from '../models/event.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url = `${environment.api}/events`;

  constructor(private http: HttpClient) { }

  createEvent(event: ICreateEvent): Observable<void> {
    return this.http.post<void>(this.url, event);
  }

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.url);
  }

  findEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.url}/${id}`);
  }

  updateEvent(event: IEvent): Observable<void> {
    return this.http.put<void>(`${this.url}/${event.id}`, Event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
