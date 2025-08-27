import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-white via-blue-50 to-sky-50 overflow-hidden py-32 md:py-40">
      {/* Subtle blurred circles in blue shades */}
      <div className="absolute top-0 -left-28 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-sky-200 rounded-full filter blur-3xl opacity-20 animate-float-slow"></div>
      <div className="absolute top-1/4 left-1/2 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-15 animate-float-delayed"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left z-10 animate-fadeInUp">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-snug">
            Hassle-free{" "}
            <span className="text-blue-600">Doctor Appointments</span>
          </h1>
          <p className="mt-5 text-lg text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed">
            Book your appointments securely with trusted doctors.  
            Simple, reliable, and stress-free healthcare at your fingertips.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => handleNavigate("/Services")}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:scale-105 hover:shadow-blue-300 hover:bg-blue-700 transition-all duration-300"
            >
              Our Services
            </button>
            <button
              onClick={() => handleNavigate("/doctors")}
              className="px-8 py-3 border border-blue-300 rounded-full font-medium text-blue-700 bg-white hover:bg-blue-50 hover:scale-105 transition-all duration-300"
            >
              Browse Doctors
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center relative z-10">
          <img
            src={assets.header_img}
            alt="Doctors"
            className="w-[320px] lg:w-[420px] drop-shadow-xl animate-floatPulse"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
