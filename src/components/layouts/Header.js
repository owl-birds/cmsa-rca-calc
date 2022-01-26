import classes from "./style.module.css";
import Nav from "./Nav";
const Header = () => {
  return (
    <header className={classes.header}>
      <Nav />
    </header>
  );
};
export default Header;
