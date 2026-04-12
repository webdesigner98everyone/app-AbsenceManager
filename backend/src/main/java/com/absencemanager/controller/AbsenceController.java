package com.absencemanager.controller;

import com.absencemanager.dto.AbsenceDTO;
import com.absencemanager.dto.AbsenceRangeDTO;
import com.absencemanager.dto.AbsenceSummaryDTO;
import com.absencemanager.service.AbsenceService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/absences")
public class AbsenceController {

    private final AbsenceService service;

    public AbsenceController(AbsenceService service) {
        this.service = service;
    }

    @GetMapping
    public List<AbsenceDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/employee/{employeeId}")
    public List<AbsenceDTO> getByEmployee(@PathVariable Long employeeId) {
        return service.findByEmployee(employeeId);
    }

    @GetMapping("/month")
    public List<AbsenceDTO> getByMonth(@RequestParam int year, @RequestParam int month) {
        return service.findByMonth(year, month);
    }

    @GetMapping("/summary")
    public List<AbsenceSummaryDTO> getSummary(@RequestParam int year) {
        return service.getSummary(year);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AbsenceDTO create(@RequestBody AbsenceDTO dto) {
        return service.create(dto);
    }

    @PostMapping("/range")
    @ResponseStatus(HttpStatus.CREATED)
    public List<AbsenceDTO> createRange(@RequestBody AbsenceRangeDTO dto) {
        return service.createRange(dto);
    }

    @PutMapping("/{id}")
    public AbsenceDTO update(@PathVariable Long id, @RequestBody AbsenceDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
