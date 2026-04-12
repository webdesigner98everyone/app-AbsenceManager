import { Component, OnInit } from '@angular/core';
import { AbsenceService, EmployeeService } from '../../core/services';
import { Absence, AbsenceType, Employee, ABSENCE_LABELS, ABSENCE_COLORS } from '../../core/models';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss']
})
export class AbsencesComponent implements OnInit {
  absences: Absence[] = [];
  employees: Employee[] = [];
  labels = ABSENCE_LABELS;
  colors = ABSENCE_COLORS;
  absenceTypes: AbsenceType[] = ['F', 'V', 'VT', 'C'];

  showForm = false;
  showConfirmDelete = false;
  deleteTarget: Absence | null = null;
  editingAbsence: Absence | null = null;
  form: Partial<Absence> = {};
  errors: { [key: string]: string } = {};

  filterEmployee = 0;
  filterYear = new Date().getFullYear();
  filterMonth = new Date().getMonth() + 1;

  constructor(
    private absenceService: AbsenceService,
    private employeeService: EmployeeService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.employeeService.getAll().subscribe(data => this.employees = data);
    this.loadAbsences();
  }

  loadAbsences(): void {
    const empId = Number(this.filterEmployee);
    if (empId > 0) {
      this.absenceService.getByEmployee(empId).subscribe(data => this.absences = data);
    } else {
      this.absenceService.getByMonth(this.filterYear, this.filterMonth).subscribe(data => this.absences = data);
    }
  }

  openCreate(): void {
    this.editingAbsence = null;
    this.form = { type: 'F', date: new Date().toISOString().split('T')[0] };
    this.errors = {};
    this.showForm = true;
  }

  openEdit(absence: Absence): void {
    this.editingAbsence = absence;
    this.form = { ...absence };
    this.errors = {};
    this.showForm = true;
  }

  validate(): boolean {
    this.errors = {};
    if (!this.form.employeeId) {
      this.errors['employeeId'] = 'Debe seleccionar un empleado';
    }
    if (!this.form.date) {
      this.errors['date'] = 'La fecha es obligatoria';
    }
    if (!this.form.type) {
      this.errors['type'] = 'Debe seleccionar un tipo de ausencia';
    }
    return Object.keys(this.errors).length === 0;
  }

  save(): void {
    if (!this.validate()) {
      this.toast.warning('Por favor corrige los campos marcados en rojo');
      return;
    }

    if (this.editingAbsence) {
      this.absenceService.update(this.editingAbsence.id, this.form).subscribe({
        next: () => {
          this.showForm = false;
          this.toast.success('Ausencia actualizada correctamente');
          this.loadAbsences();
        },
        error: (err) => {
          if (err.status === 400) {
            this.toast.error('Ya existe una ausencia para este empleado en esta fecha');
          } else {
            this.toast.error('Error al actualizar la ausencia');
          }
        }
      });
    } else {
      this.absenceService.create(this.form).subscribe({
        next: () => {
          this.showForm = false;
          this.toast.success('Ausencia registrada correctamente');
          this.loadAbsences();
        },
        error: (err) => {
          if (err.status === 400) {
            this.toast.error('Ya existe una ausencia para este empleado en esta fecha');
          } else {
            this.toast.error('Error al registrar la ausencia');
          }
        }
      });
    }
  }

  confirmDelete(absence: Absence): void {
    this.deleteTarget = absence;
    this.showConfirmDelete = true;
  }

  deleteAbsence(): void {
    if (!this.deleteTarget) return;
    this.absenceService.delete(this.deleteTarget.id).subscribe({
      next: () => {
        this.showConfirmDelete = false;
        this.deleteTarget = null;
        this.toast.success('Ausencia eliminada correctamente');
        this.loadAbsences();
      },
      error: () => this.toast.error('Error al eliminar la ausencia')
    });
  }

  cancelDelete(): void {
    this.showConfirmDelete = false;
    this.deleteTarget = null;
  }

  cancel(): void { this.showForm = false; }
}
