import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import Cell from "../ui/Cell";
const Home = () => {
  const data = useSelector((state) => state.data);
  console.log(data);
  return (
    <main className={classes.content}>
      <h1>HOME</h1>
      <Cell>HELLO</Cell>
    </main>
  );
};
export default Home;
