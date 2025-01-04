// const os = require("os");
// console.log(os.arch());
// console.log(os.freemem());
// console.log(os.hostname());
// console.log(os.totalmem());
// console.log(os.homedir());
// console.log(os.platform());
// console.log(os.release());
// console.log(os.type());
// console.log(os.uptime());
// console.log(os.version());
// console.log(os.machine());
// console.log(os.endianness());
// console.log(os.cpus());
// console.log(os.userInfo());
// // const curpriority = os.getPriority(0);
// // console.log(curpriority);
// console.log(os.availableParallelism(),"available parallelism");

const express = require("express");
const app = express();
const database = require("./src/config/db");
const userRouter = require("./src/route/userrouter");
const productRouter = require("./src/route/routerproducts");
const userRouters = require("./src/route/userformrouter");
const emailRouter = require("./src/route/emailroute");

// console.log(userRoutes);

app.use(express.json());

// users
app.use("/user", userRouter);

// products
app.use("/products", productRouter);

// register and login
app.use("/users", userRouters);

//  User Email
app.use("/api", emailRouter);


database.on("open", () => {
  app.listen(3030, () => {
    console.log("Server is running on port 3030");
  });
});

database.on("error", (err) => {
  console.error("Error while connecting to the database:", err);
});

module.exports = app;
