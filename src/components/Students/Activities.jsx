import React, { useState } from "react";
import {
  FaPlus,
  FaCertificate,
  FaProjectDiagram,
  FaUsers,
  FaChalkboardTeacher,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StaggeredMenu from "../StaggeredMenu";
import student from "../Students/StudentsLandingPage";

const summaryData = [
  {
    label: "Activities",
    count: 24,
    icon: <FaProjectDiagram className="text-3xl text-blue-500" />,
    color: "bg-blue-100",
  },
  {
    label: "Certificates",
    count: 12,
    icon: <FaCertificate className="text-3xl text-green-500" />,
    color: "bg-green-100",
  },
  {
    label: "Clubs",
    count: 5,
    icon: <FaUsers className="text-3xl text-yellow-500" />,
    color: "bg-yellow-100",
  },
  {
    label: "Workshops",
    count: 8,
    icon: <FaChalkboardTeacher className="text-3xl text-purple-500" />,
    color: "bg-purple-100",
  },
];

const activityFeedData = [
  {
    id: 1,
    name: "AI Club Meeting",
    type: "Club",
    date: "2025-09-01",
    duration: "2h",
    status: "Verified",
    description: "Discussed AI trends",
    certificate: true,
  },
  {
    id: 2,
    name: "React Workshop",
    type: "Workshop",
    date: "2025-08-15",
    duration: "3h",
    status: "Pending",
    description: "Built mini React apps",
    certificate: false,
  },
  {
    id: 3,
    name: "Blockchain Project",
    type: "Project",
    date: "2025-07-20",
    duration: "5h",
    status: "Verified",
    description: "Developed NFT marketplace",
    certificate: true,
  },
];

const pieData = [
  { name: "Clubs", value: 5 },
  { name: "Workshops", value: 8 },
  { name: "Projects", value: 11 },
];

const menuItems = [
  { label: "Profile", ariaLabel: "My profile", link: "/" },
  { label: "Dashboard", ariaLabel: "Analytics", link: "student" },
  { label: "Activities", ariaLabel: "Activity Tracker", link: "/" },
  { label: "Digital Portfolio", ariaLabel: "Portfolio", link: "/services" },
  {label: "Skill Gap Analysis",ariaLabel: "Identify your skill gaps",link: "/contact"},
  { label: "Certificates", ariaLabel: "Be job ready", link: "/" },
  { label: "Documents", ariaLabel: "Documents", link: "/" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Activities = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-100 via-black-800 to-black-700 text-white p-6 pt-35">
      <div className="fixed top-0 w-full z-50 h-full">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#ff1010ff"
          changeMenuColorOnOpen={true}
          colors={["#B19EEF", "#5227FF"]}
          logoUrl="/path-to-your-logo.svg"
          accentColor="#ff6b6b"
          onMenuOpen={() => console.log("Menu opened")}
          onMenuClose={() => console.log("Menu closed")}
        />
      </div>
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-2">
          My Activities & Achievements
        </h1>
        <p className="text-lg md:text-2xl text-gray-300">
          Track, validate, and showcase everything you do!
        </p>
        <div className="mt-6">
          {/* Placeholder for animated radial chart */}
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-400 overflow-hidden shadow-lg">
            <img
                src="/profile.svg"
                alt="Profile"
                className="w-full h-full object-cover"
            />
            </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {summaryData.map((item) => (
          <div
            key={item.label}
            className={`p-4 rounded-lg shadow-lg ${item.color} flex flex-col items-center text-black`}
          >
            {item.icon}
            <h2 className="text-2xl font-bold mt-2">{item.count}</h2>
            <p className="text-gray-700">{item.label}</p>
            <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${(item.count / 25) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </section>
{/* Activity Feed / Timeline */}
<section className="mb-10">
  <h2 className="text-3xl font-bold mb-4 text-center">Activity Feed</h2>
  <div className="flex flex-col items-center space-y-6">
    {activityFeedData.map((activity) => (
      <div
        key={activity.id}
        className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 w-[1000px] h-[200px]"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{activity.name}</h3>
          <span
            className={`px-2 py-1 rounded-full text-l ${
              activity.status === "Verified"
                ? "bg-green-500"
                : activity.status === "Pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {activity.status}
          </span>
        </div>
        <p className="text-gray-300 text-sm">
          {activity.type} | {activity.date} | {activity.duration}
        </p>
        <p className="mt-2">{activity.description}</p>
        {activity.certificate && (
          <button className="mt-2 px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 transition">
            View Certificate
          </button>
        )}
        <div className="mt-2 space-x-2">
          <button className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 transition">
            Mark Complete
          </button>
          <button className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600 transition">
            Add Proof
          </button>
          <button className="px-3 py-1 bg-purple-500 rounded hover:bg-purple-600 transition">
            Share
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Analytics Section */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Activity Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Activities Per Semester</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={[
                { semester: "Sem 1", activities: 4 },
                { semester: "Sem 2", activities: 6 },
                { semester: "Sem 3", activities: 8 },
              ]}
            >
              <XAxis dataKey="semester" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="activities" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Active Months Heatmap</h3>
          <div className="h-48 flex items-center justify-center text-gray-500">
            Heatmap Placeholder
          </div>
        </div>
      </section>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition text-2xl"
        onClick={() => setShowModal(true)}
      >
        <FaPlus />
      </button>

      {/* Add Activity Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Activity</h2>
            <form className="space-y-4">
              <select className="w-full p-2 rounded bg-gray-800">
                <option>Club</option>
                <option>Workshop</option>
                <option>Project</option>
                <option>Seminar</option>
              </select>
              <input
                type="text"
                placeholder="Activity Name"
                className="w-full p-2 rounded bg-gray-800"
              />
              <input
                type="text"
                placeholder="Duration"
                className="w-full p-2 rounded bg-gray-800"
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 rounded bg-gray-800"
              ></textarea>
              <input type="file" className="w-full text-gray-400" />
              <button
                type="submit"
                className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600 transition"
              >
                Submit
              </button>
              <button
                type="button"
                className="w-full mt-2 bg-red-500 p-2 rounded hover:bg-red-600 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
