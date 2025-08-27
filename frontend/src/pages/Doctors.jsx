import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("https://medigo-xwpc.onrender.com/api/doctor");
        if (data.success) {
          setDoctors(data.doctors);
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
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-lg text-gray-600 animate-pulse">Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white px-6 sm:px-8 lg:px-12 py-16 sm:py-24 scroll-smooth">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Meet Our <span className="text-indigo-600">Specialists</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from trusted, experienced doctors and book your appointment effortlessly.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        {doctors.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700">No Doctors Available</h2>
            <p className="mt-2 text-gray-500">
              Please check back later or contact our support team.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {doctors.map((doc, index) => (
              <motion.div
                key={doc._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-200 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="w-full aspect-square overflow-hidden relative">
                  <img
                    src={doc.image}
                    alt={`Profile of Dr. ${doc.name}`}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">
                    {doc.speciality}
                  </span>

                  <h2 className="text-xl font-bold text-gray-900 mb-1">
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
                    className="mt-auto w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
