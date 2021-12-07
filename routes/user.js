const express = require("express");
const usersRouter = express.Router();
const { createJWT, verify } = require("../utils");
const jwt = require("jsonwebtoken");
const {
  getAllUsers,
  createUser,
  getUserByEmailAndPassword,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
} = require("../db");

usersRouter.get("/", async (req, res) => {
  const user = verifyJWT(req.headers.authorization);

  if (user.isAdmin) {
    try {
      const users = await getAllUsers();

      res.send({ users });
    } catch (error) {
      console.log(error);
    }
  }
});

usersRouter.get("/whoAmI", (req, res) => {
  if (req.user) {
    res.send({
      user: req.user,
    });
  } else {
    res.status(401).send({
      message: "You are not a signed in or authenticated user.",
    });
  }
});

// usersRouter.get('/:username', (req, res) => {
//   if (req.body.username) {
//     const user = await getUserByUsername({ username, password });
//     console.log("routes/user", user)
//     res.send(user)
//   } else {
//     res.status(401).send({
//       message: "User by this username does not exist.",
//     });
//   }
// })

usersRouter.get("/admin", (req, res) => {
  const user = verifyJWT(req.headers.authorization);

  if (user.isAdmin) {
    return res.send(true);
  }

  res.send(false);
});

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getUserById(id);

    const user = req.headers.authorization
      ? verifyJWT(req.headers.authorization)
      : false;

    if (user && (user.id === id || user.isAdmin)) {
      return res.send(result);
    }

    delete result.email;
    delete result.isadmin;

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  if (Object.keys(req.body).length < 3) {
    return res.status(400).send({
      name: "CredentialsRequired",
      message: "Please provide email, username and password to register.",
    });
  }

  const { username, password, email, admin } = req.body;

  let currentAdminStatus;

  try {
    const existingUserByEmail = await getUserByEmail(email);
    const existingUserUsername = await getUserByUsername(username);

    if (existingUserByEmail) {
      return res.status(400).send({
        name: "EmailExistsError",
        message: "A user under that email already exists.",
      });
    }

    if (existingUserUsername) {
      return res.status(400).send({
        name: "UserExistsError",
        message: "A user under that username already exists.",
      });
    }

    if (password.length < 5 || !password) {
      return res
        .status(406)
        .send({ message: "Password must be at least 5 characters long" });
    }
    if (admin) {
      currentAdminStatus = true;
    } else {
      currentAdminStatus = false;
    }
    const user = await createUser({
      username,
      password,
      email,
      currentAdminStatus,
    });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );

    res.send({
      user: { id: user.id, username: user.username },
      message: "Thank you for signing up",
      token,
    });
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  if (Object.keys(req.body).length < 2) {
    next({
      name: "CredentialsRequired",
      message: "Please provide email and password to login.",
    });
  }

  const { username, password } = req.body;
  console.log(username, password, "USERNAME/PASSWORD!!!!")

  if (!username || !password || password.length < 5) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try { 
    console.log("HELLO!!!!!")
    const user = await getUserByUsername({ username, password });
    console.log(user, "USER!!!!!")
    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "Email or password is incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );

      res.send({
        user: { id: user.id, username: user.username },
        message: `You are logged in ${user.username}!`,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

usersRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  const user = verifyJWT(req.headers.authorization);

  if (!user.isAdmin) {
    return res.send(":P");
  }

  const { username, email, isadmin } = req.body;

  const userObj = { username, email, isadmin };

  Object.keys(userObj).forEach((key) => {
    if (userObj[key] === undefined) {
      delete userObj[key];
    }
  });

  try {
    const result = updateUser(id, userObj);

    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

usersRouter.delete("/:id", async (req, res) => {
  const user = verifyJWT(req.headers.authorization);

  if (!user.isAdmin) {
    return res.send("You lack the power");
  }

  const { id } = req.params;

  try {
    const result = await deleteUser(id);

    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

module.exports = usersRouter;
