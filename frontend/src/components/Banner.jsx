import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white overflow-hidden my-16 md:mx-10">
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-14 lg:px-20 py-12 md:py-16">
        
        {/* Left Side */}
        <div className="flex-1 text-center md:text-left max-w-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Book Your <span className="text-indigo-600">Next Appointment</span>
          </h1>
          <p className="mt-4 text-gray-500 text-sm sm:text-base">
            Trusted by 100+ doctors. Quick, reliable, and secure appointment 
            booking at your fingertips.
          </p>
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium hover:scale-105 transition-all duration-300"
          >
            Create Account
          </button>
        </div>

        {/* Right Side */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center relative">
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-52 h-52 bg-indigo-100 rounded-full blur-3xl"></div>
            <img
              src={assets.appointment_img}
              alt="Doctors"
              className="w-[260px] lg:w-[340px] relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
