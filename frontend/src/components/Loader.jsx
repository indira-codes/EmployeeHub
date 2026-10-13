// ============================================================
// LOADER COMPONENT
// ============================================================
// Premium loading spinner with:
//  - Dual rotating rings
//  - Pulsing center dot
//  - Optional message
// Usage: <Loader /> or <Loader message="Loading employees..." />

function Loader({ message = "Loading..." }) {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="loader-ring loader-ring-1"></div>
        <div className="loader-ring loader-ring-2"></div>
        <div className="loader-dot"></div>
      </div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
}

export default Loader;