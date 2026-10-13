package com.employee.employee_management.dto.response;


import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@JsonPropertyOrder({"id", "name", "email", "department", "salary"})

public class EmployeeResponse {

    private Long id;

    private String name;

    private String email;

    private String department;

    private Double salary;

}
