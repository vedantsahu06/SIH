import React from "react";   
import StaggeredMenu from "../StaggeredMenu";
import Counter from '../Counter';
import activities from '../Students/Activities';
import certificates from '../Students/certificates';



const menuItems = [
  { label: "Profile", ariaLabel: "My profile", link: "/" },
  { label: "Dashboard", ariaLabel: "Analytics", link: "/student" },
  { label: "Activities", ariaLabel: "Activity Tracker", link: "activities" },
  { label: "Digital Portfolio", ariaLabel: "Portfolio", link: "/services" },
  { label: "Skill Gap Analysis", ariaLabel: "Identify your skill gaps", link: "/contact" },
  { label: "Certificates", ariaLabel: "Be job ready", link: "certificates" },
  { label: "Documents", ariaLabel: "Documents", link: "/" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

const sections = [
  "Activity Highlights",
  "Suggested Connections",
  "Skill Gap Summary",
  "Recent Achievements / Certificates"
];

const suggestedPeople = [
  { name: "Alice Johnson", role: "Computer Science", avatar: "https://i.pravatar.cc/100?img=1" },
  { name: "Bob Smith", role: "Mechanical Engineering", avatar: "https://i.pravatar.cc/100?img=2" },
  { name: "Carol Davis", role: "Data Science", avatar: "https://i.pravatar.cc/100?img=3" },
];

function StudentsLandingPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white relative">
      {/* Fixed menu on top */}
      <div className="fixed top-0 w-full z-50 h-220">
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

      {/* Dashboard */}
      <div className="flex justify-center mt-24 px-4">
        <div className="flex flex-col md:flex-row gap-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-10 rounded-3xl shadow-2xl transform transition-all hover:scale-105">
          {/* Credits */}
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md text-black w-48 hover:shadow-xl transition-shadow">
            <Counter value={120} places={[100,10,1]} fontSize={60} padding={5} gap={10} textColor="black" fontWeight={900} />
            <div className="mt-4 font-semibold text-lg">Credits Acquired</div>
          </div>

          {/* GPA */}
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md text-black w-48 hover:shadow-xl transition-shadow">
            <Counter value={8.7} places={[10,1,0.1]} fontSize={60} padding={5} gap={10} textColor="black" fontWeight={900} />
            <div className="mt-4 font-semibold text-lg">Current GPA</div>
          </div>

          {/* Projects */}
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md text-black w-48 hover:shadow-xl transition-shadow">
            <Counter value={15} places={[10,1]} fontSize={60} padding={5} gap={10} textColor="black" fontWeight={900} />
            <div className="mt-4 font-semibold text-lg">Projects Completed</div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col items-center gap-10 mt-16 px-4 pb-20">
        {sections.map((title, index) => (
          <div
            key={index}
            className="w-full max-w-4xl p-8 rounded-2xl border-2 border-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg bg-[#2a2a2a] hover:scale-105 transform transition-all"
          >
            <h2 className="text-2xl font-bold mb-4">{title}</h2>

            {title === "Suggested Connections" ? (
              <div className="flex flex-col md:flex-row gap-6">
                {suggestedPeople.map((person, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-[#1f1f1f] rounded-xl shadow hover:shadow-lg transition-all">
                    <img src={person.avatar} alt={person.name} className="w-14 h-14 rounded-full" />
                    <div>
                      <div className="font-semibold text-lg">{person.name}</div>
                      <div className="text-gray-400 text-sm">{person.role}</div>
                    </div>
                    <button className="ml-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white font-semibold hover:scale-105 transition-all">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-2 text-gray-300">Details will appear here...</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsLandingPage;
