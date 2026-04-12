import { Component, OnInit } from '@angular/core';
import { AbsenceService, EmployeeService } from '../../core/services';
import { Absence, Employee, ABSENCE_COLORS, ABSENCE_LABELS, AbsenceType } from '../../core/models';

interface CalendarDay {
  day: number;
  dayOfWeek: string;
  isWeekend: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  employees: Employee[] = [];
  absences: Absence[] = [];
  days: CalendarDay[] = [];
  colors = ABSENCE_COLORS;
  labels = ABSENCE_LABELS;

  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  monthNames = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  dayNames = ['D','L','M','M','J','V','S'];

  private absenceMap = new Map<string, AbsenceType>();

  constructor(
    private absenceService: AbsenceService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
      this.loadMonth();
    });
  }

  loadMonth(): void {
    const daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.days = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.year, this.month - 1, d);
      const dow = date.getDay();
      this.days.push({ day: d, dayOfWeek: this.dayNames[dow], isWeekend: dow === 0 || dow === 6 });
    }

    this.absenceService.getByMonth(this.year, this.month).subscribe(data => {
      this.absences = data;
      this.absenceMap.clear();
      data.forEach(a => {
        const dayNum = parseInt(a.date.split('-')[2], 10);
        this.absenceMap.set(`${a.employeeId}-${dayNum}`, a.type);
      });
    });
  }

  getAbsence(employeeId: number, day: number): AbsenceType | null {
    return this.absenceMap.get(`${employeeId}-${day}`) || null;
  }

  prevMonth(): void {
    this.month--;
    if (this.month < 1) { this.month = 12; this.year--; }
    this.loadMonth();
  }

  nextMonth(): void {
    this.month++;
    if (this.month > 12) { this.month = 1; this.year++; }
    this.loadMonth();
  }
}
