import React from "react";
import KatexMarkdown from "../../KatexMarkdown/KatexMarkdown";
import expertDetail from "../../../utils/expertDetail";
import { useParams } from "react-router-dom";

function AIChat({ profileImg, message }) {
  const { expertId } = useParams();
  const { title } = expertDetail(expertId);

  return (
    <div className="w-full py-2 flex justify-start">
      <div className="w-full flex flex-col justify-start p-4 md:m-0">
        <div className="inline-flex mb-3">
          <img
            src={profileImg}
            alt="Catalyst AI"
            className="w-8 h-8 p-1 rounded-md bg-Secondary"
          />
          <span className="ml-2 text-PrimaryText text-lg font-medium">
            {expertId === "learning" ? "Catalyst AI" : `${title} Expert`}
          </span>
        </div>

        {message == "" ? (
          <span
            className="max-w-[80%] h-3 p-1 pl-3 mt-4 md:mt-0 md:ml-2 text-PrimaryText inline-block
          Gradient"
            style={{ borderRadius: "20px" }}
          >
            Generating...
          </span>
        ) : (
          <div className="min-w-[auto] max-w-[100%] p-2 rounded-lg bg-transparent text-PrimaryText break-words">
            <KatexMarkdown content={message} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AIChat;
