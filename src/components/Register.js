import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../api";
import { storeToken, getToken, storeUsername, storeUserID } from "../auth";

export default function Register({ setIsLoggedIn }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  return (
    <form
      className="register"
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          let submit = await registerUser(userName, password, email);

          if (submit) {
            storeToken(submit.token);
            storeUserID(submit.user.id);
            history.push("/");
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <h1>Register:</h1>
      <label>Name:</label>
      <input
        type="text"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        placeholder=""
      />
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder=""
      />
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
      <button type="submit">Register</button>
    </form>
  );
}
