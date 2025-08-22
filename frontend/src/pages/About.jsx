import React from "react";
import { assets } from "../assets/assets";
import { CheckCircle, Clock, UserCheck } from "lucide-react"; // icons

const About = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20">
      {/* About Us Header */}
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold text-gray-800">
          ABOUT <span className="text-indigo-600">US</span>
        </h2>
        <p className="mt-3 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
          Learn more about our mission, vision, and why MediGo is your trusted
          healthcare partner.
        </p>
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        {/* Left Image */}
        <img
          className="w-full md:max-w-[400px] rounded-2xl shadow-lg"
          src={assets.about_image}
          alt="About MediGo"
        />

        {/* Right Text */}
        <div className="flex flex-col gap-6 md:w-2/3 text-gray-600 text-sm leading-relaxed">
          <p>
            Welcome to <span className="font-semibold text-indigo-600">MediGo</span>, 
            your reliable partner in managing your healthcare needs with ease and
            efficiency. We understand the challenges individuals face when it
            comes to scheduling medical appointments and maintaining their
            health records.
          </p>
          <p>
            At MediGo, we are committed to excellence in healthcare technology. 
            By integrating the latest innovations, we strive to provide a
            seamless user experience—whether you’re booking your first
            appointment or managing ongoing care.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Our Vision
            </h3>
            <p>
              To bridge the gap between patients and healthcare providers,
              simplifying access to the care you need, exactly when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center my-16">
        <h2 className="text-3xl font-bold text-gray-800">
          WHY <span className="text-indigo-600">CHOOSE US</span>
        </h2>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Discover what makes MediGo stand out from the rest.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {/* Card 1 */}
        <div className="group border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white shadow-md">
          <Clock className="w-10 h-10 text-indigo-500 group-hover:text-white transition-colors duration-300" />
          <h4 className="font-semibold text-lg">Efficiency</h4>
          <p className="text-sm">
            Streamlined appointment scheduling that fits your lifestyle.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white shadow-md">
          <UserCheck className="w-10 h-10 text-indigo-500 group-hover:text-white transition-colors duration-300" />
          <h4 className="font-semibold text-lg">Convenience</h4>
          <p className="text-sm">
            Access trusted healthcare professionals near you with ease.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white shadow-md">
          <CheckCircle className="w-10 h-10 text-indigo-500 group-hover:text-white transition-colors duration-300" />
          <h4 className="font-semibold text-lg">Personalization</h4>
          <p className="text-sm">
            Get tailored recommendations and health reminders to stay on track.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
