const mongoose = require("mongoose");

const host = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT;
const db = process.env.DB_NAME;

exports.connect = () => {
  mongoose.connect(host + "/" + db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log(
      "The connection to lide-database has been successfully established."
    );
  });
};
