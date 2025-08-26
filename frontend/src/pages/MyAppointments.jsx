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

      const res = await axios.get(
        "http://localhost:5000/api/user/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data.data || []);
    } catch (err) {
      console.error(
        "❌ Fetch appointments error:",
        err.response?.data || err.message
      );
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Razorpay Payment
  const handlePayment = async (amount, apptId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // 1. Create Razorpay order from backend
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/razorpay",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.success) {
        alert("Payment initiation failed");
        return;
      }
const { order } = data;
console.log("Order from backend:", order);

const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency,
  name: "MediGo - Appointment Payment",
  description: "Doctor Appointment Payment",
  order_id: order.id,   // ✅ Now available
  handler: async function (response) {
    try {
      await axios.post(
        "http://localhost:5000/api/payment/verify",
        {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          appointmentId: apptId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Payment Successful!");
      getUserAppointments();
    } catch (error) {
      console.error("Payment verification failed:", error);
      alert("❌ Payment verification failed");
    }
  },
  theme: { color: "#1D4ED8" },
};

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed");
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserAppointments();
  }, [location.pathname]);

  if (loading)
    return <p className="text-center py-6">Loading appointments...</p>;

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
              className="p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <p className="font-semibold text-lg">
                Doctor: {appt.docId?.name || "Unknown"}{" "}
                <span className="text-sm text-gray-500">
                  ({appt.docId?.speciality})
                </span>
              </p>
              <p>
                Date:{" "}
                <span className="font-medium">
                  {new Date(appt.slotDate).toLocaleDateString()}
                </span>
              </p>
              <p>
                Time: <span className="font-medium">{appt.slotTime}</span>
              </p>
              <p>
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    appt.status === "Pending"
                      ? "bg-yellow-500"
                      : appt.status === "Confirmed"
                      ? "bg-green-600"
                      : "bg-gray-500"
                  }`}
                >
                  {appt.status}
                </span>
              </p>

              {/* ✅ Pay Now Button */}
              {appt.status === "Pending" && (
                <button
                  onClick={() => handlePayment(500, appt._id)} // Example ₹500
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
