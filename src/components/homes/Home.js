import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import Cell from "../ui/Cell";
const Home = () => {
  const data = useSelector((state) => state.data);
  console.log(data);
  return (
    <main className={classes.content}>
      <h1>HOME</h1>
      <Cell value={"2022"} index={0} columnName={"2010"} />
    </main>
  );
};
export default Home;
