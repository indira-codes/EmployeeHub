import { Link } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";
import { ROUTES } from "../utils/constants";

// ============================================================
// EMPLOYEE LIST
// ============================================================
// Props:
//   employees  → array of employee objects
//   onDelete   → function(id) — parent handles delete
//   loading    → boolean — while data is being fetched
//   error      → string — error message from API

function EmployeeList({ employees = [], onDelete, loading, error }) {
  // ============================================================
  // ERROR STATE
  // ============================================================
  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button
          className="btn btn-secondary"
          onClick={() => window.location.reload()}
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  // ============================================================
  // LOADING STATE
  // ============================================================
  // (Parent usually handles Loader separately, but safety ke liye)
  if (loading) {
    return null;
  }

  // ============================================================
  // EMPTY STATE
  // ============================================================
  if (!employees.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">👥</div>
        <h3>No employees yet</h3>
        <p>
          Your employee directory is empty. Add your first team member to get
          started.
        </p>
        <Link to={ROUTES.ADD_EMPLOYEE} className="btn btn-primary">
          + Add Your First Employee
        </Link>
      </div>
    );
  }

  // ============================================================
  // LIST RENDER
  // ============================================================
  return (
    <div className="employee-grid">
      {employees.map((employee, index) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onDelete={onDelete}
          index={index}
        />
      ))}
    </div>
  );
}

export default EmployeeList;