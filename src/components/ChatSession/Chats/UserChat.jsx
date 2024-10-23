import React from "react";

function UserChat({ profileImg, message, imageData }) {
  return (
    <div className="w-full py-2 flex justify-end Add-Scrollbar-X">
      <div className="w-11/12 md:w-5/6 flex flex-col md:flex-row items-end md:justify-end md:items-start mr-4">
        <img
          src={profileImg}
          alt="User Profile"
          className="w-9 h-9 fill-SecondarySvg bg-Quaternary rounded-full bg-cover border-2 border-Quaternary"
        />
        <div className="min-w-[auto] max-w-[90%] mt-2 md:m-0 md:ml-2 p-3 flex flex-col rounded-lg text-left bg-Secondary text-PrimaryText">
          {imageData && imageData.uploading ? (
            <div className="min-w-60 min-h-56 md:w-80 rounded-xl p-1 Gradient"></div>
          ) : imageData && imageData.success ? (
            <img
              src={imageData.url}
              alt={imageData.format}
              className="w-full rounded-xl p-1"
            />
          ) : null}
          <span className="Add-Scrollbar-X">{message}</span>
        </div>
      </div>
    </div>
  );
}

export default UserChat;
