import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employeee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
  title = 'webClient';
  employees: Employee[] = [];
  departments: Department[] = [];
  filteredEmployees: Employee[] = [];
  showModal: boolean = false;
  constructor(
    private employeeService: EmployeesService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
  }

  filterByDepartment(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Cast to specific type
    const deptName = selectElement.value;
    if (deptName) {
      this.filteredEmployees = this.employees.filter(emp => emp.departmentName === deptName);
    } else {
      this.filteredEmployees = this.employees;
    }
  }


  loadDepartments() {
    this.departmentService.getDepartments().subscribe(depts => {
      this.departments = depts;
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    })
  }

  openAddEmployeeModal() {
    this.showModal = true
  }

  afterAction() {
    this.showModal = false;
    this.ngOnInit()
  }
}
