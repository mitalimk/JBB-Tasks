import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Auth.css";

function ChangePassword() {
  const [form, setForm] = useState({ oldPass: "", newPass: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError(""); // clear error while typing
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await API.post("/change-password", form);
  
      if (res.data.message !== "Password changed successfully") {
        setError(res.data.message);
        return;
      }
  
      navigate("/dashboard");
    } catch (err) {
      setError("Password change failed");
    }
  };
  
  return (
    <div className="container">
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="oldPass"
          type="password"
          placeholder="Old Password"
          onChange={handleChange}
          required
        />

        <input
          name="newPass"
          type="password"
          placeholder="New Password"
          onChange={handleChange}
          required
        />

        {error && <div className="error-text">{error}</div>}

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
