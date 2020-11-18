const mongoose = require("mongoose");

//const host = "mongodb://"+process.env.DB_HOST+':'+process.env.DB_PORT;
//const db = process.env.DB_NAME;
const host = "mongodb://localhost:27017";
const db = "lide-db";


exports.connect = () => {
  mongoose.connect(host + "/" + db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log(
      "The connection to lide-pma database has been successfully established."
    );
  });
};
