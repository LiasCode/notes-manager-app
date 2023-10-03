import { useState } from "react";
import MenuIcon from "../assets/menu-icon.png";

export const SideBar = () => {
  const [isOpenActionsBar, setIsOpenActionsBar] = useState(false);

  const toggleIsOpenActionsBar = () => {
    setIsOpenActionsBar(!isOpenActionsBar);
  };

  return (
    <aside className="flex flex-col items-center justify-start fixed left-2 top-0 w-10 h-full pt-4 bg-transparent">
      <button
        onClick={toggleIsOpenActionsBar}
        type={"button"}
        className="w-8 h-7 p-[2px] flex flex-col rounded-sm hover:border-2 hover:border-red-200 items-center justify-start cursor-pointer"
      >
        <img
          src={MenuIcon}
          alt="menu icon"
          className="w-full h-full object-contain object-center"
        />
      </button>

      {isOpenActionsBar && (
        <div
          className="
          flex flex-col items-center justify-start outline outline-2 outline-red-200 rounded-md px-1
          w-full flex-1 max-h-[80%] mt-4 bg-transparent"
        >
          <button className="mt-2 text-[1rem] hover:font-semibold w-full 
            hover:bg-red-200 hover:text-white rounded-md h-max border-2 border-red-200">
            T
          </button>
          <button className="mt-2 text-[1rem] hover:font-semibold w-full
            hover:bg-red-200 hover:text-white rounded-md h-max border-2 border-red-200">
            N
          </button>
        </div>
      )}
    </aside>
  );
};
