import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

function NotFoundPage() {
  return (
    <div className="page">
      <div className="container flex-center" style={{ minHeight: "60vh" }}>
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Page Not Found</h3>
          <p>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to={ROUTES.HOME} className="btn btn-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;