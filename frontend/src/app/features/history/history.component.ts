import { Component, OnInit } from '@angular/core';
import { AbsenceService, EmployeeService } from '../../core/services';
import { Absence, Employee, ABSENCE_LABELS, ABSENCE_COLORS, AbsenceType } from '../../core/models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  employees: Employee[] = [];
  absences: Absence[] = [];
  selectedEmployee = 0;
  labels = ABSENCE_LABELS;
  colors = ABSENCE_COLORS;

  totalFlex = 0;
  totalVacation = 0;
  totalVacationTaken = 0;
  totalCompensatory = 0;
  totalDays = 0;

  constructor(
    private absenceService: AbsenceService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  loadHistory(): void {
    const empId = Number(this.selectedEmployee);
    if (empId <= 0) {
      this.absences = [];
      this.clearTotals();
      return;
    }
    this.absenceService.getByEmployee(empId).subscribe(data => {
      this.absences = data;
      this.totalFlex = data.filter(a => a.type === 'F').length;
      this.totalVacation = data.filter(a => a.type === 'V').length;
      this.totalVacationTaken = data.filter(a => a.type === 'VT').length;
      this.totalCompensatory = data.filter(a => a.type === 'C').length;
      this.totalDays = data.length;
    });
  }

  getEmployeeName(): string {
    const emp = this.employees.find(e => e.id === Number(this.selectedEmployee));
    return emp ? emp.fullName : '';
  }

  exportHistory(): void {
    if (this.absences.length === 0) return;
    const name = this.getEmployeeName();
    const header = ['Fecha', 'Tipo', 'Descripcion', 'Notas'];
    const rows = this.absences.map(a => [a.date, a.type, this.labels[a.type], a.notes || '']);
    rows.push(['', '', 'TOTAL', this.totalDays.toString()]);

    let csv = '\uFEFF';
    csv += `Historial de Ausencias - ${name}\n\n`;
    csv += header.join(';') + '\n';
    rows.forEach(r => csv += r.join(';') + '\n');
    csv += `\nResumen:\nFlex/Permiso;${this.totalFlex}\nVacaciones;${this.totalVacation}\nVac. Tomadas;${this.totalVacationTaken}\nCompensatorio;${this.totalCompensatory}\nTotal;${this.totalDays}`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Historial_${name.replace(/ /g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  private clearTotals(): void {
    this.totalFlex = this.totalVacation = this.totalVacationTaken = this.totalCompensatory = this.totalDays = 0;
  }
}
