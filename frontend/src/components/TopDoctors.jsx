import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="relative py-20 px-6 md:px-16 overflow-hidden bg-gradient-to-b from-white via-blue-50 to-sky-50">
      {/* Background Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-25 animate-float"></div>
      <div className="absolute top-40 -right-28 w-96 h-96 bg-sky-200 rounded-full filter blur-3xl opacity-25 animate-float-slow"></div>

      {/* Heading */}
      <div className="relative text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Meet Our <span className="text-blue-600">Top Doctors</span>
        </h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        <p className="mt-5 text-gray-600 text-sm md:text-base leading-relaxed">
          Trusted and experienced doctors, ready to provide you with the best
          care. Book an appointment with ease.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-14">
        {doctors.slice(0, 8).map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => {
              navigate(`/appointment/${doctor._id}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100"
          >
            {/* Doctor Image */}
            <div className="relative overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-56 object-cover bg-blue-50 group-hover:scale-110 transition-transform duration-500"
              />
              {/* Availability Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full shadow-sm">
                Available
              </div>
            </div>

            {/* Doctor Info */}
            <div className="p-5 text-center">
              <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {doctor.name}
              </p>
              <p className="text-sm text-gray-500">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center">
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="mt-14 px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md hover:shadow-lg font-medium transition-all duration-300"
        >
          View More Doctors
        </button>
      </div>
    </section>
  );
};

export default TopDoctors;
