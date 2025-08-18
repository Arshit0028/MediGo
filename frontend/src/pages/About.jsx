import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to MediGo, your reliable partner in managing your healthcare needs with ease and efficiency. At Heal Now, we recognise the hurdles individuals face when it comes to scheduling medical appointments and maintaining their health records..</p>
          <p>MediGo is dedicated to excellence in healthcare technology. We are constantly working to enhance our platform by integrating the latest innovations to elevate user experience and provide outstanding service. Whether you’re booking your first appointment or overseeing ongoing care, Heal Now is here to assist you at every stage.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>At MediGo, we envision a seamless healthcare experience for every user. Our goal is to bridge the gap between patients and healthcare providers, simplifying the process of accessing the care you need, exactly when you need it..</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-gray-600 p-6 rounded-xl cursor-pointer transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500">
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-gray-600 p-6 rounded-xl cursor-pointer transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500">
          <b>CONVENIENCE: </b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-gray-600 p-6 rounded-xl cursor-pointer transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500">
          <b>PERSONALIZATION:</b>
          <p >Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About
