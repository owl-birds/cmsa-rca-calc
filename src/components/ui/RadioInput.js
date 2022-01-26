const RadioInput = ({ detail, setRadioValue }) => {
  const onChangehandler = (value) => {
    setRadioValue(() => value);
  };
  return (
    <div>
      {detail.map((type, idx) => (
        <div key={idx}>
          <input
            id={`${type.name}idx`}
            type="radio"
            name="radio-input"
            value={type.value}
            required
            onChange={() => onChangehandler(type.value)}
          />
          <label htmlFor={`${type.name}idx`}>{type.name}</label>
        </div>
      ))}
    </div>
  );
};
export default RadioInput;
