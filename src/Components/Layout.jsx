import Contact from "./Contact";
import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () =>{
    return(
        <>
            <Navbar/>
                <Outlet/>
            <Contact/>
        </>
    )
}

export default Layout;