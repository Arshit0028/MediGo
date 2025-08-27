// src/pages/MyAppointments.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

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
        "https://medigo-xwpc.onrender.com/api/user/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
        "https://medigo-xwpc.onrender.com/api/payment/razorpay",
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
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(
              "https://medigo-xwpc.onrender.com/api/payment/verify",
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
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-6 text-gray-600"
      >
        Loading appointments...
      </motion.p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-8 text-center text-blue-700"
      >
        My Appointments
      </motion.h2>

      {appointments.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-center"
        >
          No appointments found.
        </motion.p>
      ) : (
        <div className="space-y-6">
          {appointments.map((appt, index) => (
            <motion.div
              key={appt._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-6 bg-white border rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {appt.docId?.name || "Unknown"}{" "}
                    <span className="text-sm text-gray-500">
                      ({appt.docId?.speciality})
                    </span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    Date:{" "}
                    <span className="font-medium">
                      {new Date(appt.slotDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Time: <span className="font-medium">{appt.slotTime}</span>
                  </p>
                </div>

                <div className="text-right">
                  <p className="mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePayment(500, appt._id)}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                      Pay Now
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
