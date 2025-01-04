const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://svaithi2004:yHc4GWxLSBeuGj-@cluster0.to7xf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )

  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
module.exports = mongoose.connection;
