import classes from "./ThreeLevel.module.css";
// COMPONENTS
import InputTypeSelectionMenu from "../ui/InputTypeSelectionMenu";
const ThreeLevel = () => {
  return (
    <main className={classes.content}>
      <div>
        <h1 className={classes.title}>THREE LEVEL</h1>
      </div>
      <InputTypeSelectionMenu cmsaType={3} />
    </main>
  );
};
export default ThreeLevel;
