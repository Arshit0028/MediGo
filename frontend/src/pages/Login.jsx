// src/pages/Login.jsx
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mode, setMode] = useState("signup"); // "signup" | "login"
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();
  const { registerUser, loginUser, token } = useContext(AppContext);

  // ---- Handle input changes ----
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ---- Submit ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "signup") {
      await registerUser({ name: formData.name, email: formData.email, password: formData.password });
    } else {
      await loginUser({ email: formData.email, password: formData.password });
    }
  };

  // ---- Redirect if logged in ----
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        {/* Title */}
        <p className="text-2xl font-semibold">
          {mode === "signup" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {mode === "signup" ? "sign up" : "log in"} to book an appointment
        </p>

        {/* Name (only for signup) */}
        {mode === "signup" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full">
          <p>Email</p>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p>Password</p>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        {/* Submit button */}
        <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {mode === "signup" ? "Create Account" : "Login"}
        </button>

        {/* Switch mode */}
        {mode === "signup" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setMode("login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setMode("signup")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
