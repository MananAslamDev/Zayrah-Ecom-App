import React from "react";
import Contact from "./Contact";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-54 overflow-hidden">
        <Header />
        <main className="container mx-auto px-4">
          <Outlet />
        </main>
        <Contact />
      </div>
    </div>
  );
};

export default Layout;