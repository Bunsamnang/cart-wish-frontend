import { NavLink } from "react-router-dom";

interface LinkProps {
  title: string;
  link: string;
}

const Link = ({ title, link }: LinkProps) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => (isActive ? "text-white" : "")}
    >
      {title}
    </NavLink>
  );
};

export default Link;
