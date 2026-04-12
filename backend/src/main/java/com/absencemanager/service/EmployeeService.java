package com.absencemanager.service;

import com.absencemanager.exception.ResourceNotFoundException;
import com.absencemanager.model.Employee;
import com.absencemanager.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> findAll() {
        return repository.findByActiveTrue();
    }

    public List<Employee> findAllIncludingInactive() {
        return repository.findAll();
    }

    public Employee findById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado: " + id));
    }

    public Employee create(Employee employee) {
        return repository.save(employee);
    }

    public Employee update(Long id, Employee data) {
        Employee emp = findById(id);
        emp.setFullName(data.getFullName());
        emp.setArea(data.getArea());
        emp.setActive(data.isActive());
        return repository.save(emp);
    }

    public void delete(Long id) {
        Employee emp = findById(id);
        emp.setActive(false); // soft delete
        repository.save(emp);
    }
}
