🏥 MediGo – Doctor Appointment Booking App

MediGo is a full-stack doctor appointment booking system built with React, Node.js, Express, and MongoDB.
It allows users to browse doctors, book appointments, make demo payments, and manage their bookings with ease.

✨ Features
👨‍⚕️ For Patients

🔐 User Authentication (JWT-based login & register)

📅 Book Appointments with available doctors and time slots

💳 Demo Payment Integration with Razorpay

📋 My Appointments Dashboard – View and manage bookings

❌ Cancel Appointment functionality

👩‍⚕️ For Doctors (future scope)

🗓️ Manage availability & schedules

📊 Track patient appointments

🛠️ Tech Stack

Frontend: React.js, React Router, Axios, TailwindCSS / custom CSS

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Auth: JWT (JSON Web Tokens)

Payment Gateway: Razorpay

📂 Project Structure
MediGo/
├── backend/                # Express + MongoDB API
│   ├── controllers/        # Business logic (users, doctors, appointments, payments)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middleware/         # JWT auth, validation
│   └── server.js           # App entry point
│
├── frontend/               # React client
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Screens (Login, Register, Appointments, Profile, etc.)
│   │   ├── context/        # Global state (AppContext)
│   │   └── App.js          # Routes setup
│   └── package.json
│
├── README.md               # Project documentation
└── package.json            # Root config
Usage

Register or login as a user

Browse available doctors

Book an appointment (select date & time slot)

Make a demo payment with Razorpay

Redirected to My Appointments page

Cancel or manage existing bookings

📸 Screenshots (Optional)

(Add screenshots of Login, Doctor Details, My Appointments, Payment flow, etc.)

🛡️ Security & Validation

JWT token authentication for protected routes

Backend validation for appointment booking

Secure payment verification API

📌 Roadmap

✅ User authentication

✅ Doctor booking system

✅ Razorpay demo payments

⏳ Doctor dashboard for managing availability

⏳ Admin panel for managing doctors/patients
