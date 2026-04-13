package com.absencemanager.controller;

import com.absencemanager.service.HolidayService;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/holidays")
public class HolidayController {

    private final HolidayService service;

    public HolidayController(HolidayService service) {
        this.service = service;
    }

    @GetMapping
    public List<String> getHolidays(@RequestParam int year) {
        Set<LocalDate> holidays = service.getHolidays(year);
        return holidays.stream()
            .sorted()
            .map(LocalDate::toString)
            .collect(Collectors.toList());
    }
}
