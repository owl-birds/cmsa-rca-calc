import classes from "./style.module.css";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className={classes.nav}>
      <Link className={classes.link} to="/">
        Home
      </Link>
      <Link className={classes.link} to="/one-level">
        One Level Decomposition
      </Link>
      <Link className={classes.link} to="/two-level">
        Two Level Decomposition
      </Link>
    </nav>
  );
};
export default Nav;
