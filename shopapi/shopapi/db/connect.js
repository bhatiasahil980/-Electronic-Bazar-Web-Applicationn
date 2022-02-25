const mongoose = require("mongoose");
const dbOptions = {
  maxPoolSize: 5,
};
mongoose.connect(process.env.DB_URL, dbOptions, (err) => {
  if (err) {
    console.log("DB Connection Failed..", err);
  } else {
    console.log("Connection Created...");
  }
});
module.exports = mongoose;
