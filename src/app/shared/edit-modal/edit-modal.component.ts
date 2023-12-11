import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent {
  @Input() data: any; // Employee or Department
  @Input() type: 'employee' | 'department' | undefined;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>(); // Emit the updated data

  constructor(private departmentService: DepartmentService, private employeeService: EmployeesService) { }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    switch (this.type) {
      case 'employee':
        this.employeeService.updateEmployee(this.data).subscribe({
          next: () => {
            this.submit.emit();
          },
          error: (error) => {
            console.error('Error editing employee:', error);
            // Handle error (e.g., show user feedback)
          }
        });
        break
      case 'department':
        this.departmentService.updateDepartment(this.data).subscribe({
          next: () => {
            this.submit.emit();
          },
          error: (error) => {
            console.error('Error editing department:', error);
            // Handle error (e.g., show user feedback)
          }
        });
        break
      default:
        this.submit.emit(); // Pass the updated data back
    }
  }
  delete() {
    switch (this.type) {
      case 'employee':
        this.employeeService.deleteEmployee(this.data.id).subscribe({
          next: () => {
            this.submit.emit("delete");
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
            // Handle error (e.g., show user feedback)
          }
        });
        break;
      case 'department':
        this.departmentService.deleteDepartment(this.data.id).subscribe({
          next: () => {
            this.submit.emit("delete");
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
          }
        });
        break;
      default:
        console.error('Error deleting data');
        break;
    }
  }
}