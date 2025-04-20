import s from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <header className={s.header}>
        <Navigation />
      </header>
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default Layout;
