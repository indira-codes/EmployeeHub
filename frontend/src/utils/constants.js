// ============================================================
// API CONFIGURATION
// ============================================================
// Backend base URL (Spring Boot default port)
export const BASE_URL = "http://localhost:8080";

// All API endpoints — centralized so backend changes ek jagah ho
export const API_ENDPOINTS = {
  // ⚠️ Backend mein getAll ka path /Indira hai (controller mein @GetMapping("/Indira"))
  GET_ALL_EMPLOYEES: "/api/employees/Indira",
  GET_EMPLOYEE_BY_ID: (id) => `/api/employees/${id}`,
  CREATE_EMPLOYEE: "/api/employees",
  UPDATE_EMPLOYEE: (id) => `/api/employees/${id}`,
  DELETE_EMPLOYEE: (id) => `/api/employees/${id}`,
};

// ============================================================
// FRONTEND ROUTES
// ============================================================
// React Router paths — har jagah magic strings avoid karne ke liye
export const ROUTES = {
  HOME: "/",
  EMPLOYEE_LIST: "/employees",
  ADD_EMPLOYEE: "/employees/add",
  EDIT_EMPLOYEE: "/employees/edit/:id",
  // Helper function — dynamic edit link banane ke liye
  editEmployee: (id) => `/employees/edit/${id}`,
};

// ============================================================
// UI CONSTANTS
// ============================================================
export const APP_NAME = "EmployeeHub";
export const APP_TAGLINE = "Premium Employee Management System";

// Department dropdown options (form mein use honge)
export const DEPARTMENTS = [
  "Engineering",
  "Human Resources",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
  "Design",
  "Customer Support",
];