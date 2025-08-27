import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="relative flex flex-col items-center gap-6 py-20 px-6 text-[#262626] overflow-hidden"
    >
      {/* ===== Blurred Background Gradients ===== */}
      <div className="absolute top-[-10%] left-[5%] w-[280px] h-[280px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse"></div>
      <div className="absolute top-[30%] right-[5%] w-[250px] h-[250px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse delay-200"></div>
      <div className="absolute bottom-[-10%] left-[30%] w-[300px] h-[300px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse delay-500"></div>

      {/* ===== Title & Description ===== */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-md">
        Find by Speciality
      </h1>
      <p className="sm:w-1/3 text-center text-gray-600 text-sm leading-relaxed">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      {/* ===== Speciality Cards ===== */}
      <div className="flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto scrollbar-hide">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => {
              scrollTo({ top: 0, behavior: "smooth" });
            }}
            key={index}
            className="flex flex-col items-center text-sm font-medium cursor-pointer flex-shrink-0 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-xl"
          >
            <img
              className="w-16 sm:w-24 mb-3 drop-shadow-md transition-transform duration-500 hover:rotate-6"
              src={item.image}
              alt={item.speciality}
            />
            <p className="text-gray-700">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
