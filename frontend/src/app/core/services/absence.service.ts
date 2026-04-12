import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Absence, AbsenceSummary } from '../models';
import { environment } from '../../environments/environment';

export interface AbsenceRange {
  employeeId: number;
  startDate: string;
  endDate: string;
  type: string;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  private url = `${environment.apiUrl}/absences`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Absence[]> {
    return this.http.get<Absence[]>(this.url);
  }

  getByEmployee(employeeId: number): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.url}/employee/${employeeId}`);
  }

  getByMonth(year: number, month: number): Observable<Absence[]> {
    const params = new HttpParams().set('year', year).set('month', month);
    return this.http.get<Absence[]>(`${this.url}/month`, { params });
  }

  getSummary(year: number): Observable<AbsenceSummary[]> {
    return this.http.get<AbsenceSummary[]>(`${this.url}/summary`, {
      params: new HttpParams().set('year', year)
    });
  }

  create(absence: Partial<Absence>): Observable<Absence> {
    return this.http.post<Absence>(this.url, absence);
  }

  createRange(range: AbsenceRange): Observable<Absence[]> {
    return this.http.post<Absence[]>(`${this.url}/range`, range);
  }

  update(id: number, absence: Partial<Absence>): Observable<Absence> {
    return this.http.put<Absence>(`${this.url}/${id}`, absence);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
