import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  ClipboardDocumentIcon,
  UsersIcon,
  ClockIcon,
  CalendarIcon,
  StopCircleIcon,
  CheckCircleIcon,
  ShieldCheckIcon, // Added icon for Secure & Private
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Task Management",
    description: "Create, edit, and track all your tasks efficiently in one place.",
    icon: <ClipboardDocumentIcon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />,
  },
  {
    title: "Team Collaboration",
    description: "Create teams, invite members, and collaborate seamlessly.",
    icon: <UsersIcon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />,
  },
  {
    title: "Pomodoro Timer",
    description: "Boost your productivity using the integrated Pomodoro timer.",
    icon: <ClockIcon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />,
  },
  {
    title: "Calendar",
    description: "Keep track of deadlines and schedules with a built-in calendar.",
    icon: <CalendarIcon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />,
  },
  {
    title: "Quick Timer",
    description: "Set simple timers for tasks, breaks, and quick reminders.",
    icon: <StopCircleIcon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />,
  },
  {
    title: "Secure & Private",
    description: "Your data is safe with end-to-end encryption and privacy-first policies.",
    icon: <ShieldCheckIcon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />,
  },
];

const stats = [
  { title: "Tasks Done", value: "12", color: "text-blue-600" },
  { title: "Time Tracked", value: "4.2h", color: "text-purple-600" },
  { title: "Efficiency", value: "85%", color: "text-green-600" },
];

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="px-6 md:px-20 lg:px-32 py-16 md:py-24 relative z-10">
        <div className="lg:flex lg:items-center lg:justify-between gap-12">
          {/* Left Text */}
          <div className="lg:w-1/2 max-w-xl">
            <span className="inline-flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full mb-4 text-sm font-medium">
              <ClockIcon className="w-4 h-4 mr-1" /> Boost your productivity by 200%
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Master Your <span className="text-blue-600">Daily Tasks</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
              Transform chaos into clarity with our intelligent task management platform. Track time, collaborate seamlessly, and achieve more than ever before.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
              >
                Start Free Trial
              </Link>
              <Link
                to="/signin"
                className="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-50 transition transform hover:-translate-y-1"
              >
                Sign In
              </Link>
            </div>
            <div className="flex items-center mt-6 gap-4">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.955L10 0l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">4.9/5 • 10,000+ users</span>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              {/* Task Items */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-blue-50 rounded-xl p-4">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <div className="flex-1 mx-3 text-left">
                    <p className="font-semibold text-gray-800">Complete project proposal</p>
                    <p className="text-gray-500 text-sm">Due in 2 hours</p>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                </div>

                <div className="flex justify-between items-center bg-purple-50 rounded-xl p-4">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <div className="flex-1 mx-3 text-left">
                    <p className="font-semibold text-gray-800">Team meeting</p>
                    <p className="text-gray-500 text-sm">In progress - 25 min</p>
                  </div>
                  <ClockIcon className="w-6 h-6 text-purple-500" />
                </div>

                <div className="flex justify-between items-center bg-green-50 rounded-xl p-4">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <div className="flex-1 mx-3 text-left">
                    <p className="font-semibold text-gray-800">Review code changes</p>
                    <p className="text-gray-500 text-sm">Due tomorrow</p>
                  </div>
                  <ClipboardDocumentIcon className="w-6 h-6 text-blue-500" />
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between mt-6 border-t pt-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -top-6 -right-6 w-6 h-6 bg-blue-400 rounded-full opacity-70"></div>
            <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-400 rounded-full opacity-70"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-6 md:px-20 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 md:mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center hover:scale-105 transform transition-all duration-300"
            >
              {feature.icon}
              <h3 className="text-xl md:text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-12 md:py-16 px-4 md:px-20 text-center text-white rounded-t-3xl shadow-lg relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
          Ready to Organize Your Tasks?
        </h2>
        <p className="mb-6 md:mb-8 text-lg md:text-xl">
          Join Trilio Task Manager and improve your productivity today!
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1"
        >
          Get Started Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 mt-8 text-center text-gray-400 relative z-10">
        &copy; {new Date().getFullYear()} Trilio Task Manager. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
