import Contact from "./Contact";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      
      <div className="flex-1 transition-all duration-300 w-full overflow-y-auto">
        <Header />
        <main className="w-full px-2 sm:px-4 md:px-6 py-4">
          <Outlet />
        </main>
        <Contact />
      </div>
    </div>
  );
}