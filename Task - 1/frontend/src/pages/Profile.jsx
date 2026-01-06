import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Auth.css";

function Profile() {
  const [form, setForm] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.put("/update-profile", form);
    localStorage.setItem("name", form.name);
    alert(res.data.message);
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>

      <input name="name" placeholder="New Name" onChange={handleChange} />
      <input name="email" placeholder="New Email" onChange={handleChange} />

      <button onClick={handleSubmit}>Update</button>
    </div>
  );
}

export default Profile;
