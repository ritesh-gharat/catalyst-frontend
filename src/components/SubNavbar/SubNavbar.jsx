import React, { useContext } from "react";
import "./SubNavbar.css";
import Card from "./Card/Card";
import CloseSubNavSvg from "../../assets/navbar_close.svg?react";
import CreateSvg from "../../assets/create.svg?react";
import NoChatsSvg from "../../assets/no_chats.svg?react";

import { useAppContext } from "../../context/App.Context";
import { NavLink } from "react-router-dom";

function SubNavbar() {
  const { ChatSessions, isSubNavVisible, setIsSubNavVisible } = useAppContext();

  // state to manage the visibility of the sub navbar
  const closeNavbar = () => {
    setIsSubNavVisible(false);
  };

  // if the sub navbar is not visible, return null
  if (isSubNavVisible == false) return null;
  // render the sub navbar component
  return (
    <>
      <div className="bg-Secondary text-PrimaryText Sub-Navbar">
        <div className="w-full h-auto flex justify-around items-center py-2 sticky">
          <h1 className="text-xl">Chats Sessions</h1>
          <NavLink to="/app/learning">
            <CreateSvg className="w-6 h-6 p-1 bg-Primary fill-PrimarySvg rounded-md" />
          </NavLink>
          <button onClick={closeNavbar}>
            <CloseSubNavSvg className="w-6 h-6 fill-PrimarySvg" />
          </button>
        </div>

        {/* Session history container */}
        <div className="w-full h-full flex flex-col items-center gap-2 pb-14 Add-Scrollbar">
          {ChatSessions && ChatSessions.length !== 0 ? (
            ChatSessions.map((session) => {
              return (
                <Card
                  key={session.id}
                  mode={session.sessionType}
                  title={session.sessionType}
                  description={session.history.model[0].text}
                  href={`/app/chat/${session.sessionType}/${session.id}`}
                />
              );
            })
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <NoChatsSvg className="w-20 h-20 fill-PrimarySvg" />
              No chats sessions available
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-700 Sub-Navbar-Bg" onClick={closeNavbar}></div>
    </>
  );
}

export default SubNavbar;
