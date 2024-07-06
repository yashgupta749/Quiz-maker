import { connect as _connect } from "mongoose";
import { config } from "dotenv";

config();

function connect() {
  _connect(
    process.env.DB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to Database.")
  );
}

const DBConnection = {
  dbconnect: () => {
    try {
      connect();
    } catch (err) {
      console.log("Error connecting database!");
    }
  },
};

export default DBConnection;
