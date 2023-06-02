import React, { useEffect, useState } from "react";
import LogedInAs from "./LogedInAs";

const Login = ({ win }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [passwd, setPassWd] = useState("");
  const [user, setUser] = useState(() => {
    let users = JSON.parse(localStorage.getItem("users"));
    if (null == users) {
      users = [
        {
          username: "Admin",
          password: "Admin",
          pfp: "",
          winX: win[0],
          winO: win[1],
        },
      ];
    }
    return users;
  });

  const [logedInUser, setLogedInUser] = useState({
    username: "",
    password: "",
    pfp: "",
    winX: 0,
    winO: 0,
  });
  const [showpfp, setShowpfp] = useState(false);

  console.log("Localstorage:", localStorage.getItem("users"));
  console.log("user", JSON.stringify(user));
  let currentLocalStorageUser = localStorage.getItem("users");
  if (JSON.stringify(user) !== currentLocalStorageUser) {
    console.log("user changed, save to local storage");
    localStorage.setItem("users", JSON.stringify(user));
  }

  useEffect(() => {
    console.log("use effect called", logedInUser);
    let currentUser = logedInUser;
    currentUser.winX = win[0];
    currentUser.winO = win[1];

    let updateUser = user;
    const tmpIndex = getIdxByUsername(logedInUser.username);
    if (tmpIndex > -1) {
      updateUser[tmpIndex] = logedInUser;
      setUser(updateUser);
      console.log(user);
    }
  }, [win,logedInUser]);

  const LoginSignUp = () => {
    if (!user.find((e) => e.username === username) && passwd !== "") {
      const newUser = [
        ...user,
        {
          username: username,
          password: passwd,
          pfp: "",
          winX: win[0],
          winO: win[1],
        },
      ];
      showMessage(1);
      setUser(newUser);

      reset();
    } else if (passwd === "") {
      showMessage(3);
    } else if (user.find((e) => e.username === username)) {
      showMessage(2);
    } else {
      showMessage();
    }
  };

  const LoginSignIn = () => {
    let currentUser =
      username !== "" ? user.find((e) => e.username === username) : " ";
    if (currentUser === undefined) {
      currentUser = " ";
    }
    if (currentUser.username === username && currentUser.password === passwd) {
      showMessage(6);
      reset();
      
      console.log("CurrentUser: " + ( currentUser))

      let idx = getIdxByUsername(currentUser.username);
      console.log("INDEX", idx, user[idx]);
      win[0] = user[idx].winX;
      win[1] = user[idx].winO;

      console.log()

      setLogedInUser(currentUser);

      console.log("USER LOGGED IN", user);

      setShowpfp(true);
      openCloseSignUp();
    } else if (currentUser.username === username) {
      showMessage(4);
    } else {
      showMessage(5);
    }
  };

  const showMessage = (problem) => {
    const message = document.getElementById("message");

    switch (problem) {
      case 1:
        message.innerHTML = "new User " + username + "!";
        break;
      case 2:
        message.innerHTML = username + " already exist!";
        break;
      case 3:
        message.innerHTML = "You need a Username and Password!";
        break;
      case 4:
        message.innerHTML = "wrong password!";
        break;
      case 5:
        message.innerHTML = "User doesn't exist";
        break;
      case 6:
        message.innerHTML = "Loged In!";
        break;
      default:
        message.innerHTML = "Something went wrong!";
    }
    setTimeout(() => {
      message.className = "hide";
    }, 500);
    message.className = "problem";
  };

  const getIdxByUsername = (_username) => {
    console.log("looking for username", _username, "in ", user);
    const useridx = user.findIndex((u) => u.username === _username);
    console.log("found index", useridx);
    return useridx;
  };

  const reset = () => {
    document.getElementById("Username").value = "";
    document.getElementById("Password").value = "";
    setUsername("");
    setPassWd("");
  };

  const openCloseSignUp = () => {
    document.getElementById("loginID").style.transform = isOpen
      ? "translateX(-430px)"
      : "translateX(0px)";
    setIsOpen(!isOpen);
  };

  const getAPI = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        document.getElementById("image").src = data.message;
        let updatedValue = {
          username: logedInUser.username,
          password: logedInUser.password,
          pfp: data.message,
          winX: win[0],
          winO: win[1],
        };
        setLogedInUser(updatedValue);
      })
      .catch((error) => console.log("Error: " + error));
  };

  return (
    <span className="login" id="loginID">
      <div className="login-area">
        <span id="title">Sign up</span>

        <form>
          <div className="input-group">
            <div className="input-field">
              <input
                type="input"
                placeholder="Username"
                className="textField"
                id="Username"
                maxLength={"10"}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                className="textField"
                id="Password"
                onChange={(e) => {
                  setPassWd(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="problem" id="message"></div>
          <span className="sign-up-in-buttons">
            <button
              type="button"
              className="sign-up-in-button"
              id="sign-up"
              onClick={() => {
                LoginSignUp();
                document.getElementById("title").innerHTML = "Sign up";
              }}
            >
              Sign up
            </button>
            <button
              type="button"
              className="sign-up-in-button"
              id="sign-in"
              onClick={() => {
                LoginSignIn();
                document.getElementById("title").innerHTML = "Sign in";
              }}
            >
              Sign in
            </button>
          </span>
        </form>
      </div>

      <div className="toggle-sign-in">
        <div className="login-button" onClick={openCloseSignUp}>
          {logedInUser.username !== "" ? logedInUser.username : "Login"}
        </div>
        <LogedInAs
          logedInUser={logedInUser}
          getAPI={() => {
            getAPI();
          }}
          win={win}
          showpfp={showpfp}
        />
      </div>
    </span>
  );
};

export default Login;
