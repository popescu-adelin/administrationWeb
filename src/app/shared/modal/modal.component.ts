import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employeee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() isVisible = false;
  @Input() type: 'employee' | 'department' | 'moveDepartment' = 'employee';
  @Input() title = '';
  @Output() close = new EventEmitter<any>();
  data: any = {};

  constructor(private employeeService: EmployeesService, private departmentService: DepartmentService) { }

  onClose() {
    this.isVisible = false;
    this.close.emit();
  }
  onSubmit() {
    switch (this.type) {
      case 'employee':
        this.employeeService.addEmployee(this.data).subscribe({
          next: () => {
            this.close.emit();
          },
          error: (error) => {
            console.error('Error creating a new employee:', error);
            // Handle error (e.g., show user feedback)
          }

        });
        break;
      case 'department':
        this.departmentService.addDepartment(this.data).subscribe({
          next: () => {
            this.close.emit();
          },
          error: (error) => {
            console.error('Error creating a new employee:', error);
            // Handle error (e.g., show user feedback)
          }

        });
        break;
      case 'moveDepartment':
        this.departmentService.moveDepartment(this.data).subscribe({
          next: () => {
            this.close.emit();
          },
          error: (error) => {
            console.error('Error creating a new employee:', error);
            // Handle error (e.g., show user feedback)
          }

        });
        break;
      default:
        this.close.emit();
        break;
    }
  }
}
