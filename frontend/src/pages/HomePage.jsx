import "../styles/home.css";
import { Link } from "react-router-dom";
import { APP_NAME, APP_TAGLINE, ROUTES } from "../utils/constants";

// ============================================================
// HOME PAGE — Landing / Hero
// ============================================================

function HomePage() {
  // Features cards data
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      desc: "Built on Spring Boot + React. CRUD operations in milliseconds.",
    },
    {
      icon: "🔒",
      title: "Robust Validation",
      desc: "Backend + frontend validation keeps your data clean and safe.",
    },
    {
      icon: "🎨",
      title: "Premium UI",
      desc: "Glassmorphism, gradients, and buttery animations throughout.",
    },
    {
      icon: "📊",
      title: "Full CRUD",
      desc: "Create, read, update, and delete employees with ease.",
    },
  ];

  return (
    <div className="page home-page">
      <div className="container">
        {/* ============================================================
            HERO SECTION
            ============================================================ */}
        <section className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>Now live · v1.0</span>
          </div>

          <h1 className="hero-title">
            Manage your team <br />
            with <span className="text-gradient">effortless precision</span>
          </h1>

          <p className="hero-subtitle">
            {APP_NAME} is a {APP_TAGLINE.toLowerCase()} — sleek, fast, and built
            for modern teams who care about the details.
          </p>

          <div className="hero-actions">
            <Link to={ROUTES.EMPLOYEE_LIST} className="btn btn-primary btn-lg">
              👥 View All Employees
            </Link>
            <Link to={ROUTES.ADD_EMPLOYEE} className="btn btn-secondary btn-lg">
              + Add New Employee
            </Link>
          </div>

          {/* Decorative floating orbs */}
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </section>

        {/* ============================================================
            FEATURES GRID
            ============================================================ */}
        <section className="features">
          <div className="features-header">
            <h2>Everything you need</h2>
            <p>Powerful features packed into a beautiful interface</p>
          </div>

          <div className="features-grid">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="feature-card glass-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            STATS STRIP
            ============================================================ */}
        <section className="stats-strip glass-card">
          <div className="stat">
            <span className="stat-value">100%</span>
            <span className="stat-label">REST API</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value">5</span>
            <span className="stat-label">Endpoints</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value">∞</span>
            <span className="stat-label">Scalability</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Availability</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;