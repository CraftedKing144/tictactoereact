import React from "react";
import "./Playground.css";
import { useState } from "react";

const isX = new Array(9).fill(false);
const isO = new Array(9).fill(false);

const Playground = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [changePlayer, setChangePlayer] = useState(false);
  const [stillFree, setStillFree] = useState(9);

  const [winX, setWinX] = useState(() => {
    const winsX = parseInt(localStorage.getItem("XWinsInput"));
    return winsX || 0;
  });
  const [winO, setWinO] = useState(() => {
    const winsO = parseInt(localStorage.getItem("OWinsInput"));
    return winsO || 0;
  });

  localStorage.setItem("OWinsInput", winO);
  localStorage.setItem("XWinsInput", winX);
  const [whoWin, setWhoWin] = useState("");

  return (
    <div className="area">
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
                  changePlayer &&
                  !isX[idx] &&
                  !isO[idx] &&
                  isRunning &&
                  stillFree != 0
                ) {
                  e.currentTarget.innerText = "X";
                  setChangePlayer(!changePlayer);
                  setStillFree(stillFree - 1);
                  console.log(stillFree)
                  isX[idx] = true;
                } else if (
                  !isX[idx] &&
                  !isO[idx] &&
                  isRunning &&
                  stillFree != 0
                ) {
                  e.currentTarget.innerText = "O";
                  setChangePlayer(!changePlayer);
                  setStillFree(stillFree - 1);
                  console.log(stillFree);
                  isO[idx] = true;
                } else if (!isRunning || stillFree == 0) {
                  reset(setIsRunning, false, setWinX, setWinO, setStillFree);
                }
                setWhoWin(check(isX, isO));
              }}
            ></div>
          ))}
      </div>

      <div className="winner">
        <span id="xPlayer" style={{ color: changePlayer ? "red" : "black" }}>
          X player: {winX}
        </span>
        <br />
        <span id="oPlayer" style={{ color: changePlayer ? "black" : "red" }}>
          O player: {winO}
        </span>
      </div>

      <span>
        <span
          className="rButton"
          onClick={() => {
            reset(setIsRunning, false, setWinX, setWinO, setStillFree);
          }}
        >
          Reset
        </span>
        <span> </span>
        <span
          className="rButton"
          onClick={() => {
            reset(setIsRunning, true, setWinX, setWinO, setStillFree);
          }}
        >
          Reset Points
        </span>
      </span>

      <div
        className="whoWon"
        id="wonScreen"
        style={{ opacity: isRunning ? "0%" : "95%" }}
      >
        {whoWin} Wins
      </div>
    </div>
  );

  function check(cIsX, cIsO) {
    let isWinningA = [];
    const winningCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let j = 0; j <= winningCondition.length; j++) {
      isWinningA = isWinningA.concat(winningCondition[j]);

      if (cIsX[isWinningA[0]] && cIsX[isWinningA[1]] && cIsX[isWinningA[2]]) {
        setWinX(winX + 1);
        setIsRunning(false);
        return "X";
      } else if (
        cIsO[isWinningA[0]] &&
        cIsO[isWinningA[1]] &&
        cIsO[isWinningA[2]]
      ) {
        setWinO(winO + 1);
        setIsRunning(false);
        return "O";
      }
      isWinningA = [];
    }
  }
};

function reset(setIsRunning, b, setWinX, setWinO, setStillFree) {
  for (let j = 0; j < 9; j++) {
    document.getElementById("f" + j).innerText = "";
  }
  isO.fill(false);
  isX.fill(false);
  setIsRunning(true);
  setStillFree(9)

  if (b) {
    setWinX(0);
    setWinO(0);
  }
}

export default Playground;
