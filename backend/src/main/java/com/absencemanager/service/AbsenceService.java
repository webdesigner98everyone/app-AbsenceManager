package com.absencemanager.service;

import com.absencemanager.dto.AbsenceDTO;
import com.absencemanager.dto.AbsenceSummaryDTO;
import com.absencemanager.exception.ResourceNotFoundException;
import com.absencemanager.model.Absence;
import com.absencemanager.model.AbsenceType;
import com.absencemanager.model.Employee;
import com.absencemanager.repository.AbsenceRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AbsenceService {

    private final AbsenceRepository repository;
    private final EmployeeService employeeService;

    public AbsenceService(AbsenceRepository repository, EmployeeService employeeService) {
        this.repository = repository;
        this.employeeService = employeeService;
    }

    public List<AbsenceDTO> findAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<AbsenceDTO> findByEmployee(Long employeeId) {
        return repository.findByEmployeeId(employeeId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<AbsenceDTO> findByMonth(int year, int month) {
        return repository.findByYearAndMonth(year, month).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<AbsenceSummaryDTO> getSummary(int year) {
        List<Absence> absences = repository.findByYear(year);
        Map<Long, List<Absence>> grouped = absences.stream()
            .collect(Collectors.groupingBy(a -> a.getEmployee().getId()));

        return grouped.entrySet().stream().map(entry -> {
            Employee emp = entry.getValue().get(0).getEmployee();
            List<Absence> list = entry.getValue();
            return new AbsenceSummaryDTO(
                emp.getId(),
                emp.getFullName(),
                list.stream().filter(a -> a.getType() == AbsenceType.F).count(),
                list.stream().filter(a -> a.getType() == AbsenceType.V).count(),
                list.stream().filter(a -> a.getType() == AbsenceType.VT).count(),
                list.stream().filter(a -> a.getType() == AbsenceType.C).count()
            );
        }).collect(Collectors.toList());
    }

    public AbsenceDTO create(AbsenceDTO dto) {
        if (repository.existsByEmployeeIdAndDate(dto.getEmployeeId(), dto.getDate())) {
            throw new IllegalArgumentException("Ya existe una ausencia para este empleado en esta fecha");
        }
        Absence absence = new Absence();
        absence.setEmployee(employeeService.findById(dto.getEmployeeId()));
        absence.setDate(dto.getDate());
        absence.setType(dto.getType());
        absence.setNotes(dto.getNotes());
        return toDTO(repository.save(absence));
    }

    public AbsenceDTO update(Long id, AbsenceDTO dto) {
        Absence absence = repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ausencia no encontrada: " + id));
        absence.setDate(dto.getDate());
        absence.setType(dto.getType());
        absence.setNotes(dto.getNotes());
        if (dto.getEmployeeId() != null) {
            absence.setEmployee(employeeService.findById(dto.getEmployeeId()));
        }
        return toDTO(repository.save(absence));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Ausencia no encontrada: " + id);
        }
        repository.deleteById(id);
    }

    private AbsenceDTO toDTO(Absence a) {
        AbsenceDTO dto = new AbsenceDTO();
        dto.setId(a.getId());
        dto.setEmployeeId(a.getEmployee().getId());
        dto.setEmployeeName(a.getEmployee().getFullName());
        dto.setDate(a.getDate());
        dto.setType(a.getType());
        dto.setNotes(a.getNotes());
        return dto;
    }
}
