import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EmployeeListPage from "./pages/EmployeeListPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";
import NotFoundPage from "./pages/NotFoundPage";

// ============================================================
// ROOT COMPONENT
// ============================================================
// Navbar hamesha visible rahega (top pe)
// Neeche Routes ke through pages switch honge

function App() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Routes>
          {/* 🏠 Home */}
          <Route path="/" element={<HomePage />} />

          {/* 📋 All Employees */}
          <Route path="/employees" element={<EmployeeListPage />} />

          {/* ➕ Add Employee */}
          <Route path="/employees/add" element={<AddEmployeePage />} />

          {/* ✏️ Edit Employee */}
          <Route path="/employees/edit/:id" element={<EditEmployeePage />} />

          {/* ❌ 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;