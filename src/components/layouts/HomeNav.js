import classes from "./style.module.css";
import { Link } from "react-router-dom";
const HomeNav = () => {
  return (
    <section className={classes.homeNav}>
      <div className={classes.navBox}>
        <Link className={classes.homeNavLink} to="/one-level">
          One Level Decomposition
        </Link>
      </div>
      <div className={classes.navBox}>
        <Link className={classes.homeNavLink} to="/two-level">
          Two Level Decomposition
        </Link>
      </div>
      <div className={classes.navBox}>
        <Link className={classes.homeNavLink} to="/three-level">
          Three Level Decomposition
        </Link>
      </div>
    </section>
  );
};
export default HomeNav;
