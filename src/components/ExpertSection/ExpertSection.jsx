import React from "react";
import ExpertCard from "./ExpertCard";

function ExpertSection() {
  // render the expert section
  return (
    <>
      <div className="h-full w-full Add-Scrollbar">
        <div className="flex flex-col justify-center mt-12 md:mt-0">
          <h1 className="m-5 mb-0 text-4xl md:text-5xl font-bold text-center text-PrimaryText">
            PTAs
          </h1>
          <p className="w-full mb-5 p-3 text-lg text-center font-normal text-PrimaryText">
            Experience personalized learning with AI-driven study guides
          </p>
        </div>
        <div className="w-full flex justify-center">
          <div className="h-auto w-full md:max-w-4xl flex flex-wrap gap-7 pb-7 justify-center items-center">
            <ExpertCard expertId="mathematics" />
            <ExpertCard expertId="physics" />
            <ExpertCard expertId="chemistry" />
            <ExpertCard expertId="biology" />
            <ExpertCard expertId="computer-science" />
            <ExpertCard expertId="engineering" />
            <ExpertCard expertId="history" />
            <ExpertCard expertId="literature" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpertSection;
