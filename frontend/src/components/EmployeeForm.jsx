import { useState, useEffect } from "react";
import { DEPARTMENTS } from "../utils/constants";

// ============================================================
// EMPLOYEE FORM — Reusable for Add & Edit
// ============================================================
// Props:
//   initialData  → { name, email, department, salary } (edit ke time)
//   onSubmit     → function(formData) — parent handle karega
//   submitLabel  → button text ("Create Employee" / "Update Employee")
//   loading      → boolean — disable form during submit

function EmployeeForm({
  initialData = null,
  onSubmit,
  submitLabel = "Submit",
  loading = false,
}) {
  // ============================================================
  // FORM STATE
  // ============================================================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Edit mode mein initial data bharo
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        department: initialData.department || "",
        salary: initialData.salary ?? "",
      });
    }
  }, [initialData]);

  // ============================================================
  // VALIDATION (mirrors backend EmployeeRequest validation)
  // ============================================================
  const validate = (data) => {
    const newErrors = {};

    // Name
    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    } else if (data.name.length > 100) {
      newErrors.name = "Name cannot exceed 100 characters";
    }

    // Email
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (data.email.length > 150) {
      newErrors.email = "Email cannot exceed 150 characters";
    }

    // Department
    if (!data.department.trim()) {
      newErrors.department = "Department is required";
    } else if (data.department.length > 100) {
      newErrors.department = "Department cannot exceed 100 characters";
    }

    // Salary
    if (data.salary === "" || data.salary === null) {
      newErrors.salary = "Salary is required";
    } else if (isNaN(data.salary) || Number(data.salary) < 0) {
      newErrors.salary = "Salary cannot be negative";
    }

    return newErrors;
  };

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    // Agar field touch ho chuki hai, live re-validate
    if (touched[name]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [name]: newErrors[name],
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const newErrors = validate(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate(formData);
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      department: true,
      salary: true,
    });

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Salary ko number mein convert karke bhejo
    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
      salary: Number(formData.salary),
    });
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      {/* 👤 Name */}
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className={`form-control ${errors.name ? "error" : ""}`}
          placeholder="e.g. Priya Sharma"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          autoComplete="off"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      {/* 📧 Email */}
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          className={`form-control ${errors.email ? "error" : ""}`}
          placeholder="e.g. priya@company.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          autoComplete="off"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      {/* 🏢 Department (dropdown) */}
      <div className="form-group">
        <label htmlFor="department">Department</label>
        <select
          id="department"
          name="department"
          className={`form-control ${errors.department ? "error" : ""}`}
          value={formData.department}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        >
          <option value="">-- Select Department --</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors.department && (
          <span className="error-text">{errors.department}</span>
        )}
      </div>

      {/* 💰 Salary */}
      <div className="form-group">
        <label htmlFor="salary">Salary (₹ / year)</label>
        <input
          id="salary"
          name="salary"
          type="number"
          className={`form-control ${errors.salary ? "error" : ""}`}
          placeholder="e.g. 750000"
          value={formData.salary}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          min="0"
          step="1000"
          autoComplete="off"
        />
        {errors.salary && <span className="error-text">{errors.salary}</span>}
      </div>

      {/* 🚀 Submit */}
      <button
        type="submit"
        className="btn btn-primary employee-form-submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="btn-spinner"></span>
            Processing...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}

export default EmployeeForm;