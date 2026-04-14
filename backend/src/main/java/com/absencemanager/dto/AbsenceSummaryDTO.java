package com.absencemanager.dto;

public class AbsenceSummaryDTO {
    private Long employeeId;
    private String employeeName;
    private long flex;
    private long vacation;
    private long vacationTaken;
    private long compensatory;
    private long familyDay;
    private long total;

    public AbsenceSummaryDTO(Long employeeId, String employeeName, long flex, long vacation, long vacationTaken, long compensatory, long familyDay) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.flex = flex;
        this.vacation = vacation;
        this.vacationTaken = vacationTaken;
        this.compensatory = compensatory;
        this.familyDay = familyDay;
        this.total = flex + vacation + vacationTaken + compensatory + familyDay;
    }

    public Long getEmployeeId() { return employeeId; }
    public String getEmployeeName() { return employeeName; }
    public long getFlex() { return flex; }
    public long getVacation() { return vacation; }
    public long getVacationTaken() { return vacationTaken; }
    public long getCompensatory() { return compensatory; }
    public long getFamilyDay() { return familyDay; }
    public long getTotal() { return total; }
}
