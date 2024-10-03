import React, { useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
// import { SessionContext } from "../../context/SessionContext";
import { useAppContext } from "../../context/App.Context";
import expertDetail from "../../utils/expertDetail";
import { handleSubmit } from "../InputBar/InputBar";

function Expert() {
  // get data from context
  const { setPrompt } = useAppContext();

  // get the expert from the URL
  const { expertId } = useParams();

  // get the expert details
  const { expertIcon, expert, title, desc, cardContent } =
    expertDetail(expertId);

  // render the expert component
  return expertId === expert ? (
    <div className="h-full w-full Add-Scrollbar">
      <div className="w-full h-1/2 flex flex-col gap-2 justify-center items-center">
        <img className="w-24 h-24 rounded-full" src={expertIcon} alt={expert} />
        <h1 className="text-2xl text-PrimaryText">{title}</h1>
        <span className="w-full font-medium text-sm pl-2 pr-2 break-words text-center text-PrimaryText">
          {desc}
        </span>
      </div>
      <div className="w-full flex md:justify-center gap-4 p-5 Add-Scrollbar-Hidden">
        {cardContent.map((content, index) => (
          <button
            key={index}
            className="w-36 h-28 p-2 border-2 border-Tertiary flex-shrink-0 rounded-lg cursor-pointer hover:bg-Secondary"
            onClick={(e) => {
              setPrompt(content);
              handleSubmit(e); // handle the submit event and sending textContent
            }}
          >
            <span className="font-medium text-sm text-PrimaryText">
              {content}
            </span>
          </button>
        ))}
      </div>
    </div>
  ) : (
    <Navigate
      to="/app/experts"
      replace={true}
      state={{ from: "/app/expert/:expertId" }}
    />
  );
}

export default Expert;
