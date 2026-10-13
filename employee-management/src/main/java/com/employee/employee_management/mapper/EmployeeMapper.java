package com.employee.employee_management.mapper;


import com.employee.employee_management.dto.request.EmployeeRequest;
import com.employee.employee_management.dto.response.EmployeeResponse;
import com.employee.employee_management.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {

    public Employee toEntity(EmployeeRequest request){

        Employee employee = new Employee();

        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setDepartment(request.getDepartment());
        employee.setSalary(request.getSalary());

        return employee;

    }

    public EmployeeResponse toResponse(Employee employee){

        EmployeeResponse response = new EmployeeResponse();

        response.setId(employee.getId());
        response.setName(employee.getName());
        response.setEmail(employee.getEmail());
        response.setDepartment(employee.getDepartment());
        response.setSalary(employee.getSalary());

        return  response;
    }


}
