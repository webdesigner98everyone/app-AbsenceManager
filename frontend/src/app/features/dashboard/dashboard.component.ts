import { Component, OnInit } from '@angular/core';
import { AbsenceService, EmployeeService } from '../../core/services';
import { AbsenceSummary, Employee, ABSENCE_LABELS, ABSENCE_COLORS, AbsenceType } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  summaries: AbsenceSummary[] = [];
  employees: Employee[] = [];
  currentYear = new Date().getFullYear();
  labels = ABSENCE_LABELS;
  colors = ABSENCE_COLORS;
  absenceTypes: AbsenceType[] = ['F', 'V', 'VT', 'C'];
  totalFlex = 0;
  totalVacation = 0;
  totalVacationTaken = 0;
  totalCompensatory = 0;

  constructor(
    private absenceService: AbsenceService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.employeeService.getAll().subscribe(emps => this.employees = emps);
    this.absenceService.getSummary(this.currentYear).subscribe(data => {
      this.summaries = data;
      this.totalFlex = data.reduce((s, d) => s + d.flex, 0);
      this.totalVacation = data.reduce((s, d) => s + d.vacation, 0);
      this.totalVacationTaken = data.reduce((s, d) => s + d.vacationTaken, 0);
      this.totalCompensatory = data.reduce((s, d) => s + d.compensatory, 0);
    });
  }

  exportExcel(): void {
    const header = ['Empleado', 'Flex/Permiso', 'Vacaciones', 'Vac. Tomadas', 'Compensatorio', 'Total'];
    const rows = this.summaries.map(s =>
      [s.employeeName, s.flex, s.vacation, s.vacationTaken, s.compensatory, s.total]
    );
    rows.push(['TOTAL', this.totalFlex, this.totalVacation, this.totalVacationTaken, this.totalCompensatory,
      this.totalFlex + this.totalVacation + this.totalVacationTaken + this.totalCompensatory]);

    let csv = '\uFEFF'; // BOM para Excel
    csv += header.join(';') + '\n';
    rows.forEach(r => csv += r.join(';') + '\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_Ausencias_${this.currentYear}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
