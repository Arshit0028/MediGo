import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { CheckCircle, Star } from "lucide-react";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch doctor info
  useEffect(() => {
    const found = doctors.find((doc) => String(doc._id) === String(docId));
    if (found) setDocInfo({ ...found, slots_booked: found.slots_booked || {} });
    else setDocInfo(null);
  }, [docId, doctors]);

  // Generate next 7 days of slots
  const getAvailableSlots = () => {
    if (!docInfo) return;
    const slots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let daySlots = [];
      for (let j = 10; j <= 12; j++) {
        let currentDateCopy = new Date(currentDate);
        currentDateCopy.setHours(j);
        currentDateCopy.setMinutes(0);

        let formattedTime = currentDateCopy.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        daySlots.push({ datetime: currentDateCopy, time: formattedTime });
      }
      slots.push(daySlots);
    }
    setDocSlots(slots);
  };

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!slotTime) return toast.error("Please select a time slot");

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId: docInfo._id,
          slotDate: docSlots[slotIndex][0].datetime,
          slotTime,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    docInfo && (
      <div className="min-h-screen bg-[#F5F7FA] py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
          {/* Doctor Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-200 pb-6">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-32 h-32 rounded-2xl object-cover shadow-md"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {docInfo.name}
                </h2>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-lg text-indigo-600 font-medium mt-1">
                {docInfo.speciality}
              </p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 mr-1" /> 4.8
                </span>
                <span className="text-gray-500 text-sm">10+ yrs experience</span>
                <span className="text-gray-500 text-sm">ABC Hospital</span>
              </div>
              <div className="mt-4 flex gap-3 flex-wrap">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm">
                  ₹500 Consultation Fee
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-sm">
                  Available Today
                </span>
              </div>
            </div>
          </div>

          {/* Slots */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Select a Time Slot
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {docSlots.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setSlotIndex(i)}
                  className={`px-5 py-2 rounded-xl border transition-all ${
                    i === slotIndex
                      ? "bg-indigo-600 text-white border-indigo-600 shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Day {i + 1}
                </button>
              ))}
            </div>

            <div className="mt-5 flex gap-3 flex-wrap">
              {docSlots[slotIndex]?.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setSlotTime(slot.time)}
                  className={`px-5 py-2 rounded-xl border transition-all ${
                    slot.time === slotTime
                      ? "bg-indigo-600 text-white border-indigo-600 shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            className="mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-2xl shadow-lg transition-all"
          >
            Book Appointment
          </button>

          {/* Related doctors */}
          <div className="mt-10">
            <RelatedDoctors docId={docInfo._id} speciality={docInfo.speciality} />
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
