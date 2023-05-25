import React from "react";

const Field = ({
  changePlayer,
  onChangePlayer,
  onFieldBool,
  fieldBool,
  isRunning,
  check,
  reset,
}) => {
  return (
    <div className="playboard">
      {Array(9)
        .fill(0)
        .map((zahl, idx) => (
          <div
            className="field"
            id={"f" + idx}
            key={idx}
            onClick={(e) => {
              if (
                !fieldBool[idx] &&
                isRunning &&
                !fieldBool.every((element) => element === true)
              ) {
                e.currentTarget.innerText = changePlayer ? "X" : "O";
                onChangePlayer(!changePlayer);
                onFieldBool(() => {
                  let newField = fieldBool;
                  newField[idx] = true;
                  return newField;
                });
              } else if (
                !isRunning ||
                fieldBool.every((element) => element === true)
              ) {
                reset(false);
              }
              check();
            }}
          ></div>
        ))}
    </div>
  );
};

export default Field;
