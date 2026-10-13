import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import EmployeeForm from "../components/EmployeeForm";
import { getEmployeeById, updateEmployee } from "../api/employeeApi";
import { ROUTES } from "../utils/constants";

function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError(null);
      await updateEmployee(id, formData);
      navigate(ROUTES.EMPLOYEE_LIST);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Edit Employee</h1>
          <p>Update the details and save changes</p>
        </div>

        {loading && <Loader message="Loading employee..." />}

        {!loading && error && !employee && (
          <div className="form-container">
            <div className="alert alert-error">⚠️ {error}</div>
            <div className="form-footer">
              <Link to={ROUTES.EMPLOYEE_LIST}>← Back to list</Link>
            </div>
          </div>
        )}

        {!loading && employee && (
          <div className="form-container">
            <div className="form-header">
              <h2>Update Details</h2>
              <p>Editing employee #{id}</p>
            </div>

            {error && <div className="alert alert-error">⚠️ {error}</div>}

            <EmployeeForm
              initialData={employee}
              onSubmit={handleSubmit}
              submitLabel="Update Employee"
              loading={saving}
            />

            <div className="form-footer">
              <Link to={ROUTES.EMPLOYEE_LIST}>← Back to list</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditEmployeePage;