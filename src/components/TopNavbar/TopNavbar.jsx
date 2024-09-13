import React from "react";
import OpenNavbarSvg from "../../assets/navbar_open.svg?react";
import { useAppContext } from "../../context/App.Context";

function TopNavbar() {
  const { isSubNavVisible, setIsSubNavVisible } = useAppContext();

  // check if the sub navbar is visible or not
  let visibleOpenNavBtn = "none";
  if (!isSubNavVisible) visibleOpenNavBtn = "block";

  // function to toggle the visibility of the sub navbar
  return (
    <div className="w-full min-h-12 flex items-center bg-Primary sticky top-0 left-0">
      <button
        onClick={e => setIsSubNavVisible(!isSubNavVisible)}
        style={{ display: visibleOpenNavBtn }}
      >
        <OpenNavbarSvg className="h-6 w-6 m-3 fill-PrimarySvg" />
      </button>
      <h1 className="w-full m-3 text-xl text-PrimaryText text-left font-normal">
        Catalyst AI
      </h1>
    </div>
  );
}

export default TopNavbar;
