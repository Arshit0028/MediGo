import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, userData, logout } = useContext(AppContext);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="h-12 w-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
          src="/top.png"
          alt="logo"
        />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {["HOME", "ALL DOCTORS", "ABOUT", "CONTACT", "SERVICES"].map((item, idx) => (
            <NavLink
              key={idx}
              to={
                item === "HOME"
                  ? "/"
                  : item === "ALL DOCTORS"
                  ? "/doctors"
                  : item === "SERVICES"
                  ? "/services"
                  : `/${item.toLowerCase()}`
              }
              className={({ isActive }) =>
                `relative transition-colors duration-300 hover:text-blue-600 ${
                  isActive ? "text-blue-600" : ""
                }`
              }
            >
              <span className="pb-1">{item}</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            // Logged-in user dropdown
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  className="w-9 h-9 rounded-full object-cover border shadow-sm"
                  src={userData.image || assets.default_user}
                  alt="profile"
                />
                <img
                  className="w-3 transition-transform duration-300 group-hover:rotate-180"
                  src={assets.dropdown_icon}
                  alt="dropdown"
                />
              </div>

              {/* Animated Dropdown */}
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            // If user not logged in
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 hidden md:block"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-7 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt="menu"
          />
        </div>
      </div>

      {/* Mobile Menu Slide-in */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-64 bg-white h-full shadow-xl p-6 flex flex-col gap-6 animate-slideIn">
            <button
              onClick={() => setShowMenu(false)}
              className="self-end text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {["HOME", "ALL DOCTORS", "ABOUT", "CONTACT", "SERVICES"].map((item, idx) => (
              <NavLink
                key={idx}
                to={
                  item === "HOME"
                    ? "/"
                    : item === "ALL DOCTORS"
                    ? "/doctors"
                    : item === "SERVICES"
                    ? "/services"
                    : `/${item.toLowerCase()}`
                }
                onClick={() => setShowMenu(false)}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
              >
                {item}
              </NavLink>
            ))}

            {!token && (
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/login");
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
