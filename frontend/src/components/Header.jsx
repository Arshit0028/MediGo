import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-white overflow-hidden py-36 md:py-44">
      {/* Soft blurred pastel circles */}
      <div className="absolute top-0 -left-24 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-0 -right-24 w-[28rem] h-[28rem] bg-pink-100 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-teal-100 rounded-full filter blur-3xl opacity-15 animate-float"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-gray-800 leading-snug">
            Seamless <span className="text-indigo-600">Doctor Appointments</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-md mx-auto md:mx-0 leading-relaxed">
            Book your appointments easily and securely with trusted doctors.  
            Simple, reliable, and stress-free healthcare at your fingertips.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => {
                navigate("/login");
                scrollTo(0, 0);
              }}
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300"
            >
              Get Started
            </button>
            <button
              onClick={() => {
                navigate("/doctors");
                scrollTo(0, 0);
              }}
              className="px-8 py-3 border border-indigo-200 rounded-full font-medium text-indigo-700 hover:bg-indigo-50 transition-all duration-300"
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
            className="w-[320px] lg:w-[420px] drop-shadow-lg animate-float"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
