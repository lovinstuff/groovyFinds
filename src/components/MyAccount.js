import React, { useState, useEffect } from "react";
// import { } from "../api";

const MyAccount = ({ user, setUser }) => {
  const [grabbedUsers, setGrabbedUsers] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
  });

  const getMyInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const users = await getMyAccount(token);
      setGrabbedUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  useEffect(() => {
    localStorage.setItem("user", user);
  });

  const handleEditUser = async (id, name, email) => {
    try {
      await editUser(id, name, email);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="my-account-container">
      <div className="my-account">
        <h1 className="Title account-title">My Account: </h1>
        {grabbedUsers ? (
          <div>
            <h2>Name: {grabbedUsers.name}</h2>
            <h3>Username: {grabbedUsers.username}</h3>
            <h3>Email: {grabbedUsers.email}</h3>
            <h3>Admin Status: {grabbedUsers.admin.toString()}</h3>
            <button
              className="edit-my-account-button"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                handleEditUser(
                  grabbedUsers.id,
                  grabbedUsers.name,
                  grabbedUsers.email
                );
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyAccount;