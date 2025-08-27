import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-white to-blue-50 overflow-hidden my-16 md:mx-10 rounded-3xl shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-14 lg:px-20 py-12 md:py-16">
        
        {/* Left Side */}
        <div className="flex-1 text-center md:text-left max-w-lg z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
            Your Health, <span className="text-indigo-600">Our Priority</span>
          </h1>
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            Book appointments with trusted doctors anytime, anywhere.  
            We’re here to make healthcare simple, secure, and accessible.
          </p>
          <button
            onClick={() => {
              navigate("/contact");
              scrollTo(0, 0);
            }}
            className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Contact Us
          </button>
        </div>

        {/* Right Side */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center relative">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute bottom-0 -left-10 w-48 h-48 bg-indigo-100 rounded-full blur-2xl opacity-60"></div>
            <img
              src={assets.appointment_img}
              alt="Doctors"
              className="w-[260px] lg:w-[360px] relative z-10 drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
