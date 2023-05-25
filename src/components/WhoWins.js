import React from "react";

const WhoWins = ({ whoWin, isRunning }) => {
  return (
    <div
      className="whoWon"
      id="wonScreen"
      style={{ opacity: isRunning ? "0%" : "95%" }}
    >
      {whoWin} Wins
    </div>
  );
};

export default WhoWins;
