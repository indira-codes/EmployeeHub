import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../utils/constants";

// ============================================================
// AXIOS INSTANCE
// ============================================================
// Ek hi instance banate hain — baseURL, headers sab yahan set
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// ============================================================
// REQUEST INTERCEPTOR (optional but useful)
// ============================================================
// Har request se pehle chalega — future mein auth token add kar sakte ho
api.interceptors.request.use(
  (config) => {
    // console.log("➡️ Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================
// Har response ke baad chalega — errors ko friendly banata hai
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Backend se aaya error message nikaalo
    let message = "Something went wrong. Please try again.";

    if (error.response) {
      // Server ne response diya but error status ke saath
      const data = error.response.data;

      // Validation errors (Map<String, String>) aate hain 400 pe
      if (typeof data === "object" && !Array.isArray(data)) {
        // { name: "...", email: "..." } form mein
        const firstKey = Object.keys(data)[0];
        if (firstKey) message = data[firstKey];
      } else if (typeof data === "string") {
        message = data; // "Employee not found with id: X"
      }
    } else if (error.request) {
      message = "Cannot reach server. Is backend running?";
    }

    // Custom error object banao taaki UI mein easily use ho
    return Promise.reject(new Error(message));
  }
);

// ============================================================
// EMPLOYEE API FUNCTIONS
// ============================================================

// ➕ CREATE EMPLOYEE  → POST /api/employees
export const createEmployee = async (employeeData) => {
  const response = await api.post(
    API_ENDPOINTS.CREATE_EMPLOYEE,
    employeeData
  );
  return response.data;
};

// 📋 GET ALL EMPLOYEES → GET /api/employees/Indira
export const getAllEmployees = async () => {
  const response = await api.get(API_ENDPOINTS.GET_ALL_EMPLOYEES);
  return response.data;
};

// 🔍 GET EMPLOYEE BY ID → GET /api/employees/{id}
export const getEmployeeById = async (id) => {
  const response = await api.get(API_ENDPOINTS.GET_EMPLOYEE_BY_ID(id));
  return response.data;
};

// ✏️ UPDATE EMPLOYEE → PUT /api/employees/{id}
export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(
    API_ENDPOINTS.UPDATE_EMPLOYEE(id),
    employeeData
  );
  return response.data;
};

// 🗑️ DELETE EMPLOYEE → DELETE /api/employees/{id}
export const deleteEmployee = async (id) => {
  await api.delete(API_ENDPOINTS.DELETE_EMPLOYEE(id));
  return id; // Return deleted id for convenience
};

export default api;