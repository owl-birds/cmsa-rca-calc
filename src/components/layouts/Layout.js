import classes from "./style.module.css";
import Header from "./Header";
const Layout = (props) => {
  return (
    <section className={classes.layout}>
      <Header />
      {props.children}
    </section>
  );
};
export default Layout;
