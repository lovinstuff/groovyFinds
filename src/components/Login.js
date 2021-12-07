import React, { useEffect, useState } from "react";

import { loginUser } from "../api";
import { storeToken, getToken, storeUsername, storeUserID } from "../auth";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const history = useHistory();

  useEffect(() => {
    const TOKEN = getToken();
    if (TOKEN) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <form
      className="login"
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          let submit = await loginUser(userName, password);

          storeToken(submit.token);
          storeUserID(submit.user.id);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <h1>Login:</h1>
      <label>Username:</label>
      <input
        type="text"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        placeholder=""
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder=""
      />
      <button type="submt">Login</button>
    </form>
  );
}
