import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Dashboard() {
  const navigate = useNavigate();

  // Get name from localStorage
  const name = localStorage.getItem("name") || "User";

  return (
    <div className="dashboard">
      <h2>Hello, {name} !</h2>

      <button onClick={() => navigate("/change-password")}>
        Change Password
      </button>

      <button onClick={() => navigate("/profile")}>
        Update Profile
      </button>

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
        style={{ background: "#dc3545" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;