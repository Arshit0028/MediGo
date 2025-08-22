import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const { token, backendUrl, userData, setUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [localUser, setLocalUser] = useState({
    name: "",
    phone: "",
    address: { line1: "", line2: "" },
    gender: "Not Selected",
    dob: "",
    email: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  // Initialize local state safely
  useEffect(() => {
    if (userData) {
      setLocalUser({
        name: userData.name || "",
        phone: userData.phone || "",
        address: userData.address || { line1: "", line2: "" },
        gender: userData.gender || "Not Selected",
        dob: userData.dob || "",
        email: userData.email || "",
        image: userData.image || "",
      });
      setLoading(false);
    }
  }, [userData]);

  // Update profile
  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", localUser.name);
      formData.append("phone", localUser.phone);
      formData.append("address", JSON.stringify(localUser.address));
      formData.append("gender", localUser.gender);
      formData.append("dob", localUser.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.put(`${backendUrl}/api/user/profile`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("Profile updated successfully!");
        const updatedUser = {
          ...localUser,
          image: image ? URL.createObjectURL(image) : localUser.image,
        };
        setUserData(updatedUser);
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md flex flex-col gap-6">
      {/* PROFILE IMAGE */}
      <div className="flex flex-col items-center">
        <label htmlFor="image" className="cursor-pointer relative">
          <img
            src={image ? URL.createObjectURL(image) : localUser.image || assets.default_profile}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-2 border-gray-200 shadow-sm hover:opacity-80 transition-opacity duration-300"
          />
          {isEdit && !image && (
            <img src={assets.upload_icon} alt="Upload" className="w-10 h-10 absolute bottom-2 right-2" />
          )}
          <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
        </label>

        {isEdit ? (
          <input
            type="text"
            value={localUser.name}
            placeholder="Your Name"
            onChange={(e) => setLocalUser((prev) => ({ ...prev, name: e.target.value }))}
            className="mt-4 text-2xl font-semibold text-gray-800 rounded-lg px-3 py-1 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        ) : (
          <p className="mt-4 text-2xl font-semibold text-gray-800">{localUser.name}</p>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* CONTACT INFO */}
      <div className="space-y-3">
        <h3 className="text-gray-500 font-medium tracking-wide">Contact Information</h3>
        <div className="grid grid-cols-[1fr_2fr] gap-y-3 gap-x-4 text-gray-700">
          <span className="font-medium">Email:</span>
          <span className="text-blue-500">{localUser.email}</span>

          <span className="font-medium">Phone:</span>
          {isEdit ? (
            <input
              type="text"
              value={localUser.phone}
              onChange={(e) => setLocalUser((prev) => ({ ...prev, phone: e.target.value }))}
              className="bg-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          ) : (
            <span className="text-gray-600">{localUser.phone}</span>
          )}

          <span className="font-medium">Address:</span>
          {isEdit ? (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={localUser.address.line1 || ""}
                placeholder="Address Line 1"
                onChange={(e) =>
                  setLocalUser((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))
                }
                className="bg-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
              <input
                type="text"
                value={localUser.address.line2 || ""}
                placeholder="Address Line 2"
                onChange={(e) =>
                  setLocalUser((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))
                }
                className="bg-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>
          ) : (
            <span className="text-gray-600">
              {localUser.address.line1 || ""} <br /> {localUser.address.line2 || ""}
            </span>
          )}
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="space-y-3">
        <h3 className="text-gray-500 font-medium tracking-wide">Basic Information</h3>
        <div className="grid grid-cols-[1fr_2fr] gap-y-3 gap-x-4 text-gray-700">
          <span className="font-medium">Gender:</span>
          {isEdit ? (
            <select
              value={localUser.gender}
              onChange={(e) => setLocalUser((prev) => ({ ...prev, gender: e.target.value }))}
              className="bg-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
              <option>Not Selected</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          ) : (
            <span className="text-gray-600">{localUser.gender}</span>
          )}

          <span className="font-medium">Birthday:</span>
          {isEdit ? (
            <input
              type="date"
              value={localUser.dob || ""}
              onChange={(e) => setLocalUser((prev) => ({ ...prev, dob: e.target.value }))}
              className="bg-gray-100 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          ) : (
            <span className="text-gray-600">{localUser.dob || ""}</span>
          )}
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="flex justify-center mt-4">
        <button
          onClick={isEdit ? handleUpdateProfile : () => setIsEdit(true)}
          className="px-8 py-2 rounded-full border border-primary text-primary font-medium hover:bg-primary hover:text-white transition"
        >
          {isEdit ? "Save Information" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
