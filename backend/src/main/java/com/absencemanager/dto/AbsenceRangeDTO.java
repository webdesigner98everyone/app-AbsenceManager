package com.absencemanager.dto;

import com.absencemanager.model.AbsenceType;
import java.time.LocalDate;

public class AbsenceRangeDTO {
    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private AbsenceType type;
    private String notes;

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public AbsenceType getType() { return type; }
    public void setType(AbsenceType type) { this.type = type; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
