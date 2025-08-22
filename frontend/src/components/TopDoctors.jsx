import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-6 my-16 text-[#262626] px-4 md:px-16">
      <h1 className="text-3xl font-semibold text-center">Top Doctors to Book</h1>
      <p className="sm:w-2/3 text-center text-sm text-gray-600">
        Browse through our curated list of trusted doctors and book appointments easily.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
        {doctors.slice(0, 8).map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => { navigate(`/appointment/${doctor._id}`); window.scrollTo(0, 0); }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-48 object-cover bg-[#EAEFFF]"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm mb-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-green-500">Available</span>
              </div>
              <p className="text-lg font-medium">{doctor.name}</p>
              <p className="text-sm text-gray-500">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }}
        className="mt-10 bg-[#EAEFFF] hover:bg-[#C9D8FF] text-gray-700 px-10 py-3 rounded-full font-medium transition-colors duration-300"
      >
        View More Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
