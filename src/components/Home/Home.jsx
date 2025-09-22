import React from "react";
import { FloatingDockDemo } from "../FloatingDockDemo";
import Aurora from "../Aurora";
import Carousel from "../Carousel";
import SplitText from "../SplitText";
import ScrollStack, { ScrollStackItem } from "../ScrollStack";

function Home() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="relative w-screen min-h-screen text-white ">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10 h-screen overflow-hidden">
        <Aurora
          colorStops={["#FFFFFF", "#B18AEF", "#ffffff"]}
          blend={1}
          amplitude={0.5}
          speed={1.5}
        />
      </div>

      <div>hugga</div>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 z-10 py-12">
        {/* Headline */}
        <div className="max-w-3xl text-center mb-4 leading-[1.2] pb-2 break-words">
          <SplitText
            tag="h1"
            className="text-4xl md:text-6xl font-bold text-white leading-[1.2]"
            charClassName="split-char"
            delay={40}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
            text={
              <>
                Where{" "}
                <span
                  style={{
                    color: "#06b6d4",
                    textShadow: "0 0 2px #06b6d4, 0 0 14px #06b6d4",
                  }}
                >
                  Intellect
                </span>{" "}
                meets action, and{" "}
                <span
                  style={{
                    color: "#facc15",
                    textShadow: "0 0 2px #facc15, 0 0 14px #facc15",
                  }}
                >
                  Ambition
                </span>{" "}
                finds{" "}
                <span
                  style={{
                    color: "#22c55e",
                    textShadow: "0 0 2px #22c55e, 0 0 14px #22c55e",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                  }}
                >
                  Opportunity
                </span>
              </>
            }
          />
        </div>

        {/* Tracker line */}
        <div className="max-w-2xl text-center mb-6">
          <SplitText
            tag="p"
            className="text-lg md:text-xl text-gray-100"
            delay={9}
            duration={0.5}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
            text="Track learning, verify accomplishments, and unlock opportunities — seamlessly."
          />
        </div>

        {/* CTA buttons */}
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-200 transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-xl border border-blue-600 text-emerald-100 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Key Features Section */}
      <div
        id="keyfeatures"
        className="relative flex flex-col items-center bg-black"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <div className="text-center mb-4">
          <h2
            className="inline-block text-5xl md:text-6xl lg:text-8xl font-extrabold 
              text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500
              leading-tight tracking-tight pb-2"
          >
            Key Features
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-300 max-w-2xl">
            What makes us stand out — the tools, experiences, and workflows that
            accelerate results.
          </p>
        </div>

        <div className="w-full flex justify-center items-center space-x-4 px-4">
          <Carousel
            baseWidth={300}
            autoplay={true}
            autoplayDelay={2000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          <Carousel
            baseWidth={300}
            autoplay={true}
            autoplayDelay={2000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          <Carousel
            baseWidth={300}
            autoplay={true}
            autoplayDelay={2000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>
      </div>

      {/* Scroll Stack Section */}
 
      <div className="flex justify-center pb-[12rem]">
  <div className="w-[1050px]">
    <ScrollStack>
      <ScrollStackItem className="relative">
        <h1 className="md:text-5xl font-serif mb-6">Companies</h1>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Gives You Opportunity
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Stay Updated with Latest Announcements
          </li>
        </ul>
        <img
          src="/buildingSvg.svg"
          alt="Buildings"
          className="absolute right-4 top-15 w-48 h-auto"
        />
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
            Get Started
          </button>
        </div>
      </ScrollStackItem>

      <ScrollStackItem className="relative mt-16">
        <h1 className="md:text-5xl font-serif mb-6">Faculties</h1>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Bridging classrooms to opportunities
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Empowering learners through expertise
          </li>
        </ul>
        <img
          src="/teacher.svg"
          alt="teacher"
          className="absolute right-10 top-16 w-40 h-auto"
        />
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
            Get Started
          </button>
        </div>
      </ScrollStackItem>

      <ScrollStackItem className="relative mt-16">
        <h1 className="md:text-5xl font-serif mb-6">Students</h1>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Learn and grow with peers
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Access latest resources and guidance
          </li>
        </ul>
        <img
          src="/student.svg"
          alt="student"
          className="absolute right-4 top-15 w-50 h-auto"
        />
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
            Get Started
          </button>
        </div>
      </ScrollStackItem>
    </ScrollStack>
  </div>
</div>


    </div>
  );
}

export default Home;
