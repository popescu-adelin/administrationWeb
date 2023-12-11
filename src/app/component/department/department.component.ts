import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  title = 'webClient';
  departments: Department[] = [];
  showModalForMoveDepartment: boolean = false;
  showModalForNewDepartment: boolean = false;
  constructor(
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.loadDepartments();

  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  afterAction() {
    this.showModalForMoveDepartment = false;
    this.showModalForNewDepartment = false;
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  openAddDepartmentModal() {
    this.showModalForNewDepartment = true;
  }
  openMoveDepartmentModal() {
    this.showModalForMoveDepartment = true
  }
}
