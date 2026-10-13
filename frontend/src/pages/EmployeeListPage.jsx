import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import EmployeeList from "../components/EmployeeList";
import { getAllEmployees, deleteEmployee } from "../api/employeeApi";
import { ROUTES } from "../utils/constants";

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>All Employees</h1>
          <p>Browse, edit, or remove team members</p>
        </div>

        {loading && <Loader message="Fetching employees..." />}

        {!loading && (
          <>
            <div className="list-toolbar">
              <span className="list-count">
                Total: <strong>{employees.length}</strong> employee
                {employees.length !== 1 ? "s" : ""}
              </span>
              <Link to={ROUTES.ADD_EMPLOYEE} className="btn btn-primary btn-sm">
                + Add Employee
              </Link>
            </div>

            <EmployeeList
              employees={employees}
              onDelete={handleDelete}
              loading={loading}
              error={error}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default EmployeeListPage;