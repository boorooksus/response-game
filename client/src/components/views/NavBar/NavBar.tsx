import * as React from "react";

const NavBar = () => {
  return (
    <>
      <nav className="relative w-full flex flex-wrap items-center justify-between py-4 bg-white text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <div className="container-fluid">
            <a className="flex items-center font-semibold text-xl text-gray-700 focus:text-gray-900 mt-2 lg:mt-0 mr-1" href="/">
              Response Game
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
