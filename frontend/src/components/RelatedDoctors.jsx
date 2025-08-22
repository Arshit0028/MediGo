import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const filtered = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );

      // Force all doctors to be available
      setRelDoc(filtered.map((d) => ({ ...d, available: true })));
    }
  }, [doctors, speciality, docId]);

  if (!relDoc.length) return null;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Related Doctors
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {relDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="relative border rounded-2xl p-6 bg-white shadow-md hover:shadow-lg cursor-pointer transition"
          >
            {/* Availability Badge */}
            <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full shadow-sm bg-green-100 text-green-600">
              Available
            </span>

            {/* Doctor Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 mx-auto rounded-full object-cover shadow"
            />

            {/* Doctor Info */}
            <div className="text-center mt-4">
              <h4 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h4>
              <p className="text-gray-500 text-sm">{item.speciality}</p>
              <p className="text-gray-400 text-xs mt-1">MBBS, MD</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
