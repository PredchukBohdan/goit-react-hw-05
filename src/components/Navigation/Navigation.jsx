import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  const activeLink = ({ isActive }) => {
    return isActive ? s.active : "";
  };

  return (
    <nav className={s.navigation}>
      <NavLink className={activeLink} to="/">
        Home
      </NavLink>
      <NavLink className={activeLink} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
};
export default Navigation;
