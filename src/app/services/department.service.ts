import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../models/department';
import { Observable } from 'rxjs';
import { MoveDepartmentModel } from '../models/moveDepartment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = 'http://localhost:8080/api/department'; // Adjust as needed

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.baseUrl, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(this.baseUrl, department);
  }

  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  moveDepartment(moveData: MoveDepartmentModel): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/moveDepartment`, moveData);
  }
}
