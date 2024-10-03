import React from "react";
import { NavLink } from "react-router-dom";
import expertDetail from "../../utils/expertDetail";

function ExpertCard({ expertId }) {
  // get the expert details
  const { expertIcon, expert, title, desc } = expertDetail(expertId);

  // render the expert card
  return (
    <NavLink to={`/app/expert/${expert}`}>
      <div className="w-80 sm:w-96 h-36 ml-2 mr-2 sm:ml-2 sm:mr-2 p-2 px-4 bg-Secondary flex items-center rounded-xl cursor-pointer hover:border-2 hover:border-Tertiary">
        <img src={expertIcon} className="w-24 h-24 rounded-full" />
        <div className="mx-4 w-full">
          <h1 className="text-xl sm:text-2xl text-PrimaryText">{title}</h1>
          <span className="w-full text-sm break-words text-PrimaryText">
            {desc}
          </span>
        </div>
      </div>
    </NavLink>
  );
}

export default ExpertCard;
