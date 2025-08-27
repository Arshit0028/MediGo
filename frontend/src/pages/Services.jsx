import React from "react";
import { motion } from "framer-motion";
import {
  FaRadiationAlt,
  FaProcedures,
  FaStethoscope,
  FaSyringe,
  FaUserMd,
  FaClinicMedical,
  FaHeartbeat,
  FaCapsules,
} from "react-icons/fa";

const servicesData = [
  {
    title: "X-Ray",
    description: "High-quality digital X-Ray imaging for accurate diagnosis.",
    icon: <FaRadiationAlt className="text-5xl text-teal-500" />,
  },
  {
    title: "CT Scan",
    description: "Advanced CT scanning for detailed internal imaging.",
    icon: <FaProcedures className="text-5xl text-teal-500" />,
  },
  {
    title: "MRI",
    description: "State-of-the-art MRI scanning for soft tissue analysis.",
    icon: <FaStethoscope className="text-5xl text-teal-500" />,
  },
  {
    title: "Vaccination",
    description: "Safe and efficient vaccination services for all ages.",
    icon: <FaSyringe className="text-5xl text-teal-500" />,
  },
  {
    title: "General Consultation",
    description: "Expert doctors available for regular checkups and consultations.",
    icon: <FaUserMd className="text-5xl text-teal-500" />,
  },
  {
    title: "Laboratory Tests",
    description: "Comprehensive lab testing services with quick results.",
    icon: <FaClinicMedical className="text-5xl text-teal-500" />,
  },
  {
    title: "Cardiology",
    description: "Heart care services including ECG, stress tests, and more.",
    icon: <FaHeartbeat className="text-5xl text-teal-500" />,
  },
  {
    title: "Pharmacy",
    description: "On-site pharmacy with all essential medicines available.",
    icon: <FaCapsules className="text-5xl text-teal-500" />,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Services</h1>
        <p className="text-gray-600 text-lg mb-16">
          We provide a wide range of healthcare services to ensure your well-being.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/40 backdrop-blur-md rounded-3xl shadow-lg p-8 flex flex-col items-center text-center
                         hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer border border-white/20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-full p-6 mb-6 shadow-inner">
                {service.icon}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">{service.title}</h2>
              <p className="mt-2 text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
