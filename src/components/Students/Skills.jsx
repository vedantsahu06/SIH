import { useState } from "react";

function Skills() {
  const [userSkills] = useState(["HTML", "CSS", "JavaScript"]);

  const branches = [
    {
      domain: "Frontend Development",
      color: "#22c55e", // green nodes
      side: "left",
      skills: ["React", "Next.js", "TailwindCSS"]
    },
    {
      domain: "Backend Development",
      color: "#a855f7", // purple nodes
      side: "right",
      skills: ["Node.js", "Express", "MongoDB"]
    }
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10">
      <svg
        width="1000"
        height="700"
        viewBox="0 0 1000 700"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow filter for circles */}
        <defs>
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* User acquired skills (vertical main path) */}
        {userSkills.map((skill, i) => {
          const y = 100 + i * 100;
          return (
            <g key={i}>
              {/* Main path between skills (stop at JavaScript only) */}
              {i < userSkills.length - 1 && (
                <>
                  <line
                    x1="500"
                    y1={y}
                    x2="500"
                    y2={y + 100}
                    stroke="white"
                    strokeWidth="10"
                    strokeOpacity="0.3"
                  />
                  <line
                    x1="500"
                    y1={y}
                    x2="500"
                    y2={y + 100}
                    stroke="white"
                    strokeWidth="3"
                  />
                </>
              )}

              {/* Skill node */}
              <circle
                cx="500"
                cy={y}
                r="10"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="2"
                filter="url(#nodeGlow)"
              />
              <text
                x="540"
                y={y + 5}
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {skill}
              </text>
            </g>
          );
        })}

        {/* Branches */}
        {branches.map((branch, bIndex) => {
          const startY = 100 + (userSkills.length - 1) * 100; // JavaScript node
          const branchX = branch.side === "left" ? 250 : 750; // left vs right
          const branchY = startY + 80;

          const controlX = branch.side === "left" ? 400 : 600; // curve control

          return (
            <g key={bIndex}>
              {/* Curved connector */}
              <path
                d={`M500 ${startY} Q ${controlX} ${startY}, ${branchX} ${branchY}`}
                stroke="white"
                strokeWidth="10"
                strokeOpacity="0.3"
                fill="transparent"
              />
              <path
                d={`M500 ${startY} Q ${controlX} ${startY}, ${branchX} ${branchY}`}
                stroke="white"
                strokeWidth="3"
                fill="transparent"
              />

              {/* Branch vertical path */}
              <line
                x1={branchX}
                y1={branchY}
                x2={branchX}
                y2={branchY + branch.skills.length * 100}
                stroke="white"
                strokeWidth="10"
                strokeOpacity="0.3"
              />
              <line
                x1={branchX}
                y1={branchY}
                x2={branchX}
                y2={branchY + branch.skills.length * 100}
                stroke="white"
                strokeWidth="3"
              />

              {/* Branch skills */}
              {branch.skills.map((skill, i) => {
                const y = branchY + i * 100;
                return (
                  <g key={i}>
                    <circle
                      cx={branchX}
                      cy={y}
                      r="10"
                      fill={branch.color}
                      stroke="white"
                      strokeWidth="2"
                      filter="url(#nodeGlow)"
                    />
                    <text
                      x={branch.side === "left" ? branchX - 120 : branchX + 40}
                      y={y + 5}
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor={branch.side === "left" ? "end" : "start"}
                    >
                      {skill}
                    </text>
                  </g>
                );
              })}

              {/* Domain name */}
              <text
                x={branchX}
                y={branchY + branch.skills.length * 100 + 60}
                fill={branch.color}
                fontSize="20"
                fontWeight="bold"
                textAnchor="middle"
              >
                {branch.domain}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default Skills;
