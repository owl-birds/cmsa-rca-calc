import classes from "./Select.module.css";
const Select = ({ optionList, selectRef, label, onChange }) => {
  return (
    <div className={classes.selectWrapper}>
      <label htmlFor="select">{label}</label>
      <select
        onChange={() => onChange()}
        id="select"
        ref={selectRef}
        className={classes.selectBox}
        required
      >
        {optionList.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
