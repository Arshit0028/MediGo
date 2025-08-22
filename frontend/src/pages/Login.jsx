import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [mode, setMode] = useState("signup"); // "signup" | "login"
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const { registerUser, loginUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "signup") {
      const success = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (success) window.location.href = "/"; // redirect only if success
    } else {
      const success = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      if (success) window.location.href = "/";
    }
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-light text-gray-800 tracking-wide mt-2 text-center">
          {mode === "signup" ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="mt-2 text-sm text-gray-500 text-center font-light">
          {mode === "signup"
            ? "Join us to begin your wellness journey."
            : "Please log in to manage your appointments."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="block text-sm font-light text-gray-600">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-300 focus:border-teal-300"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-light text-gray-600">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-300 focus:border-teal-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-light text-gray-600">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-300 focus:border-teal-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white bg-teal-500 hover:bg-teal-600 transition-colors"
          >
            {mode === "signup" ? "Create Account" : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {mode === "signup" ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="ml-2 text-teal-600 hover:text-teal-700 font-medium"
          >
            {mode === "signup" ? "Log in" : "Sign up here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
