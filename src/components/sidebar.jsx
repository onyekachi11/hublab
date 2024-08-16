"use client";
import React from "react";
import { Logo, SidebarMenuItem } from "./atoms";
import { useNav } from "../context/nav_context";
import { NavigationItems } from "../components/atoms/sideBarData";
import LogoutButton from "./logout";

const Sidebar = () => {
  const { isOpen } = useNav();

  return (
    <>
      <nav
        className={`
      ${
        isOpen ? "translate-x-0 absolute h-full z-50" : "max-lg:hidden"
      } w-[300px] bg-primary z-50 h-full`}
      >
        <div className="flex justify-center items-center px-[5%]">
          <Logo className="py-10" />
        </div>
        <div className="mx-5"></div>
        <div className="flex flex-col justify-between h-[60%]">
          <ul className="">
            {NavigationItems.map((item, index) => (
              <SidebarMenuItem key={`sidebar-item-${index}`} {...item} />
            ))}
          </ul>
          <LogoutButton />
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
