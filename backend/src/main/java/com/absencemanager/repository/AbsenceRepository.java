package com.absencemanager.repository;

import com.absencemanager.model.Absence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface AbsenceRepository extends JpaRepository<Absence, Long> {

    List<Absence> findByEmployeeId(Long employeeId);

    @Query("SELECT a FROM Absence a WHERE YEAR(a.date) = :year AND MONTH(a.date) = :month")
    List<Absence> findByYearAndMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT a FROM Absence a WHERE YEAR(a.date) = :year")
    List<Absence> findByYear(@Param("year") int year);

    boolean existsByEmployeeIdAndDate(Long employeeId, LocalDate date);
}
