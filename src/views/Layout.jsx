import { useState } from "react";
import { BarMenu } from "../utils/Icons";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
function Layout({ child }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
    console.log(isSideBarOpen);
  };
  return (
    <>
      <Header />
      <figure
        className={`fixed top-4 left-1 z-50 bg-gray-800 text-white p-2 rounded-md ${
          isSideBarOpen ? "hidden" : ""
        }`}
        onClick={toggleSideBar}
      >
        {BarMenu()}
      </figure>
      <SideBar isOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
      {child}
    </>
  );
}

export default Layout;
