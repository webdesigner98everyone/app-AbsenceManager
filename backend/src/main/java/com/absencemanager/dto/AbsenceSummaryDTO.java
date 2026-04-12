package com.absencemanager.dto;

public class AbsenceSummaryDTO {
    private Long employeeId;
    private String employeeName;
    private long flex;
    private long vacation;
    private long vacationTaken;
    private long compensatory;
    private long total;

    public AbsenceSummaryDTO(Long employeeId, String employeeName, long flex, long vacation, long vacationTaken, long compensatory) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.flex = flex;
        this.vacation = vacation;
        this.vacationTaken = vacationTaken;
        this.compensatory = compensatory;
        this.total = flex + vacation + vacationTaken + compensatory;
    }

    public Long getEmployeeId() { return employeeId; }
    public String getEmployeeName() { return employeeName; }
    public long getFlex() { return flex; }
    public long getVacation() { return vacation; }
    public long getVacationTaken() { return vacationTaken; }
    public long getCompensatory() { return compensatory; }
    public long getTotal() { return total; }
}
