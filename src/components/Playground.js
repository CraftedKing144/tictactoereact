import React, { useState } from "react";
import Field from "./Field";
import WinnerField from "./WinnerField";
import WhoWins from "./WhoWins";
import Buttons from "./Buttons";
import Login from "./Login";
import "./Playground.css";

const Playground = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [changePlayer, setChangePlayer] = useState(false);
  const [fieldBool, setFieldBool] = useState(new Array(9).fill(false));

  const [win, setWin] = useState(() => {
    // let winsX = parseInt(localStorage.getItem("XWinsInput"));
    // let winsO = parseInt(localStorage.getItem("OWinsInput"));
    // if (isNaN(winsO) || isNaN(winsX)) {
      let winsO = 0;
      let winsX = 0;
    // }
    return [winsX, winsO];
  });

  // localStorage.setItem("XWinsInput", win[0]);
  // localStorage.setItem("OWinsInput", win[1]);
  const [whoWin, setWhoWin] = useState("");

  const check = () => {
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

    for (let j = 0; j < winningCondition.length; j++) {
      isWinningA = [];
      isWinningA = isWinningA.concat(winningCondition[j]);

      const plays = ["X", "O"];
      for (let l of plays) {
        if (
          document.getElementById("f" + isWinningA[0]).innerText === l &&
          document.getElementById("f" + isWinningA[1]).innerText === l &&
          document.getElementById("f" + isWinningA[2]).innerText === l
        ) {
          setWin([
            l === "X" ? win[0] + 1 : win[0],
            l === "O" ? win[1] + 1 : win[1],
          ]);
          setIsRunning(false);
          return l;
        }
      }
    }
  };

  const reset = (resetPoints) => {
    for (let j = 0; j < 9; j++) {
      document.getElementById("f" + j).innerText = "";
    }
    setIsRunning(true);
    setFieldBool(Array(9).fill(false));

    if (resetPoints) {
      setWin([0, 0]);
    }
  };

  const getAPI = (image) => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        document.getElementById(image).src = data.message;
        
      })
      .catch((error) => console.log("Error: " + error));
  }

  return (
    <div className="background">
      <div className="area">
        <Field
          changePlayer={changePlayer}
          onChangePlayer={(player) => setChangePlayer(player)}
          onFieldBool={(field) => setFieldBool(field)}
          fieldBool={fieldBool}
          isRunning={isRunning}
          check={() => setWhoWin(check())}
          reset={(resetPoints) => reset(resetPoints)}
        />
        <WinnerField changePlayer={changePlayer} win={win} />
        <Buttons reset={(resetPoints) => reset(resetPoints)} />
        <WhoWins whoWin={whoWin} isRunning={isRunning} />
      </div>
      <Login win={win} />
    </div>
  );
};

export default Playground;
