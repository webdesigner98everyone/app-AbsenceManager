import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services';
import { Employee } from '../../core/models';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText = '';
  showForm = false;
  showConfirmDelete = false;
  deleteTarget: Employee | null = null;
  editingEmployee: Employee | null = null;
  form: Partial<Employee> = { fullName: '', area: 'Integraciones', active: true };
  errors: { [key: string]: string } = {};

  constructor(
    private employeeService: EmployeeService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
      this.filterEmployees();
    });
  }

  filterEmployees(): void {
    const text = this.searchText.toLowerCase().trim();
    if (!text) {
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees.filter(e =>
        e.fullName.toLowerCase().includes(text) ||
        e.area.toLowerCase().includes(text)
      );
    }
  }

  openCreate(): void {
    this.editingEmployee = null;
    this.form = { fullName: '', area: 'Integraciones', active: true };
    this.errors = {};
    this.showForm = true;
  }

  openEdit(emp: Employee): void {
    this.editingEmployee = emp;
    this.form = { ...emp };
    this.errors = {};
    this.showForm = true;
  }

  validate(): boolean {
    this.errors = {};
    if (!this.form.fullName || this.form.fullName.trim().length === 0) {
      this.errors['fullName'] = 'El nombre es obligatorio';
    } else if (this.form.fullName.trim().length < 3) {
      this.errors['fullName'] = 'El nombre debe tener al menos 3 caracteres';
    }
    if (!this.form.area || this.form.area.trim().length === 0) {
      this.errors['area'] = 'El area es obligatoria';
    }
    return Object.keys(this.errors).length === 0;
  }

  save(): void {
    if (!this.validate()) {
      this.toast.warning('Por favor corrige los campos marcados en rojo');
      return;
    }

    if (this.editingEmployee) {
      this.employeeService.update(this.editingEmployee.id, this.form).subscribe({
        next: () => {
          this.showForm = false;
          this.toast.success('Empleado actualizado correctamente');
          this.loadEmployees();
        },
        error: () => this.toast.error('Error al actualizar el empleado')
      });
    } else {
      this.employeeService.create(this.form).subscribe({
        next: () => {
          this.showForm = false;
          this.toast.success('Empleado creado correctamente');
          this.loadEmployees();
        },
        error: () => this.toast.error('Error al crear el empleado')
      });
    }
  }

  confirmDelete(emp: Employee): void {
    this.deleteTarget = emp;
    this.showConfirmDelete = true;
  }

  deleteEmployee(): void {
    if (!this.deleteTarget) return;
    this.employeeService.delete(this.deleteTarget.id).subscribe({
      next: () => {
        this.showConfirmDelete = false;
        this.deleteTarget = null;
        this.toast.success('Empleado eliminado correctamente');
        this.loadEmployees();
      },
      error: () => this.toast.error('Error al eliminar el empleado')
    });
  }

  cancelDelete(): void {
    this.showConfirmDelete = false;
    this.deleteTarget = null;
  }

  cancel(): void {
    this.showForm = false;
  }
}
