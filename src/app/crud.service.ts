import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CricketersData } from './crud-table/crud-table.component';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private cricketersUrl = 'http://localhost:3000/cricketers'; // URL to web api

  constructor(private http: HttpClient) {}

  /** GET heroes from the server */
  getCricketersData(): Observable<CricketersData[]> {
    return this.http.get<CricketersData[]>(this.cricketersUrl);
  }

  /** POST: add a new hero to the database */
  addCricketer(cricketer: CricketersData): Observable<CricketersData> {
    return this.http.post<CricketersData>(this.cricketersUrl, cricketer);
  }

  /** PUT: update the hero on the server */
  updateCricketer(cricketer: CricketersData): Observable<any> {
    return this.http.put(this.cricketersUrl + '/' + cricketer.id, cricketer);
  }

  /** DELETE: delete the hero from the server */
  deleteCricketer(id: string) {
    return this.http.delete(this.cricketersUrl + '/' + id);
  }
}
