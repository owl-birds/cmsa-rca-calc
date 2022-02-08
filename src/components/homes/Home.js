import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import HomeNav from "../layouts/HomeNav";
const Home = () => {
  const data = useSelector((state) => state.data);
  console.log(data);
  return (
    <main className={classes.content}>
      <HomeNav />
    </main>
  );
};
export default Home;
