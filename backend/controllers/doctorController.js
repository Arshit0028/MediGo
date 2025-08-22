import Doctor from "../models/doctorModel.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, doctor });
  } catch (error) {
    console.error("Get Doctor Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
