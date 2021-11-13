import React, { useState, useEffect } from "react";
// import { getUsers } from "../../api";
import UserCard from "./UserCard";

const Users = () => {
  const [grabbedUsers, setGrabbedUsers] = useState();

  const getAllUser = async () => {
    try {
      const users = await getUsers();
      setGrabbedUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div>
      <h1 className="Title">Here are all the Users:</h1>
      <div className="userCards">
        {grabbedUsers?.map((user, index) => {
          return (
            <UserCard
              key={user.id}
              user={user}
              index={index}
              grabbedUsers={grabbedUsers}
              setGrabbedUsers={setGrabbedUsers}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Users;