import React from "react";
import Card from "./Card";

import expertDetail from "../../utils/expertDetail";
import { useAuthContext } from "../../context/Auth.Context";

function LearningSession() {
  // get the user name
  const { authUser } = useAuthContext();
  const userName = authUser.fullName.split(" ")[0]; 
  const firstLetter = userName.toLowerCase().charAt(0).toUpperCase();
  const remainingLetters = userName.toLowerCase().slice(1);

  const { desc, cardContent } = expertDetail("learning");

  // render the learning session component
  return (
    <div className="w-full h-full flex justify-center bg-Primary">
      <div className="w-full h-auto md:w-3/4">
        <div className="mt-12 mb-12 pl-5 pr-5">
          <p className="text-6xl md:7xl Heading">
            Hello, <span>{userName !== "" ? `${firstLetter}${remainingLetters}` : "Buddy"}.</span>
          </p>
          <p className="text-xl p-1 md:text-4xl Sub-Heading">{desc}</p>
        </div>

        {/*Card container */}
        <div className="flex gap-4 p-5 Add-Scrollbar-Hidden">
          {cardContent.map((content, index) => (
            <Card key={index} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningSession;