import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { AppContext } from '../context/AppContext';
import { assets, doctors as assetDoctors } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const {
    doctors: contextDoctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData
  } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();

  // Fetch doctor info
  const fetchDocInfo = () => {
    const doctors = contextDoctors?.length > 0 ? contextDoctors : assetDoctors;
    const found = doctors.find(doc => doc._id === docId);

    if (found && !found.slots_booked) {
      found.slots_booked = {};
    }

    setDocInfo(found || null);
  };

  // Generate slots for next 7 days
  const getAvailableSlots = () => {
    if (!docInfo || !docInfo.slots_booked) return;

    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });

        const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isSlotAvailable = !docInfo.slots_booked[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  // Book appointment API call
  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment');
      return navigate('/login');
    }

    if (!docSlots?.[slotIndex]?.length) {
      toast.error('No time slots available for selected day');
      return;
    }

    if (!slotTime) {
      toast.error('Please select a time slot');
      return;
    }

    const selectedSlot = docSlots[slotIndex].find(item => item.time === slotTime);
    if (!selectedSlot) {
      toast.error('Please select a valid time slot');
      return;
    }

    const date = selectedSlot.datetime;
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDocInfo();
  }, [contextDoctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  if (!docInfo) {
    return (
      <div className="text-center py-20 text-gray-500">
        Doctor information not found or still loading.
      </div>
    );

  }
  return (
    <div>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="rounded-xl w-full sm:max-w-72 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>
        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 bg-white mx-2 sm:mx-0">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <div className="mt-3">
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626]">
              About <img className="w-3" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-600 mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-600 font-medium mt-4">
            Appointment fee: <span className="text-gray-800">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
        <p>Booking slots</p>

        {/* Day Selection */}
        <div className="flex gap-3 overflow-x-scroll mt-4">
          {docSlots.map((slots, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'
              }`}
            >
              <p>{slots[0] && daysOfWeek[slots[0].datetime.getDay()]}</p>
              <p>{slots[0] && slots[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Selection */}
        <div className="flex gap-3 overflow-x-scroll mt-4">
          {docSlots[slotIndex]?.map((slot, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(slot.time)}
              className={`text-sm font-light px-5 py-2 rounded-full cursor-pointer ${
                slot.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'
              }`}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  );
};

export default Appointment;
