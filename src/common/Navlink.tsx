import { NavLink } from "react-router-dom";

interface LinkProps {
  title: string;
  link: string;
}

const Navlink = ({ title, link }: LinkProps) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => (isActive ? "text-white" : "")}
    >
      {title}
    </NavLink>
  );
};

export default Navlink;
