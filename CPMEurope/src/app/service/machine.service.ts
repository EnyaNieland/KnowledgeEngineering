import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Machine } from '../class/machine';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MachineService {
  private machinesUrl = 'api/machines';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.machinesUrl)
      .pipe(
        tap(_ => this.log('fetched machines')),
        // catchError(this.handleError<Machine[]>('getMachines', []))
      );
  }

  getMachineNo404<Data>(id: number): Observable<Machine> {
    const url = `${this.machinesUrl}/?id=${id}`;
    return this.http.get<Machine[]>(url)
      .pipe(
        map(machines => machines[0]), // returns a {0|1} element array
        tap(m => {
          const outcome = m ? `fetched` : `did not find`;
          this.log(`${outcome} machine id=${id}`);
        }),
        // catchError(this.handleError<Machine>(`getMachine id=${id}`))
      );
  }

  getMachine(id: number): Observable<Machine> {
    const url = `${this.machinesUrl}/${id}`;
    return this.http.get<Machine>(url).pipe(
      tap(_ => this.log(`fetched machine id=${id}`)),
      // catchError(this.handleError<Machine>(`getMachine id=${id}`))
    );
  }

  searchMachines(term: string): Observable<Machine[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Machine[]>(`${this.machinesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found machines matching "${term}"`)),
      // catchError(this.handleError<Machine[]>('searchMachines', []))
    );
  }

  addMachine (machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(this.machinesUrl, machine, httpOptions).pipe(
      tap((machine: Machine) => this.log(`added machine w/ id=${machine.id}`)),
      // catchError(this.handleError<Machine>('addMachine'))
    );
  }

  deleteMachine (machine: Machine | number): Observable<Machine> {
    const id = typeof machine === 'number' ? machine : machine.id;
    const url = `${this.machinesUrl}/${id}`;

    return this.http.delete<Machine>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted machine id=${id}`)),
      // catchError(this.handleError<Machine>('deleteMachine'))
    );
  }

  updateMachine (machine: Machine): Observable<any> {
    return this.http.put(this.machinesUrl, machine, httpOptions).pipe(
      tap(_ => this.log(`updated machine id=${machine.id}`)),
      // catchError(this.handleError<any>('updateMachine'))
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
    this.messageService.add(`MachineService: ${message}`);
  }
}
