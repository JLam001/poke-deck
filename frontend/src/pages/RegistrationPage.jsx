import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // You can handle the response as needed
      // Clear form and any error messages
      setFormData({
        user_name: "",
        email: "",
        password: "",
        role: "",
      });
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setErrorMessage(
        "An error occurred while registering. Please try again later."
      );
    }
  };

  return (
    <div>
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input
            type='text'
            name='user_name'
            value={formData.user_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type='text'
            name='role'
            value={formData.role}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};
