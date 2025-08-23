// src/pages/MyAppointments.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getUserAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/user/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(res.data.data || []);
    } catch (err) {
      console.error("❌ Fetch appointments error:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (apptId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // 👉 call your payment backend API
      const res = await axios.post(
        "http://localhost:5000/api/payment/checkout",
        { appointmentId: apptId }, // send appointmentId for backend
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Payment initiated:", res.data);

      // Example: if using Razorpay/Stripe you’d redirect or open checkout here
      alert("Redirecting to payment gateway...");

    } catch (err) {
      console.error("❌ Payment error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserAppointments();
  }, [location.pathname]);

  if (loading) return <p className="text-center py-6">Loading appointments...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li
              key={appt._id}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm flex items-center space-x-4"
            >
              {/* Doctor image */}
              {appt.docId?.image && (
                <img
                  src={appt.docId.image}
                  alt={appt.docId.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
              )}

              {/* Appointment Info */}
              <div className="flex-1">
                <p>
                  <span className="font-medium">Doctor:</span>{" "}
                  {appt.docId?.name || "Unknown"}
                </p>
                <p>
                  <span className="font-medium">Speciality:</span>{" "}
                  {appt.docId?.speciality || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {appt.slotDate}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {appt.slotTime}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      appt.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : appt.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appt.status}
                  </span>
                </p>
              </div>

              {/* ✅ Payment Button */}
              {appt.status === "Pending" && (
                <button
                  onClick={() => handlePayment(appt._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Pay Now
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
