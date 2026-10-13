import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { createEmployee } from "../api/employeeApi";
import { ROUTES } from "../utils/constants";

function AddEmployeePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      await createEmployee(formData);
      navigate(ROUTES.EMPLOYEE_LIST);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Add New Employee</h1>
          <p>Fill in the details to onboard a new team member</p>
        </div>

        <div className="form-container">
          <div className="form-header">
            <h2>Employee Details</h2>
            <p>All fields are required</p>
          </div>

          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <EmployeeForm
            onSubmit={handleSubmit}
            submitLabel="Create Employee"
            loading={loading}
          />

          <div className="form-footer">
            <Link to={ROUTES.EMPLOYEE_LIST}>← Back to list</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployeePage;