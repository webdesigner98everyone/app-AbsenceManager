export type AbsenceType = 'F' | 'V' | 'VT' | 'C' | 'DF';

export interface Absence {
  id: number;
  employeeId: number;
  employeeName?: string;
  date: string; // yyyy-MM-dd
  type: AbsenceType;
  notes?: string;
}

export interface AbsenceSummary {
  employeeId: number;
  employeeName: string;
  flex: number;
  vacation: number;
  vacationTaken: number;
  compensatory: number;
  familyDay: number;
  total: number;
}

export const ABSENCE_LABELS: Record<AbsenceType, string> = {
  F: 'Flex / Permiso',
  V: 'Vacaciones',
  VT: 'Vacaciones Tomadas',
  C: 'Compensatorio',
  DF: 'Dia de la Familia'
};

export const ABSENCE_COLORS: Record<AbsenceType, string> = {
  F: '#FF9800',
  V: '#2196F3',
  VT: '#4CAF50',
  C: '#9C27B0',
  DF: '#E91E63'
};
