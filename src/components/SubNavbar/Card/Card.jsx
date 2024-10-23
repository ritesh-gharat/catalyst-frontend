import React, { useState, useContext } from "react";

import Mathematics from "../../../assets/math.svg?react";
import Physics from "../../../assets/physics.svg?react";
import Chemistry from "../../../assets/chemistry.svg?react";
import Biology from "../../../assets/biology.svg?react";
import Literature from "../../../assets/literature.svg?react";
import Language from "../../../assets/language.svg?react";
import Economics from "../../../assets/economics.svg?react";
import ComputerScience from "../../../assets/computer_science.svg?react";
import Engineering from "../../../assets/engineering.svg?react";
import Learning from "../../../assets/learning.svg?react";
import History from "../../../assets/history.svg?react";

import RemoveIcon from "../../../assets/remove.svg?react";
import firebaseDB from "../../../firebase/db";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../../context/App.Context";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";

function Card({ mode = "learning", title = "learning", description, href }) {
  const { setIsSubNavVisible } = useAppContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // get the icon based on the mode
  let ModeIcon;
  switch (mode) {
    case "mathematics":
      ModeIcon = Mathematics;
      break;
    case "physics":
      ModeIcon = Physics;
      break;
    case "chemistry":
      ModeIcon = Chemistry;
      break;
    case "biology":
      ModeIcon = Biology;
      break;
    case "literature":
      ModeIcon = Literature;
      break;
    case "language":
      ModeIcon = Language;
      break;
    case "economics":
      ModeIcon = Economics;
      break;
    case "history":
      ModeIcon = History;
      break;
    case "computer-science":
      ModeIcon = ComputerScience;
      break;
    case "engineering":
      ModeIcon = Engineering;
      break;
    case "learning":
      ModeIcon = Learning;
      break;
    default:
      ModeIcon = Learning;
  }
  title = title.replace(/-s/g, " S"); // for computer science

  function removeSession() {
    const confirm = window.confirm(
      "Are you sure you want to delete this session?"
    );
    if (!confirm) return;

    firebaseDB.deleteSession(href.split("/").pop()).then((e) => {
      if (pathname === href) navigate("/app/learning");
    });
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    // Perform delete action
    firebaseDB.deleteSession(href.split("/").pop()).then((e) => {
      if (pathname === href) navigate("/app/learning");
    });

    setIsDialogOpen(false);
  };

  // render the card component
  return (
    <NavLink
      to={href}
      onClick={() =>
        window.innerWidth <= 768 && isDialogOpen
          ? setIsSubNavVisible(false)
          : null
      }
    >
      <div
        className={`w-56 h-16 px-2 py-2 bg-Primary flex rounded-md cursor-pointer hover:border-2 hover:border-Tertiary ${pathname === href ? "border-2 border-Tertiary" : ""}`}
      >
        <ModeIcon className="fill-PrimarySvg w-6 h-6" />
        <div className="mx-2 w-full flex flex-col">
          <div className="inline-flex justify-between items-center">
            <h2>{title.charAt(0).toUpperCase() + title.slice(1, 17)}</h2>
            <RemoveIcon
              className="fill-PrimarySvg w-4 h-4"
              onClick={() => setIsDialogOpen(true)}
            />
            <ConfirmDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onConfirm={handleDelete}
              title="Delete chat?"
              message="This will delete you Chat Session"
            />
          </div>
          <span className="max-w-full text-xs break-words">
            {description.slice(0, 27)}...
          </span>
        </div>
      </div>
    </NavLink>
  );
}

export default Card;
