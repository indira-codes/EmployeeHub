package com.employee.employee_management.service.impl;

import com.employee.employee_management.dto.request.EmployeeRequest;
import com.employee.employee_management.dto.response.EmployeeResponse;
import com.employee.employee_management.entity.Employee;
import com.employee.employee_management.exception.EmployeeNotFoundException;
import com.employee.employee_management.mapper.EmployeeMapper;
import com.employee.employee_management.repository.EmployeeRepository;
import com.employee.employee_management.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeemapper;

    @Override
    public EmployeeResponse createEmployee(EmployeeRequest request) {

        Employee employee = employeemapper.toEntity(request);
          Employee savedEmployee = employeeRepository.save(employee);

          return employeemapper.toResponse(savedEmployee);
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(employeemapper::toResponse)
                .toList();
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(
                        "Employee not found with id: " +id

                ));

        return employeemapper.toResponse(employee);
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(
                        "Employee not found with id: " + id
                ));

        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setDepartment(request.getDepartment());
        employee.setSalary(request.getSalary());

        Employee updatedEmployee = employeeRepository.save(employee);

        return employeemapper.toResponse(updatedEmployee);

    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(
                        "Employee not found with id: " + id
                ));
        employeeRepository.delete(employee);

    }
}
