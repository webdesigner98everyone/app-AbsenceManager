package com.absencemanager.service;

import org.springframework.stereotype.Service;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.HashSet;
import java.util.Set;

@Service
public class HolidayService {

    public Set<LocalDate> getHolidays(int year) {
        Set<LocalDate> holidays = new HashSet<>();

        // Festivos fijos
        holidays.add(LocalDate.of(year, 1, 1));   // Año Nuevo
        holidays.add(LocalDate.of(year, 5, 1));   // Día del Trabajo
        holidays.add(LocalDate.of(year, 7, 20));  // Grito de Independencia
        holidays.add(LocalDate.of(year, 8, 7));   // Batalla de Boyacá
        holidays.add(LocalDate.of(year, 12, 8));  // Inmaculada Concepción
        holidays.add(LocalDate.of(year, 12, 25)); // Navidad

        // Festivos con Ley Emiliani (se trasladan al lunes siguiente)
        holidays.add(toNextMonday(LocalDate.of(year, 1, 6)));   // Reyes Magos
        holidays.add(toNextMonday(LocalDate.of(year, 3, 19)));  // San José
        holidays.add(toNextMonday(LocalDate.of(year, 6, 29)));  // San Pedro y San Pablo
        holidays.add(toNextMonday(LocalDate.of(year, 8, 15)));  // Asunción de la Virgen
        holidays.add(toNextMonday(LocalDate.of(year, 10, 12))); // Día de la Raza
        holidays.add(toNextMonday(LocalDate.of(year, 11, 1)));  // Todos los Santos
        holidays.add(toNextMonday(LocalDate.of(year, 11, 11))); // Independencia de Cartagena

        // Festivos basados en Pascua
        LocalDate easter = calculateEaster(year);
        holidays.add(easter.minusDays(3));  // Jueves Santo
        holidays.add(easter.minusDays(2));  // Viernes Santo
        holidays.add(toNextMonday(easter.plusDays(43)));  // Ascensión del Señor
        holidays.add(toNextMonday(easter.plusDays(64)));  // Corpus Christi
        holidays.add(toNextMonday(easter.plusDays(71)));  // Sagrado Corazón

        return holidays;
    }

    public boolean isHoliday(LocalDate date) {
        return getHolidays(date.getYear()).contains(date);
    }

    public boolean isNonWorkingDay(LocalDate date) {
        DayOfWeek dow = date.getDayOfWeek();
        return dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY || isHoliday(date);
    }

    private LocalDate toNextMonday(LocalDate date) {
        if (date.getDayOfWeek() == DayOfWeek.MONDAY) return date;
        return date.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
    }

    // Algoritmo de Butcher para calcular Pascua
    private LocalDate calculateEaster(int year) {
        int a = year % 19;
        int b = year / 100;
        int c = year % 100;
        int d = b / 4;
        int e = b % 4;
        int f = (b + 8) / 25;
        int g = (b - f + 1) / 3;
        int h = (19 * a + b - d - g + 15) % 30;
        int i = c / 4;
        int k = c % 4;
        int l = (32 + 2 * e + 2 * i - h - k) % 7;
        int m = (a + 11 * h + 22 * l) / 451;
        int month = (h + l - 7 * m + 114) / 31;
        int day = ((h + l - 7 * m + 114) % 31) + 1;
        return LocalDate.of(year, month, day);
    }
}
