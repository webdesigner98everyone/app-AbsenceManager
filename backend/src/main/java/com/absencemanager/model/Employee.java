package com.absencemanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String fullName;

    @NotBlank
    private String area;

    private boolean active = true;

    public Employee() {}

    public Employee(String fullName, String area) {
        this.fullName = fullName;
        this.area = area;
        this.active = true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
