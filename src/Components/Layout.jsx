import Contact from "./Contact";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-47">
        {" "}
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
        <Contact />
      </div>
    </div>
  );
};

export default Layout;
