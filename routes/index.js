const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);

      const id = parsedToken && parsedToken.id;
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

const adminRouter = require('./Admin');
const usersRouter = require('./user');
apiRouter.use("/users", usersRouter);
apiRouter.use ("/admin", adminRouter);

const productsRouter = require('./Products')
apiRouter.use("/products", productsRouter)

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;
