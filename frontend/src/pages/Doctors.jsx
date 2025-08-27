import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors from backend
 useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get("http://medigo-xwpc.onrender.com/api/doctor");
      if (data.success) {
        setDoctors(data.doctors); // <-- use data.doctors
      } else {
        setDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  fetchDoctors();
}, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            Meet Our Specialists
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Find the right doctor for your needs and book an appointment with ease.
          </p>
        </div>

        {/* Doctors Grid */}
        {doctors.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">No Doctors Available</h2>
            <p className="mt-2 text-gray-500">
              Please check back later or contact our support team.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-200/80"
              >
                {/* Image */}
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={doc.image}
                    alt={`Profile of Dr. ${doc.name}`}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">
                    {doc.speciality}
                  </span>

                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    Dr. {doc.name}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    {doc.degree} &middot; {doc.experience}
                  </p>

                  <p className="text-2xl font-semibold text-gray-900 mb-5">
                    ₹{doc.fees}
                    <span className="text-sm font-normal text-gray-500"> / session</span>
                  </p>
                  
                  {/* CTA */}
                  <button
                    onClick={() => navigate(`/appointment/${doc._id}`)}
                    className="mt-auto w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
