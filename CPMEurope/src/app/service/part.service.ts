import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Part } from '../class/part';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PartService {
  private partsUrl = 'api/parts';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(this.partsUrl)
      .pipe(
        tap(_ => this.log('fetched parts')),
        // catchError(this.handleError<Part[]>('getParts', []))
      );
  }

  getPartNo404<Data>(id: number): Observable<Part> {
    const url = `${this.partsUrl}/?id=${id}`;
    return this.http.get<Part[]>(url)
      .pipe(
        map(parts => parts[0]), // returns a {0|1} element array
        tap(p => {
          const outcome = p ? `fetched` : `did not find`;
          this.log(`${outcome} part id=${id}`);
        }),
        // catchError(this.handleError<Part>(`getPart id=${id}`))
      );
  }

  getPart(id: number): Observable<Part> {
    const url = `${this.partsUrl}/${id}`;
    return this.http.get<Part>(url).pipe(
      tap(_ => this.log(`fetched part id=${id}`)),
      // catchError(this.handleError<Part>(`getPart id=${id}`))
    );
  }

  searchParts(term: string): Observable<Part[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Part[]>(`${this.partsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found parts matching "${term}"`)),
      // catchError(this.handleError<Part[]>('searchParts', []))
    );
  }

  addPart (part: Part): Observable<Part> {
    return this.http.post<Part>(this.partsUrl, part, httpOptions).pipe(
      tap((part: Part) => this.log(`added part w/ id=${part.id}`)),
      // catchError(this.handleError<Part>('addPart'))
    );
  }

  deletePart (part: Part | number): Observable<Part> {
    const id = typeof part === 'number' ? part : part.id;
    const url = `${this.partsUrl}/${id}`;

    return this.http.delete<Part>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted part id=${id}`)),
      // catchError(this.handleError<Part>('deletePart'))
    );
  }

  updatePart (part: Part): Observable<any> {
    return this.http.put(this.partsUrl, part, httpOptions).pipe(
      tap(_ => this.log(`updated part id=${part.id}`)),
      // catchError(this.handleError<any>('updatePart'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`PartService: ${message}`);
  }
}
