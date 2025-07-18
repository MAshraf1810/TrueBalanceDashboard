import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Navbar from "../components/shared/Navbar";
import { useAuth } from "../../contexts/AuthProvider";

const Layout = () => {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState();

  return (
    <div className="flex relative bg-gradient-to-b from-[#005430] to-white">
      <div
        className={` min-h-screen ${
          isOpen && "ltr:md:ml-72 rtl:md:mr-72"
        } w-full ltr:ml-16 rtl:mr-16 `}
      >
        <div className="static w-full mt-8">
          <Navbar />
        </div>
        <div className="m-4">
          <Outlet />
        </div>
      </div>
      {auth && (
        <div className="fixed z-[1000] ">
          <Sidebar isOpen={(isSideBarOpen) => setIsOpen(isSideBarOpen)} />
        </div>
      )}
    </div>
  );
};

export default Layout;
