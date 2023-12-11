import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employeee';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  @Input() data: any[] = []
  @Input() type: 'employee' | 'department' = 'employee'
  @Output() submit = new EventEmitter<any>(); // Emit the updated data
  showEditModal: boolean = false;
  selectedElement: Employee | Department | undefined;

  displayedColumns: string[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.type === 'employee') {
      this.displayedColumns = ['name', 'email', 'managerName', 'departmentName']
    }
    else {
      this.displayedColumns = ['name', 'description', 'parentDepartmentName']
    }
  }

  displayEditModal(row: any) {
    this.selectedElement = row;
    this.showEditModal = true;
  }

  submitEdit(updatedData: any) {
    this.submit.emit();
    this.showEditModal = false;
  }
}
