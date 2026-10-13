import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

// ============================================================
// EMPLOYEE CARD
// ============================================================
// Props:
//   employee  → { id, name, email, department, salary }
//   onDelete  → function(id) — parent handle karega
//   index     → number — for staggered animation delay

function EmployeeCard({ employee, onDelete, index = 0 }) {
  const { id, name, email, department, salary } = employee;

  // Initials nikaalo (e.g., "Priya Sharma" → "PS")
  const getInitials = (fullName) => {
    return fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  // Salary format (Indian style: 7,50,000)
  const formatSalary = (amount) => {
    if (amount == null) return "—";
    return "₹ " + Number(amount).toLocaleString("en-IN");
  };

  // Department ke hisaab se color class
  const getDeptClass = (dept) => {
    const map = {
      Engineering: "dept-engineering",
      "Human Resources": "dept-hr",
      Finance: "dept-finance",
      Marketing: "dept-marketing",
      Sales: "dept-sales",
      Operations: "dept-operations",
      Design: "dept-design",
      "Customer Support": "dept-support",
    };
    return map[dept] || "dept-default";
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?\n\nThis action cannot be undone.`
    );
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div
      className="employee-card glass-card"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* 🎨 Header — Avatar + Name + Email */}
      <div className="employee-card-header">
        <div className="employee-avatar">
          <span>{getInitials(name)}</span>
        </div>
        <div className="employee-info">
          <h3 className="employee-name">{name}</h3>
          <p className="employee-email" title={email}>
            {email}
          </p>
        </div>
      </div>

      {/* 📋 Body — Department + Salary */}
      <div className="employee-card-body">
        <div className="employee-detail">
          <span className="detail-label">Department</span>
          <span className={`dept-badge ${getDeptClass(department)}`}>
            {department}
          </span>
        </div>

        <div className="employee-detail">
          <span className="detail-label">Salary</span>
          <span className="employee-salary">{formatSalary(salary)}</span>
        </div>
      </div>

      {/* 🔘 Footer — Actions */}
      <div className="employee-card-footer">
        <Link
          to={ROUTES.editEmployee(id)}
          className="btn btn-secondary btn-sm card-action"
        >
          ✏️ Edit
        </Link>
        <button
          type="button"
          className="btn btn-danger btn-sm card-action"
          onClick={handleDelete}
        >
          🗑️ Delete
        </button>
      </div>

      {/* ID badge (small, top-right) */}
      <span className="employee-id-badge">#{id}</span>
    </div>
  );
}

export default EmployeeCard;